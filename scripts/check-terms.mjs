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
  // rev2 #8 #9: official names
  { pattern: /台灣休閒農業學會|台灣休閒農場學會|臺灣休閒農場學會/g, hint: "use 臺灣休閒農業學會" },
  { pattern: /(?<!臺北市)萬華社區大學/g, hint: "use 臺北市萬華社區大學" },
  { pattern: /台北市政府/g, hint: "use 臺北市政府" },
  { pattern: /思凡自然農場/g, hint: "use 思凡自然農園" },
  { pattern: /永續定位白皮書/g, hint: "use 永續白皮書" },
  { pattern: /品牌設計公司/g, hint: "use 科技公司 (rev2 #9)" },
  { pattern: /brand design firm/gi, hint: "use a technology company (rev2 EN #9)" },
  { pattern: /Gung Ho Culture/g, hint: "use Gung-Ho Culture (with a hyphen)" },
  { pattern: /pt@coesg\.tw/g, hint: "use gho001@coesg.tw (rev2 #6)" },
  { pattern: /永續影響力的專業橋樑|陪跑｜連結｜創造影響力/g, hint: "use the rev2 slogans (#1)" },
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
