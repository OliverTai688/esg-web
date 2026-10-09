// /join copy. Single goal: add the official LINE account.
// The page has no chapters (it is a plain navbar link). Its numbers come from
// `impact.track` in common.ts, never from this file (G06).
// Layout decisions: docs/redesign/pages-v2/join/.
const join = {
  meta: {
    title: "加入我們",
    description: "加入共好玟化官方 LINE，收到永續趨勢、課程與合作機會的第一手消息。",
  },
  label: "加入我們",
  hero: {
    kicker: "LINE 官方帳號",
    title: "成為改變的一份子",
    description: "加入共好玟化的永續社群，與來自不同領域的實踐者一起，讓好的事被看見、被理解、被連結。",
    lineBtn: "加入 LINE 官方帳號",
    // Accessible name of the QR code
    qrLabel: "用手機掃描 QR Code 加入",
    lineId: "LINE ID",
    seconds: "一分鐘完成",
  },
  benefits: {
    label: "加入好處",
    title: "加入後，你會收到什麼？",
    items: [
      { title: "永續趨勢週報", description: "國內外 ESG 政策更新、產業動態與市場趨勢，每週精選推送。" },
      { title: "活動與課程優先通知", description: "ESG共學坊工作坊、國際論壇等活動搶先報名，把握每一次學習與交流的機會。" },
      { title: "跨產業合作機會", description: "與農業、設計、科技、社會企業等不同領域的永續實踐者交流，創造跨界合作的可能。" },
      { title: "專屬資源與優惠", description: "會員專屬的永續白皮書摘要、顧問諮詢優惠與合作夥伴的獨家折扣。" },
    ],
  },
  steps: {
    label: "如何加入",
    title: "三步驟，成為共好夥伴",
    items: [
      { title: "掃碼加入", description: "掃描 QR Code 或點擊按鈕，加入共好玟化 LINE 官方帳號。" },
      { title: "接收資訊", description: "開始接收永續趨勢、活動通知與合作機會等第一手訊息。" },
      { title: "參與互動", description: "報名活動、回覆訊息、加入討論，成為永續生態圈的一份子。" },
    ],
  },
  // The one secondary way out, under the closing LINE card
  alt: {
    title: "還在評估？",
    link: "先看看我們辦過的活動",
  },
}

export default join
