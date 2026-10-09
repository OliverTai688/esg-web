// Turns the raw client files in assets-raw/ (downloaded from the client's Drive,
// not in version control) into the web-ready images under public/.
//   node scripts/build-assets.mjs
// Logos: trimmed, fitted inside 400×200, WebP. Photos: cropped 3:2, 1200px wide, JPEG.
// 兔耳.png in the logo folder is a strip of contact details with the logo at its left end: `crop` cuts the logo out.
// The ids here are the ids in src/data/clients.ts and the file names under public/.
// Source → destination is also listed in docs/tasks/sitemap-rev1/assets-status.md.
import { createRequire } from "node:module"
import { existsSync, mkdirSync, realpathSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
// sharp ships with Next.js; resolve it from there instead of adding a dependency.
const sharp = createRequire(realpathSync(join(root, "node_modules/next/package.json")))("sharp")

const RAW = join(root, "assets-raw")
const PACK = "網站圖片-整合包"
const NAMED = `${PACK}/客戶logo/logo`
const BY_TYPE = `${PACK}/客戶logo`
const PARTNERS = `${PACK}/00. 共好網站_Amber已整理(Mina看這邊)/1. 關於共好/3. 合作夥伴`
const SQUARE = `${PACK}/最後做圖/正方形LOGO`

// [id, source, options]. `dark` logos have white lettering and are flattened onto a dark tile;
// `crop` takes one region of the source before trimming.
const LOGOS = [
  // Brands and businesses
  ["sifan-farm", `${SQUARE}/627735-06.jpg`],
  ["jooin-now", `${SQUARE}/627735-01.jpg`],
  ["chihe", `${SQUARE}/627735-04-01.jpg`],
  ["bamzd", `${SQUARE}/627735-02.jpg`],
  ["everlab", `${SQUARE}/627735-03.jpg`],
  ["lohasustain", `${SQUARE}/627735-05.jpg`],
  ["tuer-life", `${NAMED}/兔耳.png`, { crop: { left: 225, top: 40, width: 185, height: 175 } }],
  ["chinyi", `${NAMED}/勤億.png`],
  ["bliss-travel", `${PARTNERS}/大慶旅遊.png`],
  ["greenunion", `${NAMED}/綠合農場.png`],
  ["cts", `${BY_TYPE}/企業/CTS_Logo.png`],
  ["chunghwa-telecom", `${BY_TYPE}/企業/e4d147be-dd52-49a9-abda-8349d7408690.png`],
  ["bean-melody", `${NAMED}/豆韻.png`],
  ["share-water", `${NAMED}/享喝水.png`],
  ["shangyun-design", `${NAMED}/上云設計.png`],
  ["jestone", `${NAMED}/拾石.png`],
  ["xinchun", `${NAMED}/新春.png`],
  ["ariya", `${NAMED}/image.png`],
  ["ciao-ciao-flora", `${NAMED}/花神.png`],
  ["anything-handcrafted", `${NAMED}/本舖.png`],
  ["zhezhe-cup", `${NAMED}/折折杯.png`],
  ["key-of-kid", `${NAMED}/金鑰.png`],
  ["qingxingtang", `${NAMED}/清星堂.png`],
  ["cpml", `${NAMED}/華人.png`],
  ["harts", `${NAMED}/HART.png`],
  ["rest", `${NAMED}/rest.png`],
  ["beebest", `${PARTNERS}/beebest.png`],
  ["dancecology", `${PARTNERS}/dancecology.png`],
  ["winjus-law", `${PARTNERS}/允捷.avif`],
  ["heart-valley", `${PARTNERS}/心之谷.jpg`],
  ["hand", `${PARTNERS}/汗得.avif`],
  ["dixiao", `${PARTNERS}/滴鴞.png`],
  ["hegu-design", `${PARTNERS}/禾谷.png`],
  // Public sector, schools and community colleges
  ["bottle-cap-factory", `${NAMED}/瓶蓋工廠.png`],
  ["cpc", `${NAMED}/中國生產力.png`],
  ["sanying-cc", `${NAMED}/三鶯社大.png`],
  ["nangang-cc", `${NAMED}/南港社大.png`],
  ["keelung-vocational", `${NAMED}/基工.png`],
  ["new-era", `${NAMED}/馬來西亞大學.png`, { dark: true }],
  // Non-profits
  ["beunen", `${NAMED}/白永恩.png`],
  ["mercy", `${BY_TYPE}/非營利/愛慈板子(黑字)_20230531134059.png`],
  ["ican", `${NAMED}/愛肯.png`],
  ["greenman", `${NAMED}/綠超人.png`],
  ["mingyi", `${NAMED}/明怡.png`],
  ["achang", `${NAMED}/阿昌清潔.png`],
  ["wanhua-flaneurs", `${NAMED}/萬華附近走走.png`],
  ["dazhen", `${NAMED}/達真.png`],
  ["imc", `${NAMED}/IMC.png`],
  ["taichung-lecturers", `${BY_TYPE}/非營利/EmbeddedImage.jpg`],
]

// [destination under public/, source, sharp `position` for the 3:2 crop]
const PHOTOS = [
  ["cases/npo/beunen.jpg", `${PACK}/NPO照片/白永恩/503538.jpg`, "centre"],
  ["cases/npo/mercy.jpg", `${PACK}/NPO照片/愛慈基金會/LINE_ALBUM_1108第一次課程_260419_1.jpg`, "centre"],
  ["cases/npo/kangfu.jpg", `${PACK}/NPO照片/康復之友/LINE_ALBUM_2025課程_260419_2.jpg`, "centre"],
  ["cases/npo/tiancheng.jpg", `工作坊照片/LINE_ALBUM_1017天成課程_260612_2.jpg`, "centre"],
]

function out(path) {
  const file = join(root, "public", path)
  mkdirSync(dirname(file), { recursive: true })
  return file
}

function report(path, info) {
  console.log(`${path.padEnd(38)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)} ${(statSync(join(root, "public", path)).size / 1024).toFixed(0).padStart(4)} KB`)
}

let missing = 0
function source(path) {
  const file = join(RAW, path)
  if (existsSync(file)) return file
  console.error(`missing: assets-raw/${path}`)
  missing++
  return null
}

for (const [id, src, opts = {}] of LOGOS) {
  const file = source(src)
  if (!file) continue
  const meta = await sharp(file).metadata()
  // Crop in its own pass: sharp would otherwise trim before it extracts.
  let image = sharp(opts.crop ? await sharp(file).extract(opts.crop).toBuffer() : file)
  if (opts.dark) image = image.flatten({ background: "#1F2022" })
  else if (!meta.hasAlpha) image = image.flatten({ background: "#ffffff" })
  // Trim the empty margin, then keep a little air so marks do not touch the tile edge.
  const trimmed = await image.trim({ threshold: 12 }).toBuffer()
  const path = `clients/${id}.webp`
  const info = await sharp(trimmed)
    .resize(400, 200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out(path))
  report(path, info)
}

for (const [path, src, position] of PHOTOS) {
  const file = source(src)
  if (!file) continue
  const info = await sharp(file).rotate().resize(1200, 800, { fit: "cover", position }).jpeg({ quality: 78, mozjpeg: true }).toFile(out(path))
  report(path, info)
}

if (missing > 0) {
  console.error(`\n${missing} source file(s) missing. assets-raw/ is not in version control: download it from the client's Drive first.`)
  process.exit(1)
}
