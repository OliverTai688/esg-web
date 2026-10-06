# G07　素材匯入與圖片管線

| 項目 | 內容 |
|---|---|
| 階段 | Phase 0（越早越好，阻擋 Phase 3 全部任務） |
| 類型 | 素材整理 + 專案設定 |
| 規模 | M（主要是人工整理） |
| 相依 | 客戶開放 Google Drive 權限；阻擋 G02-D、H01、H04、S06、E04、C03 |
| 需求來源 | PDF 各頁的 Drive 連結 |

## 背景

需求文件裡有十多個 Google Drive／Google 文件連結，放的是 logo、CIS 規範、案例照片、訪談紀錄。專案目前**完全沒有圖片素材**：`public/` 只有 create-next-app 的 5 個預設 svg，全站沒有用到 `next/image`，`next.config.ts` 是空的。

所有需要圖片的任務都卡在這一步。

## 素材清單

連結是從 PDF 的超連結依出現順序擷取的；「對應」欄是依順序與上下文推定，下載時請再核對一次。

| # | 內容（推定） | PDF 頁 | 連結 | 使用任務 |
|---|---|---|---|---|
| 1 | 共好玟化標準色、使用規範（檔案） | 1 | `https://drive.google.com/file/d/1GiQMz7irP_DSQZgSlzfd9NLwGdl4iCKD/view` | G02 |
| 2 | 共好玟化 CIS 圖檔資料夾 | 1 | `https://drive.google.com/drive/folders/1BAUzkk5vbnWg1stMJZB4yfPLHXgRv-Af` | G02 |
| 3 | ESG共學坊使用規範（p41–47）與 CIS 圖檔資料夾 | 1 | `https://drive.google.com/drive/folders/1n4sOcMmQjdVHXYG-ZBeMkQ3zy9A8Tgqn` | G02、S06 |
| 4 | ESG共學坊 logo（綠色）檔案 | 1 | `https://drive.google.com/file/d/1obH5A_NJq6F8QRkAI7LBkxXyugNmowTA/view` | S06、G02 |
| 5 | 相關素材包／案例照片 | 3、24 | `https://drive.google.com/drive/folders/1V4c4-9bYQzHcLpd0o5jXV06zMOb5SDAL` | E04、其他 |
| 6 | 共好玟化商模參考（Claude 公開頁面） | 3 | `https://claude.ai/public/artifacts/caa0c7ca-1641-41db-bc49-dcff791f0edd` | 參考 |
| 7 | 愛慈基金會白皮書案例（檔案） | 3 | `https://drive.google.com/file/d/1-Q5jRAAvVix36rooRgNffFhCkd2WR9Bx/view` | 參考、C03 |
| 8 | 客戶 logo 圖檔資料夾 | 9 | `https://drive.google.com/drive/folders/1wSpmL4KBQU7TczTR2f2C8zZJAkj9hQ3o` | H01、H04 |
| 9 | 7 位顧問（網頁） | 8、16 | `https://coesg.tw/plans/30day` | S06 |
| 10 | 白永恩訪談紀錄 | 30 | `https://docs.google.com/document/d/14wwd246bKlnPMB3RgvgZRp3fuFODWyb_/edit` | C03 |
| 11 | 愛慈基金會文件 | 30 | `https://docs.google.com/document/d/1bbaHHFlaWP5_HnISM995K1O4r0I6-v32i2Y7cN39a8w/edit` | C03 |
| 12 | 台東康復之友輔導成果（簡報） | 30 | `https://docs.google.com/presentation/d/1HeG8DBB_dBSYQdz4oJa7S_nPGj132hkNIaTBIg-fu80/edit` | C03 |
| 13 | 天成醫院回饋 | 30 | `https://docs.google.com/document/d/1ZQ69QBqMdBPV5lQgBC0w89cx7Lz8HZC-/edit` | C03 |
| 14 | 愛慈基金會上課照片資料夾 | 30 | `https://drive.google.com/drive/folders/1KwHH0jKvqLQlm7YaMEHczxSvPtGrp2hB` | C03 |
| 15 | 天成醫院照片資料夾 | 30 | `https://drive.google.com/drive/folders/1lHQMEpfIRU4G617QyPxVD2PPA1L3B6J1` | C03 |
| 16 | 合作夥伴、客戶 logo 資料夾 | 30 | `https://drive.google.com/drive/folders/10lp9453NKJIXQSJq33waVrBRs-5xl0H9` | H01、H04、S06 |

參考網站（不需下載）：

- 白皮書案例：頭城農場 <https://www.tcfarm.com.tw/zh-TW/pages/partnersforsustainability>、大古鑄鐵 <https://www.taku-art.com/news/esg_life>、帷可策略 <https://www.wecanstrategy.com.tw/>
- 國際論壇：<https://www.youthsdgs.org/>
- 外部課程：<https://shanyun.havppen.com/course/esg>、<https://www.accupass.com/event/2507150923051155509773>

## 要做的事

1. 確認每個連結都能開啟（需要客戶把權限開給開發團隊的帳號），打不開的列回給客戶。
2. 下載並整理進專案，目錄慣例：

   ```
   public/
   ├── brand/      共好玟化 logo（橫式、直式、反白）、ESG共學坊 logo（CLASS／STORE／TALKS）
   ├── clients/    客戶與合作夥伴 logo
   ├── team/       7 位顧問照片
   ├── cases/      合作案例照片（events）
   │   └── npo/    NPO 案例照片（consulting）
   └── og/         社群分享圖
   ```

3. 檔名用小寫英文與連字號（例如 `clients/sifan-farm.svg`），不要用中文檔名。
4. 處理規格：
   - logo 優先用 SVG；只有點陣圖時輸出透明底 PNG，長邊 400–600px。
   - 照片輸出長邊 1600px 以內的 JPG 或 WebP，單張 300KB 以下。原始大檔不要進版控。
   - 人像統一裁成正方形。
5. 建立資料檔：`src/data/clients.ts`（id、中英文名稱、logo 路徑）、`src/data/team.ts`（姓名、職稱、照片路徑）。
6. 圖片一律用 `next/image`。動工前讀 `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` 與 `01-app/02-guides/upgrading/version-16.md` 中 `next/image` 的段落（16 版的預設品質、尺寸、快取設定有變動）。圖片都放本地，不需要設定遠端網域。
7. 在 `docs/tasks/sitemap-rev1/` 維護一份 `assets-status.md`：每項素材的來源、是否已取得、是否已確認可公開使用、放在專案的哪個路徑。

## 驗收條件

- 上表每一列都有狀態（已取得／等待客戶／不需要）。
- `public/` 內有依慣例整理好的 logo 與照片，沒有超過 500KB 的圖片。
- `src/data/clients.ts`、`src/data/team.ts` 存在且路徑都對得到檔案。
- 用任一張本地圖片以 `next/image` 渲染成功，`pnpm build` 通過。

## 待確認／風險

- **授權**：客戶 logo 需確認各品牌同意公開露出；照片需確認肖像授權（NPO 服務對象、學員、醫院場域要特別小心）。
- CIS 規範通常會限制 logo 的最小尺寸、安全間距、禁用的變形與配色，置入時要遵守（G02、S06）。
- 7 位顧問的照片若只能從 coesg.tw 網頁取得，解析度可能不足，且該平台即將停止合作（見 L02），請客戶直接提供原檔。
- Drive 內的文件含未公開的訪談與內部資料，只擷取要上線的部分，其餘不要放進版控。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
