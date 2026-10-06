# S03　「雙效益理論」取代終端機風格的方法論區塊

| 項目 | 內容 |
|---|---|
| 階段 | Phase 2（結構調整） |
| 類型 | 新區塊 + 移除元件 + 文案 |
| 規模 | M |
| 相依 | S02（同一頁的區塊順序） |
| 需求來源 | PDF p.13–14 |

## 背景

客戶原話：「不要終端機風格」。現在的「共好永續方法論」是一個仿 macOS 終端機視窗、逐字打出三條準則的動畫。客戶要換成一篇論述「雙效益理論」的長文，以及「議題 → 系統 → 商模」三層架構。

## 現況

- 渲染：`src/app/[locale]/sustainability/page.tsx:262-272`，使用 `MethodologyTerminal`。
- 元件：`src/components/domain/MethodologyTerminal.tsx:17-60`，底層是 `src/components/magicui/terminal.tsx`。
  - 視窗外框與提示文字全部寫死中文（`:20, 22, 26, 34, 41, 44, 51, 55`），英文版也顯示中文。
  - 動畫延遲寫死，假設正好 3 條準則，且一掛載就開始跑、不等捲到畫面內。
- 辭典：`sustainabilityPage.methodology`，`zh.ts:360-377`、`en.ts:354-371`（`title`「共好永續方法論」、`principles` 三筆：社會韌性／商業永續／環境照顧）。
- `terminal.tsx` 只被 `MethodologyTerminal` 使用；`MethodologyTerminal` 只被這一頁使用。

## 要做的事

1. 新增 `DualBenefitSection`（可直接寫在 page 內或抽成 `src/components/domain/DualBenefitSection.tsx`）：
   - 標題「雙效益理論」+ 一句主張。
   - 兩段論述文字，用適合閱讀的行寬（約 65–70 字元）。
   - 「議題 → 系統 → 商模」三層架構做成三張相連的卡片或階梯圖，手機直排。
   - 結語獨立成一個強調段落。
2. 辭典：把 `sustainabilityPage.methodology` 改成新結構，例如 `{ label, title, lead, paragraphs[], layersIntro, layers[{ name, description }], closing }`，zh／en 同步。
3. 刪除 `MethodologyTerminal.tsx` 與 `magicui/terminal.tsx`（確認沒有其他引用後再刪）。
4. 區塊 id 維持 `methodology`，或改為 `theory` 並同步通知 G03。

## 客戶文案（原文）

> **雙效益理論**
> 兼顧社會與環境的商業模式，本身就能創造經濟效益。
>
> 環境、社會、經濟並不是互相拉扯的取捨。綠色採購能減少資源消耗與碳排，直接降低營運成本；良好的社會形象與利害關係人信任，則會累積成品牌溢價與長期競爭力。當企業把永續放進營運核心，這些投入就會回流成實質的財務回報。
>
> 而真正讓環境表現轉化為經濟回報的，是企業的「動態能力」，也就是跨組織協作、帶動整條供應鏈一起轉型的能力。內部符合規範只是基本盤；能驅動供應鏈一起升級的企業，才拿得到真正的競爭優勢。
>
> 我們用「議題 → 系統 → 商模」三層架構，協助企業把這件事做出來：
>
> 議題｜從社會與環境意義的切角切入（綠色採購、供應鏈碳足跡、公平貿易），對準企業真正的痛點。
>
> 系統｜建立 AI 平台與知識體系，把議題轉化為可量化、追蹤、比較的數據。
>
> 商模｜透過永續白皮書、顧問服務與共學坊，協助企業從動態能力出發，提升整條供應鏈的永續績效。
>
> 當社會與環境的價值能被清楚量化，永續投入就會從一項開銷，變成企業最值得的長期投資。

## 驗收條件

- 頁面上不再出現終端機視窗、紅黃綠圓點或逐字打字動畫。
- 三層架構在桌機橫排、手機直排，文字完整。
- `MethodologyTerminal`、`terminal.tsx` 已從專案移除，`grep -r "MethodologyTerminal\|magicui/terminal" src` 沒有結果。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 「商模」那一行原稿寫「共學坊」，依全站規則應為「ESG共學坊」，建議直接改並請客戶確認。
- 原有三條準則（社會韌性／商業永續／環境照顧）的內容，客戶已在品牌故事的完整版裡用文字表達（H02），這裡不再保留。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
