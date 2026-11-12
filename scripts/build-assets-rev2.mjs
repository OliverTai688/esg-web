// Rev2 (202610) assets: turns the raw client files in assets-raw/rev2-202610/ (downloaded
// from the client's Drive and the partners' sites, not in version control) into the web
// files under public/. Paths and sizes follow docs/tasks/rev2-202610/asset-paths.md.
//   node scripts/build-assets-rev2.mjs          logos, team, cases, whitepaper images, book, certificates
//   node scripts/build-assets-rev2.mjs pdf      only the web versions of the whitepaper PDFs (see buildPdfs)
// Needs `pdftoppm` (poppler) for the certificate PDFs; the PDF step also needs `gs`, `pdfimages` and Python with pikepdf.
// Results and open questions are listed in docs/tasks/rev2-202610/assets-status.md (處理結果).
import { createRequire } from "node:module"
import { execFileSync } from "node:child_process"
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, realpathSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
// sharp ships with Next.js; resolve it from there instead of adding a dependency.
const sharp = createRequire(realpathSync(join(root, "node_modules/next/package.json")))("sharp")

const RAW = join(root, "assets-raw/rev2-202610")
const CLIENT = "06-Logo/1-服務客戶"
const PARTNER = "06-Logo/2-合作夥伴"
const ECO = "06-Logo/3-共好生態圈夥伴"
const WALL = "08-合作案例照片牆"
const CASES = "07-永續足跡案例照片"
const WP = "09-白皮書案例"

let missing = 0
function source(path) {
  const file = join(RAW, path)
  if (existsSync(file)) return file
  console.error(`missing: assets-raw/rev2-202610/${path}`)
  missing++
  return null
}

function out(path) {
  const file = join(root, "public", path)
  mkdirSync(dirname(file), { recursive: true })
  return file
}

function report(path, info, note = "") {
  const kb = (statSync(join(root, "public", path)).size / 1024).toFixed(0)
  console.log(`${path.padEnd(42)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)} ${kb.padStart(4)} KB ${note}`)
}

