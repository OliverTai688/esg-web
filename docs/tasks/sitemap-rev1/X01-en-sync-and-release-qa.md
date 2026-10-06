# X01　英文版同步與上線前總驗收

| 項目 | 內容 |
|---|---|
| 階段 | Phase 5（最後） |
| 類型 | 翻譯審校 + 驗收 |
| 規模 | M |
| 相依 | 其他所有任務 |
| 需求來源 | 非客戶直接提出；因辭典結構綁定與本次大量新增中文文案而必要 |

## 背景

這次客戶提供的所有新文案都只有中文。但專案的辭典結構是綁定的：`Dictionary = DeepString<typeof zh>`（`src/i18n/dictionaries/zh.ts:676-688`），`en.ts` 的鍵與結構必須與 `zh.ts` 完全一致，否則 build 失敗。所以每個任務在做的時候都得同時寫英文，那些英文都是開發時的暫譯。

此外，現在的英文版本來就有不少地方顯示中文，因為字串寫死在元件裡。

## 現況：英文版已知問題

- 寫死中文、英文版也顯示中文的地方：
  - `src/app/[locale]/consulting/page.tsx` 大部分內容（C01、C03 處理）。
  - `src/components/domain/Navbar.tsx` 的欄位小標（G03 處理）。
  - `src/components/domain/StorySection.tsx:58, 112`（H02 處理）。
  - `src/components/domain/MethodologyTerminal.tsx`（S03 刪除）。
  - `src/components/ui/flip-card.tsx:53, 75`「滑動查看更多」「詳細現況」。
  - `src/app/[locale]/page.tsx:152, 155`（用語系三元運算寫死的中段 CTA）。
  - `src/app/[locale]/events/[slug]/page.tsx:29, 54-55, 75-80, 145, 154, 165, 171, 177, 185`。
  - `src/app/[locale]/events/page.tsx:461`。
  - `src/app/[locale]/insights/**` 多處。
- `src/data/courses.ts` 與 `content/posts/*.md` 只有中文。
- 頁面標題重複品牌尾綴：`layout.tsx` 的標題樣板已經加上「| 共好玟化 CO-ESG」，但 `consulting/page.tsx:19`、`join/page.tsx:36`、`insights/category/[category]/page.tsx:30`、`learning/category/[category]/page.tsx:31` 自己又加了一次。

## 要做的事

1. **英文審校**：彙整本次所有新增與修改的英文字串成一份對照表（鍵、中文、暫譯），交給客戶或譯者審閱，回來後一次更新。專有名詞先定案：共好玟化（Gung Ho Culture）、ESG共學坊、永續白皮書、雙效益理論、IOOI。
2. **清掉殘留的寫死中文**：上面清單中沒有被其他任務涵蓋的項目（`flip-card.tsx`、首頁中段 CTA、活動詳情頁、`events/page.tsx:461`）搬進辭典。
3. **課程與文章的英文**：決定英文版如何處理只有中文的課程資料與文章——翻譯、在英文版隱藏、或顯示「僅提供中文」的提示。預設建議第三種，成本最低且誠實。
4. **用語防呆**：跑 G01 建立的檢查指令，確認為零。
5. **逐頁驗收**（zh 與 en，各六個頁面加一篇文章、一個活動詳情頁）：
   - 內容與各任務檔的客戶原文一致。
   - 所有按鈕與連結都有實際去處（沒有空按鈕）。
   - Navbar 錨點順序正確、落點不被遮住。
   - 桌機 1440px、平板 768px、手機 375px 三種寬度。
6. **SEO 與分享**：
   - 修正重複的標題尾綴。
   - 每頁的 `title`、`description` 與新內容相符。
   - 社群分享圖存在且正確（G02）。
   - `sitemap.xml`、`robots.txt`、`feed.xml` 的網域與正式上線網域一致（見 G04 的網域問題）。
   - JSON-LD 通過 Google Rich Results 測試。
7. **表單實測**：聯絡表單、email 訂閱、候補名單各送一次，確認收信與名單（B01、J01、C04）。
8. 產出一份給客戶的驗收清單：對照 PDF 的每一條需求，標示已完成／待客戶提供／有調整（附原因）。

## 驗收條件

- `/en` 六個頁面沒有非預期的中文。
- 用語檢查指令通過。
- 驗收清單涵蓋 PDF 全部需求，每一條都有狀態。
- `pnpm lint`、`pnpm build` 通過；正式環境部署後實際抽查。

## 待確認／風險

- 英文版的重要程度：若客戶目前不重視英文版，可以考慮暫時下架英文切換，省下每個任務的翻譯成本。這需要客戶決定，但原需求書（`docs/requirement-doc.md`）把中英語系列在交付範圍內。
- 審校由誰負責、時程多久，會影響上線日。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
