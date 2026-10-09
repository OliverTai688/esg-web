// Shared copy: navigation, headline numbers, footer, contact form.
const common = {
  nav: {
    sustainability: {
      label: "共好永續力",
    },
    events: {
      label: "永續足跡",
    },
    learning: {
      label: "共好學習",
      insights: "最新文章",
    },
    consulting: {
      label: "合作洽詢",
    },
    overview: "頁面總覽",
    join: "加入我們",
    cta: "預約諮詢",
    skipToContent: "跳到主要內容",
    menu: "選單",
    language: "語言",
  },
  // Headline impact numbers — the only place these figures live (G06).
  impact: {
    metrics: [
      { value: 1000, prefix: "", suffix: "萬", label: "資源挹注", note: "一家品牌設計公司在永續白皮書完成後一年內取得的政府補助、天使投資與銀行貸款" },
      { value: 130, prefix: "", suffix: "+", label: "跨產業合作", note: "透過顧問輔導與ESG共學坊講師平台促成的合作" },
      { value: 8, prefix: "", suffix: "+", label: "國際論壇", note: "協助企業與夥伴登上的國際論壇舞台" },
    ],
    // Cumulative track record through 2025, from the client's timeline (E03)
    track: [
      { value: "100+", label: "場講座" },
      { value: "30+", label: "場工作坊" },
      { value: "500+", label: "人次培力" },
      { value: "10+", label: "個縣市" },
    ],
    trackNote: "累計至 2025 年",
  },
  footer: {
    brand: "共好",
    brandAccent: "玟化",
    tagline: "CO-ESG ｜ 永續品牌的專業橋樑",
    copyright: "© 2026 共好玟化 CO-ESG. All Rights Reserved.",
    lineCta: "加入官方 LINE",
    navTitle: "網站導覽",
    contactTitle: "聯絡我們",
    supportEmail: "客服信箱",
    company: {
      title: "公司資訊",
      name: "公司名稱",
      taxId: "統一編號",
      founder: "創辦人",
      founded: "成立年份",
      address: "公司地址",
      website: "官方網站",
      email: "電子信箱",
    },
  },
  notFound: {
    kicker: "404",
    title: "這座橋還沒搭到這裡",
    body: "你要找的頁面可能已經搬家，或是網址少了幾個字。",
    home: "回到首頁",
    linksLabel: "或者從這裡繼續",
  },
  contactForm: {
    name: "您的姓名",
    namePlaceholder: "請輸入姓名",
    email: "電子郵件",
    emailPlaceholder: "example@email.com",
    org: "所屬單位",
    orgPlaceholder: "企業名稱或組織名稱",
    topic: "想聊的方向",
    // Order matters: /consulting hands a topic over by index (consulting.chooser.options[].key → data-contact-topic).
    topics: ["永續品牌顧問輔導", "永續白皮書", "課程／工作坊", "非營利合作", "其他"],
    message: "您的需求或訊息",
    messagePlaceholder: "請簡單描述您的合作需求或想聊的主題...",
    submit: "送出預約",
    // Shown after the mail client is asked to open: the form itself sends nothing.
    success: "已開啟您的郵件軟體，寄出後即完成。沒有跳出視窗？請改用官方 LINE，或直接寄信到 pt@coesg.tw。",
    mailNote: "按下送出後，會開啟您的郵件軟體並帶入內容，寄出即完成。",
    mailSubject: "Coffee Chat 預約",
    required: "必填",
  },
  common: {
    readMore: "閱讀更多",
    learnMore: "了解更多",
    viewAll: "查看全部",
    backHome: "返回首頁",
    external: "另開新視窗",
    minRead: "分鐘閱讀",
    onThisPage: "本頁內容",
    comingSoon: "即將推出",
  },
}

export default common
