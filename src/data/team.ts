// The consultant team (rev2 section 2 / EN section 4 and EN #34): ten people,
// final list, 吳玟樺 first. Photos are built from
// assets-raw/rev2-202610/05-顧問團隊/ into public/team/<id>.webp (same crop for all).
// The old seven-person list and the "代表性講師形象照" folder are void.
// Never mix 李詠婕 (Joyce Lee) with the other "Joyce Li" photo in the Drive folder.
export interface Consultant {
  id: string
  name: { zh: string; en: string }
  /** Organisation, with the title where the client gave one. */
  org: { zh: string; en: string }
  expertise: { zh: string; en: string }
  photo: string
}

const photo = (id: string) => `/team/${id}.webp`

export const consultants: readonly Consultant[] = [
  {
    id: "evvon-wu",
    name: { zh: "吳玟樺", en: "Evvon Wu" },
    org: { zh: "共好玟化組織發展顧問有限公司　創辦人", en: "Founder, Gung-Ho Culture" },
    expertise: { zh: "永續品牌轉型、影響力評估", en: "Sustainable brand transformation; impact assessment" },
    photo: photo("evvon-wu"),
  },
  {
    id: "caren-yeh",
    name: { zh: "葉毓亭", en: "Caren Yeh" },
    org: { zh: "共好玟化組織發展顧問有限公司　組織發展顧問", en: "Organisational Development Consultant, Gung-Ho Culture" },
    expertise: { zh: "社會影響力轉化、組織願景規劃到專案落地", en: "Turning social impact into strategy, from organisational vision to project delivery" },
    photo: photo("caren-yeh"),
  },
  {
    id: "selena-hung",
    name: { zh: "洪素英", en: "Selena Hung" },
    org: { zh: "桓盛企業管理顧問有限公司", en: "Huan Sheng Consulting Co., Ltd." },
    expertise: { zh: "醫院永續、ESG 報告書", en: "Hospital sustainability; ESG reports" },
    photo: photo("selena-hung"),
  },
  {
    id: "jay-wei",
    name: { zh: "魏名聰", en: "Jay Wei" },
    org: { zh: "財團法人新北市中華少年成長文教基金會　董事長", en: "Chair, Youthbud" },
    expertise: { zh: "國際永續論壇策劃、青年永續培力", en: "International sustainability forum planning; youth empowerment for sustainability" },
    photo: photo("jay-wei"),
  },
  {
    id: "eric-liu",
    name: { zh: "劉建成", en: "Eric Liu" },
    org: { zh: "齊禾設計有限公司", en: "Chihe Design" },
    expertise: { zh: "永續設計、循環材質設計", en: "Sustainable design; circular materials design" },
    photo: photo("eric-liu"),
  },
  {
    id: "chung-hsuan-tu",
    name: { zh: "屠崇軒", en: "Chung-Hsuan Tu" },
    org: { zh: "思凡社會性農業發展企業社", en: "Selvans Social Farm" },
    expertise: { zh: "NPO 平台", en: "Non-profit resource platform" },
    photo: photo("chung-hsuan-tu"),
  },
  {
    id: "daniel-hsiao",
    name: { zh: "蕭冠宇", en: "Daniel Hsiao" },
    org: { zh: "CRIF 中華徵信所企業股份有限公司　永續長", en: "Chief Sustainability Officer, China Credit Information Service (CRIF)" },
    expertise: { zh: "供應鏈管理問卷", en: "Supply chain management questionnaires" },
    photo: photo("daniel-hsiao"),
  },
  {
    id: "joyce-lee",
    name: { zh: "李詠婕", en: "Joyce Lee" },
    org: { zh: "大慶旅運社有限公司", en: "Bliss Travel" },
    expertise: { zh: "永續旅遊規劃與國際認證輔導（GTS）、SDGs 教育旅行", en: "Sustainable travel planning and international certification support (GTS); SDG educational travel" },
    photo: photo("joyce-lee"),
  },
  {
    id: "sylvia-shih",
    name: { zh: "石珮萱", en: "Sylvia Shih" },
    org: { zh: "微碳石代永續顧問有限公司", en: "Cmicro-Era" },
    expertise: { zh: "生物多樣性、碳盤查、碳足跡", en: "Biodiversity; carbon inventories; carbon footprints" },
    photo: photo("sylvia-shih"),
  },
  {
    id: "mina-chen",
    name: { zh: "陳宜均", en: "Mina Chen" },
    org: { zh: "鑫判科技股份有限公司", en: "BAMZD" },
    expertise: { zh: "永續品牌", en: "Sustainable branding" },
    photo: photo("mina-chen"),
  },
]

export function getConsultant(id: string) {
  return consultants.find((c) => c.id === id)
}