// ── Logos ────────────────────────────────────────────────────────────────────
// [output name, source, options]. Output: trimmed, long edge ≤ 800px, transparent or white.
// Options:
//   crop     region of the source (after SVG rasterising) taken before trimming
//   white    flatten onto white before trimming (drops a white rounded tile around the mark)
//   width    pixel width to rasterise an SVG at (default 1600)
// Opaque sources (JPG, PNG without alpha) are flattened onto white and their white margin trimmed;
// the logo tile on the site is white (or dark for `dark: true`), so a white ground is invisible.
// Solid-colour squares that are part of the mark (汗得 orange, 瓶蓋工廠 red, 康復之友 yellow) are kept.
const LOGOS = [
  // 服務客戶
  ["toucheng-farm", `${CLIENT}/01_頭城休閒農場_官網標準字.jpg`],
  ["taku", `${CLIENT}/02_大古鑄鐵_橫式.svg`],
  ["wecan", `${CLIENT}/03_帷可策略_官網.png`],
  ["modulab", `${CLIENT}/04_ModuLab_透明底.png`],
  ["chinyi", `${CLIENT}/05_勤億蛋品.png`],
  ["cts", `${CLIENT}/06_華視_客戶資料夾CTS_Logo.png`],
  ["chunghwa-telecom", `${CLIENT}/07_中華電信.png`],
  ["tcmg", `${CLIENT}/08_天晟醫院_橫式高畫質.png`],
  ["beunen", `${CLIENT}/09_白永恩神父社會福利基金會_向量.svg`, { width: 2400 }],
  ["mercy", `${CLIENT}/10_愛慈社會福利基金會.png`],
  ["taitung-mental-health", `${CLIENT}/11_臺東縣康復之友協會.jpg`],
  ["sifan-farm", `${CLIENT}/12_思凡自然農園_圓角圖示.png`, { white: true }],
  ["tuer-life", `${CLIENT}/13_兔耳生活_向量.svg`],
  ["bliss-travel", `${CLIENT}/14_大慶旅運社_橫式白底.jpg`],
  ["new-era", `${CLIENT}/15_新紀元大學學院.png`],
  ["bottle-cap-factory", `${CLIENT}/16_瓶蓋工廠台北製造所.png`],
  ["true-roll", `${CLIENT}/17_實心蛋捲_官網.png`],
  ["taiwan-farm-association", `${CLIENT}/18_台灣休閒農業發展協會_向量.svg`, { width: 2400 }],
  ["hoowei", `${CLIENT}/19_滬尾休閒農業區.png`],
  ["huatan-jhs", `${CLIENT}/20_花壇國中_校徽.ico`],
  // 合作夥伴
  ["tlaa", `${PARTNER}/01_臺灣休閒農業學會_橫式（Logo牆用）.png`],
  ["tlaa-vertical", `${PARTNER}/01_臺灣休閒農業學會_直式（客戶回饋用）.png`],
  ["gsa", `${PARTNER}/02_GSA_彩色圖示（淺色底用）.png`],
  ["gsa-dark", `${PARTNER}/02_GSA_白字透明底（深色底用）.png`],
  // A colour-standard sheet: only the emblem and the TAIPEI 臺北 wordmark, not the title or swatches.
  ["taipei-gov", `${PARTNER}/03_臺北市政府.jpg`, { crop: { left: 400, top: 520, width: 1750, height: 2030 } }],
  ["sanying-cc", `${PARTNER}/04_新北市三鶯社區大學.png`],
  ["nangang-cc", `${PARTNER}/05_臺北市南港社區大學.png`],
  ["wanhua-cc", `${PARTNER}/06_臺北市萬華社區大學.png`],
  ["chihlee", `${PARTNER}/07_致理科技大學_校徽.png`],
  ["youthbud", `${PARTNER}/08_中華少年成長文教基金會.png`],
  ["silverlining", `${PARTNER}/09_銀色連線_直式.png`],
  ["duofu", `${PARTNER}/10_多扶事業_橫式.png`],
  // 共好生態圈夥伴
  ["everlab", `${ECO}/01_EverLab360.png`],
  ["jooin-now", `${ECO}/02_星芽社會企業.svg`],
  ["cmicro-era", `${ECO}/03_微碳石代.png`],
  ["bamzd", `${ECO}/04_鑫判科技.jpg`],
  ["chihe", `${ECO}/05_齊禾品牌顧問.svg`, { width: 2400 }],
  ["hegu-design", `${ECO}/06_禾谷創意.png`],
  ["lohasustain", `${ECO}/07_樂活永續.png`],
  ["hand", `${ECO}/08_汗得學社.png`],
  ["heart-valley", `${ECO}/09_心之谷永續教育園區.png`],
  ["rafac", `${ECO}/10_RAFAC機能襪.png`],
  ["showy-pattern", `${ECO}/11_處處花版.jpg`],
  ["winjus-law", `${ECO}/12_允捷法律事務所.jpg`],
]
// Files in public/clients/ that are not client ids but are still used.
const LOGO_EXTRAS = ["tlaa-vertical", "gsa-dark"]

async function load(file, opts = {}) {
  if (file.endsWith(".svg")) {
    const meta = await sharp(file).metadata()
    const density = Math.min(2400, (72 * (opts.width ?? 1600)) / meta.width)
    return sharp(await sharp(file, { density }).png().toBuffer())
  }
  return sharp(file)
}

const logoRatios = {}
async function buildLogos() {
  for (const [id, src, opts = {}] of LOGOS) {
    const file = source(src)
    if (!file) continue
    let image = await load(file, opts)
    if (opts.crop) image = sharp(await image.extract(opts.crop).toBuffer())
    const meta = await image.metadata()
    // In its own pass: sharp trims before it flattens within one pipeline.
    if (opts.white || !meta.hasAlpha) image = sharp(await image.flatten({ background: "#ffffff" }).toBuffer())
    // Trim the empty margin (transparent or white). Opaque JPGs carry compression noise, so a looser threshold.
    const trimmed = await image.trim({ threshold: meta.hasAlpha && !opts.white ? 10 : 24 }).toBuffer()
    const path = `clients/${id}.webp`
    const info = await sharp(trimmed)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(out(path))
    const ratio = info.width / info.height
    logoRatios[id] = ratio
    const t = await sharp(trimmed).metadata()
    report(path, info, `ratio ${ratio.toFixed(2)}${ratio >= 2.6 ? " wide" : ""}${Math.max(t.width, t.height) < 400 ? "  (low-res source)" : ""}`)
  }
  // Remove logos of organisations that are no longer on the site.
  const keep = new Set(LOGOS.map(([id]) => `${id}.webp`))
  for (const name of readdirSync(join(root, "public/clients"))) {
    if (!keep.has(name)) {
      unlinkSync(join(root, "public/clients", name))
      console.log(`removed clients/${name}`)
    }
  }
}

