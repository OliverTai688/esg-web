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
  // Interim recipients for the contact form's mail fallback, until the form backend (B01 part B) exists.
  contactFormRecipients: ["evvon.wu@gmail.com", "taioliver688@gmail.com"],
  // Sustainability store. The client will supply the link; until then store buttons go to the home page.
  storeUrl: null as string | null,
} as const
