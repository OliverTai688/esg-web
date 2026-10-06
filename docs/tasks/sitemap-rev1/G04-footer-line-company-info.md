# G04　Footer：加入官方 LINE 按鈕與公司基本資料

| 項目 | 內容 |
|---|---|
| 階段 | Phase 1 |
| 類型 | TSX + 辭典 + 結構化資料 |
| 規模 | S |
| 相依 | 無（與 B01 共用 `src/lib/site.ts`，先做的任務建立這個檔） |
| 需求來源 | PDF p.9 |

## 背景

客戶要求頁尾加上官方 LINE 按鈕，並列出公司基本資料。

## 客戶提供的資料（原文）

- 公司名稱：共好玟化組織發展顧問有限公司（Gung-Ho Culture Ltd.）
- 統一編號：90223501
- 創辦人：吳玟樺（Evvon）
- 成立年份：2022 年
- 公司地址：臺北市松山區南京東路4段50號11樓
- 官方網站：<https://coesg.tw/>
- 電子信箱：gungho90223501@coesg.tw

## 現況

- `src/components/domain/Footer.tsx`（49 行，server component）：品牌字樣（`:30-32`）、標語（`:33-35`）、四個連結（`:38-41`：共好永續力、永續足跡、共好學習、合作洽詢）、版權（`:43-45`）。沒有公司資料、信箱、LINE，也沒有「加入我們」連結。
- 辭典：`footer`，`zh.ts:249-254`、`en.ts:250-255`。
- 官方 LINE 網址只存在於 `src/app/[locale]/join/page.tsx:26-27`（`https://line.me/R/ti/p/@381iutjm`、`@381iutjm`）。
- 程式裡現有的信箱是 `90223501gungho@gmail.com`（`consulting/page.tsx:384`、`layout.tsx:98`），與客戶這次提供的不同。
- JSON-LD Organization 在 `src/app/[locale]/layout.tsx:87-103`，名稱寫「共好玟化 CO-ESG」，沒有地址、統編、創辦人、成立年份。

## 要做的事

1. 建立（或沿用）`src/lib/site.ts`，集中：公司中英文名稱、統編、創辦人、成立年份、地址、官網、公司信箱、客服信箱、LINE 網址與 ID。
2. Footer 改為多欄版面：
   - 品牌欄：logo／字樣、標語、官方 LINE 按鈕（LINE 綠色按鈕 + 圖示，另開分頁，`rel="noopener noreferrer"`）。
   - 導覽欄：五個主要頁面（補上「加入我們」）。
   - 公司資料欄：上列七項，信箱為 `mailto:`、官網為連結、地址為純文字。
   - 最下方版權列。
3. 公司資料的欄位標題（公司名稱、統一編號…）放辭典 `footer.company.*`，zh／en 同步；資料值從 `site.ts` 讀。英文地址請客戶提供或用郵局的英譯格式。
4. 更新 `layout.tsx` 的 JSON-LD：`legalName`、`taxID`、`founder`、`foundingDate`、`address`（PostalAddress）、`email`、`sameAs`（LINE）。
5. 手機版改為單欄堆疊，LINE 按鈕夠大好點（高度至少 44px）。

## 驗收條件

- 每一頁頁尾都有官方 LINE 按鈕與七項公司資料，內容與上方原文一致。
- LINE 按鈕開啟官方帳號加好友頁；信箱可點擊開啟郵件軟體。
- 頁面原始碼的 JSON-LD 含公司正式名稱、統編、地址。
- 手機寬度下排版整齊、沒有水平捲動。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 官方 LINE 帳號是否就是程式裡的 `@381iutjm`，請客戶確認。
- 信箱有三個：公司資料寫 `gungho90223501@coesg.tw`、客服寫 `pt@coesg.tw`（p.32）、程式裡是舊的 Gmail。預設頁尾公司資料用前者、聯絡表單與客服用後者、Gmail 全部移除。
- 「官方網站 https://coesg.tw/」依現有資料推測目前是 ESG共學坊學習平台的網址（客戶時間軸寫「ESG 共學坊平台上線（coesg.tw）」），而新站部署在 `esg-web-flame.vercel.app`，程式裡的 `metadataBase`、sitemap、robots、RSS 也都寫 `https://coesg.tw`。新站正式上線後的網域是哪一個、舊平台是否搬到子網域，**會影響 SEO 設定與這個欄位的寫法，需客戶確認**。
- 版權列目前寫「共好玟化 CO-ESG」，是否改用公司正式名稱。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
