// Shared copy: navigation, headline numbers, footer, contact form.
const common = {
  nav: {
    sustainability: {
      label: "共好永續力",
      // rev2 #22: extra dropdown entry leading to the home page's #testimonials
      testimonials: { label: "客戶回饋", desc: "合作夥伴與學員的真實回饋" },
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
      { value: 1000, prefix: "", suffix: "萬", label: "資源挹注", note: "一家科技公司在永續白皮書完成後一年內取得的政府補助、天使投資與銀行貸款" },
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
    // The two figures the client asked for on the /events hero (change request p.17).
    // 150+ counts every kind of event to date; `track` above splits the 2025 total by type.
    reach: [
      { value: "150+", label: "場活動" },
      { value: "50+", label: "合作品牌" },
    ],
  },
  footer: {
    brand: "共好",
    brandAccent: "玟化",
    tagline: "CO-ESG｜點亮你獨特的專業價值",
    copyright: "© 2026 共好玟化 CO-ESG. All Rights Reserved.",
    lineCta: "加入官方 LINE",
    social: "社群媒體",
    newWindow: "（另開新視窗）",
    navTitle: "網站導覽",
    store: "ESG共學坊商城",
    tools: "線上工具",
    // rev2 #7
    terms: "使用者條款",
    privacy: "隱私權政策",
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
    // rev2 #44: seven options. Order matters: /consulting hands a topic over by index
    // (data-contact-topic), and /api/forms maps an English option to the Chinese one at the same index.
    topics: ["還不確定，先聊聊", "永續白皮書", "永續課程", "企業與組織工作坊", "永續供應鏈輔導", "非營利合作", "其他"],
    message: "您的需求或訊息",
    messagePlaceholder: "請簡單描述您的合作需求或想聊的主題...",
    submit: "送出預約",
    // rev2 #48: shown after /api/forms has emailed gho001@coesg.tw
    success: "謝謝您，我們已收到您的訊息，會以 Email 回覆。",
    required: "必填",
  },
  common: {
    readMore: "閱讀更多",
    learnMore: "了解更多",
    viewAll: "查看全部",
    backHome: "返回首頁",
    external: "另開新視窗",
    // Appended to a link name for screen readers; zh uses full-width brackets, en half-width (EN4)
    externalParen: "（另開新視窗）",
    minRead: "分鐘閱讀",
    onThisPage: "本頁內容",
    comingSoon: "即將推出",
  },
}

export default common
