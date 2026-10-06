// /consulting copy. Client text from docs/tasks/sitemap-rev1/C01–C04.
// Prices show a single (highest) figure per C02; values await client confirmation.
const consulting = {
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
    secondaryCta: "先看方案",
    lineCta: "用 LINE 直接問",
    promise: ["免費", "線上 15 分鐘", "不推銷，只給下一步建議"],
  },
  chooser: {
    title: "不確定從哪裡開始？",
    options: [
      { label: "我想把品牌的永續價值說清楚", target: "solutions", hint: "永續品牌顧問輔導" },
      { label: "我需要一份對外的永續文件", target: "solutions", hint: "永續白皮書" },
      { label: "我想讓團隊學會 ESG", target: "solutions", hint: "課程與工作坊" },
      { label: "我們是非營利組織", target: "ngo", hint: "非營利合作" },
      { label: "我想先小額開始", target: "membership", hint: "會員方案" },
    ],
  },
  solutions: {
    label: "服務項目",
    title: "企業 ESG 解決方案",
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
    label: "NPO 合作",
    title: "非營利組織合作模式",
    description: "共好玟化與非營利組織攜手，透過專業顧問輔導與資源連結，讓社會影響力被更多企業看見。",
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
    casesNote: "案例內容整理中，將陸續公開。",
    cases: [
      { name: "愛慈基金會", type: "社會福利基金會", focus: "工作坊與永續白皮書案例" },
      { name: "台東康復之友", type: "身心障礙服務", focus: "永續輔導成果" },
      { name: "天成醫院", type: "醫療機構", focus: "工作坊與回饋" },
    ],
  },
  membership: {
    label: "會員方案",
    title: "選擇適合你的共好夥伴方案",
    description: "從免費加入社群，到深度共創，依你的階段選擇。",
    recommended: "推薦",
    audienceLabel: "適合",
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
    label: "FAQ",
    title: "常見問題",
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
    altBody: "加入官方 LINE，直接留言給我們。",
  },
}

export default consulting
