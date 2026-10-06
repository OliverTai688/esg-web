# G02　品牌視覺：改用共好玟化 CIS 標準色與正式 logo

| 項目 | 內容 |
|---|---|
| 階段 | 色彩方向確認 Phase 0；token 切換 Phase 2 開頭；logo 置入 Phase 3 |
| 類型 | 設計決策 + 主題 token + 素材 |
| 規模 | L |
| 相依 | G07（CIS 規範文件與 logo 檔）；會影響所有頁面的外觀 |
| 需求來源 | PDF p.1–2 |

## 背景

客戶原文：

> 本次形象網站主視覺以『共好玟化』標準色、使用規範為主（『共好玟化CIS』圖檔資料夾）
>
> 商城、ESG共學坊主題頁面以『ESG共學坊』使用規範 p41–p47 為主（『ESG共學坊CIS』圖檔資料夾）
>
> 此案提及『ESG共學坊』，使用此連結 logo（綠色）

CIS 標準色（印刷色）：

| 色名 | Pantone | CMYK |
|---|---|---|
| 橘 | 165C | M75 Y100 |
| 黃 | 7548C | M30 Y100 |
| 灰 | Cool Grey 11C | C10 K80 |

ESG共學坊 logo 有三個版本：CLASS（綠）、STORE（橘）、TALKS（黃）。

現在的網站是深綠色主題，與共好玟化的 CIS 不符。這是本次改版影響面最大的一項。

## 現況

- **主題在 `src/app/globals.css`**（Tailwind v4）。`tailwind.config.ts` 沒有被載入，是死檔。
  - `:root`（`:126-188`）：`--primary: oklch(38% 0.1 160)`（深祖母綠，`:138`）、`--accent: oklch(84% 0.21 82)`（金黃，`:146`）、`--secondary`（薄荷綠，`:142`）、`--ring`（`:168`）等。
  - 檔頭註解（`:7-19`）寫明設計比例：60% 中性、30% ESG 綠、10% 橘黃。
  - 已定義但全站沒用到的色階：`--color-flame-*`（橘，`:58-67`）、`--color-sun-*`（黃，`:70-79`）、`--color-warm-gray-*`（`:82-91`）、`--color-esg-*`（綠，`:46-55`）。
  - `.dark` 區塊（`:193-238`）沒有任何地方啟用。
  - `.bg-topo`（`:289`）的 SVG 線條顏色寫死綠色 `%232B6E50`。
- **元件大多有用語意 token**：`primary` 類 class 約 285 處、`accent` 約 116 處，所以換 token 值就會跟著變。
- **不會跟著 token 變的寫死綠色**：
  - `src/components/core/AnimatedGradientBackground.tsx`：19 個綠／萊姆色 `rgba()`（`:58-210`）。用在首頁 Hero、共好永續力 Hero 與 CTA、永續足跡 Hero、加入我們 Hero、生態圈。
  - `src/components/domain/ParticleNetwork.tsx:23, 24, 140, 156`
  - `src/components/domain/EcosystemNetwork.tsx:158`
  - `src/components/domain/FutureSection.tsx:178`（`rgb(43, 110, 80)`）；`:74` 的 `rgba(var(--accent),0.2)` 是無效寫法（`--accent` 是 oklch 值）。
  - `src/components/domain/MethodologyBeam.tsx:83-84, 93-94`
  - `src/components/domain/MethodologyTerminal.tsx:43`（`text-emerald-600`，S03 會刪掉這個元件）
- **整片深綠的區塊**來自 `Section` 的 `background="primary"`（`src/components/core/Section.tsx:18`）：共好永續力 Hero 與成果區、永續足跡 Hero 與案例區、`CTASection`、首頁解方區塊、品牌故事左側卡、翻轉卡背面等。
- **Logo**：沒有任何圖檔。Navbar（`src/components/domain/Navbar.tsx:575-585`）與 Footer（`Footer.tsx:30-32`）的 logo 都是文字「共好」+ 綠色「玟化」。favicon 是 create-next-app 預設檔。沒有 OG 圖。
- **字型**：`src/app/[locale]/layout.tsx:44-61` 只載入拉丁字型（Geist、DM Sans），中文用系統字型。

## 關鍵設計問題（要先決定）

橘色是中間亮度的顏色，直接把 `--primary` 從深綠換成橘色會出問題：

