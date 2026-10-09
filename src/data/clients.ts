// Clients and partners whose logo the client supplied (Drive folder "客戶logo",
// sorted by the client into 企業／政府／校園／非營利, plus the partner logos in the
// website pack). Files are built by scripts/build-assets.mjs into public/clients/.
// Order inside a group is display order: the first three rows show before "see all"
// (see logosInView in the home page), so keep the best-known names at the top.
// `nameEn` is given only where the organisation prints an English name on its logo.
export type ClientGroup = "business" | "public" | "nonprofit"

export interface Client {
  id: string
  name: string
  nameEn?: string
  group: ClientGroup
  /** A long wordmark (about 3:1 or wider): give it a double-width tile. */
  wide?: boolean
  /** White lettering: the tile behind it has to be dark. */
  dark?: boolean
}

export const clients: readonly Client[] = [
  // Brands and businesses
  { id: "sifan-farm", name: "思凡自然農場", group: "business" },
  { id: "jooin-now", name: "星芽社會企業", nameEn: "JOOIN NOW", group: "business" },
  { id: "chihe", name: "齊禾品牌顧問", nameEn: "CHIHE Branding Consultancy", group: "business" },
  { id: "chinyi", name: "勤億蛋品", nameEn: "CHINYI", group: "business" },
  { id: "tuer-life", name: "兔耳生活", nameEn: "TOUR Eco-Fair Studio", group: "business" },
  { id: "bliss-travel", name: "大慶旅遊", nameEn: "Bliss Travel", group: "business", wide: true },
  { id: "greenunion", name: "綠合農業發展", nameEn: "Greenunion Agricultural", group: "business" },
  { id: "cts", name: "華視", nameEn: "CTS", group: "business" },
  { id: "chunghwa-telecom", name: "中華電信", nameEn: "Chunghwa Telecom", group: "business", wide: true },
  { id: "bamzd", name: "鑫判科技", nameEn: "BeAmazed Tech", group: "business" },
  { id: "lohasustain", name: "樂活永續", nameEn: "LohaSustain", group: "business" },
  { id: "everlab", name: "everlab", group: "business" },
  { id: "bean-melody", name: "豆韻", nameEn: "Bean Melody", group: "business" },
  { id: "share-water", name: "享喝水", nameEn: "Share Water", group: "business" },
  { id: "shangyun-design", name: "上云設計", group: "business" },
  { id: "jestone", name: "拾石", nameEn: "Jestone", group: "business" },
  { id: "xinchun", name: "新春", group: "business" },
  { id: "ariya", name: "ARIYA", group: "business" },
  { id: "ciao-ciao-flora", name: "花神降臨", nameEn: "ciao ciao flora", group: "business" },
  { id: "anything-handcrafted", name: "本舖", nameEn: "Anything Handcrafted", group: "business" },
  { id: "zhezhe-cup", name: "折折杯", group: "business" },
  { id: "key-of-kid", name: "金鑰創鑄", nameEn: "KEY OF KID", group: "business" },
  { id: "qingxingtang", name: "清星堂企劃", group: "business", wide: true },
  { id: "cpml", name: "華人勞基企業集團", nameEn: "CPML", group: "business" },
  { id: "harts", name: "依杰 HART's", nameEn: "HART's", group: "business" },
  { id: "rest", name: "rest", group: "business" },
  { id: "beebest", name: "BeeBest", group: "business", wide: true },
  { id: "dancecology", name: "舞蹈生態系", nameEn: "Dancecology", group: "business", wide: true },
  { id: "winjus-law", name: "允捷法律事務所", nameEn: "WinJus Law Firm", group: "business", wide: true },
  { id: "heart-valley", name: "心之谷永續教育園區", nameEn: "Heart Valley ESG Education Park", group: "business" },
  { id: "hand", name: "汗得", nameEn: "HAND", group: "business", wide: true },
  { id: "dixiao", name: "滴鴞", nameEn: "de Hsiao Co.", group: "business" },
  { id: "hegu-design", name: "禾谷設計", nameEn: "HEGU DESIGN", group: "business" },
  // Public sector, schools and community colleges
  { id: "cpc", name: "中國生產力中心", nameEn: "China Productivity Center", group: "public", wide: true },
  { id: "sanying-cc", name: "三鶯社區大學", nameEn: "SanYing Community College", group: "public", wide: true },
  { id: "nangang-cc", name: "臺北市南港社區大學", nameEn: "Taipei Nangang Community College", group: "public", wide: true },
  { id: "keelung-vocational", name: "國立基隆高級商工職業學校", nameEn: "National Keelung Commercial & Industrial Vocational Senior High School", group: "public", wide: true },
  { id: "new-era", name: "新紀元大學學院", nameEn: "New Era University College", group: "public", dark: true, wide: true },
  { id: "bottle-cap-factory", name: "瓶蓋工廠台北製造所", group: "public" },
  // Non-profits
  { id: "beunen", name: "白永恩神父社會福利基金會", nameEn: "Beunen Foundation", group: "nonprofit" },
  { id: "mercy", name: "愛慈社會福利基金會", nameEn: "The Garden of Mercy Foundation", group: "nonprofit", wide: true },
  { id: "ican", name: "台北市自閉兒社會福利基金會", nameEn: "Taipei Autism Children Social Welfare Foundation", group: "nonprofit" },
  { id: "greenman", name: "綠超人行動促進會", nameEn: "Greenman Association", group: "nonprofit", wide: true },
  { id: "mingyi", name: "明怡", group: "nonprofit" },
  { id: "achang", name: "阿昌清潔庇護工場", group: "nonprofit" },
  { id: "wanhua-flaneurs", name: "萬華附近走走", nameEn: "Wanhua Flaneurs", group: "nonprofit" },
  { id: "dazhen", name: "達真國際青年教練發展協會", group: "nonprofit", wide: true },
  { id: "imc", name: "中華民國 IMC 聯合會", nameEn: "International Management Council", group: "nonprofit" },
  { id: "taichung-lecturers", name: "臺中市企業講師協會", nameEn: "Corporate Lecturers Association", group: "nonprofit", wide: true },
]

export function clientLogo(id: string) {
  return `/clients/${id}.webp`
}

export function getClient(id: string) {
  return clients.find((c) => c.id === id)
}

export function clientName(client: Client, english = false) {
  return english ? (client.nameEn ?? client.name) : client.name
}