// ── Consultant photos ────────────────────────────────────────────────────────
// 4:5, 640×800. The crop is set from the face box (found with macOS Vision, in source pixels):
// crop height = 3.5 × face size, face centred horizontally, face centre at 34% of the height.
// [id, source, face box {x, y, size}, options]
const TEAM = [
  ["evvon-wu", "01_吳玟樺_Evvon-Wu.jpg", { x: 1608, y: 1064, size: 943 }],
  ["caren-yeh", "02_葉毓亭_Caren-Yeh.jpg", { x: 366, y: 532, size: 258 }],
  ["selena-hung", "03_洪素英_Selena-Hung.jpg", { x: 287, y: 240, size: 208 }],
  // Cut-out PNG, only 496×503: use its full height, on the site's cream #FBF8F4.
  ["jay-wei", "04_魏名聰_Jay-Wei.png", { x: 176, y: 135, size: 222 }, { cutout: true }],
  ["eric-liu", "05_劉建成_Eric-Liu.jpg", { x: 1199, y: 819, size: 565 }],
  ["chung-hsuan-tu", "06_屠崇軒_Chung-Hsuan-Tu.jpg", { x: 1517, y: 966, size: 931 }],
  ["daniel-hsiao", "07_蕭冠宇_Daniel-Hsiao.jpg", { x: 659, y: 536, size: 325 }],
  ["joyce-lee", "08_李詠婕_Joyce-Lee.jpg", { x: 1407, y: 953, size: 681 }],
  ["sylvia-shih", "09_石珮萱_Sylvia-Shih（高解析）.jpg", { x: 656, y: 469, size: 456 }],
  ["mina-chen", "10_陳宜均_Mina-Chen.jpg", { x: 1605, y: 1501, size: 1146 }],
]

async function buildTeam() {
  for (const [id, src, face, opts = {}] of TEAM) {
    const file = source(`05-顧問團隊/${src}`)
    if (!file) continue
    const meta = await sharp(file).metadata()
    const cx = face.x + face.size / 2
    const cy = face.y + face.size / 2
    let h = Math.round(face.size * 3.5)
    if (opts.cutout) h = meta.height
    // Shrink the frame if it would run off the photo.
    h = Math.min(h, meta.height, Math.floor(meta.width / 0.8))
    const w = Math.round(h * 0.8)
    const left = Math.round(Math.min(Math.max(cx - w / 2, 0), meta.width - w))
    const top = Math.round(Math.min(Math.max(cy - h * 0.34, 0), meta.height - h))
    let image = sharp(file).rotate().extract({ left, top, width: w, height: h })
    if (opts.cutout) image = sharp(await image.flatten({ background: "#FBF8F4" }).toBuffer())
    const path = `team/${id}.webp`
    const info = await image.resize(640, 800).webp({ quality: 82 }).toFile(out(path))
    report(path, info, `crop ${w}×${h}${w < 640 ? "  (upscaled)" : ""}`)
  }
}

