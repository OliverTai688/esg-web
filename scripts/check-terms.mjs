// Brand terminology guard. Fails when site copy uses wording the client has ruled out:
//   - 永續白皮書 must not be written as 影響力白皮書
//   - ESG共學坊 is a registered trademark: never bare 共學坊, no space after ESG
//   - 共好玟化 does 溝通, not 媒合 / matchmaking
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOTS = ["src", "content"]
const EXTENSIONS = [".ts", ".tsx", ".md", ".mdx"]

const RULES = [
  { pattern: /影響力白皮書/g, hint: "use 永續白皮書" },
  { pattern: /impact\s+white\s?paper/gi, hint: "use Sustainability Whitepaper" },
  { pattern: /(?<!ESG)共學坊/g, hint: "use ESG共學坊 (with ESG, no space)" },
  { pattern: /媒合/g, hint: "use 溝通 / 對接 / 連結" },
  { pattern: /matchmak/gi, hint: "use communication / connection" },
]

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else if (EXTENSIONS.some((ext) => name.endsWith(ext))) yield path
  }
}

const violations = []
for (const root of ROOTS) {
  for (const file of walk(root)) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, index) => {
        for (const { pattern, hint } of RULES) {
          for (const match of line.matchAll(pattern)) {
            violations.push(`${relative(".", file)}:${index + 1}  "${match[0]}" — ${hint}`)
          }
        }
      })
  }
}

if (violations.length > 0) {
  console.error(`Found ${violations.length} terminology violation(s):\n`)
  console.error(violations.join("\n"))
  process.exit(1)
}
console.log("Terminology check passed.")
