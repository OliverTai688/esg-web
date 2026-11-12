import type { ChapterDef } from "@/lib/chapters"

// /sustainability copy. Client text from docs/tasks/sitemap-rev1/S01–S06;
// terminology follows G01 (see scripts/check-terms.mjs).
// Page sections in page order: the single source for the navbar dropdown and the
// in-page ChapterNav. Every id must be a section id on the page (scripts/check-anchors.mjs).
// Each label is also that section's kicker. Merged in pages-v2: values → vision,
// sdgs → approach, theory → difference (docs/redesign/pages-v2/sustainability/).
const chapters: readonly ChapterDef[] = [
  { id: "who-we-are", label: "我們是誰", desc: "創辦人與專業資格", icon: "UserRound" },
  { id: "vision", label: "願景與使命", desc: "要往哪裡去，與五個核心價值", icon: "Compass" },
  { id: "approach", label: "我們怎麼做", desc: "事件鏈（IOOI）、三大支柱與 SDGs", icon: "Route" },
  { id: "difference", label: "我們的不同", desc: "四種能力與雙效益理論", icon: "Scale" },
  { id: "services", label: "服務項目", desc: "白皮書、課程、工作坊、供應鏈", icon: "Briefcase" },
  { id: "impact", label: "實際成果", desc: "ModuLab 白皮書案例與累計成果", icon: "BarChart3" },
  { id: "ecosystem", label: "共好生態圈", desc: "ESG共學坊夥伴、夥伴網絡與顧問團隊", icon: "Globe2" },
]