- 現有大量「`bg-primary` + 白字」的區塊與按鈕，白字放在橘色上對比不足，不符合無障礙標準。
- 橘色當整片背景比深綠刺眼得多，整頁都是橘色區塊會很吃力。

建議的色彩分工：

| 角色 | 用色 | 用途 |
|---|---|---|
| 深色面／主要文字 | Cool Grey 11C | 取代現在整片深綠的區塊、標題與內文 |
| 品牌主色 | 橘 165C | 主要按鈕、連結、重點標記、圖示 |
| 輔助強調 | 黃 7548C | 標籤、次要強調、插圖點綴 |
| 中性底 | 暖白／淺灰 | 頁面背景 |

主要按鈕用橘底配深色字，或用加深一階的橘色配白字，以對比檢查結果為準。

## 色值（2026-10-06 由客戶原始檔量測）

**規範文件沒有定義螢幕色值。** `assets-raw/共好玟化logo/共好玟化品牌識別基本系統.pdf`（7 頁，2022-02 製作）第 2 頁的標題就是「標準標誌＆企業標準色（印刷色）」，只列 Pantone 與 CMYK；檔案內的顏色也是以 Pantone 特別色定義，沒有 RGB 或 HEX。所以螢幕色值必須由我們提出、客戶確認。

另外更正：黃色是 **Pantone 7548C**，不是先前從需求文件截圖讀到的 7549C。

三種可得的螢幕色值來源：

| 顏色 | 規範（印刷） | A. 規範 PDF 轉成螢幕的顏色 | B. 客戶現有的螢幕版 logo PNG | C. Pantone 公布的對應值 |
|---|---|---|---|---|
| 橘 | Pantone 165C／M75 Y100 | `#F25232` | `#E2623D` | `#FF671F` |
| 黃 | Pantone 7548C／M30 Y100 | `#FAB40A` | `#F4B429` | `#FFC600` |
| 灰 | Pantone Cool Grey 11C／C10 K80 | `#4D515B` | （該檔只有火焰圖形，沒有灰） | `#53565A` |

- A：把規範 PDF 第 2 頁轉成圖後取色票中心點。轉換沒有套用色彩描述檔，不同軟體開同一份檔案會略有差異。
- B：`assets-raw/共好玟化logo/unnamed.png` 的實際像素值，是客戶目前在數位場合使用的 logo 顏色，比 A 稍微偏暗。
- C：Pantone 官方色彩查詢頁公布的 sRGB 對應值（經網路搜尋取得，未逐頁核對 pantone.com）。比 A、B 更鮮豔。

**建議以 A 為起稿值**（橘 `#F25232`、黃 `#FAB40A`、灰 `#4D515B`）：三色出自同一份規範文件、彼此一致，也最接近客戶打開規範時看到的樣子。網頁用的 logo SVG 從 `.ai` 匯出後，把填色改成同一組色值，讓 logo 與介面顏色完全一致。定稿前請客戶或原設計師看過示意圖確認。

**對比檢查（WCAG，內文需 4.5:1，大字與介面元件需 3:1）**

| 組合 | 對比 | 結論 |
|---|---|---|
| 灰 `#4D515B` 底 + 白字 | 7.9:1 | 可用。適合當深色區塊與內文字色 |
| 橘 `#F25232` 底 + 白字 | 3.5:1 | 只能用於大字或粗體按鈕文字；一般大小的內文不行 |
| 橘 `#F25232` 底 + 近黑字 `#1F2022` | 4.7:1 | 可用 |
| 橘 `#F25232` 字 + 白底 | 3.5:1 | 只能用於大標題與圖示，不能當內文連結色 |
| 黃 `#FAB40A` 底 + 白字 | 1.8:1 | 不可用 |
| 黃 `#FAB40A` 底 + 灰 `#4D515B` 字 | 4.1:1 | 只能用於大字；一般文字要用更深的字色（近黑為 9.0:1） |

這證實了上一節的判斷：橘色不能直接取代深綠當「底色 + 白字」的主色；需要文字的橘色按鈕與連結要用加深一階的橘。

**規範中的 logo 使用規則**

- 三種組合：橫式、上下、直式（第 4 頁）。Navbar 用橫式。
- 留白：四周保留 logo 總寬度的 1/10（第 5–7 頁）。
- 有色背景上盡量用單色 logo（第 3 頁）。規範示範的組合：黑底配彩色、黑底配單黃、黑底配反白；橘底配反白；黃底配單橘；灰底配反白。

