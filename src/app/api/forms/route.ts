// POST /api/forms: the one endpoint behind the site's three forms (rev2 WP-F).
//   contact     合作洽詢聯絡表單 (#48, /consulting#contact)
//   subscribe   加入我們 Email 訂閱 (#50, /join)
//   whitepaper  白皮書下載 (#53②, /events/impact-whitepaper)
//
// Each submission is checked, then emailed to gho001@coesg.tw (src/lib/mail.ts)
// with Reply-To set to the submitter. Nothing is stored (decided 2026-11-09).
//
// Request: JSON { form, locale, website (honeypot), ...fields }
// Response: { ok: true } or { ok: false, error, fields? } where error is one of
//   invalid (400), rate_limited (429), not_configured (503), send_failed (502).
import zhCommon from "@/i18n/messages/zh/common"
import enCommon from "@/i18n/messages/en/common"
import { sendMail } from "@/lib/mail"
import { HONEYPOT_FIELD, checkForm, formFields, type FormKind, type SubmitError } from "@/components/forms/schema"

const MAX_BODY_CHARS = 20_000

// A simple per-IP limit. It lives in this server instance's memory, so it is
// reset on deploy and not shared between serverless instances: it slows a
// spammer down but is not a hard guarantee.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 8
const hits = new Map<string, number[]>()

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  // Drop idle addresses now and then so the map stays small.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
  }
  return false
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

// Browsers send Origin on cross-site POSTs; refuse those.
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  try {
    return !!host && new URL(origin).host === host
  } catch {
    return false
  }
}

function fail(error: SubmitError, status: number, fields?: string[]) {
  return Response.json({ ok: false, error, ...(fields ? { fields } : {}) }, { status })
}

const FORM_NAMES: Record<FormKind, string> = {
  contact: "合作洽詢",
  subscribe: "Email 訂閱",
  whitepaper: "白皮書下載",
}

const FORM_PAGES: Record<FormKind, string> = {
  contact: "/consulting#contact",
  subscribe: "/join",
  whitepaper: "/events/impact-whitepaper",
}

function taipeiTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-TW", { timeZone: "Asia/Taipei", dateStyle: "medium", timeStyle: "short", hour12: false }).format(date)
}

// Staff read Chinese: an English topic is shown as its Chinese option, with the English after it.
function topicLabel(locale: "zh" | "en", topic: string): string | null {
  if (!topic) return ""
  const zh = zhCommon.contactForm.topics as readonly string[]
  const en = enCommon.contactForm.topics as readonly string[]
  if (locale === "zh") return zh.includes(topic) ? topic : null
  const index = en.indexOf(topic)
  return index < 0 ? null : `${zh[index] ?? topic}（${topic}）`
}

function compose(kind: FormKind, locale: "zh" | "en", v: Record<string, string>, topic: string) {
  const header = [
    `表單：${FORM_NAMES[kind]}（/${locale}${FORM_PAGES[kind]}）`,
    `語言：${locale === "en" ? "英文版" : "中文版"}`,
    `送出時間：${taipeiTime()}（台北時間）`,
    "",
  ]
  const footer = ["", "—", "直接回覆這封信即可回覆填表人。網站本身不保存這份資料。"]

  if (kind === "contact") {
    return {
      subject: `[官網] ${FORM_NAMES.contact}｜${v.name}`,
      lines: [
        ...header,
        `姓名：${v.name}`,
        `Email：${v.email}`,
        `所屬單位：${v.organization || "（未填）"}`,
        `想聊的方向：${topic || "（未選）"}`,
        "",
        "訊息：",
        v.message || "（未填）",
        ...footer,
      ],
    }
  }
  if (kind === "subscribe") {
    return {
      subject: `[官網] ${FORM_NAMES.subscribe}｜${v.email}`,
      lines: [...header, `Email：${v.email}`, "", "請把這個地址加入訂閱名單。對方要求取消訂閱時，請從名單移除。", ...footer],
    }
  }
  return {
    subject: `[官網] ${FORM_NAMES.whitepaper}｜${v.paperTitle}｜${v.name}`,
    lines: [
      ...header,
      `下載的白皮書：${v.paperTitle}（${v.paperId}）`,
      `姓名：${v.name}`,
      `職稱：${v.jobTitle}`,
      `Email：${v.email}`,
      ...footer,
    ],
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid", 403)
  if (!request.headers.get("content-type")?.includes("application/json")) return fail("invalid", 415)

  const raw = await request.text()
  if (raw.length > MAX_BODY_CHARS) return fail("invalid", 413)

  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("invalid", 400)
    body = parsed as Record<string, unknown>
  } catch {
    return fail("invalid", 400)
  }

  const kind = body.form
  if (kind !== "contact" && kind !== "subscribe" && kind !== "whitepaper") return fail("invalid", 400)
  const locale = body.locale === "en" ? "en" : "zh"

  if (rateLimited(clientIp(request))) return fail("rate_limited", 429)

  // Honeypot filled: answer as if it worked, send nothing.
  const trap = body[HONEYPOT_FIELD]
  if (typeof trap === "string" && trap.trim() !== "") return Response.json({ ok: true })

  const values: Record<string, string> = {}
  for (const name of Object.keys(formFields[kind])) {
    const value = body[name]
    values[name] = typeof value === "string" ? value.trim() : ""
  }

  const errors = checkForm(kind, values)
  let topic = ""
  if (kind === "contact") {
    const label = topicLabel(locale, values.topic)
    if (label === null) errors.topic = "option"
    else topic = label
  }
  const invalid = Object.keys(errors)
  if (invalid.length > 0) return fail("invalid", 400, invalid)

  const { subject, lines } = compose(kind, locale, values, topic)
  const result = await sendMail({ subject, text: lines.join("\n"), replyTo: values.email })
  if (!result.ok) return fail(result.reason, result.reason === "not_configured" ? 503 : 502)
  return Response.json({ ok: true })
}
