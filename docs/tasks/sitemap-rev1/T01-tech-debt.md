# T01　順帶發現的技術債（非客戶需求，建議處理）

| 項目 | 內容 |
|---|---|
| 階段 | 穿插在 Phase 1–2（各項都很小）；可依時間取捨 |
| 類型 | 清理與修正 |
| 規模 | 每項 XS–S |
| 相依 | 無 |
| 需求來源 | 分析程式碼時發現，客戶文件未提及 |

這些不是客戶提的需求，但會影響這次改版的品質或之後的維護。每一項都可以獨立做，也可以不做；請依時間決定。

## 項目

**1. `middleware` 是這個 Next 版本已棄用的慣例**

- `src/middleware.ts`（`export function middleware`，`:17`）負責語系轉址。
- Next 16 把 `middleware` 檔名與匯出名稱改為 `proxy`，舊名稱已標示棄用。依據：`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:625-645`、`01-app/03-api-reference/03-file-conventions/proxy.md`；官方有提供 codemod（`upgrading/codemods.md:106-114`）。
- 做法：改名為 `src/proxy.ts`、匯出 `proxy`，驗證 `/` → `/zh` 的轉址仍正常。

**2. `/insights` 與 `/learning` 內容完全重複**

- `src/app/[locale]/insights/**` 是同一批文章的第二套頁面，每篇文章同時存在於 `/learning/{slug}` 與 `/insights/{slug}`。
- 沒有任何導覽連到 `/insights`，但 `src/app/sitemap.ts:14, 30` 與 `src/app/feed.xml/route.ts:13, 17` 對外公布的卻是 `/insights` 的網址，也沒有 canonical 標記，對搜尋引擎是重複內容。
- 做法：二選一。保留 `/learning`，把 `/insights/*` 轉址過去並從 sitemap、RSS 移除；或兩者定位分開。建議前者。

**3. 課程資料過期**

- `src/data/courses.ts:36, 51, 66` 三堂課的日期（2026-04-26、05-10、06-14）都已過去，但 `status` 是手動欄位，仍顯示「招生中」。
- 「問卷設計實作工作坊」的日期在三個地方不一致（時間軸 2024、`courses.ts` 2026-03-15、原始資料 2024-12-22）。
- 做法：請客戶提供最新課表；`status` 改為依日期自動判斷「已結束」。

**4. 沒有作用的按鈕**

- `src/components/domain/CTASection.tsx:42-56`（永續足跡、加入我們頁尾的兩顆按鈕）、合作洽詢 Hero 與方案卡按鈕、活動詳情「立即報名」。
- 已列入 B01 的 A 部分；若 B01 延後，這一項請先獨立處理，空按鈕對訪客的觀感很差。

**5. 死碼與無效設定**

- `src/components/domain/EcosystemBeam.tsx`（無引用；S06 會刪）。
- `src/components/ui/navigation-menu.tsx`、`Navbar.tsx` 的 `MegaMenuItem`（G03 會刪）。
- `src/components/ui/collapsible.tsx`（無引用）。
- `tailwind.config.ts`：Tailwind v4 下沒有被載入，裡面的自訂鍵全站沒用到（G02 會刪）。
- 辭典中沒被使用的鍵：`trust.filters`、`sustainabilityPage.proof.caseTitle`、`metrics[].suffix`、`evidence.cards[].trend`、`sustainabilityPage.title`、`contactForm.success`（B01 會用到）。
- `src/components/domain/FutureSection.tsx:74` 的 `rgba(var(--accent),0.2)` 是無效的 CSS（`--accent` 是 oklch 值）。

**6. 細節**

- `src/components/domain/FilterablePosts.tsx:31` 用了不存在的 `scrollbar-hide` class。
- `src/app/feed.xml/route.ts:16` 的 `<category>` 沒有做 XML 跳脫。
- 文章的 `cover` 欄位有讀取（`src/lib/posts.ts:18, 67`）但從未顯示。
- 加入我們頁的 LINE QR Code 是假圖示（J01 會補）。
- 版控狀態裡有一個被刪除但未提交的暫存檔 `docs/.~品牌 Landing Page 訪談文件.docx`（Word 的鎖定檔），建議把 `.~*` 加進 `.gitignore`。

## 驗收條件

- 選擇處理的每一項各自有獨立的 commit，並在 PR 說明做了什麼、為什麼。
- `pnpm lint`、`pnpm build` 通過。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
