import { site } from "@/lib/site"

// robots.txt (launch checklist 1 and 7). Same rules as the current coesg.tw:
// the AI crawlers are named and allowed, and Content-Signal allows AI input.
// Indexing itself is controlled by the noindex meta tag until SITE_INDEXABLE=true
// on the real domain; the sitemap is advertised only then.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"]

export function GET() {
  const lines = [
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
    "User-agent: *",
    "Content-Signal: ai-input=yes",
    "Allow: /",
    "Disallow: /admin",
    ...(site.indexable ? ["", `Sitemap: ${site.url}/sitemap.xml`] : []),
    "",
  ]
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