**ESG共學坊 logo 的顏色**（供 C 區子主題使用）

`assets-raw/ESG共學坊logo/ESG共學坊_設計提案_20250204.pdf` 第 41–47 頁只有三個版本的 logo 展示（白底、深色照片底），沒有色值也沒有文字規範。以下是從 `coESG_logo_final.ai` 量到的顏色：

| 版本 | 強調色 | 文字色 |
|---|---|---|
| CLASS（綠） | `#23AC39` | `#3F3B3A` |
| STORE（橘） | `#E6673C` | `#3F3B3A` |
| TALKS（黃） | `#F2B522` | `#3F3B3A` |

綠 `#23AC39` 配白字只有 3.0:1，同樣只能用於大字與圖形；深色照片底時「CO-ESG 共學坊」改為白字。

## 要做的事

**A. 方向確認（Phase 0）**

1. 規範文件已取得，確認只有印刷色（見上方「色值」一節）。以 A 組色值起稿，請客戶或原設計師確認。
2. 用首頁與共好永續力頁各做一版色彩示意（可以只是改 token 後的截圖），讓客戶確認方向後再全站套用。

**B. Token 切換（Phase 2 開頭，在新增區塊之前做，避免新區塊做完又要重調）**

3. 更新 `globals.css` 的 `:root`：`--primary`、`--primary-foreground`、`--accent`、`--accent-foreground`、`--secondary`、`--ring`、`--chart-*`、`--sidebar-*`，並新增深色面專用 token（例如 `--surface-dark`／`--surface-dark-foreground`）。把 `flame`、`sun`、`warm-gray` 色階校正為 CIS 色值；刪除 `esg` 綠色階或保留給 ESG共學坊子主題。
4. `Section` 的 `background="primary"` 改為使用深色面 token（或新增 `background="dark"` 並逐一替換），避免整片橘色。
5. 把寫死的綠色改成讀 token：`AnimatedGradientBackground`、`ParticleNetwork`、`EcosystemNetwork:158`、`FutureSection:178, :74`、`MethodologyBeam`、`.bg-topo`。
6. 刪除沒有作用的 `tailwind.config.ts` 與沒有啟用的 `.dark` 區塊（或確認要保留深色模式再留）。
7. 更新 `globals.css` 檔頭的設計比例註解。

**C. ESG共學坊子主題**

8. 建立區域主題機制：在容器加 `data-brand="coesg"`，於 `globals.css` 以 `[data-brand="coesg"]` 覆寫 `--primary` 等為 ESG共學坊綠。套用範圍見待確認，預設套在 `/learning` 與未來的商城頁。

**D. Logo 與識別（Phase 3，需素材）**

9. Navbar、Footer 的文字 logo 換成正式 logo 圖（SVG 優先），依 CIS 規範保留安全間距與最小尺寸。
10. 以 Next 的檔案慣例放 `src/app/icon.*`、`apple-icon.*`、`opengraph-image.*`（寫法以 `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` 為準）。
11. 提到 ESG共學坊的地方使用綠色 CLASS 版 logo（生態圈中心在 S06 處理）。

## 驗收條件

- 全站主色為 CIS 的橘、黃、灰；沒有殘留的深綠或祖母綠（ESG共學坊子主題範圍除外）。
- 所有文字與背景的對比達 WCAG AA（內文 4.5:1、大字 3:1），特別檢查按鈕、深色區塊、標籤。
- `grep -rn "rgba(34,197,94\|#10B981\|2B6E50\|emerald" src` 沒有結果。
- Navbar、Footer、瀏覽器分頁圖示、社群分享預覽圖都是正式 logo。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 素材已取得：規範 PDF 與 `.ai` 原檔在 `assets-raw/共好玟化logo/`、`assets-raw/ESG共學坊logo/`。尚需從 `.ai` 匯出網頁用 SVG（本機沒有 Illustrator 時，可請客戶或設計師匯出）。
- 螢幕色值需客戶確認（規範沒有定義）。
- 「商城、ESG共學坊主題頁面」指哪些頁面？網站目前**沒有商城頁**（只有文案提到「永續商城」）。需確認：`/learning` 是否算 ESG共學坊主題頁？商城是否為未來範圍？
- 中文字型：CIS 若指定標準字，需確認網頁可用的對應字型與授權；載入中文網頁字型會影響載入速度。
- 這項改動會讓所有頁面的截圖都變，建議在 G05（RWD）之前完成，否則要驗收兩次。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