const sustainability = {
  chapters,
  meta: {
    title: "共好永續力",
    description: "陪跑、連結、創造影響力。共好玟化陪伴企業、社會組織與公益機構，從永續藍圖走向真正的永續影響力。",
  },
  label: "共好永續力",
  hero: {
    kicker: "共好永續力",
    titleParts: ["陪跑", "連結", "創造影響力"],
    subtitle: "我們相信，永續不該只是一份報告，而是一種能被實踐、被分享、被持續滋養的影響力。",
    description:
      "共好玟化陪伴企業、社會組織與公益機構，從「永續藍圖」走向「真正的永續影響力」，建立具備共學、共創與生態圈精神的永續循環。",
    // Toggle for the folded description
    more: "我們陪誰、怎麼陪",
    primaryCta: "預約 15 分鐘 Coffee Chat",
    secondaryCta: "了解我們的方法",
    // The four parts of the arch = the page's through-line
    // rev2 #25: the last label is 改變 (成果 is the IOOI term Outcome, used further down)
    map: ["人", "信念", "方法", "改變"],
  },
  toc: {
    title: "本頁章節",
  },
  whoWeAre: {
    label: "我們是誰",
    title: "社會工作 × 永續管理 × 國際認證",
    // The client's two paragraphs, split after the first sentence: `lead` is always
    // visible, `paragraphs` sit behind the read-more toggle.
    lead: "共好玟化組織發展顧問有限公司成立於 2022 年，由一群跨領域專業者共同組成。",
    readMore: "讀完整介紹",
    paragraphs: [
      "我們的創辦人吳玟樺（Evvon），擁有 15 年以上社會永續、醫療與公益機構的專案實戰經驗，並具備跨域專業資格。",
      "社會工作 × 永續管理 × 國際認證——這份跨域積累，是共好玟化最深的底氣。我們不只提供永續的「理論」，更陪企業把承諾化為「行動」：從釐清願景、制定策略，到產出真正有靈魂的永續白皮書，我們始終站在客戶身邊一起跑。",
    ],
    // Rev2 section 3, partner #9: appended to the founder sentence (paragraphs[0]);
    // the company name links to its site.
    affiliation: { before: "現任", link: "銀色連線股份有限公司", after: "顧問專家。" },
    credentialsTitle: "創辦人專業資格",
    // rev2 #27: six items in the client's order, ICF removed. Each opens its certificate
    // (/certificates/<image>.webp); the social worker certificate is the redacted copy.
    credentials: [
      { name: "SDG Impact Standards for Enterprises", image: "sdg-impact", alt: "SDG Impact 培訓證書" },
      { name: "企業永續管理師（2025）", image: "taise-2025", alt: "TAISE 企業永續管理師證書" },
      { name: "ISO 14064／14067／14068（2026）", image: "bsi-ghg", alt: "BSI 溫室氣體專業人員證書" },
      { name: "PMP 國際專案管理師（2021）", image: "pmp", alt: "PMP 證書" },
      { name: "社會工作師（2011）", image: "social-worker", alt: "社會工作師證書（遮蔽版）" },
      { name: "專業教練培訓 74 小時（2021）", image: "coaching-74h", alt: "達真國際教練學校 74 小時結業證書" },
    ],
    credentialOpen: "放大檢視證書：",
    credentialClose: "關閉",
    facts: [
      { value: "2022", label: "成立" },
      { value: "15+", label: "年實戰經驗" },
    ],
  },
  vision: {
    label: "願景與使命",
    visionLabel: "願景",
    visionText: "成為推動企業與社會永續轉型的催化劑，點亮個人與組織獨特的專業價值，共創更美好的未來。",
    missionLabel: "使命",
    missionText:
      "致力成為企業與個人在永續發展領域的長期夥伴，透過教育、顧問服務與技術支持，加速邁向永續目標。我們不僅提供知識與工具，更激發行動力，促使各界在自身領域中推動永續轉型。",
  },
  values: {
    label: "核心價值",
    title: "我們的合作，建立在五個共同信念之上",
    items: [
      { title: "對話", description: "從理解開始，每一份永續策略都生於真誠的對話。" },
      { title: "價值", description: "點亮每個組織獨特的專業價值，而非套用同一份模板。" },
      { title: "分享", description: "知識在流動中增值，我們相信開放共學的力量。" },
      { title: "成長", description: "陪客戶累積能力，讓永續成為內部長出來的習慣。" },
      { title: "影響力", description: "一切努力，都指向可被看見、可被衡量的真實改變。" },
    ],
  },
  approach: {
    label: "我們怎麼做",
    title: "從藍圖到影響力",
    // rev2 #28: the chain of events (事件鏈) as in chapter 2 of the book, five boxes.
    intro: "我們以事件鏈（IOOI）作為核心框架，協助組織把每一分投入，一路推進到真實的影響力：",
    steps: [
      { en: "Input", zh: "投入", description: "為達成目標投入的資源：人力、財務、物資、時間、專業" },
      { en: "Activity", zh: "活動", description: "如計畫、工作坊、利害關係人參與" },
      { en: "Output", zh: "產出", description: "活動直接產生、可計算的表層成績，如報告、產品、數據資料", note: "回答「我們做了什麼？」" },
      { en: "Outcome", zh: "成果", description: "目標對象身上發生的、可衡量的改變（能力、情感、態度、行為、情境）" },
      // The book's closing clause 回答「所以呢？」 sits under the box, as in the client's sketch.
      { en: "Impact", zh: "影響力", description: "由成果引發的宏觀、長期、系統性改變，如環境保護、健康福祉、社會平等", note: "回答「所以呢？」", accent: true },
    ],
    caption: "IOOI 取投入（Input）、產出（Output）、成果（Outcome）、影響力（Impact）四個字首；「活動」是把投入變成產出的過程。",
    pillarsIntro: "在這個框架下，我們透過三大支柱展開服務：",
    pillars: [
      {
        number: "支柱一",
        title: "永續教育與課程",
        description: "協助企業內部建立永續識能，推動永續教育與影響力思維，讓永續成為組織的共同語言。",
        // rev2 #30: what you can buy under each pillar; ids are the service tabs below
        related: { label: "對應服務", items: [{ name: "永續課程", href: "#services-course" }, { name: "企業與組織工作坊", href: "#services-workshop" }] },
      },
      {
        number: "支柱二",
        title: "影響力顧問專案",
        description: "提供系統性引導，協助企業釐清永續願景、制定策略、產出永續白皮書，並對應 ESG 評估標準與政府法規。",
        related: { label: "對應服務", items: [{ name: "永續白皮書", href: "#services-whitepaper" }, { name: "永續供應鏈輔導", href: "#services-supply-chain" }] },
      },
      {
        number: "支柱三",
        title: "永續生態圈建立",
        description: "定期舉辦ESG共學坊、搭建互動交流平台，推動企業間經驗分享，形成相互滋養的永續生態網絡。",
        related: { label: "對應", items: [{ name: "ESG共學坊" }, { name: "共好生態圈", href: "#ecosystem" }] },
      },
    ],
  },
  sdgs: {
    label: "對齊的全球目標",
    title: "每一項服務，都呼應聯合國永續發展目標",
    items: [
      { code: "4.7", goal: "4", name: "優質教育", description: "促進所有人習得推動永續發展所需的知識與技能，包括永續生活模式、人權與文化對永續發展的貢獻。" },
      { code: "12.6", goal: "12", name: "責任消費及生產", description: "協助更多企業採用永續發展作法，將永續資訊融入企業營運與採購計畫，讓報告不只是形式。" },
      { code: "17.17", goal: "17", name: "多元夥伴關係", description: "持續與政府、企業及非營利組織建立合作夥伴關係，共同開展合作項目。" },
    ],
  },
  difference: {
    label: "我們的不同",
    title: "四種能力的交會",
    intro: "在眾多 ESG 顧問之中，共好玟化的差異化來自四種能力的交會：",
    items: [
      { title: "社會工作的深厚底蘊", description: "懂組織、懂人，能把永續扎進真實的人與情境裡。" },
      { title: "工科的系統化思維", description: "用結構與邏輯，把抽象的永續理念變成可執行的步驟。" },
      { title: "量化工具與 AI 數據技術", description: "讓影響力被看見、被衡量，而非停留在口號。" },
      { title: "共學與數位合作模式", description: "我們不只交付成果，更陪客戶長出自己的永續能力。" },
    ],
    closing: "這讓我們的客戶不只「擁有」永續策略，更能「實踐」永續承諾，創造可持續的社會影響力。",
  },
  // rev2 #29: the Dual-Impact Leverage Model from chapter 2 of the book. The old
  // copy (動態能力, 議題 → 系統 → 商模) is void.
  theory: {
    title: "雙效益理論",
    nameEn: "Dual-Impact Leverage Model",
    slogan: "當一項永續行動同時創造環境與社會效益，就必然帶來經濟效益。",
    diagram: { left: "環境效益", right: "社會效益", pivot: "槓桿支點", result: "經濟效益" },
    // Shown folded: the first two sentences
    lead: "我常將環境、社會與經濟比喻為一張三腳凳。傳統的永續行動之所以難以為繼，是因為落入了『線性回報』的陷阱：投入環境或社會的成本，然後期待它『或許』帶來經濟回報，這條連結在景氣緊縮時往往最先斷裂。",
    readMore: "讀完整論述",
    paragraphs: [
      "雙效益理論要做的，是把這條虛線變成必然的連結：當一項永續行動，能有意識地『同時』創造出環境與社會兩個面向的效益，它將不再只是『可能』，而是『必然』為組織帶來第三個效益：經濟上的回報與增長。",
      "關鍵在於找到『槓桿支點』，從『單點思考』轉向『連線思考』，從『加法思維』轉向『乘法思維』。",
      "例如一家散熱塗料公司，原本只賣『節省電費』，很容易被更便宜的替代品擊敗；當他們問『除了地球和公司的電費單，還有誰會因這款塗料而直接受益？』，看見了終日曝曬的卡車司機，把話術改成『為您的司機創造更涼爽、更安全的工作環境』，打開了物流與客運車隊的新市場——投入不變，回報卻被乘上了好幾倍。",
    ],
    source: { before: "——摘自吳玟樺", book: "《永續新語言：從責任到共好的雙效益革命》", after: "第二章" },
  },
  // rev2 #30: four tabs, no prices (prices live on /consulting#solutions). Each tab
  // has a fixed anchor, #services-<id>, that opens it.
  services: {
    label: "服務項目",
    title: "一站式永續解決方案",
    description: "從自己學著寫，到顧問陪你做，每一項服務都以商業成果為導向。",
    items: [
      { id: "whitepaper", tag: "白皮書", title: "永續白皮書", description: "深度訪談與數據整理，把你已經在做的事寫成有數據、有出處的永續白皮書，讓企業看得懂、也查得到根據。", highlight: "最受歡迎" },
      { id: "course", tag: "課程", title: "永續課程", description: "自己學、自己寫：永續白皮書工作坊、ESG 永續農創師、永續商創師、線上預錄課與 ESG共學坊訂閱，帶你學會自己寫出組織的永續白皮書。", highlight: "" },
      { id: "workshop", tag: "工作坊", title: "企業與組織工作坊", description: "協助企業、品牌將永續理念轉化為實際行動與市場語言。透過課程與工作坊，建立 ESG 思維、溝通能力與永續應用策略。", highlight: "" },
      { id: "supply-chain", tag: "供應鏈", title: "永續供應鏈輔導", description: "協助供應商回應買方的永續要求與供應鏈問卷，讓你在永續這一關不會被刷掉。年約制。", highlight: "" },
    ],
    cta: "查看方案與價格",
  },
  proof: {
    label: "實際成果",
    // rev2 #31: tagged as a white paper case, with the cumulative results set apart
    tag: "白皮書案例｜ModuLab",
    title: "一份永續白皮書，讓 ModuLab 這個用海洋廢棄物製成手錶的品牌，站上國際青年論壇的舞台。",
    lead: "透過永續說出自己的故事，是走向國際的第一步。",
    before: "有數據之前，這支手錶是一個有意義來源的美麗產品，",
    after: "有數據之後，它是買家可以寫進報告、合作夥伴可以圍繞它建立關係的證據。",
    casesCta: "看永續白皮書案例",
    totalsTitle: "共好玟化累計成果",
    quantTitle: "量化成果",
    notesLabel: "數字怎麼算",
    qualTitle: "質化成果",
    // Each item is one partner's own account: the watch brand from the client's copy for
    // this section, the other two from the client's feedback file (docs/data/6. 客戶回饋).
    qualItems: [
      { title: "被國際看見", description: "海廢手錶品牌透過永續白皮書整理數據與故事，站上國際青年論壇舞台。" },
      { title: "從被動到主動", description: "臺灣休閒農業學會從過去零散被動的企業合作，轉變為更主動、有策略的窗口溝通。" },
      { title: "說清楚自己的價值", description: "思凡自然農園完成永續白皮書，建立可向企業清楚溝通的價值主張。" },
    ],
  },
  ecosystem: {
    label: "共好生態圈",
    title: "串連顧問、供應鏈、企業與國際網絡",
    description: "以ESG共學坊為中心，形成互相賦能的永續共同體。",
    center: "ESG共學坊",
    roles: [
      { title: "永續顧問團隊", description: "資深 ESG 顧問與品牌策略師，依專案需求組成顧問團隊。" },
      { title: "供應鏈對接", description: "擁有優質供應商，並可精準對接。" },
      { title: "企業合作夥伴", description: "跨產業品牌與企業，共同打造永續商業模式。" },
      { title: "國際連結網絡", description: "與全球永續組織接軌，引進國際最新趨勢與資源。" },
    ],
    // rev2 #32: clientsIn("ecosystem")
    partnersTitle: "ESG共學坊夥伴",
    // rev2 #33
    network: {
      title: "我們背後的夥伴網絡",
      body: "一間公司的實力，在於它擁有的團隊以及能夠運用的跨域資源。橫跨30國的永續國際論壇資源、循環材質與永續設計、NPO 資源平台、供應鏈管理問卷、永續旅行方案、生物多樣性與碳盤查碳足跡、永續品牌經營——當客戶的需求超出單一顧問公司的範疇，我們都能在網絡裡找到對應的專業。",
    },
    // rev2 #34: the ten people in src/data/team.ts; the block is #team
    consultantsTitle: "顧問團隊",
    expertiseLabel: "專長",
  },
  cta: {
    title: "準備好讓市場看見你了嗎？",
    description: "預約一場 15 分鐘的 Coffee Chat，讓我們聊聊如何把你正在做的事，說清楚、被看見、被理解。",
    primaryLabel: "預約 15 分鐘 Coffee Chat",
    secondaryLabel: "看我們走過的路",
  },
}

export default sustainability
