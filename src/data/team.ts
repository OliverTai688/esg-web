// The seven consultants shown on the ecosystem diagram.
// Source: the "7位業界頂尖ESG顧問" graphic on https://coesg.tw/plans/30day (names and titles as printed there).
// Photos are 300×300 crops from that graphic — fine for small avatars, too low-resolution for larger use.
export interface Consultant {
  name: string
  organization: string
  role: string
  photo: string
}

export const consultants: Consultant[] = [
  { name: "吳玟樺", organization: "共好玟化組織發展顧問有限公司・ESG共學坊", role: "創辦人", photo: "/team/consultant-01.jpg" },
  { name: "蕭冠宇", organization: "中華徵信所企業股份有限公司", role: "永續長", photo: "/team/consultant-02.jpg" },
  { name: "王欽泉", organization: "鑫判科技股份有限公司", role: "首席策略合夥人", photo: "/team/consultant-03.jpg" },
  { name: "朱建毓", organization: "樂活永續股份有限公司", role: "共同創辦人", photo: "/team/consultant-04.jpg" },
  { name: "劉建成", organization: "齊禾設計有限公司", role: "設計總監", photo: "/team/consultant-05.jpg" },
  { name: "吳宗曄", organization: "樂活永續股份有限公司", role: "執行長", photo: "/team/consultant-06.jpg" },
  { name: "陳宜均", organization: "綠策院有限公司", role: "創辦人", photo: "/team/consultant-07.jpg" },
]