// ── Case photos: footprint cases (#38) and the photo wall (#46) ─────────────
// [destination, source, how]. how: "centre" etc. = sharp cover position; { crop } = region first;
// { contain } = fit inside and pad with the given colour (for a certificate whose border must stay whole).
const PHOTOS = [
  // 星芽 promo image: keep the title and the gift box; cut off the price bar (新春價 $899, contact),
  // which starts at y = 929, and the 一份禮盒｜陪伴花蓮 tag above the title (ends at y = 126).
  ["cases/footprints/jooin-sifan.webp", `${CASES}/案例一_星芽×思凡/01_十穀拾穀禮盒（主圖・需裁掉底部售價欄）.png`, { crop: { left: 8, top: 129, width: 1064, height: 798 } }],
  ["cases/footprints/rafac-showy.webp", `${CASES}/案例二_RAFAC×處處花版/01_禮盒（主圖）.png`, "centre"],
  ["cases/footprints/youthbud-bliss.webp", `${CASES}/案例三_中華少年×大慶/01_澎湖大會合照（主圖）.jpg`, "centre"],
  ["cases/footprints/gsa-forum.webp", `${CASES}/案例四_2025台北國際論壇/02_論壇背板合照（主圖）.jpg`, "centre"],

  ["cases/wall/01.webp", `${WALL}/1-企業/01_實心蛋捲/實心蛋捲_04（主圖）.jpg`, "centre"],
  ["cases/wall/02.webp", `${WALL}/1-企業/02_銀色連線/銀色連線_03（主圖）.jpg`, "centre"],
  // A tall (883×1989) screenshot of the course worksheet: the title and the first questions.
  ["cases/wall/03.webp", `${WALL}/1-企業/03_創謀/創謀_教師節課程_學員工作台_課堂實作（主圖）.png`, { crop: { left: 0, top: 100, width: 883, height: 662 } }],
  ["cases/wall/04.webp", `${WALL}/1-企業/04_華視/華視_01（主圖）.jpg`, "centre"],
  ["cases/wall/05.webp", `${WALL}/2-醫療與社福/05_臺東縣康復之友協會/臺東縣康復之友協會_01（主圖）.jpg`, "centre"],
  ["cases/wall/06.webp", `${WALL}/2-醫療與社福/06_天晟醫院/天晟醫院_01（主圖）.png`, "centre"],
  ["cases/wall/07.webp", `${WALL}/2-醫療與社福/07_愛慈/愛慈基金會_01（主圖）.jpg`, "centre"],
  ["cases/wall/08.webp", `${WALL}/2-醫療與社福/08_白永恩/白永恩基金會_01（主圖）.jpg`, "centre"],
  // 滬尾: never _01 (a councillor's campaign bottle on the table).
  ["cases/wall/09.webp", `${WALL}/3-農業與地方/09_滬尾休閒農業區/滬尾休閒農業區_05（主圖）.jpg`, "centre"],
  ["cases/wall/10.webp", `${WALL}/3-農業與地方/10_永續農創師/永續農創師_08（主圖）.jpg`, "centre"],
  ["cases/wall/11.webp", `${WALL}/3-農業與地方/11_台北友善店家/台北友善店家_01（主圖）.jpg`, "centre"],
  ["cases/wall/12.webp", `${WALL}/4-校園/12_致理科技大學/致理科技大學_02（主圖）.jpg`, "centre"],
  // 花壇國中: the teachers' group photo only (no identifiable students).
  ["cases/wall/13.webp", `${WALL}/4-校園/13_花壇國中/花壇國中_01（主圖・教師合照）.jpg`, "centre"],
  ["cases/wall/14.webp", `${WALL}/5-國際與社群/14_曼谷UN-SDGs/曼谷UN-SDGs_01（主圖・DemoDay大合照）.jpg`, "centre"],
  // A certificate: keep its whole border, pad top and bottom with white.
  ["cases/wall/15.webp", `${WALL}/5-國際與社群/15_澎湖GSA/澎湖GSA_01_專題演講證書（主圖）.jpg`, { contain: "#ffffff" }],
  ["cases/wall/16.webp", `${WALL}/5-國際與社群/16_ESG共學坊講師感恩茶會/ESG共學坊講師感恩茶會_01（主圖・舉牌合照）.jpg`, "centre"],
]

async function buildPhotos() {
  for (const [path, src, how] of PHOTOS) {
    const file = source(src)
    if (!file) continue
    let image = sharp(file).rotate()
    const meta = await image.metadata()
    if (meta.hasAlpha) image = image.flatten({ background: "#ffffff" })
    if (how.crop) image = sharp(await image.extract(how.crop).toBuffer())
    if (how.contain) image = image.resize(1200, 900, { fit: "contain", background: how.contain })
    else image = image.resize(1200, 900, { fit: "cover", position: typeof how === "string" ? how : "centre" })
    const info = await image.webp({ quality: 80 }).toFile(out(path))
    report(path, info, `from ${meta.width}×${meta.height}`)
  }
}

