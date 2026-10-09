// Text-density baseline for every page section, read from the served HTML.
//   node scripts/measure-density.mjs [baseUrl] [--json]
// "visible" counts the characters a visitor sees before interacting: text inside
// closed <details> (except <summary>), [hidden], inactive tab panels and
// screen-reader-only nodes is counted as "folded" instead. aria-hidden text is
// still on screen, so it counts as visible.
import { readdirSync } from "node:fs"

const base = process.argv[2]?.startsWith("http") ? process.argv[2] : "http://localhost:3000"
const asJson = process.argv.includes("--json")
const locale = process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1] ?? "zh"

const posts = readdirSync("content/posts").filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""))
const routes = [
  "", "/sustainability", "/events", "/learning", "/consulting", "/join", "/insights",
  `/insights/${posts[0]}`, `/learning/${posts[0]}`,
  ...(process.argv.find((a) => a.startsWith("--extra="))?.split("=")[1].split(",") ?? []),
]

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"])
const SKIP = new Set(["script", "style", "template", "noscript", "svg"])

// Minimal streaming tag walker: enough to attribute text to its nearest <section>.
function measure(html) {
  const main = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"))
  const stack = []
  const sections = []
  let current = null
  const re = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+)/g
  let m
  let sectionIndex = 0
  while ((m = re.exec(main))) {
    if (m[3] !== undefined) {
      const text = m[3].replace(/&[a-z#0-9]+;/gi, "x").replace(/\s+/g, "")
      if (!text || !current) continue
      if (stack.some((s) => s.skip)) continue
      if (stack.some((s) => s.folded)) current.folded += text.length
      else current.visible += text.length
      continue
    }
    if (!m[1]) continue
    const tag = m[1].toLowerCase()
    const closing = m[0][1] === "/"
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          const popped = stack.splice(i)
          if (popped[0].section) current = popped[0].prevSection
          break
        }
      }
      continue
    }
    const attrs = m[2] ?? ""
    const parent = stack[stack.length - 1]
    const inClosedDetails = parent?.tag === "details" && !parent.open && tag !== "summary"
    const node = {
      tag,
      skip: SKIP.has(tag),
      open: tag === "details" && /\sopen(=|\s|$)/.test(attrs),
      folded:
        inClosedDetails ||
        /\shidden(=|\s|$)/.test(attrs) ||
        /data-state="(inactive|closed)"/.test(attrs) ||
        /class="[^"]*\bsr-only\b/.test(attrs),
    }
    if (tag === "section" || (tag === "article" && !current)) {
      const id = attrs.match(/\sid="([^"]+)"/)?.[1]
      node.section = true
      node.prevSection = current
      current = { id: id ?? `(section ${++sectionIndex})`, visible: 0, folded: 0, headings: 0, links: 0 }
      sections.push(current)
    }
    if (current && /^h[1-4]$/.test(tag)) current.headings++
    if (current && tag === "a") current.links++
    if (!VOID.has(tag) && !m[0].endsWith("/>")) stack.push(node)
  }
  return sections
}

const report = []
for (const route of routes) {
  const url = `${base}/${locale}${route}`
  const res = await fetch(url)
  if (!res.ok) {
    report.push({ route: route || "/", error: res.status })
    continue
  }
  const sections = measure(await res.text())
  report.push({
    route: route || "/",
    visible: sections.reduce((n, s) => n + s.visible, 0),
    folded: sections.reduce((n, s) => n + s.folded, 0),
    sections,
  })
}

if (asJson) {
  console.log(JSON.stringify(report, null, 2))
} else {
  for (const page of report) {
    if (page.error) {
      console.log(`\n${page.route}  HTTP ${page.error}`)
      continue
    }
    console.log(`\n${page.route}  visible ${page.visible}  folded ${page.folded}  sections ${page.sections.length}`)
    for (const s of page.sections) {
      console.log(`  ${s.id.padEnd(22)} visible ${String(s.visible).padStart(5)}  folded ${String(s.folded).padStart(5)}  headings ${String(s.headings).padStart(2)}  links ${String(s.links).padStart(2)}`)
    }
  }
}
