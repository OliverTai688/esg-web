import { getAllPosts } from "@/lib/posts"
import { site } from "@/lib/site"

// /llms.txt (launch checklist 8): an index of the site for AI readers, listing the
// main pages and every article with its Markdown version.
const PAGES: [string, string, string][] = [
  ["", "首頁", "共好玟化 CO-ESG：永續價值的專業橋樑"],
  ["/sustainability", "共好永續力", "我們是誰、方法（IOOI、雙效益槓桿模型）、服務項目、實際成果、共好生態圈與顧問團隊"],
  ["/events", "永續足跡", "課程梯次、永續學習地圖、我們走過的路、合作案例"],
  ["/events/impact-whitepaper", "永續白皮書", "顧問服務內容、白皮書案例與下載"],
  ["/learning", "共好學習", "永續知識文章、線上工具、ESG共學坊"],
  ["/consulting", "合作洽詢", "方案總表與價格、合作案例、常見問題、聯絡表單"],
  ["/join", "加入我們", "官方 LINE 與 Email 訂閱"],
]

export async function GET() {
  const posts = await getAllPosts()
  const lines = [
    "# 共好玟化 CO-ESG（Gung-Ho Culture）",
    "",
    "> 共好玟化組織發展顧問有限公司：永續價值的專業橋樑。以永續白皮書、課程與企業與組織工作坊，協助有理念的品牌與組織把永續行動說清楚、被看見。",
    "",
    "## 主要頁面",
    "",
    ...PAGES.map(([path, name, desc]) => `- [${name}](${site.url}/zh${path})：${desc}（English: ${site.url}/en${path}）`),
    "",
    "## 文章",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/zh/learning/${p.slug})（Markdown: ${site.url}/api/md/posts/${p.slug}）：${p.excerpt ?? ""}`),
    "",
  ]
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
