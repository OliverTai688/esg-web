import { site, type ContactPurpose } from "@/lib/site"

// 方案總表 / Services & Pricing (rev2 #44, EN #44): the single source of every
// service and course price on the site. The /consulting table, the /events/<slug>
// inner pages and any other page that mentions a price read from here; other
// pages describe a service and link to the table instead of quoting a price.
// Text is the client's final copy, verbatim (zh #44, EN #44). The book's list
// price on the home page book block (#24) is a product price and stays there.

type Text = { zh: string; en: string }

/**
 * Index of a topic in the contact form's "想聊的方向" list (common.ts
 * `contactForm.topics`, rev2 #44): 還不確定，先聊聊／永續白皮書／永續課程／
 * 企業與組織工作坊／永續供應鏈輔導／非營利合作／其他. Keep in the same order.
 */
export const CONTACT_TOPIC = {
  unsure: 0,
  whitepaper: 1,
  course: 2,
  workshop: 3,
  supplyChain: 4,
  npo: 5,
  other: 6,
} as const

export type SolutionAction =
  /** This page's contact form (#contact), with the form topic it preselects */
  | { type: "contact"; topic: number }
  /** LINE on the Chinese site; email or LinkedIn on the English site (R17) */
  | { type: "channel"; purpose: ContactPurpose }
  /** A page on this site (path after the locale, e.g. "/events/whitepaper-workshop") */
  | { type: "page"; path: string }
  /** Another site */
  | { type: "external"; href: string }

export interface Solution {
  id: string
  name: Text
  /** English name in italics (book titles, R10) */
  italicEn?: boolean
  /** A second line under the name (English supply chain advisory only) */
  subtitle?: Text
  description: Text
  /** Omitted when the table shows no price */
  price?: Text
  /** 最受歡迎 / Most popular (#45) */
  popular?: boolean
  /** Small note beside the button, e.g. 線上課程更新中 */
  note?: Text
  button: { label: Text; zh: SolutionAction; en: SolutionAction }
  /** Slug of the /events/<slug> inner page, when the item has one */
  detailSlug?: string
}

export interface SolutionCategory {
  id: string
  /** Section anchor, when the category has its own (#solutions-self-learn) */
  anchor?: string
  name: Text
  /** One line at the bottom of the table instead of a full row (non-profits) */
  compact?: boolean
  items: readonly Solution[]
}

const same = (action: SolutionAction) => ({ zh: action, en: action })

// The online course link and the subscription store follow #35 / #41: the store
// URL lives in site.ts so the switch to the new store is one edit.
const ONLINE_COURSE_URL = "https://shanyun.havppen.com/course/esg"
const BOOK_URL = "https://app.flashfalcon.info/esgevvon/shop/retail_1791864065_a47821e9"
const MESSAGING_REVIEW_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdT5TmaVqs12y-HNTEx3UKleJ7GGXMnnkEDN5zc-IWivaAMcA/viewform"

