// Navigation ↔ section guard. Run against a running server:
//   node scripts/check-anchors.mjs [baseUrl]
// Fails when
//   1. a chapter in src/i18n/messages/<locale>/<page>.ts has no <section id> on its page,
//   2. the chapters are not in the same order as the sections on the page,
//   3. zh and en list different chapter ids,
//   4. any internal link on the site points at an #anchor that does not exist.
// Warns when a page has a <section id> that no chapter leads to.
import { readFileSync, readdirSync } from "node:fs"

const base = process.argv[2]?.startsWith("http") ? process.argv[2] : "http://localhost:3000"
const locales = ["zh", "en"]
const pages = ["sustainability", "events", "learning", "consulting"]
const errors = []
const warnings = []

function readChapters(locale, page) {
  const src = readFileSync(`src/i18n/messages/${locale}/${page}.ts`, "utf8")
  const block = src.match(/const chapters: readonly ChapterDef\[\] = \[([\s\S]*?)\n\]/)?.[1] ?? ""
  return [...block.matchAll(/\{([^}]*)\}/g)].map((m) => ({
    id: m[1].match(/\bid: "([^"]+)"/)?.[1],
    route: m[1].match(/\broute: "([^"]+)"/)?.[1],
    label: m[1].match(/\blabel: "([^"]+)"/)?.[1],
  }))
}

const cache = new Map()
async function load(path) {
  if (!cache.has(path)) {
    const res = await fetch(base + path, { redirect: "follow" })
    const html = res.ok ? await res.text() : ""
    const main = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"))
    cache.set(path, {
      status: res.status,
      ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
      sectionIds: [...main.matchAll(/<section\b[^>]*?\sid="([^"]+)"/g)].map((m) => m[1]),
      links: [...html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&")),
    })
  }
  return cache.get(path)
}

// 1–3: chapters ↔ sections
for (const page of pages) {
  const perLocale = {}
  for (const locale of locales) {
    const chapters = readChapters(locale, page)
    perLocale[locale] = chapters.map((c) => c.id).join(",")
    const doc = await load(`/${locale}/${page}`)
    if (doc.status !== 200) {
      errors.push(`/${locale}/${page}: HTTP ${doc.status}`)
      continue
    }
    const anchors = chapters.filter((c) => !c.route)
    for (const c of anchors) {
      if (!doc.sectionIds.includes(c.id)) errors.push(`/${locale}/${page}: chapter "${c.label}" → #${c.id} is not a <section id> on the page`)
    }
    const inPage = doc.sectionIds.filter((id) => anchors.some((c) => c.id === id))
    if (inPage.join(",") !== anchors.filter((c) => doc.sectionIds.includes(c.id)).map((c) => c.id).join(",")) {
      errors.push(`/${locale}/${page}: chapter order [${anchors.map((c) => c.id)}] differs from section order [${inPage}]`)
    }
    for (const id of doc.sectionIds) {
      if (!anchors.some((c) => c.id === id)) warnings.push(`/${locale}/${page}: <section id="${id}"> has no chapter (not reachable from the nav)`)
    }
    for (const c of chapters.filter((c) => c.route)) {
      const target = await load(`/${locale}${c.route}`)
      if (target.status !== 200) errors.push(`/${locale}/${page}: chapter "${c.label}" → ${c.route} returns HTTP ${target.status}`)
    }
  }
  if (perLocale.zh !== perLocale.en) errors.push(`${page}: zh chapters [${perLocale.zh}] ≠ en chapters [${perLocale.en}]`)
}

// 4: every internal #anchor link on the site resolves
const posts = readdirSync("content/posts").filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
const eventSlugs = [...readFileSync("src/data/courses.ts", "utf8").matchAll(/\bslug: ["']([^"']+)["']/g)].map((m) => m[1])
for (const locale of locales) {
  const routes = [
    "", "/sustainability", "/events", "/learning", "/consulting", "/join", "/insights",
    ...posts.slice(0, 3).map((s) => `/learning/${s}`),
    ...eventSlugs.slice(0, 3).map((s) => `/events/${s}`),
  ].map((r) => `/${locale}${r}`)
  for (const route of routes) {
    const doc = await load(route)
    if (doc.status !== 200) {
      errors.push(`${route}: HTTP ${doc.status}`)
      continue
    }
    for (const href of new Set(doc.links)) {
      if (!href.includes("#") || /^(https?:|mailto:|tel:)/.test(href)) continue
      const [path, hash] = href.split("#")
      if (!hash) continue
      const target = await load(path || route)
      if (target.status !== 200) errors.push(`${route}: link ${href} → HTTP ${target.status}`)
      else if (!target.ids.has(hash)) errors.push(`${route}: link ${href} → no element with id="${hash}"`)
    }
  }
}

for (const w of warnings) console.log(`warn  ${w}`)
for (const e of errors) console.log(`FAIL  ${e}`)
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`)
process.exit(errors.length ? 1 : 0)
