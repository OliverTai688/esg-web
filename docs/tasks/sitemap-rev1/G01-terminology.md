# G01　全站用語統一：永續白皮書／ESG共學坊／溝通

| 項目 | 內容 |
|---|---|
| 狀態 | **已完成（2026-10-06）**：`pnpm check:terms` 通過、`pnpm build` 通過。英文用字為暫定，見文末「完成紀錄」 |
| 階段 | Phase 1（最優先，其他任務的文案都以此為準） |
| 類型 | 文案掃除（辭典 + 寫死字串 + 文章 frontmatter） |
| 規模 | M |
| 相依 | 無；H03、S04、C01、C03、C04、E03、E04 各自處理自己區塊內的字串，本任務負責其餘所有地方 |
| 需求來源 | PDF p.1、p.6、p.14、p.28 |

## 規則（客戶原文）

> 全網頁統一名稱：
> - 『永續白皮書』（不要加影響力）
> - ESG共學坊（不要只有共學坊三個字，因為這是有商標註冊的）
> - 不要用「媒合」，共好玟化是「溝通」
>
> 『共好玟化』、『ESG共學坊』均有申請商標

另外 p.28 指定分類名稱「共學坊公告」改為「ESG共學坊公告」。

## 現況盤點

**1. 白皮書（20 處，3 個檔案）**

- 明確違規「永續影響力白皮書」3 處：
  - `src/i18n/dictionaries/zh.ts:326`（S04 處理）
  - `src/app/[locale]/consulting/page.tsx:36`「永續影響力白皮書精華版」
  - `src/data/courses.ts:102`「永續影響力白皮書精華版」；`:104-105` 說明文末有「簡報式影響力報告」
- 只寫「白皮書」沒有「永續」12 處：`zh.ts:9, 118, 123, 128, 141, 265, 356, 566, 600`、`consulting/page.tsx:73, 75, 147`。
- 已正確 5 處：`zh.ts:132, 303, 482, 489`、`consulting/page.tsx:39`。
- 英文：`en.ts:322`「Impact Whitepaper」；其餘 whitepaper 出現在 `en.ts:10, 119, 124, 129, 133, 142, 264, 300, 351, 474, 481, 558, 590`（:590 拼成 "white paper"）；`src/components/domain/ProblemSolutionSection.tsx:102` 寫死 "Whitepapers"。

**2. 共學坊（39 處，沒有任何一處是「ESG共學坊」的標準寫法）**

- 前面沒有 ESG 的 24 處：
  - `zh.ts`：`9, 118, 123, 149, 169, 171, 177, 178, 308, 332, 390, 408, 513, 561, 592`
  - `consulting/page.tsx`：`83, 85, 227, 233`
  - `content/posts/subscription-3-steps.md`：`4, 5, 7, 12, 16`
- 中間多一個空格的「ESG 共學坊」15 處：15 篇文章的 `author`（`content/posts/*.md` 第 8 行）。
- 英文 "co-learning"：`en.ts:10, 119, 124, 150, 170, 172, 178, 179, 305, 328, 383, 503`。

**3. 媒合／Matchmaking**

- `zh.ts`：`113, 118, 187, 189（兩處）, 265, 285, 308, 337, 338, 408, 490, 566`
- `consulting/page.tsx`：`85, 190, 225`
- `en.ts`：`114, 119, 188, 190, 264, 283, 305, 333, 334, 400, 482, 558`
- `ProblemSolutionSection.tsx:106` 寫死 "Matchmaking"

**4. 分類名稱「共學坊公告」**

- 名稱只來自文章 frontmatter：`content/posts/subscription-3-steps.md:5`。路由與篩選全部用 `categorySlug`（`announcements`），改名不影響網址。
- 相關敘述：`learningPage.description`（`zh.ts:513`「…到共學坊公告」、`en.ts:505`）。

## 要做的事

