import type { ChapterDef } from "@/lib/chapters"

// /consulting copy (rev2 #44–#47; earlier text from docs/tasks/sitemap-rev1/C01–C04).
// Services, prices and buttons of the 方案總表 live in src/data/solutions.ts.
// Every section's kicker (`label`) is also its chapter label below: keep them identical.
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
// Page nav (#44): 01 方案總表／02 合作案例／03 常見問題／04 聯絡表單
const chapters: readonly ChapterDef[] = [
  { id: "solutions", label: "方案總表", desc: "五類方案、價格與下一步", icon: "Wallet" },
  { id: "cases", label: "合作案例", desc: "近年合作案例照片牆", icon: "Briefcase" },
  { id: "faq", label: "常見問題", desc: "預約前最常被問的問題", icon: "HelpCircle" },
  { id: "contact", label: "聯絡表單", desc: "預約 Coffee Chat，或用 LINE 直接問", icon: "Mail" },
]

const consulting = {
  chapters,
  meta: {
    title: "合作洽詢",
    description: "預約 15 分鐘 Coffee Chat。方案總表列出永續白皮書、課程、企業與組織工作坊、永續供應鏈輔導的價格，附近年合作案例與常見問題。",
  },
  label: "合作洽詢",
  hero: {
    kicker: "合作洽詢",
    title: "預約 15 分鐘 Coffee Chat",
    description:
      "讓我們聊聊如何點亮你獨特的專業價值。無論你是品牌主、供應鏈夥伴、還是永續產業的參與者，我們都期待與你對話。",
    primaryCta: "預約 15 分鐘 Coffee Chat",
    lineCta: "用 LINE 直接問",
  },
  // 方案總表 (#44). The items are in src/data/solutions.ts.
  solutions: {
    label: "方案總表",
    title: "方案總表",
    // 開場說明 (#44)
    description: "從免費說明會、自己學著寫，到顧問陪你完成永續白皮書，選擇最適合你的永續起步方式。",
    popular: "最受歡迎",
    // Column names for screen readers and the wide layout
    columns: { item: "方案", description: "說明", price: "價格", action: "下一步" },
  },
  // 02 合作案例 (#46): the 近年合作案例 photo wall
  cases: {
    label: "合作案例",
    title: "近年合作案例",
    filterLabel: "依客戶類型篩選",
    filters: [
      { key: "all", label: "全部" },
      { key: "business", label: "企業" },
      { key: "care", label: "醫療與社福" },
      { key: "local", label: "農業與地方" },
      { key: "school", label: "校園" },
      { key: "global", label: "國際與社群" },
    ],
    openCase: "看這個案例",
    close: "關閉",
    quoteLabel: "對方怎麼說",
    // 16 tiles, verbatim (#46⑤). `photo` is public/cases/wall/<photo>.webp (folder
    // numbers 01–16); within a category, newest first. `caseKey` opens the
    // non-profit's case in a dialog; the other tiles do not open.
    tiles: [
      { photo: "01", category: "business", org: "實心食品有限公司", activity: "實心蛋捲 ESG 永續報告書撰寫實務（2026 年 9–10 月，兩堂）", text: "陪實心團隊用 GRI 卡牌對照日常工作，再依目標與成本排出優先行動，為下一本永續報告書做準備。", alt: "實心團隊成員在桌上排列卡牌討論" },
      { photo: "02", category: "business", org: "銀色連線股份有限公司", activity: "企業志工 × 社區長者 成果盤點工作坊（2026 年 9 月）", text: "陪銀色連線團隊把企業志工、社區長者、社區據點各自發生的改變，依能力、態度、行為、情感、情境五個面向寫清楚。", alt: "銀色連線團隊圍著桌子用便利貼討論" },
      { photo: "03", category: "business", org: "創謀有限公司", activity: "教師節公益禮盒・小微企業 ESG 對接培力課程（2026 年 8 月，線上）", text: "線上課程，搭配專屬學員工作台，讓小業者把產品寫成企業聽得懂的『成果』。", alt: "線上課程的學員工作台畫面" },
      { photo: "04", category: "business", org: "中華電視股份有限公司", activity: "企業永續驅動概念班（2024 年 6 月）", text: "從媒體業常見的 ESG 風險談起，帶員工把公司願景、核心價值和永續連在一起。", alt: "講師在華視課堂上帶學員排列卡片" },
      { photo: "05", category: "care", org: "社團法人臺東縣康復之友協會", activity: "永續工作坊（IOOI 事件鏈，2025 年 12 月起）", text: "用 IOOI 事件鏈拆解四組活動，推回同一個永續主軸。", alt: "康復之友協會的工作坊，學員分組討論", caseKey: "kangfu" },
      { photo: "06", category: "care", org: "南桃園天成醫療社團法人天晟醫院", activity: "員工永續共識營（2025 年 10 月）", text: "六組主管把日常工作對回 SDGs，訂出一年內可衡量的目標，例如院內能源消耗降低 10%。", alt: "天晟醫院主管分組在桌上用便利貼討論", caseKey: "tiancheng" },
      { photo: "07", category: "care", org: "財團法人台北市愛慈社會福利基金會", activity: "員工永續共識營（2025 年 1 月）", text: "用 SDGs 重新說一次 25 年的照護工作，由同仁自己寫成年度專刊。", alt: "顧問在愛慈基金會會議室為同仁上課", caseKey: "mercy" },
      { photo: "08", category: "care", org: "財團法人天主教白永恩神父社會福利基金會", activity: "領導者陪飛與 GROW 共識工作坊（2023 年起）", text: "從領導者陪飛、GROW 共識工作坊，到金崙小作所的品牌改造。", alt: "白永恩基金會同仁展示工作坊海報", caseKey: "beunen" },
      { photo: "09", category: "local", org: "滬尾休閒農業區發展協會", activity: "滬尾休閒農業區共識工作坊（2026 年 9–10 月，共五場）", text: "五場工作坊陪農業區夥伴盤點在地資源、選出 SDGs 目標、設計 10/4 開門日；遊客留下的回饋卡，成了衡量成果的第一手資料。", alt: "滬尾農業區夥伴圍坐討論" },
      { photo: "10", category: "local", org: "臺灣休閒農業學會", activity: "ESG 永續農創師培育課程（2026 年，9 月結業）", text: "陪休閒農場主走過知識建立、品牌表達、市場對接、衡量與實作四個階段，把農場的永續作為寫成企業看得懂的提案。", alt: "講師在農創師課堂前講解" },
      { photo: "11", category: "local", org: "臺北市商業處", activity: "台北友善店家主題推展課程（2025 年 8 月，初階場）", text: "為台北友善店家講解 SDGs 與永續發展的基本概念，帶店家從自己的經營裡找出說得出口的永續作為。", alt: "吳玟樺在台上講解品牌概念" },
      { photo: "12", category: "school", org: "致理科技大學", activity: "「多元敘事」課程（2026 年 10 月）", text: "以創辦人自己的求學與職涯為例，談『別人手上的那把尺』；穿插匿名即時投票與小組討論，帶學生辨識是誰在替自己下定義，重新理解自己的故事。", alt: "致理科技大學學生在課堂上分組討論" },
      { photo: "13", category: "school", org: "彰化縣立花壇國民中學", activity: "韌性校園：教師共識營與師生工作坊（2026 年 5–6 月）", text: "以韌性校園為主軸，先在共識營陪老師訂出學校定位與年度目標，再帶師生實地踏查校園水文、親手做碳盤查。", alt: "花壇國中老師在共識營合照" },
      { photo: "14", category: "global", org: "全球永續發展聯盟（GSA）", activity: "UN-SDGs Impact Developers Conference 2026（曼谷）", text: "共好玟化參與大會；永續白皮書客戶 ModuLab 以大會影響力夥伴（Impact Partner）身分，獲頒 SDGs Impact Developers Award。", alt: "UN-SDGs Impact Developers Conference Demo Day 大合照" },
      { photo: "15", category: "global", org: "全球永續發展聯盟（GSA）", activity: "SDGs Impact Developers Conference – Penghu 2026 專題演講（2026 年 4 月，國立澎湖科技大學）", text: "吳玟樺受邀擔任大會專題講者，GSA 頒發感謝狀。", alt: "GSA 頒給吳玟樺的專題演講感謝狀" },
      { photo: "16", category: "global", org: "共好玟化 × 多扶事業", activity: "ESG共學坊講師感恩茶會（2025 年 9 月 7 日）", text: "邀請ESG共學坊講師齊聚，把每位講師的介紹貼成一面牆，彼此認識專長、交流合作的可能。", alt: "ESG共學坊講師舉牌合照" },
    ] as { photo: string; category: string; org: string; activity: string; text: string; alt: string; caseKey?: string }[],
    // The four non-profit cases, opened from their tile (#46②). Text is the case
    // content the page already had; names are the registered names (section 三).
    // Summarised from the client's own files (docs/tasks/sitemap-rev1/assets-status.md):
    // 白永恩 = published interview, 愛慈 = the foundation's SDG annual, 康復之友 = workshop
    // result posters, 天晟 = workshop feedback notes.
    npo: [
      {
        key: "beunen",
        title: "財團法人天主教白永恩神父社會福利基金會",
        caption: "白永恩神父社會福利基金會",
        type: "身心障礙、社區長者與兒童發展服務",
        headline: "從領導者陪飛，到金崙小作所的品牌改造",
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
        title: "財團法人台北市愛慈社會福利基金會",
        caption: "愛慈社會福利基金會",
        // #46: 副標改「特殊需求兒少安置」
        type: "特殊需求兒少安置",
        headline: "用 SDGs 重新說一次 25 年的照護工作",
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
        title: "社團法人臺東縣康復之友協會",
        caption: "臺東縣康復之友協會",
        type: "精神康復者社會參與",
        headline: "四組活動，推回同一個永續主軸",
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
        // #47: 標題、照片說明、補一句、引言出處（「晟」不是「成」）
        title: "天晟醫院（天成醫療體系）",
        caption: "天晟醫院",
        type: "醫療機構",
        headline: "六組主管，把日常工作對回 SDGs",
        points: [
          "課程於中壢天晟醫院舉辦，天成醫療體系其他院區同仁也一同參與。",
          "永續工作坊中，六個小組各自提出願景、利害關係人、對應的 SDGs 與一年後的目標。",
          "主題涵蓋在地化經營、幸福企業、節能減碳、性別平權與教學卓越。",
          "學員訂出可衡量的目標，例如一年內降低院內能源消耗 10%、基層起薪的性別差距低於 3%。",
        ],
        quote: "這次課程讓我們學會『整合』——把日常工作中分散的永續實踐，放到正確的位置、對應正確的目標。",
        quoteBy: "天晟醫院院長",
      },
    ],
  },
  faq: {
    label: "常見問題",
    title: "預約之前，你可能想知道",
    items: [
      { question: "什麼是 Coffee Chat？", answer: "15 分鐘免費線上諮詢，就像喝杯咖啡聊聊天。我們聽你的現況，幫你找最適合的下一步——要不要走，由你決定。" },
      { question: "誰適合使用共好玟化的服務？", answer: "我們的客戶涵蓋農業品牌、設計公司、社會企業、非營利組織，以及想尋找永續供應鏈的大型企業。只要你正在做有意義的事，希望被更多人看見，我們都歡迎你來聊聊。" },
      // #44 new
      { question: "ESG 是什麼？為什麼客戶開始問我？", answer: "ESG 是環境（Environmental）、社會（Social）、公司治理（Governance）的縮寫，是企業說明自己永續表現的共同語言。上市櫃公司要定期揭露永續資訊，也開始要求供應商說明在這三方面做了什麼，所以中小企業會收到客戶的 ESG 問卷或詢問。很多企業其實早就在做相關的事，只是還沒整理成客戶看得懂的說法。" },
      // #44 new
      { question: "永續白皮書和永續報告書有什麼不同？", answer: "永續報告書是依 GRI 等國際準則、定期揭露整個企業永續績效的正式報告，上市櫃公司依規定要編製。永續白皮書則聚焦在你的品牌、產品或服務，把理念、做法、數據與成果整理成一份對外溝通的文件，讓客戶、合作夥伴與資源方看懂你的價值；篇幅與格式較彈性，適合還不需要編製報告書的中小企業、品牌與非營利組織。" },
      // #10
      { question: "永續白皮書需要多長時間完成？", answer: "依品牌規模與資料完整度，通常需要 6 至 12 週。此工期以依照顧問排定的時程進行、且所需資料均已繳齊為前提；過程中我們會進行深度訪談、資料整理與內容撰寫，確保白皮書真實反映品牌的永續實踐。" },
      { question: "如何開始合作？", answer: "最簡單的方式是預約一場 Coffee Chat，讓我們了解你的需求。之後我們會提供客製化的合作建議與報價，確認後即可啟動專案。" },
      // #44 ①
      { question: "ESG共學坊訂閱包含什麼？", answer: "ESG共學坊是跨產業的永續學習與交流平台。訂閱後每週有線上授課，並可看影片回放、下載講師投影片、加入交流社群，報名課程享優惠。訂閱請到永續商城。" },
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