export const solutionCategories: readonly SolutionCategory[] = [
  {
    id: "start",
    name: { zh: "先認識我們", en: "Getting Started" },
    items: [
      {
        id: "coffee-chat",
        name: { zh: "Coffee Chat", en: "15-minute Coffee Chat" },
        description: {
          zh: "15 分鐘線上聊聊你的現況，幫你找最適合的下一步，要不要往下走由你決定。",
          en: "A 15-minute online chat about where you are now. We help you find the right next step, and the decision to go further is yours.",
        },
        price: { zh: "免費", en: "Free" },
        button: { label: { zh: "預約諮詢", en: "Book a 15-minute Coffee Chat" }, ...same({ type: "contact", topic: CONTACT_TOPIC.unsure }) },
      },
      {
        id: "info-session",
        name: { zh: "永續白皮書說明會", en: "Sustainability White Paper Info Session" },
        description: {
          zh: "每月一場線上說明會，拆解永續白皮書是什麼、適合誰，再決定要自己寫還是請顧問陪你寫。",
          en: "A monthly online session on what a Sustainability White Paper is and who it suits. Then you can decide whether to write it yourself or with an advisor. Held in Mandarin.",
        },
        price: { zh: "免費", en: "Free" },
        button: { label: { zh: "報名說明會", en: "Email us to join" }, ...same({ type: "channel", purpose: "notify" }) },
      },
      {
        id: "messaging-review",
        name: { zh: "永續文案健檢", en: "Sustainability Messaging Review" },
        description: {
          zh: "先填健檢問卷，再安排一次一對一線上會談，指出你的文案哪裡讓人讀不懂、不買單；適合已有官網、型錄或提案文字的組織，填表後我們會回覆付款方式與會談時間。",
          en: "A one-to-one online review of your existing messaging, for organisations that already have a website, catalogue or proposal. Fill in our questionnaire first. In the session, we show you where your wording is unclear or fails to convince. After you send the form, we will reply with payment details and a session time. Held in Mandarin.",
        },
        price: { zh: "NT$3,000", en: "NT$3,000" },
        button: { label: { zh: "填寫健檢問卷", en: "Fill in the questionnaire" }, ...same({ type: "external", href: MESSAGING_REVIEW_FORM }) },
      },
    ],
  },
  {
    id: "books",
    name: { zh: "書與工具書", en: "Book & Workbook" },
    items: [
      {
        id: "book",
        name: { zh: "《永續新語言：從責任到共好的雙效益革命》", en: "The New Language of Sustainability: The Dual-Impact Revolution" },
        italicEn: true,
        description: {
          zh: "你做了很多永續的事，但這些努力，真的被看見了嗎？",
          en: "You have done so much for sustainability. But has that effort really been seen? In Traditional Chinese.",
        },
        price: { zh: "NT$380", en: "NT$380" },
        button: { label: { zh: "立即購書", en: "Buy the book" }, ...same({ type: "external", href: BOOK_URL }) },
      },
      {
        id: "workbook",
        name: { zh: "《影響力健檢手冊 Impact Check Workbook》", en: "Impact Check Workbook" },
        description: {
          zh: "書的延伸工具書，照著手冊一步步檢查，找出影響力斷在哪裡。",
          en: "A companion workbook to the book. Work through it step by step to find where your impact breaks down. In Traditional Chinese.",
        },
        price: { zh: "定價 NT$1,250", en: "List price NT$1,250" },
        // Until the new store sells it: ask on LINE (zh). The English site always
        // emails: physical copies ship within Taiwan only (EN #44).
        button: { label: { zh: "洽詢購買", en: "Ask to buy" }, ...same({ type: "channel", purpose: "ask" }) },
      },
      {
        id: "team-pack",
        name: { zh: "企業包", en: "Team Workbook Pack" },
        description: {
          zh: "《影響力健檢手冊》10 本加一場 90 分鐘導讀會，帶團隊一起完成第一輪健檢。",
          en: "10 copies of the Impact Check Workbook and a 90-minute guided session, to take your team through its first review together. Held in Mandarin.",
        },
        price: { zh: "洽詢報價", en: "Price on request" },
        button: {
          label: { zh: "洽詢企業包", en: "Ask about the Team Workbook Pack" },
          zh: { type: "channel", purpose: "ask" },
          en: { type: "contact", topic: CONTACT_TOPIC.other },
        },
      },
    ],
  },
  {
    id: "self-learn",
    anchor: "solutions-self-learn",
    name: { zh: "自己學、自己寫", en: "Learn and Write on Your Own" },
    items: [
      {
        id: "whitepaper-workshop",
        name: { zh: "永續白皮書工作坊", en: "Sustainability White Paper Workshop" },
        description: {
          zh: "兩天實作，帶著自己組織的資料來，離開時帶走白皮書初稿與一頁式企業提案。",
          en: "Two days of hands-on work. Bring your organisation’s own data, and leave with a first draft of your white paper and a one-page proposal for companies. Taught in Mandarin.",
        },
        price: { zh: "NT$12,800／人", en: "NT$12,800 / person" },
        button: { label: { zh: "查看課程內容", en: "See course details" }, ...same({ type: "page", path: "/events/whitepaper-workshop" }) },
        detailSlug: "whitepaper-workshop",
      },
      {
        id: "agri-innovator",
        name: { zh: "ESG 永續農創師", en: "Sustainable Agri-Innovator Programme" },
        description: {
          zh: "與臺灣休閒農業學會合辦，給休閒農業經營者，每堂課產出一章場域永續白皮書。",
          en: "Run with the Taiwan Leisure Agriculture Association for leisure farm operators. Each session produces one chapter of the farm’s own Sustainability White Paper. Taught in Mandarin.",
        },
        // No price: the status takes its place
        price: { zh: "2026 梯次已結業，下一梯次規劃中", en: "2026 cohort completed. Next cohort in planning." },
        // The 2026 course outline sits in the learning-map section of /events
        button: { label: { zh: "查看課程內容", en: "See course details" }, ...same({ type: "page", path: "/events#farm-course" }) },
      },
      {
        id: "business-innovator",
        name: { zh: "永續商創師", en: "Sustainable Business Innovator Programme" },
        description: {
          zh: "給品牌與中小企業經營者的永續課程。",
          en: "A sustainability course for brand owners and SME leaders. Taught in Mandarin.",
        },
        price: { zh: "規劃中", en: "In planning" },
        button: { label: { zh: "加入 LINE 搶先通知", en: "Email us for updates" }, ...same({ type: "channel", purpose: "notify" }) },
        detailSlug: "sustainable-business-innovator",
      },
      {
        id: "online-course",
        name: { zh: "線上預錄課「ESG 永續思維品牌與社會影響力策略班」", en: "Online Course: ESG and Social Impact Strategy for Brands" },
        description: {
          zh: "線上隨時看，建立 ESG 思維與品牌影響力策略的基礎。",
          en: "Watch online at any time, and build a foundation in ESG thinking and brand impact strategy. Taught in Mandarin.",
        },
        price: { zh: "NT$18,500", en: "NT$18,500" },
        note: { zh: "線上課程更新中", en: "Online course being updated" },
        button: { label: { zh: "前往課程", en: "Go to the course" }, ...same({ type: "external", href: ONLINE_COURSE_URL }) },
      },
      {
        id: "subscription",
        name: { zh: "ESG共學坊訂閱", en: "CO-ESG Academy Subscription" },
        description: {
          zh: "每週線上授課、影片回放、講師投影片、交流社群與課程優惠。",
          en: "Weekly online classes, recordings, speaker slides, a peer community and course discounts. Taught in Mandarin.",
        },
        price: { zh: "NT$300／月起", en: "From NT$300 / month" },
        button: { label: { zh: "前往永續商城", en: "Go to the CO-ESG Store" }, ...same({ type: "external", href: site.storeUrl }) },
      },
    ],
  },
  {
    id: "advisor",
    name: { zh: "顧問陪你做", en: "Work With an Advisor" },
    items: [
      {
        id: "whitepaper",
        name: { zh: "永續白皮書", en: "Sustainability White Paper" },
        popular: true,
        description: {
          zh: "顧問陪你訪談、整理數據與故事，寫成一份能對外溝通、爭取資源的永續白皮書，6–12 週。",
          en: "An advisor works with you on interviews, data and stories, and turns them into a Sustainability White Paper you can use to communicate and secure resources. Takes 6–12 weeks.",
        },
        price: { zh: "最高 NT$400,000，依規模報價", en: "Up to NT$400,000, depending on scale" },
        button: { label: { zh: "預約諮詢", en: "Book a consultation" }, ...same({ type: "contact", topic: CONTACT_TOPIC.whitepaper }) },
        detailSlug: "impact-whitepaper",
      },
      {
        id: "in-house-workshops",
        name: { zh: "企業與組織工作坊", en: "In-House Workshops for Organisations" },
        description: {
          zh: "依組織需求，從永續學習地圖八個主題中組合內訓或工作坊。",
          en: "Workshops or in-house training built around your organisation’s needs, combining topics from our eight-topic Learning Map.",
        },
        price: { zh: "依需求報價", en: "Price on request" },
        button: { label: { zh: "預約諮詢", en: "Book a consultation" }, ...same({ type: "contact", topic: CONTACT_TOPIC.workshop }) },
      },
      {
        id: "supply-chain",
        name: { zh: "永續供應鏈輔導", en: "Sustainable Supply Chain Advisory" },
        subtitle: { zh: "", en: "Helping suppliers meet buyers’ sustainability requirements." },
        description: {
          zh: "協助供應商回應買方的永續要求與供應鏈問卷，讓你在永續這一關不會被刷掉。",
          en: "We help you answer your buyers’ sustainability requirements and supply chain questionnaires, so sustainability is not the reason you are screened out.",
        },
        price: { zh: "年約・專案報價", en: "Annual contract, quoted per project" },
        button: { label: { zh: "預約諮詢", en: "Book a consultation" }, ...same({ type: "contact", topic: CONTACT_TOPIC.supplyChain }) },
      },
    ],
  },
  {
    id: "npo",
    name: { zh: "非營利組織", en: "Non-Profit Partnerships" },
    compact: true,
    items: [
      {
        // The old 公益夥伴方案, shrunk to one line (#46④); no price shown
        id: "npo-partnership",
        name: { zh: "非營利合作", en: "Non-Profit Partnerships" },
        description: {
          zh: "非營利組織另有優惠合作方案：協助整理永續影響力數據，建立與企業 CSR／ESG 部門對接的溝通架構，歡迎預約諮詢。",
          en: "Non-profits can access a preferential partnership plan. We help you organise your sustainability impact data and build a way to communicate with corporate CSR and ESG teams.",
        },
        button: { label: { zh: "預約諮詢", en: "Book a consultation" }, ...same({ type: "contact", topic: CONTACT_TOPIC.npo }) },
      },
    ],
  },
]

export function getSolution(id: string): Solution | undefined {
  for (const category of solutionCategories) {
    const item = category.items.find((s) => s.id === id)
    if (item) return item
  }
  return undefined
}

/** The price text of one item in the page's language, or undefined when it shows none. */
export function solutionPrice(id: string, locale: string): string | undefined {
  const price = getSolution(id)?.price
  return price ? (locale === "en" ? price.en : price.zh) : undefined
}
