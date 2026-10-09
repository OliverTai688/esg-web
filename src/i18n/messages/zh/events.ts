import type { ChapterDef } from "@/lib/chapters"

// /events copy. Client text from docs/tasks/sitemap-rev1/E01–E04.
// terminology follows G01 (see scripts/check-terms.mjs).
// Page sections in page order: the single source for the navbar dropdown, the
// in-page ChapterNav and each section's kicker (the page reads the label from here).
// Every id must be a section id on the page (scripts/check-anchors.mjs).
const chapters: readonly ChapterDef[] = [
  { id: "upcoming", label: "下一梯次", desc: "三門課規劃中，開課先通知你", icon: "CalendarDays" },
  { id: "workshops", label: "永續學習地圖", desc: "三個層次、八個主題，找你的起點", icon: "Map" },
  { id: "services", label: "持續服務", desc: "顧問諮詢與訂閱方案", icon: "Repeat" },
  { id: "history", label: "我們走過的路", desc: "2022 成立至今，一年一年看", icon: "Footprints" },
  { id: "roadmap", label: "發展藍圖", desc: "近、中、遠程目標與永續承諾", icon: "Flag" },
  { id: "cases", label: "合作案例", desc: "三個跨界合作的故事", icon: "Handshake" },
]

const events = {
  chapters,
  meta: {
    title: "永續足跡",
    description: "從走入社區的講座，到登上 30 國齊聚的國際舞台——共好玟化的課程、學習地圖、足跡與發展藍圖。",
  },
  label: "永續足跡",
  hero: {
    kicker: "永續足跡",
    title: "每一步，都是永續行動的真實足跡",
    description: "從ESG共學坊的跨產業連結到國際論壇，共好玟化持續舉辦高品質的永續活動，串連理念相符的夥伴。",
    primaryCta: "加入 LINE 收開課通知",
    secondaryCta: "打開永續學習地圖",
    // Labels under the footprint trail: where it starts, and the step not taken yet
    trailStart: "2022",
    trailNext: "下一步",
  },
  upcoming: {
    title: "日期一公布，第一個通知你",
    description: "下一梯次課程正在規劃中。加入官方 LINE，開課時第一時間通知你。",
    notifyCta: "加入 LINE 搶先通知",
    viewDetails: "查看課程內容",
  },
  learningMap: {
    title: "找到最適合你的永續起點",
    levelsLine: "探索 → 實作 → 整合",
    introLabel: "關於學習地圖",
    intro:
      "無論你是剛接觸 ESG 的新手，還是已有基礎想深化實力的實踐者，都能從這裡找到最適合你的起點。每個主題模組獨立完整，可依需求單獨選修；完整走過全程，則能建立系統性的永續實戰能力。",
    // The client names three levels: 探索 → 實作 → 整合. Which topics sit in which level
    // is our reading of the topic content (E02); each module's `level` is the colour of
    // the dot the client put in front of that topic and only colours its number.
    levels: [
      { key: "explore", name: "探索", description: "主題一至三：建立共識、讀懂永續、說出影響力" },
      { key: "practice", name: "實作", description: "主題四至七：品牌策略、商業模式、碳管理、認證與市場對接" },
      { key: "integrate", name: "整合", description: "主題八：把各主題的成果整合成自己的永續影響力文件" },
    ],
    audienceLabel: "適合",
    modules: [
      { stage: "explore", level: "blue", theme: "主題一", title: "永續共識與組織對話", subtitle: "跨部門永續共識營", description: "永續轉型從組織內部開始。這個工作坊幫助不同部門的夥伴建立共同語言，讓永續不再只是某個部門的任務。", audience: "剛起步的組織、想推動內部文化轉變的管理者、跨部門協作需求者" },
      { stage: "explore", level: "green", theme: "主題二", title: "讀懂永續，掌握趨勢", subtitle: "永續知能與 ESG 管理基礎", description: "從氣候變遷到法規趨勢，了解 ESG 如何影響你的行業，找到屬於你的永續切入點與風險因應策略。", audience: "想建立永續基礎概念的各行業從業者、管理階層、業主" },
      { stage: "explore", level: "green", theme: "主題三", title: "說出影響力", subtitle: "永續報告書與 SROI 衡量", description: "學會用國際通用語言（GRI、SROI）描述你的組織影響力，讓利害關係人看見你的價值，不只是說故事，而是有憑據的說。", audience: "想製作永續報告、影響力報告或提案書的人" },
      { stage: "practice", level: "yellow", theme: "主題四", title: "永續品牌策略", subtitle: "品牌定位 × SDGs × 使用者設計", description: "把永續轉化為品牌競爭力。從市場定位到服務設計，學習如何讓你的品牌在永續浪潮中被看見、被選擇。", audience: "品牌經營者、行銷人員、想強化品牌差異化的業主" },
      { stage: "practice", level: "yellow", theme: "主題五", title: "商業模式創新", subtitle: "循環經濟 × 服務化 × 永續變現", description: "不只做好事，也要做成好生意。這個模組帶你重新設計商業模式，從資源循環到服務創新，找到永續的獲利路徑。", audience: "創業者、想升級商業模式的經營者、產品開發人員" },
      { stage: "practice", level: "red", theme: "主題六", title: "碳管理與環境韌性", subtitle: "碳盤查 × 減碳策略 × 氣候風險", description: "從盤查到行動，建立組織的碳管理能力，同時利用自然解方強化面對氣候衝擊的韌性。", audience: "有減碳目標或供應鏈壓力的組織、想進行碳足跡評估的業主" },
      { stage: "practice", level: "red", theme: "主題七", title: "認證攻略與市場對接", subtitle: "永續認證 × 綠色供應鏈 × 企業合作提案", description: "了解各類永續認證的申請路徑，對接企業 ESG 採購需求，設計讓品牌進入供應鏈的合作提案。", audience: "想拓展 B2B 合作、進入綠色採購市場的業者" },
      { stage: "integrate", level: "blue", theme: "主題八", title: "影響力整合與成果展現", subtitle: "數據蒐集 × 影響力報告 × 永續白皮書", description: "整合你在各主題的學習成果，透過問卷設計、數據分析與報告撰寫，完成屬於自己組織的永續影響力文件。", audience: "已有一定永續基礎、想產出具體成果的學習者" },
    ],
    externalTitle: "延伸課程",
    externalLinks: [
      { label: "ESG 永續思維品牌與社會影響力策略班（預錄課程）", href: "https://shanyun.havppen.com/course/esg" },
      { label: "ESG 永續農創師課程（2025 梯次報名頁）", href: "https://www.accupass.com/event/2507150923051155509773" },
    ],
    // 2026 run of the same course, from the client's syllabus document (public outline only).
    farmCourse: {
      label: "2026 農創師課程內容",
      title: "ESG 永續農創師培育課程｜2026 夏季梯次",
      meta: "與台灣休閒農業學會合辦・7 堂・2026 年 7 月 7 日至 9 月 29 日，隔週二上課",
      focus: "今年主軸是生物多樣性與生態友善；每堂產出一章「場域永續白皮書」，最後一堂向企業提案。",
      modules: [
        { name: "模組一｜永續知能與報告書", items: ["休閒農業與 ESG 永續管理", "永續報告書與影響力衡量"] },
        { name: "模組二｜休閒農業品牌與商業模式", items: ["休閒農業永續品牌建立", "休閒農業商業模式落地"] },
        { name: "模組三｜生態資源管理與綠色供應鏈", items: ["農業生態資本與氣候韌性", "永續認證與綠色供應鏈商機"] },
        { name: "模組四｜永續影響力行動", items: ["成果發表"] },
      ],
    },
    inquire: "想為團隊規劃主題組合？",
    inquireCta: "洽詢客製課程",
  },
  servicesSection: {
    title: "顧問諮詢與訂閱方案",
    description: "不只是一次性活動——我們提供持續性的專業支援，陪伴你的永續旅程。",
    consulting: "顧問服務",
    subscription: "訂閱方案",
    viewMore: "了解更多",
  },
  history: {
    title: "一步一步，走出來的路",
    intro: "從走入社區的一場場講座，到登上 30 國齊聚的國際舞台——這是共好玟化一步步累積的軌跡。",
    yearsLabel: "年份",
    // One short note per year for the year tabs (ours, not client copy)
    yearNotes: { "2022": "成立", "2023": "走入社區", "2024": "平台上線", "2025": "走遍全台", "2026": "國際舞台" } as Record<string, string>,
    phases: [
      {
        name: "探索扎根期",
        period: "2022–2023",
        tagline: "走入社區，廣播種子",
        intro: "帶著創辦人十餘年社工與非營利管理的底蘊，我們以「走入社區、廣播種子」為起點，在資源有限的情況下，優先建立品牌知名度與社群基礎。",
        entries: [
          { date: "2022.05", text: "共好玟化正式成立（資本額 5 萬元），以永續與 ESG 知識推動社會影響力。" },
          { date: "2023.05", text: "進駐三鶯、南港社區大學，開設公民週永續講座。" },
          { date: "2023.10", text: "完成首份永續白皮書——與齊禾設計合作，為勤億蛋品打造蛋殼紙托白皮書。" },
          { date: "2023.11", text: "於萬華社區大學開設「ESG共學坊」實體社團；同月完成首次增資（5 萬 → 100 萬元）。" },
        ],
      },
      {
        name: "規模擴張期",
        period: "2024–至今",
        tagline: "打破地理，走向國際",
        intro: "ESG共學坊從實體升級為線上平台，服務版圖向農業與企業延伸，影響力從台灣逐步走向國際。",
        entries: [
          { date: "2024.03", text: "「ESG共學坊」平台上線，實體社團升級為線上學習平台。" },
          { date: "2024.06", text: "綠合農場課程，正式跨入農業永續服務；協助逾 30 位小農品牌培力，創造市集單日營業額逾 50 萬元。" },
          { date: "2024.11", text: "以策略總監身份，受 13+ 新創計畫邀請主持永續品牌發展工作坊；永續白皮書服務同步規模化。" },
          { date: "2025", text: "累計逾 100 場講座、30 場以上工作坊、培力逾 500 人，服務遍及全台 10 多個縣市，並涵蓋全台前三大觀光休閒農場。" },
          { date: "2025 春夏", text: "與台灣休閒農業學會合作，推出全台首創「ESG 永續農創師」認證課程。" },
          { date: "2025.05", text: "協辦「強化公益影響力」講座；以永續顧問身份參展 Secutech 台北國際安全科技應用展。" },
          { date: "2025.07", text: "完成第二次大幅增資（100 萬 → 400 萬元），為迄今最大規模。" },
          { date: "2025.08", text: "首次受邀登上國際 SDGs 論壇（Global Youth Leadership Programme SDGs Forum 台北場）。", href: "https://www.youthsdgs.org/" },
          { date: "2025.08–10", text: "受台北市政府邀請，擔任「台北友善店家」主題課程講師（初階、進階）。" },
          { date: "2026.04", text: "以合辦夥伴身份投入「SDGs Impact Developers Conference」澎湖大會，與來自 30 國的青年行動者齊聚，正式以合辦角色站上國際舞台。", href: "https://www.youthsdgs.org/" },
          { date: "2026.05–06", text: "以合辦夥伴身份參與「UN-SDGs Impact Developers Conference」曼谷大會（5/29–6/1），於曼谷東南大學與聯合國亞太經社會（UN ESCAP）會議中心舉行；逾 140 位青年領袖、企業代表與國際專家、來自 30 多國的代表齊聚，共好玟化的國際影響力延伸至聯合國殿堂。", href: "https://www.youthsdgs.org/" },
        ],
      },
    ],
    linkLabel: "論壇網站",
    pastLabel: "已結束活動",
    ended: "已結束",
  },
  roadmap: {
    title: "我們的發展藍圖",
    horizonsLabel: "階段",
    intro: "永續是一條長路。我們以同樣的標準要求自己，把承諾化為可被檢視的階段目標。",
    horizons: [
      {
        name: "近程",
        period: "2026",
        title: "把基礎打深",
        items: [
          "建立標準化的「永續白皮書」範本，累積 5–8 件完整案例。",
          "拓展多元客戶：從公益組織、農業品牌到中小企業，並深化策略合作夥伴關係。",
          "完成官網與品牌識別更新，強化對外的透明度與信任。",
          "推出ESG共學坊與工作坊，試行永續市集生態圈模式。",
        ],
      },
      {
        name: "中程",
        period: "2027–2028",
        title: "讓模式可複製",
        items: [
          "建立可複製的永續揭露服務流程，形成標準化 SOP，規模化服務中小企業。",
          "深化農業永續供應鏈服務，串聯農場、品牌與通路，打造農業 ESG 解決方案。",
          "發展 AI 輔助永續顧問工具，結合量化分析與數據技術，提升永續策略效率。",
          "協助企業接軌 GRI、SDGs、SASB 等國際標準，奠定對外申請與參獎的文件基礎。",
          "擴大永續市集生態圈，與上市櫃企業建立長期策略合作關係。",
        ],
      },
      {
        name: "遠程",
        period: "2029 以後",
        title: "成為生態圈的節點",
        items: [
          "成為台灣最具影響力的永續顧問與生態圈平台，以「共學、共創、共生」模式被產業廣泛認可。",
          "推動跨界共好生態圈，連結政府、企業、非營利組織、農業與醫療等不同領域，形成相互滋養的永續網絡。",
          "將共好玟化的「永續白皮書」模式與 IOOI 框架輸出至亞太與華語圈，協助更多企業建立永續競爭力。",
          "成為社會創新教育的重要節點，讓「影響力思維」成為企業與組織的日常語言。",
        ],
      },
    ],
    // Marks the horizon that is in progress today
    currentLabel: "進行中",
  },
  commitment: {
    label: "我們的永續承諾",
    lead: "身為陪伴企業做永續揭露的顧問，我們相信——自己也必須是實踐者。",
    body: "共好玟化承諾將永續精神落實於自身營運，並持續以共學、共創的方式，與每一位夥伴一起，讓影響力成為引領未來的關鍵。",
    readMore: "讀完整承諾",
  },
  cases: {
    title: "真實的合作成果",
    description: "每一個案例背後，都是理念的碰撞與價值的實現。",
    partnersLabel: "合作夥伴",
    readStory: "讀這個故事",
    prev: "上一則",
    next: "下一則",
    // `logos` are ids in src/data/clients.ts for the partners whose logo file we have.
    items: [
      {
        title: "永續商品走進企業採購清單",
        partners: "星芽社會企業 × 思凡自然農場",
        logos: ["jooin-now", "sifan-farm"],
        description: "透過共好玟化ESG共學坊講師平台，促成星芽社會企業與思凡自然農場的合作連結，將兼具社會價值與品質的永續產品與禮品，連結企業禮贈品採購。",
      },
      {
        title: "機能襪與印花的故事",
        partners: "RAFAC 機能襪 × 處處花版",
        logos: [] as string[],
        description: "兩個有共同理念的品牌互相對話，RAFAC 機能襪的機能工藝，遇上處處花版的印花美學，透過共好玟化促成聯名商品合作，讓日常生活用品也能承載設計與自然的永續精神。",
      },
      {
        title: "一座小島，一場跨越國界的對話",
        partners: "中華少年成長基金會 × 大慶旅遊",
        logos: ["bliss-travel"],
        description: "透過共好玟化ESG共學坊講師平台串聯，由中華少年成長基金會董事長主辦，偕同大慶旅遊合辦 2026 SDGs Impact Developers Conference – Penghu，將講師平台裡的連結，轉化為一場有國際迴響的行動。",
      },
    ],
  },
  cta: {
    title: "下一個足跡，換你踏出",
    description: "開課日期一公布，LINE 第一個通知你；團隊想一起學，直接談企業包班。",
    primaryLabel: "加入 LINE 收開課通知",
    secondaryLabel: "洽詢企業包班",
  },
  detail: {
    // Followed by the chapter the course belongs to, e.g. 返回「下一梯次」
    backTo: "返回",
    instructor: "講師",
    duration: "時數",
    date: "日期",
    location: "地點",
    capacity: "名額",
    price: "費用",
    highlights: "課程重點",
    // LINE is the next step for every status; the wording follows the status
    waitlist: "加 LINE 候補下一梯次",
    enquire: "透過 LINE 洽詢",
    notify: "加入 LINE 收開課通知",
    map: "看永續學習地圖",
    consult: "預約 Coffee Chat",
    dateTbd: "下一梯次規劃中",
    related: "其他課程",
  },
}

export default events