// ── Whitepaper images (#53), book cover (#24), certificates (#27) ───────────
// [destination, source, long edge, { crop, turn }]. turn: degrees clockwise, for a scan stored on its side.
const IMAGES = [
  ["whitepapers/covers/taku.webp", `${WP}/封面與配圖/01_大古鑄鐵_封面.jpg`, 1000],
  ["whitepapers/covers/wecan.webp", `${WP}/封面與配圖/02_帷可策略_封面（1024px縮圖）.png`, 1000],
  ["whitepapers/covers/modulab.webp", `${WP}/封面與配圖/03_ModuLab_封面.jpg`, 1000],
  ["whitepapers/covers/chinyi.webp", `${WP}/封面與配圖/04_勤億蛋品_封面（1024px縮圖）.png`, 1000],
  ["whitepapers/figures/taku-repair-data.webp", `${WP}/封面與配圖/01_大古鑄鐵_內文配圖_修而不丟數據頁.jpg`, 1600],
  ["whitepapers/figures/modulab-kids.webp", `${WP}/封面與配圖/03_ModuLab_內文配圖_孩子使用照.png`, 1600],
  // The full jacket spread (back flap, back, spine, front, front flap): only the front, right of the spine.
  ["books/sustainability-new-language.webp", "03-書封/永續新語言_書封（第24項）.jpg", 1000, { crop: { left: 1692, top: 0, width: 863, height: 1276 } }],
  ["certificates/sdg-impact.webp", "04-創辦人證照/01_SDG-Impact培訓證書.jpg", 1600],
  // The scan is stored on its side (a landscape certificate in a portrait file): turn it upright.
  ["certificates/taise-2025.webp", "04-創辦人證照/02_TAISE企業永續管理師證書（2025）.jpg", 1600, { turn: 270 }],
  // 03b (BSI course and exam details) is not a certificate and is not used.
  ["certificates/bsi-ghg.webp", "04-創辦人證照/03a_BSI溫室氣體專業人員證書.pdf", 1600],
  ["certificates/pmp.webp", "04-創辦人證照/04_PMP證書.pdf", 1600],
  // Only the masked copy: the original shows the ID number and birth date.
  ["certificates/social-worker.webp", "04-創辦人證照/05_社會工作師證書（遮蔽版）.jpg", 1600],
  ["certificates/coaching-74h.webp", "04-創辦人證照/06_達真國際教練學校74小時結業證書.pdf", 1600],
]

const scratch = mkdtempSync(join(tmpdir(), "rev2-assets-"))

// First page of a PDF as a PNG, at 220 dpi (an A4 page is then about 2570px on its long edge).
function renderPdfPage(file) {
  const prefix = join(scratch, basename(file, ".pdf").replace(/[^\w-]/g, "_") || "page")
  execFileSync("pdftoppm", ["-png", "-r", "220", "-f", "1", "-l", "1", "-singlefile", file, prefix])
  return `${prefix}.png`
}

async function buildImages() {
  for (const [path, src, edge, { crop, turn } = {}] of IMAGES) {
    let file = source(src)
    if (!file) continue
    if (file.endsWith(".pdf")) file = renderPdfPage(file)
    let image = sharp(file).rotate()
    const meta = await image.metadata()
    if (meta.hasAlpha) image = image.flatten({ background: "#ffffff" })
    if (crop) image = sharp(await image.extract(crop).toBuffer())
    if (turn) image = sharp(await image.rotate(turn).toBuffer())
    const info = await image
      .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(out(path))
    report(path, info, `from ${meta.width}×${meta.height}`)
  }
}

