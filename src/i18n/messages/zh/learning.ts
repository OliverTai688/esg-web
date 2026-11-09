import type { ChapterDef } from "@/lib/chapters"

// /learning (topic hub), /insights (chronological newsroom), the article page
// and the topic listing pages.
// Page sections of /learning in page order: the single source for the navbar
// dropdown and the in-page ChapterNav. Every id must be a section id on the page
// (scripts/check-anchors.mjs); each label is that section's kicker.
const chapters: readonly ChapterDef[] = [
  { id: "topics", label: "六大主題", desc: "選一片花瓣，看那個主題的文章", icon: "Compass" },
  { id: "featured", label: "精選文章", desc: "不知道從哪開始，先讀這一篇", icon: "Sparkles" },
  { id: "articles", label: "全部文章", desc: "依主題篩選所有文章", icon: "BookOpen" },
  { id: "insights", label: "最新文章", desc: "依時間排序的所有文章", icon: "Newspaper", route: "/insights" },
]

const learning = {
  chapters,
  meta: {
    title: "共好學習",
    description: "從企業合作模式到創新策略，從人物專訪到ESG共學坊公告，持續學習永續的各種面向。",
  },
  label: "共好學習",
  title: "永續知識與實踐案例",
  description: "從企業合作模式到創新策略，從人物專訪到ESG共學坊公告，持續學習永續的各種面向。",
  back: "返回共好學習",
  articlesCount: "篇文章",
  // Short reading time for list rows; the article header uses article.readingTime
  minutes: "分鐘",
  announcementsTitle: "ESG共學坊公告",
  hero: {
    cta: "選一個主題",
    byline: "撰文：共好玟化・ESG共學坊",
    topicsCount: "個主題",
  },
  topics: {
    label: "六大主題",
    title: "選一片花瓣，從一個主題讀起",
    viewTopic: "看這個主題的所有文章",
    back: "返回六大主題",
    others: "其他主題",
  },
  featured: {
    label: "精選文章",
    cta: "開始閱讀",
  },
  articles: {
    label: "全部文章",
    title: "依主題篩選，或一路往下讀",
    all: "全部",
    filterLabel: "依主題篩選",
    // {n} is the number of articles in the current filter
    showAll: "顯示全部 {n} 篇",
    toInsights: "依時間看最新文章",
    // EN6: the English site's heading for the list; unused on the Chinese site
    titleInChinese: "",
  },
  // EN6: the English site lists every article by its English title only, marked
  // [in Chinese] and linking to the Chinese article. Empty on the Chinese site.
  inChinese: "",
  postTitles: {} as Record<string, string>,
  // `short` is the name on the topic's petal; keep it to one or two short lines
  sections: {
    innovation: { title: "創新策略", short: "創新策略", description: "探索永續轉型的創新方法，從商業模式到產品設計，重新定義品牌的永續競爭力。" },
    market: { title: "市場競爭力", short: "市場競爭力", description: "提升品牌在永續市場中的能見度，掌握消費者趨勢與企業採購標準。" },
    responsibility: { title: "永續責任", short: "永續責任", description: "深入了解企業社會責任的實踐方式，從 ESG 報告到利害關係人溝通。" },
    collaboration: { title: "合作模式", short: "合作模式", description: "了解多元的產業合作形式，從供應鏈整合到跨界聯名，找到最適合的合作路徑。" },
    communication: { title: "溝通與換位思考", short: "溝通與換位思考", description: "培養跨界對話的溝通能力，學習如何用不同產業的語言傳達永續價值。" },
    interviews: { title: "人物專訪", short: "人物專訪", description: "永續實踐者的第一手故事，聆聽不同領域的先驅者如何將理念化為行動。" },
  },
  // rev2 #41 #42 #43: the ESG共學坊 block at the bottom of /learning (src/components/site/CoesgBand.tsx).
  // Three ways in: the store, the subscription and the online tools. No LINE here (#41③).
  academy: {
    kicker: "ESG共學坊",
    title: "逛逛永續商城",
    // #42: how to choose between the three entries (client copy)
    intro: "想單買某一堂課，到永續商城；想每週持續學，訂閱 ESG共學坊（每週線上課與回放）；想先自己動手試試，用線上工具。",
    store: {
      title: "永續商城",
      // 待客戶確認 (D5, rev2 #41①): our proposed wording, about courses only. Alternatives are in the rev2 report.
      body: "ESG共學坊的永續課程都在永續商城，挑你需要的那一堂，單堂購買。",
      cta: "前往永續商城",
      logo: "ESG共學坊 CLASS",
    },
    // #42: from the old subscription page, without the price; subscribing happens in the store
    subscription: {
      title: "ESG共學坊訂閱",
      body: "每週線上授課、影片回放、講師投影片、交流社群、課程優惠折扣，持續精進永續知識。",
      cta: "前往永續商城",
    },
    // #43: links to site.toolsUrl
    tools: {
      title: "線上工具",
      body: "用我們的自助線上工具，先自己動手試試。",
      cta: "打開線上工具",
    },
  },
  cta: {
    title: "讀完了，下一步呢？",
    // rev2 #42: goes to the consulting page's solutions table, 「自己學、自己寫」
    body: "想把文章裡的觀念用在自己的組織？從方案總表找到適合的課程，或加入官方 LINE 收到新文章與課程通知。",
    primary: "看課程與方案",
    secondary: "加入官方 LINE",
  },
  article: {
    by: "作者",
    published: "發布日期",
    readingTime: "分鐘閱讀",
    tags: "標籤",
    toc: "本文段落",
    next: "同主題下一篇",
    nextOther: "接著讀",
    endTitle: "讀完了，下一步呢？",
    endBody: "還在探索，加 LINE 收新文章；已經有具體問題，約 15 分鐘 Coffee Chat。",
    endPrimary: "預約 15 分鐘 Coffee Chat",
    endSecondary: "加入官方 LINE",
  },
  insights: {
    meta: {
      title: "最新文章",
      description: "共好玟化的最新文章與動態，依發布時間排序。",
    },
    label: "最新文章",
    title: "永續觀點與產業洞察",
    description: "從趨勢分析到合作案例，持續分享永續實踐的第一手觀察與思考。",
    cta: "讀最新一篇",
    byTopic: "依主題閱讀",
    latestUpdate: "最近更新",
    types: { announcement: "公告", interview: "專訪", article: "觀點" },
    latest: { label: "最新" },
    archive: {
      label: "依月份",
      // {n} is the total number of articles
      title: "全部 {n} 篇，按月份收好",
      count: "篇",
      rss: "RSS 訂閱",
    },
    topics: {
      label: "依主題延伸",
      title: "同一批文章，換成依主題讀",
    },
    mediaTitle: "媒體與合作邀約",
    mediaBody: "採訪、演講與論壇合辦邀約，請填寫聯絡表單，或透過官方 LINE 與我們聯繫。",
    mediaPrimary: "洽詢採訪與合作",
    mediaSecondary: "加入官方 LINE",
  },
}

export default learning
