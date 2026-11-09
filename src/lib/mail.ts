// Server-only mail sending for the site's three forms (rev2 WP-F, D1).
//
// Form submissions are only emailed to the customer-service mailbox; the site
// stores nothing (decided 2026-11-09). Mail goes out through the Resend HTTP API
// with fetch, so there is no SDK dependency.
//
// Environment (see .env.example):
//   RESEND_API_KEY   Resend API key. Required unless FORMS_DRY_RUN=true.
//   MAIL_FROM        Sender, on a domain verified in Resend. Default below.
//   MAIL_TO          Recipient. Default site.supportEmail (gho001@coesg.tw).
//   FORMS_DRY_RUN    "true": do not call Resend; log the whole email to the
//                    server console and report success. For local and test-site checks.
//
// Never import this file from a client component: it reads the API key.
import { site } from "@/lib/site"

const RESEND_ENDPOINT = "https://api.resend.com/emails"
const DEFAULT_FROM = "CO-ESG 官網 <noreply@coesg.tw>"
const SEND_TIMEOUT_MS = 10_000

export interface MailMessage {
  subject: string
  /** Plain-text body */
  text: string
  /** The submitter's address, so staff can reply directly */
  replyTo?: string
}

export type MailResult =
  | { ok: true; dryRun: boolean }
  | { ok: false; reason: "not_configured" | "send_failed" }

// Keep header values on one line.
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim()
}

export function mailConfig() {
  return {
    dryRun: process.env.FORMS_DRY_RUN === "true",
    apiKey: process.env.RESEND_API_KEY?.trim() || "",
    from: process.env.MAIL_FROM?.trim() || DEFAULT_FROM,
    to: process.env.MAIL_TO?.trim() || site.supportEmail,
  }
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const { dryRun, apiKey, from, to } = mailConfig()
  const subject = oneLine(message.subject)
  const replyTo = message.replyTo ? oneLine(message.replyTo) : undefined

  if (dryRun) {
    console.info(
      [
        "[forms] FORMS_DRY_RUN=true: email not sent",
        `From: ${from}`,
        `To: ${to}`,
        `Reply-To: ${replyTo ?? "(none)"}`,
        `Subject: ${subject}`,
        "",
        message.text,
      ].join("\n")
    )
    return { ok: true, dryRun: true }
  }

  if (!apiKey) {
    console.error("[forms] Mail is not configured: set RESEND_API_KEY, or FORMS_DRY_RUN=true for testing.")
    return { ok: false, reason: "not_configured" }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: message.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      cache: "no-store",
    })
    if (!response.ok) {
      // Log Resend's error only; never the submitter's data.
      const detail = await response.text().catch(() => "")
      console.error(`[forms] Resend responded ${response.status}: ${detail.slice(0, 500)}`)
      return { ok: false, reason: "send_failed" }
    }
    return { ok: true, dryRun: false }
  } catch (error) {
    console.error(`[forms] Resend request failed: ${error instanceof Error ? error.message : String(error)}`)
    return { ok: false, reason: "send_failed" }
  }
}
