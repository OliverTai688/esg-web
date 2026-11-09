// 白皮書案例 / Sustainability White Paper cases (rev2 #53①, section 五; EN #53).
// Four white papers Gung-Ho Culture wrote with its clients. Each has a card on
// /events/impact-whitepaper#cases and its own page at
// /events/impact-whitepaper/cases/<slug> (decision D3a). Copy is the client's,
// verbatim: do not add figures the white papers do not publish.
// ModuLab and 勤億 have no website, so they have no further reading.

type Text = { zh: string; en: string }

export interface WhitepaperCase {
  slug: string
  /** Logo id in src/data/clients.ts */
  clientId: string
  /** Client name as the case heading gives it */
  name: Text
  /** The one sentence on the card */
  summary: Text
  industry: Text
  challenge: Text
  approach: Text
  results: { zh: readonly string[]; en: readonly string[] }
  furtherReading?: { label: Text; href: string }
  /** Cover image (public/whitepapers/covers/) */
  cover: string
  /** Figure for the case page (public/whitepapers/figures/) */
  figure?: { src: string; alt: Text }
  /**
   * The white paper PDF given to visitors after the download form (#53②).
   * For now the client's original Drive files (#53①); the compressed web
   * versions replace these once the client approves them.
   */
  downloadUrl: string
}

