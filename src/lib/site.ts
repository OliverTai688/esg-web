// Company and contact facts shared by the footer, JSON-LD and contact UI.
// Source: client change request 2026-08-08 (footer company info).
export const site = {
  url: "https://coesg.tw",
  // Search engines may index the site only on the real domain (launch checklist 1).
  // Set SITE_INDEXABLE=true in the production domain's environment on launch day.
  indexable: process.env.SITE_INDEXABLE === "true",
  legalName: {
    zh: "共好玟化組織發展顧問有限公司",
    en: "Gung-Ho Culture Ltd.",
  },
  taxId: "90223501",
  founder: {
    zh: "吳玟樺（Evvon）",
    en: "Evvon",
  },
  foundingYear: 2022,
  address: {
    zh: "臺北市松山區南京東路4段50號11樓",
    en: "11F., No. 50, Sec. 4, Nanjing E. Rd., Songshan Dist., Taipei City 10553, Taiwan (R.O.C.)",
  },
  // Company mailbox shown with the company details
  email: "gungho90223501@coesg.tw",
  // Customer-service mailbox for enquiries (rev2 #6: the old support mailbox was deleted)
  supportEmail: "gho001@coesg.tw",
  // 共好玟化 official LINE (rev2 #5). Used on the Chinese site only; the English
  // site replaces LINE with email or LinkedIn (EN rule R17).
  line: {
    id: "@379nlxcq",
    url: "https://lin.ee/tGr7ynY",
  },
  // ESG共學坊 LINE: kept only in the "訂閱 3 步驟" article until the new store
  // and payment flow go live (rev2 section 4, question 6).
  academyLine: {
    id: "@381iutjm",
    url: "https://line.me/R/ti/p/@381iutjm",
  },
  // Footer social icons (rev2 #5⑧). English footer shows LinkedIn and Facebook only.
  social: {
    linkedin: "https://www.linkedin.com/company/113301214/",
    facebook: "https://www.facebook.com/gunghoculture/",
  },
  // Online tools (rev2 #43)
  toolsUrl: "https://go.coesg.tw/",
  // Default social share image (public/og-image.png, 1200×630)
  ogImage: { url: "/og-image.png", width: 1200, height: 630, alt: "共好玟化 CO-ESG｜點亮你獨特的專業價值" },
  // ESG共學坊 store (client, 2026-10-09): the store category on the ESG共學坊 platform's own site.
  storeUrl: "https://coesg.tw/categories/branding",
} as const

// Where a "talk to us" button goes. The Chinese site uses the official LINE for
// everything; the English site has no LINE (EN rule R17): asking and Chinese
// course notices go to email, following goes to LinkedIn.
export type ContactPurpose = "ask" | "follow" | "notify"
export type ContactChannel = "line" | "linkedin" | "email"

export function contactFor(locale: string, purpose: ContactPurpose): { channel: ContactChannel; href: string; external: boolean } {
  if (locale !== "en") return { channel: "line", href: site.line.url, external: true }
  if (purpose === "follow") return { channel: "linkedin", href: site.social.linkedin, external: true }
  return { channel: "email", href: `mailto:${site.supportEmail}`, external: false }
}