// ── Whitepaper PDFs (#53②): web versions, target ≤ 10 MB ─────────────────────
// Only the images are resampled; text, vectors, layout and page count stay as they are.
// Originals are never touched; the output waits for the client's approval before it goes on
// the site, so it stays in assets-raw/. Two methods:
//   gs      Ghostscript pdfwrite, images downsampled to the given ppi (大古: 340 photos, live text).
//   images  the Python helper below (pikepdf + Pillow): replaces each image stream that is above
//           the given ppi (or JPEG 2000) with a downsampled JPEG and leaves every other object as
//           it is. Used where the text is converted to outlines: Ghostscript rewrites those
//           content streams larger than they were. CMYK images are converted to sRGB via their ICC profile.
//   null    copied unchanged (勤億, 3.8 MB).
// The helper needs pikepdf and Pillow:  python3 -m venv /tmp/pdfenv && /tmp/pdfenv/bin/pip install pikepdf Pillow
// then  PDF_PYTHON=/tmp/pdfenv/bin/python node scripts/build-assets-rev2.mjs pdf
const PDF_IN = `${WP}/PDF原檔（勿覆蓋）`
const PDF_OUT = join(RAW, WP, "網頁版（待客戶確認）")
const PDFS = [
  ["01_大古鑄鐵_白皮書.pdf", "gs", 140],
  // 帷可 and ModuLab: 11.7 MB and 9.1 MB of their size is page content (text as outlines), not images,
  // so they cannot reach 10 MB by resampling images alone.
  ["02_帷可策略_白皮書.pdf", "images", 130],
  ["03_ModuLab_白皮書.pdf", "images", 100],
  ["04_勤億蛋品_白皮書.pdf", null],
]

const SHRINK_PY = `"""Shrink a PDF by downsampling its images only. Content streams (text, vectors, layout),
fonts and page count are kept as they are; Flate streams are recompressed losslessly.
usage: shrink_pdf.py in.pdf out.pdf target_ppi [jpeg_quality]"""
import io, subprocess, sys, zlib
import pikepdf
from pikepdf import Name, PdfImage
from PIL import Image, ImageCms

src, dst, target = sys.argv[1], sys.argv[2], float(sys.argv[3])
quality = int(sys.argv[4]) if len(sys.argv) > 4 else 80

# Highest placement resolution of each image object, from poppler's pdfimages.
ppi = {}
out = subprocess.run(["pdfimages", "-list", src], capture_output=True, text=True).stdout
for line in out.splitlines()[2:]:
    f = line.split()
    if len(f) >= 14 and f[2] in ("image",):
        obj, xppi = int(f[10]), float(f[12])
        ppi[obj] = max(ppi.get(obj, 0), xppi)

srgb = ImageCms.createProfile("sRGB")
pikepdf.settings.set_flate_compression_level(9)
pdf = pikepdf.open(src)
done, skipped, saved = 0, 0, 0
seen = set()
for page in pdf.pages:
    for im in page.get_images().values() if hasattr(page, "get_images") else page.images.values():
        if im.objgen in seen:
            continue
        seen.add(im.objgen)
        p = ppi.get(im.objgen[0])
        filt = im.get("/Filter")
        jpx = filt == Name.JPXDecode
        if not p or (p <= target * 1.1 and not jpx):
            continue
        try:
            pim = PdfImage(im)
            cs = im.get("/ColorSpace")
            base = str(cs[0]) if isinstance(cs, pikepdf.Array) else str(cs)
            n = cs[1].get("/N") if base == "/ICCBased" else {"/DeviceRGB": 3, "/DeviceGray": 1, "/DeviceCMYK": 4}.get(base)
            if n not in (1, 3, 4) or im.get("/BitsPerComponent", 8) != 8 or "/Decode" in im or "/ImageMask" in im:
                skipped += 1
                continue
            # Decode the image data itself (not via PdfImage, which would apply the SMask and
            # turn CMYK into RGBA): JPEG / JPEG 2000 bytes straight to Pillow.
            filters = list(filt) if isinstance(filt, pikepdf.Array) else [filt]
            if filters and filters[-1] in (Name.DCTDecode, Name.JPXDecode) and all(f == Name.FlateDecode for f in filters[:-1]):
                pil = Image.open(io.BytesIO((im.read_raw_bytes() if len(filters) == 1 else zlib.decompress(im.read_raw_bytes()))))
                pil.load()
            else:
                pil = pim.as_pil_image()
            if n == 4:
                bands = pil.split()
                if len(bands) != 4:
                    skipped += 1
                    continue
                pil = Image.merge("CMYK", bands)
                if base == "/ICCBased":
                    prof = ImageCms.ImageCmsProfile(io.BytesIO(bytes(cs[1].read_bytes())))
                    pil = ImageCms.profileToProfile(pil, prof, srgb, outputMode="RGB", renderingIntent=1)
                else:
                    pil = pil.convert("RGB")
            elif n == 3:
                pil = pil.convert("RGB")
            else:
                pil = pil.convert("L")
            scale = min(1.0, target / p)
            w, h = max(1, round(im.Width * scale)), max(1, round(im.Height * scale))
            if (w, h) != pil.size:
                pil = pil.resize((w, h), Image.LANCZOS)
            buf = io.BytesIO()
            pil.save(buf, "JPEG", quality=quality, optimize=True)
            data = buf.getvalue()
            before = len(im.read_raw_bytes())
            if len(data) >= before and not jpx:
                continue
            im.write(data, filter=Name.DCTDecode)
            im.Width, im.Height, im.BitsPerComponent = w, h, 8
            im.ColorSpace = Name.DeviceRGB if pil.mode == "RGB" else Name.DeviceGray
            for k in ("/DecodeParms", "/SMaskInData"):
                if k in im:
                    del im[k]
            saved += before - len(data)
            done += 1
        except Exception as e:  # leave anything unusual untouched
            print("skip", im.objgen, e, file=sys.stderr)
            skipped += 1

pdf.remove_unreferenced_resources()
pdf.save(dst, compress_streams=True, recompress_flate=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
print(f"images resampled {done}, left as is {skipped}, image bytes saved {saved/1048576:.1f} MB")
`

