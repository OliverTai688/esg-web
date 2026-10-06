# G05　手機版 RWD 優化

| 項目 | 內容 |
|---|---|
| 階段 | Phase 5（內容與視覺都定案後做一次總檢）；Phase 1–3 的每個任務各自保證自己的區塊在手機可用 |
| 類型 | 樣式調整 + 互動修正 |
| 規模 | M–L |
| 相依 | G02（換色後再驗）、各頁結構任務 |
| 需求來源 | PDF p.2「手機版本 RWD 優化」 |

## 背景

客戶只寫了一句「手機版本 RWD 優化」，沒有列出具體問題。下面的清單是讀程式碼找出的嫌疑點，**尚未在實機或模擬器上逐一確認**。動工的第一步是用 375px 與 768px 寬度把六個頁面實際走一遍，確認哪些是真的問題。

## 嫌疑清單

**水平溢出與固定寬度**

- `src/components/domain/TrustSection.tsx:38`：回饋卡 `w-[350px]`，幾乎等於 375px 螢幕寬（H04 會重做這個區塊）。
- `src/components/core/BackgroundPattern.tsx:127`：背景大字 `text-[20vw] whitespace-nowrap`，像 "COMMUNITY"、"TIMELINE" 會超出螢幕，靠外層 `overflow-hidden` 裁掉。
- `src/components/domain/FilterablePosts.tsx:31`：分類頁籤橫向捲動用了 `scrollbar-hide`，但專案沒有定義這個 class，捲軸會露出來，也沒有「還有更多」的提示。
- `src/components/domain/CTASection.tsx:45`：主要按鈕 `h-16 px-16 text-lg`，光左右內距就 128px，長文字會撐破。

**內距與字級沒有小螢幕版本**

- `src/components/domain/ProblemSolutionSection.tsx:74`：`rounded-[3rem] p-12`，手機上文字可用寬度只剩約 230px；卡片 `p-10`（`:58`）。
- `src/components/domain/FutureSection.tsx:205`（`p-10`）、`:195`（`mb-32`）。
- `FutureSection.tsx:46, 54`：時間軸卡片的 `text-right` 沒有加 `md:` 前綴，手機上每隔一張卡會靠右對齊，但中線在手機是隱藏的。
- `src/components/domain/StorySection.tsx:46-50`：`aspect-[4/5]` + `p-12` 的視覺卡在手機上約 410px 高；`:56, 60` 的引號用負值定位在卡片外。
- `src/components/domain/HeroSection.tsx:39`：`min-h-[100vh]`（應為 `dvh`，否則手機瀏覽器網址列會造成跳動）；`:87` 數字列 `grid-cols-2 gap-10` 配 `text-3xl`。
- `src/app/[locale]/sustainability/page.tsx:225, 235`：`grid-cols-2 gap-8` 配 `text-4xl` 數字。
- `src/components/core/Section.tsx:10-12`：區塊上下內距在手機偏大（`py-20`／`py-32`），頁面會非常長。

**字太小**

- `text-[9px]` 到 `text-[11px]` 配寬字距的標籤約 35 處，例如 `TrustSection.tsx:49, 55`、`src/components/core/Heading.tsx:54`、`HeroSection.tsx:48, 91`、`src/components/domain/EvidenceCard.tsx:45, 48`、`events/page.tsx:288, 315, 643`、`sustainability/page.tsx:183, 190`。中文字在 10px 以下很難讀，建議下限 12px。

**依賴滑鼠 hover 的內容（觸控裝置看不到）**

- `src/components/ui/flip-card.tsx:29-32`：固定高度 280px，mouseenter 與 click 都會翻面，觸控點一下可能連翻兩次。提示文字寫死中文（`:53, :75`）。
- `ProblemSolutionSection.tsx:65`：說明文字 `line-clamp-3`，只有 hover 才展開。
- `TrustSection.tsx:64`、`EvidenceCard.tsx:68`：`line-clamp-3` 沒有展開方式。
- `src/components/domain/EcosystemNetwork.tsx:145-146`：節點互動靠 hover。

**導覽**

- `src/components/domain/Navbar.tsx:710`：手機選單 `max-h-[80vh]`，應改 `dvh`。
- 斷點是 `lg`（1024px），平板直向用漢堡選單，橫向用 hover 選單但觸控打不開（G03 處理鍵盤與點擊）。
- 錨點落點被 sticky header 蓋住（G03 統一處理 `scroll-margin-top`）。

**其他**

- `src/app/[locale]/consulting/page.tsx:152-162`：方案卡在手機仍是橫排，「最受歡迎」標記可能蓋到標題與價格。
- `consulting/page.tsx:315`：FAQ 答案左內距 `pl-[4.25rem]`，手機上太寬。
- `src/components/domain/MethodologyBeam.tsx:77-95`：手機直排時，連接光束的曲線仍以橫排為準。
- 效能：`src/app/[locale]/layout.tsx:105-108` 有固定全螢幕的點陣與雜訊層，各頁還有多個大範圍模糊光暈與 50 顆粒子的 canvas，低階手機可能掉幀（未量測）。

## 要做的事

1. 以 375×812、390×844、768×1024 三種尺寸走完六個頁面（zh 與 en），把實際問題截圖列表，對照上面的嫌疑清單打勾或劃掉。
2. 依清單修正。原則：
   - 任何寬度下不出現水平捲動。
   - 文字最小 12px；可點擊目標至少 44×44px。
   - 被截斷的文字在觸控裝置上要有展開方式，或乾脆不截斷。
   - hover 互動都要有點擊的等效操作。
   - 高度單位用 `dvh`。
3. 手機上縮小區塊上下內距，並在 `prefers-reduced-motion` 與小螢幕下關閉或簡化粒子、光暈動畫。
4. 用 Lighthouse（行動裝置模式）量測首頁與共好永續力頁，記錄效能與無障礙分數，目標 90 以上。

## 驗收條件

- 六個頁面在 375px 寬度下沒有水平捲動，沒有被裁切或重疊的文字。
- 觸控操作可以看到所有原本需要 hover 才出現的內容。
- Lighthouse 行動版效能與無障礙分數各 90 以上，或說明達不到的原因。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 客戶是否有具體看到的手機問題（截圖或機型）。有的話請提供，優先處理。
- 部分區塊會被其他任務重做（H04、S03、E02、E03），這些區塊的手機版由該任務負責，本任務只做最後總檢。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
