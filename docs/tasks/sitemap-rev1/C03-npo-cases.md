# C03　「非營利組織合作模式」加入真實 NPO 案例與照片

| 項目 | 內容 |
|---|---|
| 階段 | Phase 3（素材相依） |
| 類型 | 新子區塊 + 新資料 + 素材 |
| 規模 | M |
| 相依 | G07（照片下載）；客戶文件需先整理成可公開的摘要 |
| 需求來源 | PDF p.30「放案例（NPO照片）」 |

## 背景

`/consulting#ngo` 目前只有兩張抽象的方案說明卡。客戶要求放上真實的 NPO 合作案例與照片，並提供了四個案例的原始文件（訪談紀錄、回饋、輔導成果簡報）與兩個照片資料夾。

## 現況

- 渲染：`src/app/[locale]/consulting/page.tsx:182-249`。
  - 標題區 `:186-193`（小標「NPO 合作」、標題、導言，全部寫死中文；導言含「資源媒合」`:190`）。
  - 兩張手寫卡：公益夥伴方案（`:196-220`）、跨界媒合（`:221-245`，標題在 `:225`），各有圖示、標題、段落與三個條列。
- 這個區塊沒有任何內容在辭典裡，英文版顯示中文。
- 四個 NPO 的名稱在 `src`、`content`、`docs` 內都不存在；專案內也沒有照片。

## 客戶提供的素材

| 案例 | 素材類型 | 連結 |
|---|---|---|
| 白永恩 | 訪談紀錄（Google 文件） | `https://docs.google.com/document/d/14wwd246bKlnPMB3RgvgZRp3fuFODWyb_/edit` |
| 愛慈基金會 | 文件（Google 文件） | `https://docs.google.com/document/d/1bbaHHFlaWP5_HnISM995K1O4r0I6-v32i2Y7cN39a8w/edit` |
| 台東康復之友 | 輔導成果（Google 簡報） | `https://docs.google.com/presentation/d/1HeG8DBB_dBSYQdz4oJa7S_nPGj132hkNIaTBIg-fu80/edit` |
| 天成醫院 | 回饋（Google 文件） | `https://docs.google.com/document/d/1ZQ69QBqMdBPV5lQgBC0w89cx7Lz8HZC-/edit` |
| 愛慈基金會上課照片 | 照片資料夾 | `https://drive.google.com/drive/folders/1KwHH0jKvqLQlm7YaMEHczxSvPtGrp2hB` |
| 天成醫院 | 照片資料夾 | `https://drive.google.com/drive/folders/1lHQMEpfIRU4G617QyPxVD2PPA1L3B6J1` |
| 合作夥伴、客戶 logo | logo 資料夾 | `https://drive.google.com/drive/folders/10lp9453NKJIXQSJq33waVrBRs-5xl0H9` |

這些都是內部原始資料，不是可以直接貼上網站的文案。

## 要做的事

1. **內容整理（先做）**：從四份文件各整理出一則案例摘要，格式統一為：
   - 組織名稱與類型
   - 遇到的挑戰（1–2 句）
   - 共好玟化做了什麼（1–2 句）
   - 成果或對方的回饋引言（1–2 句，引言需對方同意）
   - 1–3 張照片
   
   整理稿先給客戶確認再進版。
2. 把兩張方案卡的名稱與文案改用語：「跨界媒合」→「跨界溝通」或「跨界對接」，導言「資源媒合」同步修正；「共學坊平台」→「ESG共學坊平台」（`:227, :233`）。
3. 在兩張方案卡下方新增「合作案例」子區塊：案例卡含照片、組織名、摘要、引言。四則用 2×2 格線，手機單欄或橫向滑動。
4. 資料放辭典 `consultingPage.npo`（標題、導言、兩個方案、`cases[]`），照片路徑放 `public/cases/npo/`，用 `next/image`。zh／en 同步。
5. 照片若有多張，點擊可在 Dialog 中放大（重用 `src/components/ui/dialog.tsx`）。

## 驗收條件

- `/zh/consulting#ngo` 顯示兩個合作模式 + 至少兩則含照片的真實案例（素材到齊則四則）。
- 區塊內沒有「媒合」字樣；`/en` 顯示英文。
- 照片經過壓縮（單張建議 300KB 以下），手機載入不卡。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- **素材與授權阻擋**：
  - 四個組織是否同意以案例形式公開（特別是醫院與身心障礙服務機構）。
  - 「白永恩」是人名還是機構簡稱（推測可能指白永恩神父社會福利基金會），需客戶確認正式名稱。
  - 照片中若有服務對象、病友或學員，需確認肖像授權，必要時挑選不露臉的照片。
- 四份 Google 文件需要客戶開放檢視權限，或由客戶直接提供整理後的文字。
- 台東康復之友只有成果簡報、沒有照片資料夾；白永恩只有訪談紀錄。這兩則可能只有文字。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節（`next/image` 在 16 版有設定變更）。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
