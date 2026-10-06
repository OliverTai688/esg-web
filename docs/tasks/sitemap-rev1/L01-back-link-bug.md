# L01　修正文章頁「返回學習專區」跳到別的畫面

| 項目 | 內容 |
|---|---|
| 狀態 | **已完成（2026-10-06）**：返回鈕依文章分類回到對應的主題區塊（`src/lib/learning-sections.ts`），找不到對應區塊時回 `/learning` 頂部；分類頁同步。`html` 加上 `scroll-padding-top: 60px`，全站錨點不再被 header 遮住。已在瀏覽器確認修正後的行為（原問題是讀程式碼判定的，沒有另外在舊版重現） |
| 階段 | Phase 1（Bug） |
| 類型 | Bug 修正（TSX） |
| 規模 | S |
| 相依 | 無 |
| 需求來源 | PDF p.27「共好學習-創新策略裡的文章點進去後，按返回學習專區，會跳轉到別的畫面」 |

## 重現步驟

1. 開 `/zh/learning#innovation`（或從 Navbar「共好學習 → 創新策略」進入）。
2. 點「核心策略指引：九宮格模型…」這篇文章（`content/posts/business-model-canvas-innovation.md`）。
3. 點左上角「返回學習專區」。
4. **預期**：回到剛才的「創新策略」區塊。**實際**：回到 `/learning` 頁面最上方，看到的是「全部文章」頁籤與大張的精選文章「訂閱 3 步驟」，使用者以為跳到了別的頁面。

（以上由讀程式碼推得，尚未在瀏覽器實測，動工前請先重現一次。）

## 根因

- `src/app/[locale]/learning/[slug]/page.tsx:53-55`：返回鈕是 `<Link href={`/${locale}/learning`}>`，沒有錨點、沒有分類、也不是瀏覽器的上一頁。
- `src/components/domain/FilterablePosts.tsx:19`：頁籤狀態存在 `useState("all")`，不在網址上，每次進頁面都重設為「全部文章」。
- 一篇文章有三個入口，返回鈕都不知道使用者從哪裡來：
  1. 篩選頁籤與卡片格線（`FilterablePosts.tsx:84, 124`）。
  2. 主題區塊，如 `#innovation`（`src/app/[locale]/learning/page.tsx:103-106`）。
  3. 分類頁 `/learning/category/innovation-strategy`。
- 區塊錨點與文章分類的鍵對不起來：區塊 id 是 `innovation`，文章的 `categorySlug` 是 `innovation-strategy`；兩者的對應只存在於 `learning/page.tsx:40-47` 一個沒有匯出的區域常數 `topicSections`。`announcements` 分類甚至沒有對應的主題區塊。
- 全站沒有 `scroll-mt`，header 高 60px 且 sticky，即使帶了錨點，區塊標題也會被 header 蓋住。

## 要做的事

1. 把 `topicSections`（區塊 id ↔ `categorySlug`）搬到共用模組，例如 `src/lib/learning-sections.ts`，供列表頁與文章頁共用。
2. 文章頁的返回鈕改成連到 `/${locale}/learning#${sectionId}`，`sectionId` 由文章的 `categorySlug` 查表得到；查不到（例如 `announcements`）時退回 `/${locale}/learning`。
3. 分類頁 `learning/category/[category]/page.tsx:57, 114` 的返回鈕套用同一邏輯。
4. 主題區塊加上 `scroll-mt-20`（或在 `globals.css` 對 `section[id]` 統一設定 `scroll-margin-top`），讓錨點落點不被 header 遮住。
5. 確認從文章頁以 Link 導向帶 hash 的網址時，Next 16 會正確捲到該區塊（查 `node_modules/next/dist/docs/` 中 Link 與 scroll 的說明）。
6. `insights/[slug]/page.tsx:52, 87` 有同樣寫法，但 `/insights` 沒有主題區塊，本任務不處理（見 README「順帶發現」中 insights 與 learning 重複的問題）。

## 驗收條件

- 從「創新策略」區塊進入文章再按返回，會回到 `/zh/learning#innovation`，區塊標題完整可見。
- 六個主題分類的文章都回到各自的區塊；「ESG共學坊公告」的文章回到 `/learning` 頂部。
- `/en` 行為相同。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 若使用者是從上方篩選頁籤進入文章，返回後會落在主題區塊而不是原本的頁籤。要做到完全還原，需要把頁籤狀態放進網址（`?category=`），可列為後續加強。
- `/learning` 同一篇文章會出現兩次（上方篩選格線 + 下方主題區塊），頁面偏長；是否精簡不在本任務。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
