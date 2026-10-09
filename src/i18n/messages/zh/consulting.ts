import type { ChapterDef } from "@/lib/chapters"

// /consulting copy. Client text from docs/tasks/sitemap-rev1/C01–C04.
// Prices show a single (highest) figure per C02; values await client confirmation.
// Layout and wording decisions: docs/redesign/pages-v2/consulting/.
// Every section's kicker (`label`) is also its chapter label below: keep them identical.
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
const chapters: readonly ChapterDef[] = [
  { id: "solutions", label: "服務項目", desc: "選一個起點，看對應的方案與價格", icon: "Compass" },
  { id: "ngo", label: "非營利合作", desc: "兩種合作模式與四個合作案例", icon: "HeartHandshake" },
  { id: "membership", label: "會員方案", desc: "免費、月費、專案，三個階段", icon: "Users" },
  { id: "faq", label: "常見問題", desc: "預約前最常被問的五件事", icon: "HelpCircle" },
  { id: "contact", label: "聯絡表單", desc: "預約諮詢，或用 LINE 直接問", icon: "Mail" },
]

const consulting = {
  chapters,
  meta: {
    title: "合作洽詢",
    description: "預約 15 分鐘 Coffee Chat。企業 ESG 解決方案、非營利合作、會員方案與常見問題。",
  },
  label: "合作洽詢",
  hero: {
    kicker: "合作洽詢",
    title: "預約 15 分鐘 Coffee Chat",
    description:
      "讓我們聊聊如何點亮你的專業價值。無論你是品牌主、供應鏈夥伴、還是永續產業的參與者，我們都期待與你對話。",
    primaryCta: "預約諮詢時段",
    lineCta: "用 LINE 直接問",
    // The page's equation: petal + block = quarter-disc. Open in the hero, answered at the form.
    equation: { petal: "有理念的品牌", block: "找夥伴的企業", result: "先聊 15 分鐘" },
  },
  // "Where do I start?": the tabs of the solutions section. `key` picks the offers
  // shown in the panel (see page.tsx); the order matches contactForm.topics.
  chooser: {
    title: "不確定從哪裡開始？",
    options: [
      { key: "brand", tab: "品牌定位", label: "我想把品牌的永續價值說清楚" },
      { key: "paper", tab: "對外文件", label: "我需要一份對外的永續文件" },
      { key: "team", tab: "團隊學習", label: "我想讓團隊學會 ESG" },
      { key: "npo", tab: "非營利組織", label: "我們是非營利組織" },
      { key: "small", tab: "小額開始", label: "我想先小額開始" },
    ],
  },
  solutions: {
    label: "服務項目",
    description: "從講座到培訓工作坊，從一對一顧問到永續白皮書撰寫，選擇最適合你的永續起步方式。",
    priceNote: "價格為單項服務參考價，實際依需求與規模報價。",
    cta: "預約諮詢",
    items: [
      { key: "consulting", title: "永續品牌顧問輔導", price: "NT$6,000 / 次", unit: "一對一", description: "一對一顧問服務，協助品牌釐清永續定位、整理 ESG 敘事架構，找到與企業對話的切入點。", highlight: "最受歡迎" },
      { key: "whitepaper", title: "永續白皮書精華版", price: "NT$100,000", unit: "4–8 週", description: "為品牌量身打造的永續白皮書，整合 ESG 數據與故事，成為對外溝通、爭取資源的有力文件。", highlight: "" },
      { key: "training", title: "永續商創師培訓", price: "NT$25,000", unit: "系統化培訓", description: "系統化培訓課程，從永續概念到商業實踐，培養具備 ESG 思維的永續商業人才。", highlight: "" },
      { key: "workshop", title: "永續品牌初階工作坊", price: "NT$6,000", unit: "實戰工作坊", description: "實戰工作坊，帶領品牌主快速理解永續框架，找到自身品牌與 ESG 的連結點。", highlight: "" },
    ],
  },
  ngo: {
    label: "非營利合作",
    title: "非營利組織合作模式",
    description: "共好玟化與非營利組織攜手，透過專業顧問輔導與資源連結，讓社會影響力被更多企業看見。",
    // One line for the chooser panel, and the link from there to this section
    summary: "公益夥伴方案與跨界溝通兩種模式，把社會影響力整理成企業讀得懂的永續語言。",
    jump: "看兩種合作模式",
    more: "完整說明",
    models: [
      {
        title: "公益夥伴方案",
        description: "針對非營利組織提供優惠合作方案，協助整理永續影響力數據，建立與企業 CSR／ESG 部門對接的溝通架構。",
        features: ["優惠合作方案", "永續影響力數據整理", "企業 ESG 部門對接"],
      },
      {
        title: "跨界溝通",
        description: "透過ESG共學坊平台與產業網絡，將非營利組織的社會價值轉譯為企業端可理解的永續語言，促成長期合作關係。",
        features: ["ESG共學坊平台資源", "永續語言轉譯", "長期合作關係促成"],
      },
    ],
    casesTitle: "合作過的非營利與公益機構",
    caseMore: "看這個案例",
    quoteLabel: "對方怎麼說",
    // Summarised from the client's own files (docs/tasks/sitemap-rev1/assets-status.md):
    // 白永恩 = published interview, 愛慈 = the foundation's SDG annual, 康復之友 = workshop
    // result posters, 天成 = workshop feedback notes. `key` is the photo in public/cases/npo/.
    cases: [
      {
        key: "beunen",
        name: "白永恩神父社會福利基金會",
        type: "身心障礙、社區長者與兒童發展服務",
        headline: "從領導者陪飛，到金崙小作所的品牌改造",
        alt: "白永恩基金會同仁圍著貼滿便利貼的桌面討論",
        points: [
          "領導者陪飛：為新任執行長安排為期一年的一對一教練晤談，建立與團隊的信任與溝通。",
          "GROW 共識工作坊：總會與分辦公室的領導團隊，一起練習從目標、現況、選項走到行動方案。",
          "品牌社會行銷：台東金崙小作所從產品量產、Logo 與包裝設計到空間改造、增設門市，為在地身心障礙者創造更多就業機會。",
          "流程優化：用心智圖整理行政流程與檔案，把資深同仁的經驗交接下去，也因應政府評鑑。",
        ],
        quote: "有了共好傳授的完善工作方法輔助後，組織地基更加扎實，面對公部門各項需求也更加有餘裕，工作效率與服務品質都因此而大幅提升！",
        quoteBy: "鍾榕榕，白永恩基金會執行長",
      },
      {
        key: "mercy",
        name: "愛慈社會福利基金會",
        type: "毒害寶寶與特殊需求兒少安置",
        headline: "用 SDGs 重新說一次 25 年的照護工作",
        alt: "顧問在愛慈社會福利基金會會議室為同仁上課",
        points: [
          "透過系列課程協助跨部門溝通，由同仁把日常照護工作對應到 SDGs，寫成自己的對外文件。",
          "2025 年出版年度專刊〈走向永續的照護行動〉，以 SDG 2、3、4、10、17 五個目標整理服務成果。",
          "成果用數據說話：寶寶中心 2024 年提供 3,147 人日的安置服務、安排 125 次門診。",
        ],
        quote: "永續發展幫助助人工作者跳脫不僅是『認真做好事』，而是要『知道為何而做、且做得有意義和價值』。",
        quoteBy: "愛慈基金會執行長，年度專刊",
      },
      {
        key: "kangfu",
        name: "臺東縣康復之友協會",
        type: "精神康復者社會參與",
        headline: "四組活動，推回同一個永續主軸",
        alt: "顧問在康復之友協會的活動空間帶領工作坊",
        points: [
          "兩天工作坊，用 IOOI 事件鏈拆解四個案例：非洲鼓團與舞團、手工皂製作、手工皂義賣、社辦二手義賣。",
          "四組的選擇匯聚成兩個共識：讓服務對象走出去（SDG 10.2）、讓社群正確理解協會（SDG 10.3）。",
          "釐清工作與活動是手段、不是目的；與企業對話時，要把「為什麼需要這些投入」講清楚。",
        ],
        quote: "永續目標是拿來找合作伙伴一起達到的，不要自己硬幹。",
        quoteBy: "吳玟樺 Evvon，工作坊總結",
      },
      {
        key: "tiancheng",
        name: "天成醫院",
        type: "醫療機構",
        headline: "六組主管，把日常工作對回 SDGs",
        alt: "天成醫院同仁與醫師圍著海報用便利貼討論",
        points: [
          "永續工作坊中，六個小組各自提出願景、利害關係人、對應的 SDGs 與一年後的目標。",
          "主題涵蓋在地化經營、幸福企業、節能減碳、性別平權與教學卓越。",
          "學員訂出可衡量的目標，例如一年內降低院內能源消耗 10%、基層起薪的性別差距低於 3%。",
        ],
        quote: "這次課程讓我們學會『整合』——把日常工作中分散的永續實踐，放到正確的位置、對應正確的目標。",
        quoteBy: "天成醫院院長",
      },
    ],
  },
  membership: {
    label: "會員方案",
    title: "選擇適合你的共好夥伴方案",
    // Shown in the chooser panel that leads here
    description: "從免費加入社群，到深度共創，依你的階段選擇。",
    jump: "看三個方案",
    recommended: "推薦",
    audienceLabel: "適合",
    // {count} is replaced with the number of features
    includes: "內含 {count} 項",
    tierCta: "透過 LINE 洽詢",
    tiers: [
      {
        title: "基礎夥伴",
        price: "免費",
        tagline: "先連上，開始接觸永續",
        features: ["加入 LINE 永續社群", "永續趨勢週報", "活動與課程優先通知"],
        audience: "任何想開始的個人",
        recommended: false,
      },
      {
        title: "進階夥伴",
        price: "NT$300／月",
        tagline: "持續學，把永續變成內部能力",
        features: ["ESG共學坊每月課程與回放", "講師影片與教材下載", "夥伴交流社群", "課程與工作坊優惠"],
        audience: "永續實務工作者、想打底的小團隊",
        recommended: true,
      },
      {
        title: "策略夥伴",
        price: "專案報價",
        tagline: "深度共創，把永續做進你的商業",
        features: ["一對一顧問諮詢", "永續白皮書策略服務", "國際接軌策略", "供應鏈對接優先"],
        audience: "要做白皮書／供應鏈輔導的企業，專案制",
        recommended: false,
      },
    ],
    comingSoon: {
      badge: "即將推出",
      title: "共好生態圈會員",
      body: [
        "不只是學永續，而是進入一條被驗證的永續供應鏈——取得永續認證、被買方看見、與夥伴共同接案。",
        "我們正在籌備中。想成為創始夥伴、搶先取得名額與優惠嗎？",
      ],
      cta: "加入候補",
    },
  },
  faq: {
    label: "常見問題",
    title: "預約之前，你可能想知道",
    items: [
      { question: "什麼是 Coffee Chat？", answer: "15 分鐘免費線上諮詢，就像喝杯咖啡聊聊天。我們聽你的現況，幫你找最適合的下一步——要不要走，由你決定。" },
      { question: "誰適合使用共好玟化的服務？", answer: "我們的客戶涵蓋農業品牌、設計公司、社會企業、非營利組織，以及想尋找永續供應鏈的大型企業。只要你正在做有意義的事，希望被更多人看見，我們都歡迎你來聊聊。" },
      { question: "永續白皮書需要多長時間完成？", answer: "依品牌規模與資料完整度，通常需要 4 至 8 週。過程中我們會進行深度訪談、資料整理與內容撰寫，確保白皮書真實反映品牌的永續實踐。" },
      { question: "如何開始合作？", answer: "最簡單的方式是預約一場 Coffee Chat，讓我們了解你的需求。之後我們會提供客製化的合作建議與報價，確認後即可啟動專案。" },
      { question: "ESG共學坊訂閱包含什麼？", answer: "ESG共學坊是跨產業的永續學習與交流平台，訂閱會員可參加定期舉辦的工作坊、講座與產業交流活動，並獲得會員專屬的永續資源與人脈網絡。" },
    ],
    more: "還有其他問題？",
    moreCta: "寫信給我們",
  },
  contact: {
    label: "聯絡表單",
    title: "預約合作諮詢",
    description: "填寫以下表單，我們將盡快與您聯繫安排 Coffee Chat。",
    hours: "週一至週五 09:00–18:00",
    altTitle: "想更快一點？",
  },
}

export default consulting
