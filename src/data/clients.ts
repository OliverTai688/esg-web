// Logo lists (rev2 section 3; English names from EN section 3, R5). Three groups:
// - client:    服務客戶, home page logo wall (20)
// - partner:   合作夥伴, home page logo wall (10)
// - ecosystem: 共好生態圈夥伴 / ESG共學坊夥伴, /sustainability (12, the first three stay first)
// Only these organisations appear on the site; logos of anyone else were removed.
// Logo files are built from assets-raw/rev2-202610/06-Logo/ into public/clients/<id>.webp.
// `fullName` is the registered name, for alt text checks and the client's records.
export type ClientGroup = "client" | "partner" | "ecosystem"

export interface Client {
  id: string
  /** Name shown on the site (網站顯示名稱). */
  name: string
  nameEn: string
  fullName: string
  url?: string
  group: ClientGroup
  /** A long wordmark (about 3:1 or wider): give it a double-width tile. */
  wide?: boolean
  /** White lettering: the tile behind it has to be dark. */
  dark?: boolean
}

export const clients: readonly Client[] = [
  // ── 服務客戶 ──
  { id: "toucheng-farm", name: "頭城休閒農場", nameEn: "Toucheng Leisure Farm", fullName: "頭城休閒農場股份有限公司", url: "https://www.tcfarm.com.tw", group: "client" },
  { id: "taku", name: "大古鑄鐵", nameEn: "TAKU Ironware", fullName: "大古鑄鐵股份有限公司", url: "https://www.taku-art.com", group: "client", wide: true },
  { id: "wecan", name: "帷可策略", nameEn: "WeCan", fullName: "帷可策略股份有限公司", url: "https://www.wecanstrategy.com.tw", group: "client" },
  { id: "modulab", name: "ModuLab", nameEn: "ModuLab", fullName: "ModuLab（INFANTRY 團隊新品牌）", group: "client" },
  { id: "chinyi", name: "勤億蛋品", nameEn: "Chinyi Eggs Technology Co., Ltd.", fullName: "勤億蛋品科技股份有限公司", group: "client" },
  { id: "cts", name: "華視", nameEn: "Chinese Television System (CTS)", fullName: "中華電視股份有限公司", url: "https://www.cts.com.tw/", group: "client" },
  { id: "chunghwa-telecom", name: "中華電信", nameEn: "Chunghwa Telecom", fullName: "中華電信股份有限公司", url: "https://www.cht.com.tw/", group: "client", wide: true },
  { id: "tcmg", name: "天晟醫院", nameEn: "Ten-Chen General Hospital (Zhongli)", fullName: "南桃園天成醫療社團法人天晟醫院", url: "https://www.tcmg.com.tw/", group: "client", wide: true },
  { id: "beunen", name: "白永恩神父社會福利基金會", nameEn: "Beunen Foundation", fullName: "財團法人天主教白永恩神父社會福利基金會", url: "https://www.beunen.org.tw/", group: "client", wide: true },
  { id: "mercy", name: "愛慈社會福利基金會", nameEn: "The Garden of Mercy Foundation", fullName: "財團法人台北市愛慈社會福利基金會", url: "https://www.aidscare.org.tw/", group: "client", wide: true },
  { id: "taitung-mental-health", name: "臺東縣康復之友協會", nameEn: "The Association for the Mentally Ill, Taitung", fullName: "社團法人臺東縣康復之友協會", url: "https://www.facebook.com/arttoaccompany/", group: "client" },
  { id: "sifan-farm", name: "思凡自然農園", nameEn: "Selvans Social Farm", fullName: "思凡社會性農業發展企業社", url: "https://www.selvansimpact.com/", group: "client" },
  { id: "tuer-life", name: "兔耳生活", nameEn: "Tour Life", fullName: "兔耳生活有限公司", url: "https://tourlifeart.com/", group: "client" },
  { id: "bliss-travel", name: "大慶旅運社", nameEn: "Bliss Travel", fullName: "大慶旅運社有限公司", url: "https://www.blissingtravel.com/", group: "client" },
  { id: "new-era", name: "新紀元大學學院", nameEn: "New Era University College", fullName: "新紀元大學學院 New Era University College（馬來西亞）", url: "https://newera.edu.my/", group: "client", wide: true, dark: true },
  { id: "bottle-cap-factory", name: "瓶蓋工廠台北製造所", nameEn: "POPOP Taipei", fullName: "瓶蓋工廠台北製造所 POPOP Taipei", url: "https://popoptaipei.com/", group: "client" },
  { id: "true-roll", name: "實心蛋捲", nameEn: "True Roll", fullName: "實心食品有限公司", url: "https://www.trueroll.com.tw/", group: "client" },
  { id: "taiwan-farm-association", name: "台灣休閒農業發展協會", nameEn: "Taiwan Leisure Farms Development Association", fullName: "台灣休閒農業發展協會", url: "https://www.taiwanfarm.org.tw/", group: "client", wide: true },
  { id: "hoowei", name: "滬尾休閒農業區", nameEn: "Hui Wei Leisure Agriculture Area", fullName: "滬尾休閒農業區發展協會", url: "https://hoowei.org/", group: "client" },
  { id: "huatan-jhs", name: "花壇國中", nameEn: "Huatan Junior High School", fullName: "彰化縣立花壇國民中學", url: "https://htjh.chc.edu.tw/", group: "client" },

  // ── 合作夥伴 ──
  { id: "tlaa", name: "臺灣休閒農業學會", nameEn: "Taiwan Leisure Agriculture Association", fullName: "臺灣休閒農業學會", url: "https://www.tlaa.org.tw/", group: "partner", wide: true },
  { id: "gsa", name: "全球永續發展聯盟（GSA）", nameEn: "Global SDGs Alliance (GSA)", fullName: "Global SDGs Alliance（GSA）", url: "https://www.gsa.ngo/", group: "partner" },
  { id: "taipei-gov", name: "臺北市政府", nameEn: "Taipei City Government", fullName: "臺北市政府", url: "https://www.gov.taipei/", group: "partner" },
  { id: "sanying-cc", name: "新北市三鶯社區大學", nameEn: "SanYing Community College", fullName: "新北市三鶯社區大學", url: "https://sycc.org.tw/", group: "partner", wide: true },
  { id: "nangang-cc", name: "臺北市南港社區大學", nameEn: "Nangang Community College, Taipei City", fullName: "臺北市南港社區大學", url: "https://nangang.org.tw/", group: "partner", wide: true },
  { id: "wanhua-cc", name: "臺北市萬華社區大學", nameEn: "Wanhua Community College", fullName: "臺北市萬華社區大學", url: "https://twhcc.org.tw/", group: "partner", wide: true },
  { id: "chihlee", name: "致理科技大學", nameEn: "Chihlee University of Technology", fullName: "致理科技大學 Chihlee University of Technology", url: "https://www.chihlee.edu.tw/", group: "partner" },
  { id: "youthbud", name: "中華少年成長文教基金會", nameEn: "Youthbud", fullName: "財團法人新北市中華少年成長文教基金會", url: "https://www.youthbud.org/", group: "partner", wide: true },
  { id: "silverlining", name: "銀色連線", nameEn: "silverlining", fullName: "銀色連線股份有限公司", url: "https://www.silverliningesg.com/", group: "partner" },
  { id: "duofu", name: "多扶事業", nameEn: "Duofu Care & Service", fullName: "多扶事業股份有限公司", url: "http://www.duofu.com.tw/", group: "partner", wide: true },

  // ── 共好生態圈夥伴（ESG共學坊夥伴） ──
  { id: "everlab", name: "EverLab360", nameEn: "EverLab360", fullName: "綠策院有限公司", url: "https://everlab360.wordpress.com/", group: "ecosystem" },
  { id: "jooin-now", name: "星芽社會企業", nameEn: "Jooin Now", fullName: "星芽社會企業股份有限公司", url: "https://www.jooinnow.io/", group: "ecosystem", wide: true },
  { id: "cmicro-era", name: "微碳石代", nameEn: "Cmicro-Era Sustainability Consulting Company, Ltd.", fullName: "微碳石代永續顧問有限公司", url: "https://www.cmicroera.com/", group: "ecosystem", wide: true },
  { id: "bamzd", name: "鑫判科技", nameEn: "BAMZD", fullName: "鑫判科技股份有限公司", url: "https://bamzd.com/", group: "ecosystem" },
  { id: "chihe", name: "齊禾品牌顧問", nameEn: "Chihe Design", fullName: "齊禾設計有限公司", url: "https://chihedesign.com/", group: "ecosystem", wide: true },
  { id: "hegu-design", name: "禾谷創意", nameEn: "HEGU DESIGN", fullName: "禾谷創意整合行銷有限公司", url: "https://www.hegu-design.com/", group: "ecosystem", wide: true },
  { id: "lohasustain", name: "樂活永續", nameEn: "LohaSustain", fullName: "樂活永續股份有限公司", url: "https://lohasustain.tw", group: "ecosystem" },
  { id: "hand", name: "汗得學社", nameEn: "HAND Initiative", fullName: "社團法人台灣汗得文化協會", url: "https://www.hand.org.tw/", group: "ecosystem" },
  { id: "heart-valley", name: "心之谷永續教育園區", nameEn: "Heart Valley", fullName: "心之谷永續教育園區（經營：魚可國際文創事業有限公司）", url: "https://www.heartvalley.com.tw/", group: "ecosystem", wide: true },
  { id: "rafac", name: "RAFAC 機能襪", nameEn: "RAFAC SOCKS", fullName: "RAFAC SOCKS", url: "https://rafac.cyberbiz.co/", group: "ecosystem", dark: true },
  { id: "showy-pattern", name: "處處花版", nameEn: "Showy Pattern Art", fullName: "處處花版 Showy Pattern Art", url: "https://www.pinkoi.com/store/chuchulove", group: "ecosystem" },
  { id: "winjus-law", name: "允捷法律事務所", nameEn: "Win Jus Law Firm", fullName: "允捷法律事務所 Win Jus Law Firm", url: "https://www.winjus.com/", group: "ecosystem", wide: true },
]

export function clientLogo(id: string) {
  return `/clients/${id}.webp`
}

export function getClient(id: string) {
  return clients.find((c) => c.id === id)
}

export function clientsIn(group: ClientGroup) {
  return clients.filter((c) => c.group === group)
}

export function clientName(client: Client, english = false) {
  return english ? client.nameEn : client.name
}