export const whitepaperCases: readonly WhitepaperCase[] = [
  {
    slug: "taku",
    clientId: "taku",
    name: { zh: "大古鑄鐵 TaKu", en: "TAKU Ironware" },
    summary: { zh: "把「修而不丟」算成碳與生意。", en: "Turning “repair, don’t replace” into carbon savings and business." },
    industry: { zh: "消費品牌／鑄鐵鍋具與生活器物", en: "Consumer brand | Cast-iron cookware and homeware" },
    challenge: {
      zh: "鑄鐵是高耗能材質，談永續很容易被質疑。大古想說清楚：一口能用一輩子的鍋，對環境的意義到底是什麼？",
      en: "Cast iron is an energy-intensive material, so any sustainability claim is easily questioned. TAKU wanted to explain clearly what a pot that lasts a lifetime really means for the environment.",
    },
    approach: {
      zh: "共好玟化陪大古把產品放回完整生命週期來看：不比重量、改比同體積的材料碳排，再攤到使用年限，結論是「越能長久相伴的東西，對環境越溫柔」。數據只算原料到製造階段、不假設理想情境、來源全部公開。同時把既有的「回娘家」維修計畫整理成可量化的循環成果，並寫成合作夥伴專章，讓企業與零售通路知道能怎麼一起做。",
      en: "We helped TAKU look at its products across their full life cycle. Instead of comparing weight, we compared the material carbon emissions of products of the same volume, then spread them over their years of use. The conclusion: the longer something stays with you, the gentler it is on the environment. The figures cover only raw materials and manufacturing, assume no ideal scenarios and cite all sources openly. We also turned TAKU’s existing repair programme, which takes back customers’ damaged products and repairs them, into measurable circular results. A partnership chapter shows companies and retailers how they can take part.",
    },
    results: {
      zh: [
        "回娘家計畫維修 136 件，延壽鐵料 248.4 kg，相當於避免新製 0.55 噸 CO₂e",
        "參與顧客再購率 68%、滿意度 4.8／5",
        "大古在官網設立「永續生活 ESG」專區，全本白皮書公開上網，並把內容轉成社群貼文持續分享",
      ],
      en: [
        "136 damaged items repaired through the programme, extending the life of 248.4 kg of iron. This is equivalent to avoiding 0.55 tonnes of CO₂e from new production.",
        "68% repurchase rate among participating customers; satisfaction 4.8 / 5",
        "TAKU created a “Sustainable Living ESG” section on its website, published the full white paper online and continues to share its content on social media.",
      ],
    },
    furtherReading: {
      label: { zh: "大古鑄鐵官網永續專區", en: "TAKU Ironware sustainability page [in Chinese]" },
      href: "https://www.taku-art.com/news/esg_life",
    },
    cover: "/whitepapers/covers/taku.webp",
    figure: {
      src: "/whitepapers/figures/taku-repair-data.webp",
      alt: { zh: "大古鑄鐵白皮書「修而不丟」數據頁", en: "The “repair, don’t replace” data page from TAKU’s white paper" },
    },
    downloadUrl: "https://drive.google.com/file/d/1UahaplTlGxY8kdO1KbqQm5aFZBnK-cK8/view",
  },
  {
    slug: "wecan",
    clientId: "wecan",
    name: { zh: "帷可策略（ACT 艾客互動）", en: "WeCan (ACT)" },
    summary: {
      zh: "一家 AI 行銷科技公司，用永續白皮書敲開大企業的門。",
      en: "An AI marketing technology company uses its Sustainability White Paper to open doors at large companies.",
    },
    industry: { zh: "科技行銷・LINE SCRM＋AI（B2B SaaS）", en: "Marketing technology | LINE SCRM + AI (B2B SaaS)" },
    challenge: {
      zh: "帷可想接上市櫃與大企業客戶，但每次接觸都會被問：「為什麼選你？」大企業在乎供應商能不能幫自己達成永續目標，光講技術說服不了對方。",
      en: "WeCan wanted to win listed and large corporate clients, but every conversation came back to the same question: “Why you?” Large companies care whether suppliers can help them meet their own sustainability goals. Technology alone was not enough to convince them.",
    },
    approach: {
      zh: "共好玟化協助帷可用永續語言重新說明自己：把 AI 客服、無紙化溝通等服務，對應到經濟、環境、社會三重效益與 SDGs，整理出 2024 年的企業影響力數據，並附上 GRI 準則對照，讓大企業能直接接到自己的永續報告書需求。",
      en: "We helped WeCan explain itself in the language of sustainability. We mapped services such as AI customer service and paperless communication to economic, environmental and social value, and to the SDGs. We compiled the company’s 2024 impact data and added a GRI index, so large companies can link it directly to their own sustainability reporting.",
    },
    results: {
      zh: [
        "白皮書收錄 2024 影響力數據：新增合作企業 32 間、AI 客服對話 830,006 次、無紙化訊息 291,081 則",
        "白皮書成為帷可對外的固定工具，之後到各場合演講、分享都拿這本來講",
        "完成後接到上市櫃品牌公司的訂單，甚至包括國外上市櫃公司",
      ],
      en: [
        "The white paper includes 2024 impact data: 32 new corporate clients, 830,006 AI customer-service conversations and 291,081 paperless messages.",
        "The white paper has become WeCan’s standard tool for talks and presentations.",
        "After completing it, WeCan won orders from listed brand companies, including listed companies overseas.",
      ],
    },
    furtherReading: {
      label: { zh: "帷可策略官網", en: "WeCan website [in Chinese]" },
      href: "https://www.wecanstrategy.com.tw/",
    },
    cover: "/whitepapers/covers/wecan.webp",
    downloadUrl: "https://drive.google.com/file/d/1wc0t6yS0hFU2308ZqJ59NL6ZsAqPXNXv/view",
  },
  {
    slug: "modulab",
    clientId: "modulab",
    name: { zh: "ModuLab", en: "ModuLab" },
    summary: { zh: "一支手錶的第二次生命。", en: "A second life for a watch." },
    industry: { zh: "消費品牌／模組化兒童手錶", en: "Consumer brand | Modular children’s watches" },
    challenge: {
      zh: "ModuLab 是深耕手錶產業 20 多年的 INFANTRY 團隊推出的新品牌，帶進模組化與環保材質的設計。好理念需要一套能讓通路、教育機構與合作品牌聽懂的語言。",
      en: "ModuLab is a new brand from INFANTRY, a team with more than 20 years’ experience in the watch industry. It brings modular design and materials made from ocean waste. A good idea needs language that retailers, educators and partner brands can understand.",
    },
    approach: {
      zh: "共好玟化陪 ModuLab 拆解一支錶從誕生到報廢的每個階段，再往前一步：讓手錶可以被再製、成為孩子的創作載體、參與教育。白皮書以教育、環境、產業三條軸線寫成五年永續藍圖，對應 SDG 4、12、14，並寫成合作專章，邀請通路、教育機構與異業品牌一起參與。",
      en: "We helped ModuLab break down every stage of a watch’s life, from production to disposal. Then we went one step further: the watch can be remade, become a canvas for children’s creativity and be used in the classroom. The white paper sets out a five-year sustainability roadmap along three lines: education, environment and industry. It is linked to SDGs 4, 12 and 14, and includes a partnership chapter inviting retailers, educators and brands from other sectors to join in.",
    },
    results: {
      zh: [
        "共同創辦人以主講人身分登上 UN-SDGs Impact Developers Conference 2026（曼谷），場地在聯合國亞太經社會 UN ESCAP 會議中心",
        "論壇後，投資洽詢與願意協助推廣的夥伴都增加",
        "於 UN-SDGs Impact Developers Conference 2026（曼谷）獲頒 SDGs Impact Developers Award",
      ],
      en: [
        "The co-founder spoke at the UN-SDGs Impact Developers Conference 2026 in Bangkok, held at the United Nations Conference Centre of UN ESCAP.",
        "After the forum, investment enquiries and offers of promotional support both increased.",
        "ModuLab received the SDGs Impact Developers Award at the conference.",
      ],
    },
    cover: "/whitepapers/covers/modulab.webp",
    figure: {
      src: "/whitepapers/figures/modulab-kids.webp",
      alt: { zh: "孩子使用 ModuLab 模組化手錶", en: "Children using ModuLab modular watches" },
    },
    downloadUrl: "https://drive.google.com/file/d/1jpNJ6wfclVtkIO0mXd4PVlV-j5XuHmJb/view",
  },
  {
    slug: "chinyi",
    clientId: "chinyi",
    name: { zh: "勤億蛋品", en: "Chinyi Eggs" },
    summary: {
      zh: "把每年上千噸的蛋殼廢棄物，變成會說故事的環保包裝。",
      en: "Turning more than a thousand tonnes of eggshell waste a year into packaging that tells a story.",
    },
    industry: { zh: "食品・蛋品（台灣液蛋供應龍頭）", en: "Food | Eggs (one of Taiwan’s leading liquid egg suppliers)" },
    challenge: {
      zh: "勤億每天產蛋約 200 萬顆，每年產生上千噸蛋殼。他們已經把蛋殼做成紙托包材，但這項技術的價值，外界還看不見。",
      en: "Chinyi produces about 2 million eggs a day and more than a thousand tonnes of eggshells each year. It had already turned the shells into egg trays, but the outside world could not yet see the value of this technology.",
    },
    approach: {
      zh: "共好玟化與齊禾設計合作，用永續白皮書把「蛋殼紙托」的再利用技術整理成對外的品牌論述，算出減碳效益、對應 SDG 8、9、12、17，並搭配金馬 60 聯名設計推向市場。",
      en: "Working with Chihe Design, we used a Sustainability White Paper to turn the reuse of eggshells in “eggshell trays” into a brand story for the outside world. We calculated the carbon reduction and linked it to SDGs 8, 9, 12 and 17. The trays then reached the market through a co-branded design for the 60th Golden Horse Awards.",
    },
    results: {
      zh: [
        "每噸蛋殼紙托較原回收紙減碳約 495.9 kg；單次設計使用 195 kg，減碳約 97 kg",
        "外盒改用再生塑膠粒，較全新品再減碳約 15%",
        "成為金馬 60 伴手禮，新包裝設計獲獎肯定，蛋殼紙托材質持續被外界詢問",
      ],
      en: [
        "Each tonne of eggshell trays cuts about 495.9 kg CO₂ compared with conventional recycled paper. One design run used 195 kg of eggshell trays, cutting about 97 kg CO₂.",
        "The outer box switched to recycled plastic pellets, cutting carbon by about a further 15% compared with virgin material.",
        "The packaging became a gift for the 60th Golden Horse Awards, the new design won an award, and the eggshell tray material continues to draw enquiries.",
      ],
    },
    cover: "/whitepapers/covers/chinyi.webp",
    downloadUrl: "https://drive.google.com/file/d/1wmw32p82nqqMCc5R12DbPX_GNxtA-qqS/view",
  },
]

export function getWhitepaperCase(slug: string) {
  return whitepaperCases.find((c) => c.slug === slug)
}

/** The papers offered by the download form, in the page's language. */
export function whitepaperDownloads(locale: string) {
  return whitepaperCases.map((c) => ({ id: c.slug, title: locale === "en" ? c.name.en : c.name.zh, url: c.downloadUrl }))
}
