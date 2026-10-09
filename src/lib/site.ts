// Company and contact facts shared by the footer, JSON-LD and contact UI.
// Source: client change request 2026-08-08 (footer company info).
export const site = {
  url: "https://coesg.tw",
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
    en: "11F., No. 50, Sec. 4, Nanjing E. Rd., Songshan Dist., Taipei City, Taiwan",
  },
  // Company mailbox shown with the company details
  email: "gungho90223501@coesg.tw",
  // Customer-service mailbox for enquiries
  supportEmail: "pt@coesg.tw",
  line: {
    id: "@381iutjm",
    url: "https://line.me/R/ti/p/@381iutjm",
  },
  // Default social share image (public/og-image.png, 1200×630)
  ogImage: { url: "/og-image.png", width: 1200, height: 630, alt: "共好玟化 CO-ESG：陪跑｜連結｜創造影響力" },
  // ESG共學坊 store (client, 2026-10-09). It is the ESG共學坊 platform's own site.
  storeUrl: "https://coesg.tw/",
} as const
