# H04　首頁「客戶回饋」改為品牌 logo 牆 + 回饋彈窗

| 項目 | 內容 |
|---|---|
| 階段 | Phase 3（素材相依） |
| 類型 | 新元件 + 資料結構變更 + 素材 |
| 規模 | M |
| 相依 | G07（素材匯入）；與 H01 共用 `src/data/clients.ts` |
| 需求來源 | PDF p.9 |

## 背景

客戶原話：「『他們這樣說共好玟化』改為『客戶回饋』。直接用品牌 LOGO，點擊 LOGO 會跑出回饋的視窗（客戶回饋文字可以用 hover 呈現，鼠標過去會有 lightbox 之類的做法）」。

也就是把現在兩排跑馬燈的引言卡片，換成以 logo 為主的牆；滑鼠移上去或點擊才看到回饋內容。

## 現況

- 元件：`src/components/domain/TrustSection.tsx`（server component）。
  - 引言卡 `:30-70`，兩排 `Marquee` `:98-114`。
  - 卡片有 `cursor-pointer` 但沒有任何點擊行為。
- 辭典：`trust`，`zh.ts:193-241`、`en.ts:194-242`。
  - `label`（:194）已是「客戶回饋」；`title`（:195）是「他們這樣說共好玟化」，這是要改的字串。
  - `testimonials` 4 筆：思凡自然農場、兔耳生活有限公司、台灣休閒農場學會、齊禾品牌顧問。欄位 `highlight, quote, name, company, title, category, tag`。
  - `filters`（:197-202）沒有任何地方使用。
- `Marquee` 會把子元素複製 4 份，而且外層 `overflow-hidden`，所以彈出層一定要 portal 到 body。現成的 `src/components/ui/dialog.tsx` 已經 portal 到 body。

## 要做的事

1. `trust.title` 改為「客戶回饋」；原本的 `label` 換成別的小標（例如「合作夥伴怎麼說」）或移除，避免標題與小標重複。
2. 每筆回饋增加 `logo` 欄位（指向 `public/` 內圖檔，建議從 `src/data/clients.ts` 以品牌 id 對應，辭典只放文字）。
3. 把 `TrustSection` 拆成 server 外殼 + client 的 `TestimonialLogoWall`：
   - 預設顯示 logo 格線（4 個品牌時不要用跑馬燈，會明顯重複）。
   - 桌機：hover 或鍵盤 focus 時顯示回饋摘要；點擊開啟 Dialog 顯示完整回饋（引言、姓名、公司、職稱）。
   - 觸控裝置：點擊直接開 Dialog。
4. logo 按鈕要有 `aria-label`（「查看 {品牌} 的回饋」），Dialog 可用 Esc 關閉。
5. 刪除沒用到的 `trust.filters`（zh／en 同步）。

## 驗收條件

- 區塊標題顯示「客戶回饋」。
- 桌機 hover 與點擊、手機點擊都能看到完整回饋文字，彈出層不會被裁切。
- 可用鍵盤 Tab 逐一聚焦 logo 並用 Enter 開啟。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- **素材阻擋**：需要 4 個回饋品牌的 logo 圖檔（Drive「客戶 logo 圖檔」資料夾）。
- 現有 4 則回饋文字是否沿用，或客戶要提供新的回饋（`docs/data/6. 客戶回饋 的副本.md` 有原始素材可對照）。
- 若客戶之後要放 10 個以上品牌，再評估換回跑馬燈。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