function pages(file) {
  const info = execFileSync("pdfinfo", [file], { encoding: "utf8" })
  return Number(/Pages:\s+(\d+)/.exec(info)?.[1])
}

function buildPdfs() {
  mkdirSync(PDF_OUT, { recursive: true })
  const helper = join(scratch, "shrink_pdf.py")
  writeFileSync(helper, SHRINK_PY)
  for (const [name, method, ppi] of PDFS) {
    const file = source(`${PDF_IN}/${name}`)
    if (!file) continue
    const dest = join(PDF_OUT, name.replace(/\.pdf$/, "_網頁版.pdf"))
    if (realpathSync(dirname(file)) === realpathSync(dirname(dest))) throw new Error("refusing to write next to the originals")
    if (method === "gs") {
      execFileSync("gs", [
        "-q", "-dSAFER", "-dBATCH", "-dNOPAUSE",
        "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.6",
        "-dAutoRotatePages=/None",
        "-dDownsampleColorImages=true", "-dColorImageDownsampleType=/Bicubic", `-dColorImageResolution=${ppi}`, "-dColorImageDownsampleThreshold=1.2",
        "-dDownsampleGrayImages=true", "-dGrayImageDownsampleType=/Bicubic", `-dGrayImageResolution=${ppi}`, "-dGrayImageDownsampleThreshold=1.2",
        "-dAutoFilterColorImages=false", "-dColorImageFilter=/DCTEncode",
        "-dAutoFilterGrayImages=false", "-dGrayImageFilter=/DCTEncode",
        `-sOutputFile=${dest}`, file,
      ], { stdio: ["ignore", "inherit", "ignore"] })
    } else if (method === "images") {
      execFileSync(process.env.PDF_PYTHON ?? "python3", ["-I", helper, file, dest, String(ppi), "80"], { stdio: ["ignore", "inherit", "ignore"] })
    } else {
      copyFileSync(file, dest)
    }
    const mb = (f) => (statSync(f).size / 1e6).toFixed(1)
    console.log(`${basename(dest).padEnd(32)} ${mb(file).padStart(6)} MB → ${mb(dest).padStart(5)} MB   pages ${pages(file)} → ${pages(dest)}`)
  }
}

if (process.argv.includes("pdf")) {
  buildPdfs()
} else {
  await buildLogos()
  await buildTeam()
  await buildPhotos()
  await buildImages()
  console.log("\nLogo aspect ratios ≥ 2.6 (wide):", Object.entries(logoRatios).filter(([, r]) => r >= 2.6).map(([id]) => id).join(", "))
}
rmSync(scratch, { recursive: true, force: true })

if (missing > 0) {
  console.error(`\n${missing} source file(s) missing. assets-raw/ is not in version control: download it from the client's Drive first.`)
  process.exit(1)
}
