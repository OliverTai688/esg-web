# 素材在網站上的路徑（rev2 共用約定）

素材原檔在 `assets-raw/rev2-202610/`（不進版控）。處理後放進 `public/`，路徑固定如下，頁面直接引用這些路徑。全部 WebP。

| 用途 | 路徑 | 規格 |
|---|---|---|
| Logo（#12 #13 #32 #38） | `/clients/<id>.webp`，id 見 `src/data/clients.ts` | 透明或白底，長邊 ≤ 800px；白字 logo 在 `clients.ts` 標 `dark: true`，長條型標 `wide: true` |
| 臺灣休閒農業學會直式（客戶回饋用，#13） | `/clients/tlaa-vertical.webp` | 同上 |
| GSA 白字版（深色底用） | `/clients/gsa-dark.webp` | `/clients/gsa.webp` 為淺色底用的彩色版 |
| 顧問形象照（#34 #52） | `/team/<id>.webp`，id 見 `src/data/team.ts` | 4:5，640×800，臉部置中；魏名聰去背照補米色底 `#FBF8F4` |
| 創辦人照（#26，照片不換） | `/team/consultant-01.jpg` | 沿用 |
| 永續足跡案例主圖（#38） | `/cases/footprints/jooin-sifan.webp`、`rafac-showy.webp`、`youthbud-bliss.webp`、`gsa-forum.webp` | 4:3，1200×900；星芽圖裁掉底部售價欄 |
| 合作案例照片牆（#46） | `/cases/wall/01.webp` … `/cases/wall/16.webp`（編號同 `08-合作案例照片牆/` 資料夾編號） | 4:3，1200×900；花壇國中不可有可辨識學生臉孔 |
| 白皮書封面（#53） | `/whitepapers/covers/taku.webp`、`wecan.webp`、`modulab.webp`、`chinyi.webp` | 長邊 1000px，保留原比例 |
| 白皮書內文配圖（#53） | `/whitepapers/figures/taku-repair-data.webp`、`modulab-kids.webp` | 長邊 1600px |
| 書封（#24） | `/books/sustainability-new-language.webp` | 只有封面那一面，長邊 1000px |
| 創辦人證照（#27） | `/certificates/sdg-impact.webp`、`taise-2025.webp`、`bsi-ghg.webp`、`pmp.webp`、`social-worker.webp`（遮蔽版）、`coaching-74h.webp` | 長邊 1600px；PDF 取第 1 頁 |
| 白皮書 PDF 網頁版（#53②） | 不進 `public/`：輸出到 `assets-raw/rev2-202610/09-白皮書案例/網頁版（待客戶確認）/` | 每本 ≤ 10 MB；只降圖片解析度；客戶確認後才上架 |
