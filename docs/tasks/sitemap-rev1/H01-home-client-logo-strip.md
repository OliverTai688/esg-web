# H01　首頁 Hero 下方新增「服務客戶 logo」列

| 項目 | 內容 |
|---|---|
| 階段 | Phase 3（素材相依） |
| 類型 | 新元件 + 素材 |
| 規模 | S |
| 相依 | G07（素材匯入）、G02（品牌色） |
| 需求來源 | PDF p.4「〔插入服務客戶logo（請見右側參考案例）〕」、p.9 參考案例截圖（act 網站的圓形 logo 牆） |

## 背景

客戶希望訪客在首頁第一屏之後，立刻看到共好玟化服務過哪些品牌，作為信任訊號。參考樣式是 Hero 下方兩排圓形品牌 logo。

Hero 的數字列調整不在本任務，見 G06。

## 現況

- 首頁 `src/app/[locale]/page.tsx:59-67` 渲染 `HeroSection`，其後直接接品牌故事（`:70-79`）。
- `src/components/domain/HeroSection.tsx:39` 的 Hero 是 `min-h-[100vh]`，數字列在 `:86-95`。
- 專案內沒有任何 logo 圖檔；`public/` 只有 5 個預設 svg，全站沒有用到 `next/image`。
- `src/components/magicui/marquee.tsx` 可重用（目前只有 `TrustSection` 使用）。

## 要做的事

1. 新增 `src/components/domain/ClientLogoStrip.tsx`：接收 `{ name, src }[]` 與標題字串，渲染 logo 列。
2. 在 `page.tsx` 的 Hero 與品牌故事之間插入這個區塊（不要塞進 `min-h-[100vh]` 的 Hero 內，避免第一屏被擠壓）。
3. logo 清單放在 `src/data/clients.ts`（品牌名 + 圖檔路徑），H04 的客戶回饋也會共用這份資料。
4. 辭典新增 `clients.title`（zh／en），例如「我們服務過的夥伴」。
5. logo 數量少於 8 個時用靜態格線，足夠多才用 marquee，避免明顯重複。
6. 每張圖要有 `alt`（品牌名），並統一高度、灰階或原色擇一（跟 G02 的視覺方向一致）。

## 驗收條件

- `/zh` 與 `/en` 首頁 Hero 下方都看得到 logo 列，手機寬度不產生水平捲動。
- logo 圖檔來自 `public/`，沒有外連圖片。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- **素材阻擋**：客戶 logo 在 Google Drive（見 README 素材清單「客戶 logo 圖檔」「合作夥伴、客戶 logo」），需先下載並確認哪些品牌可以公開露出。
- logo 檔案格式不一（有底色／無底色）時需要先做去背或統一底色。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
