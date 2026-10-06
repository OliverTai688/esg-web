# H03　首頁「我們在解決什麼」三張卡片改寫

| 項目 | 內容 |
|---|---|
| 狀態 | **已完成（2026-10-06）**：中間與右側兩張卡已換文案；右側卡小標改為「對國際接軌」、圖示改 `Globe`；卡片說明取消三行截斷，觸控裝置也能看到全文 |
| 階段 | Phase 1（純文案） |
| 類型 | 文案（辭典）+ 少量 TSX |
| 規模 | S |
| 相依 | 無（用語部分與 G01 重疊，本任務直接處理這個區塊內的字串） |
| 需求來源 | PDF p.6 |

## 背景

客戶調整了三張痛點卡的中間與右側兩張，並要求這個區塊內的用語改掉「共學坊」「媒合平台」「Matchmaking」。

## 現況

- 元件：`src/components/domain/ProblemSolutionSection.tsx`。
  - 卡片 `:52-71`，說明文字預設 `line-clamp-3`、滑鼠移上去才展開（`:65`）。
  - 解方區塊 `:74-110`，其中 `Matchmaking`（`:106`）、`Consulting`（`:98`）、`Whitepapers`（`:102`）、`CO-ESG SOLUTION`（`:82`）是寫死的英文。
- 圖示在 `src/app/[locale]/page.tsx:87-89` 依序注入（Search、Factory、TreePine）。
- 辭典：`problem`，`zh.ts:92-119`、`en.ts:93-120`。
  - `painPoints[1]`（:103-108）標題已是「供應鏈資訊不透明」，只需換說明。
  - `painPoints[2]`（:109-114）標題「大小企業間缺乏橋樑」，說明含「知識轉譯與媒合的角色」，整張要換。
  - `solutionDescription`（:117-118）含「共學坊與媒合平台」。

## 要做的事

1. `painPoints[1].description` 換成下方「中間」文案。
2. `painPoints[2]` 的標題與說明換成下方「最右」文案；`page.tsx:89` 的 `TreePine` 圖示換成較貼近「國際接軌」的圖示（例如 `Globe`）。
3. `solutionDescription`：「共學坊」→「ESG共學坊」、「媒合平台」→「溝通平台」。
4. （已在 G01 完成，辭典鍵為 `problem.solutionPillars`）`ProblemSolutionSection.tsx:106` 的 `Matchmaking` 改為由辭典提供（zh「溝通」，en 用客戶認可的英文，暫定 "Communication"）；同一排的 `Consulting`、`Whitepapers` 一併進辭典（zh「顧問」「永續白皮書」）。
5. 新文案比原本長，確認卡片在 `line-clamp-3` 下不會把關鍵句截掉；必要時改成 4 行或取消截斷。
6. en 同步。

## 客戶文案（原文）

**中間卡**

> 供應鏈資訊不透明：
> 具備及符合 ESG 採購標準的廠商沒有適合的平台被看見，我們協助建立一個供應鏈與企業可以對接的溝通平台

**最右卡**

> 接軌國際趨勢：
> ISO、GRI、TCFD、生物多樣性、CBAM…這麼多國際標準，在公司資源有限下，共好玟化扮演知識轉譯與溝通的角色，協助企業與國際 ESG 接軌

**用語替換**

- 共學坊 → ESG共學坊
- 媒合平台 → 溝通平台
- Matchmaking → 溝通

## 驗收條件

- `/zh` 首頁該區塊看不到「媒合」「Matchmaking」，也沒有前面沒帶「ESG」的「共學坊」。
- 三張卡的文字在桌機與手機都完整可讀。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 左側第一張卡客戶沒有提修改，維持原樣。
- 右側卡的小標籤目前是「對整體環境」（`painPoints[2].label`），換成國際接軌主題後是否保留，建議改為「對國際接軌」並請客戶確認。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