1. **白皮書**：三處「影響力」拿掉。產品或服務名稱一律寫「永續白皮書」；同一段落內第二次以後提到可簡稱「白皮書」。
2. **ESG共學坊**：所有指稱品牌、平台、社群、課程的「共學坊」前面補上「ESG」，並統一為**中間不加空格**的「ESG共學坊」（文章 `author` 一併改）。
3. **溝通**：「媒合」依語意改寫，不要機械式取代：
   - 媒合平台 → 溝通平台
   - 供應鏈媒合 → 供應鏈對接（客戶在生態圈節點自己用了「供應鏈對接」）
   - 跨產業媒合、資源媒合 → 跨產業溝通／連結、資源連結
   - 媒合困難 → 找不到合適的合作對象（或類似自然說法）
4. **分類更名**：`subscription-3-steps.md:5` 改為「ESG共學坊公告」，`learningPage.description` 同步。
5. **英文**：`en.ts` 對應處同步改寫，「Impact Whitepaper」→「Sustainability Whitepaper」，拼法統一為 "whitepaper"；matchmaking 類改為 communication／connection 類用字（見待確認）。
6. **防呆**：新增 `scripts/check-terms.sh`（或 `package.json` 的 `check:terms` 指令），用 grep 檢查 `src/` 與 `content/` 是否出現「影響力白皮書」「媒合」「Matchmaking」以及前面沒有「ESG」的「共學坊」，有就回傳非零結束碼。之後每個任務交付前跑一次。
7. 與其他任務的分工：已被 H03、S04、C01、C03、C04、E03、E04 涵蓋的區塊，本任務可以先改，那些任務之後會用客戶新文案整段覆蓋；重點是本任務結束時防呆指令要能通過（歷史文案的例外見待確認）。

## 驗收條件

- 防呆指令在 `src/` 與 `content/` 通過（或只剩已獲客戶同意保留的例外，並以註解標明）。
- 人工檢查 `/zh` 六個頁面與一篇文章頁，看不到三類違規用語。
- `/zh/learning` 的分類頁籤顯示「ESG共學坊公告」，`/zh/learning/category/announcements` 仍可開啟。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- **客戶自己的新文案裡有違反規則的字**：p.10「影響力白皮書」、p.12「影響力白皮書」「共學坊」、p.14「共學坊」、p.21–24 時間軸與藍圖多處「影響力白皮書」「ESG 共學坊（有空格）」、p.31「供應鏈媒合優先」「共學坊每月課程」。預設做法是全部依規則改，並把這份清單交給客戶逐項確認。
- 「ESG共學坊」的標準寫法是否確定不加空格。
- 單獨的「白皮書」是否每一處都要補「永續」，還是只禁止「影響力白皮書」。
- 英文正式名稱：ESG共學坊的英文（logo 上是 "CO-ESG CLASS"）；「溝通」對應的英文用字。
- `src/data/courses.ts:101` 的 slug `impact-whitepaper` 會出現在網址 `/events/impact-whitepaper`。文字改了但網址仍含 impact；若要改 slug，需要加轉址並更新 sitemap。預設不改網址。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。

## 完成紀錄（2026-10-06）

- 新增檢查指令 `pnpm check:terms`（`scripts/check-terms.mjs`），掃描 `src/` 與 `content/`。
- 「媒合」的改寫對照：媒合平台→溝通平台；供應鏈媒合→供應鏈對接；跨產業媒合、資源媒合→跨產業連結、資源連結；跨界媒合→跨界溝通；媒合活動→產業交流活動；媒合困難→難以找到合適的合作對象。
- 首頁解方區塊底部三個寫死的英文標籤（Consulting／Whitepapers／Matchmaking）改由辭典 `problem.solutionPillars` 提供：中文「顧問輔導／永續白皮書／溝通平台」。H03 第 4 點因此已完成。
- 英文暫定用字：ESG共學坊 → "ESG Co-Learning"；永續白皮書 → "sustainability whitepaper"；溝通／對接 → "communication"／"connection"。待客戶確認正式英文名稱後再統一替換。
- 未更動：`src/data/courses.ts` 的 slug `impact-whitepaper`（網址不變）；同段落內第二次出現的簡稱「白皮書」（`consulting/page.tsx:75`）。
- 既有的 2 個 lint 錯誤（`magicui/flickering-grid.tsx:40`、`magicui/marquee.tsx:10`）與本任務無關，修改前後相同。
