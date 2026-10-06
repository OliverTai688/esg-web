# S06　共好生態圈：換上註冊 logo、改「供應鏈對接」、顧問名單限 7 位

| 項目 | 內容 |
|---|---|
| 狀態 | **A 部分（文字）已完成（2026-10-06）**：節點改為「供應鏈對接」；說明文字拿掉「講師」；假頭像、外部連結與寫死的「+N」已移除，四個節點暫以圖示顯示；死碼 `EcosystemBeam.tsx` 與 `centerLabel` 已刪。B 部分（註冊 logo、7 位顧問頭像）待 logo 匯出 SVG 後進行，中央目前仍是文字版 CO/ESG |
| 階段 | Phase 3（素材相依）；節點文案可先在 Phase 1 做 |
| 類型 | 文案 + TSX + 素材 |
| 規模 | M |
| 相依 | G07（ESG共學坊 logo、7 位顧問照片） |
| 需求來源 | PDF p.8、p.16（兩處內容相同） |

## 背景

客戶在首頁與共好永續力兩個段落都貼了生態圈圖的截圖，要求相同：

1. 中央的「ECOSYSTEM CO/ESG」是我們自己畫的假 logo，要換成客戶註冊的 ESG共學坊 logo（綠色括號版 `[CO-ESG 共學坊 CLASS]`）。
2. 「共學坊講師群」這個節點不要放，改成「供應鏈對接」，說明「擁有優質供應商，並可精準對接」。
3. 顧問、講師名單放少的，以 <https://coesg.tw/plans/30day> 上的 7 位為主。

## 現況

- **首頁其實沒有生態圈區塊**。這張圖只存在於 `/sustainability#ecosystem`（`src/app/[locale]/sustainability/page.tsx:302-314`）。客戶截圖的網址列也是 `/zh/sustainability#ecosystem`，判斷是同一個區塊貼了兩次。
- 實際使用的元件是 `src/components/domain/EcosystemNetwork.tsx`。`EcosystemBeam.tsx` 沒有任何地方引用，是死碼。
- 中央 logo 寫死在 TSX：
  - 桌機：`EcosystemNetwork.tsx:114-132`（"Ecosystem"、"CO"、斜線、"ESG"）。
  - 手機：`:203-215`。
  - `centerLabel` prop 有傳入但沒有被渲染。
- 頭像是假資料：`AVATAR_DATA`（`:22-47`）全部是 GitHub 頭像網址，點了會連到 google、microsoft、unicef 等不相干的 GitHub 帳號；「+12 / +25 / +40 / +15」計數寫死在 `:165`。
- 版面假設正好 4 個節點（2×2 圍繞中心，`:134`）。
- 辭典：`sustainabilityPage.ecosystem`，`zh.ts:384-395`、`en.ts:377-388`。
  - `description`（:387）「串連顧問、講師、企業與國際網絡…」。
  - `roles[1]`（:390）「共學坊講師群」。
  - 導覽列說明 `nav.sustainability.ecosystemDesc`（`zh.ts:13`）「串連顧問、講師、企業的永續共同體」。

## 7 位顧問名單（2026-10-06 取自 coesg.tw/plans/30day）

姓名與職稱是從頁面上「7位業界頂尖ESG顧問」圖片內的文字讀取的。

| # | 姓名 | 單位／職稱 | 頭像檔 |
|---|---|---|---|
| 1 | 吳玟樺 | 共好玟化組織發展顧問有限公司・ESG共學坊／創辦人 | `01-吳玟樺.jpg` |
| 2 | 蕭冠宇 | 中華徵信所企業股份有限公司／永續長 | `02-蕭冠宇.jpg` |
| 3 | 王欽泉 | 鑫判科技股份有限公司／首席策略合夥人 | `03-王欽泉.jpg` |
| 4 | 朱建毓 | 樂活永續股份有限公司／共同創辦人 | `04-朱建毓.jpg` |
| 5 | 劉建成 | 齊禾設計有限公司／設計總監 | `05-劉建成.jpg` |
| 6 | 吳宗曄 | 樂活永續股份有限公司／執行長 | `06-吳宗曄.jpg` |
| 7 | 陳宜均 | 綠策院有限公司／創辦人 | `07-陳宜均.jpg` |

檔案在 `assets-raw/顧問照片-coesg-30day/`，另有原始合圖與方案封面橫幅。

限制：

- 頁面上沒有個別的照片檔，只有一張合成圖。頭像是從合成圖裁出來的，每張 300×300px，背景帶有原圖的藍色色塊（第 1 張上方還有藍色標題列）。只適合當生態圈節點的小頭像（40–80px），放大使用需要客戶提供原檔。
- 「朱建毓」的「毓」與「吳宗曄」的「曄」是從圖片文字辨讀的，筆畫較複雜，請客戶核對。

## 要做的事

**A. 可立即進行（不需素材）**

1. `roles[1]` 改為標題「供應鏈對接」、說明「擁有優質供應商，並可精準對接」。
2. `ecosystem.description` 與 `nav.sustainability.ecosystemDesc` 內的「講師」改掉（例如「串連顧問、供應鏈、企業與國際網絡」）。
3. 拿掉所有假頭像的外部連結與寫死的「+N」計數（在真實照片到位前，節點先只顯示圖示）。
4. 刪除死碼 `EcosystemBeam.tsx` 與沒用到的 `centerLabel`。

**B. 素材到位後**

5. 中央 logo 換成 `public/brand/` 內的 ESG共學坊 CLASS 版 logo，用 `next/image`，桌機與手機兩個位置都要換，並依 CIS 規範保留安全間距、不變形、不改色。
6. 「永續顧問團隊」節點顯示 7 位顧問的照片（存在 `public/team/`），資料放在 `src/data/team.ts`（姓名、職稱、照片路徑）。頭像不連外，hover 顯示姓名。其他節點不放人像。
7. 視客戶回覆決定首頁是否也要放一份生態圈圖（見待確認）。

## 驗收條件

- 生態圈中央顯示註冊的 ESG共學坊 logo，桌機與手機皆然。
- 四個節點為：永續顧問團隊／供應鏈對接／企業合作夥伴／國際連結網絡；頁面上沒有「共學坊講師群」。
- 頁面上沒有任何 `avatars.githubusercontent.com` 的圖片或連到 GitHub 的連結。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- 素材已取得：ESG共學坊 logo 原檔（`assets-raw/ESG共學坊logo/coESG_logo_final.ai`，需匯出 SVG）、7 位顧問的小頭像（見上表）。仍需確認 7 位顧問同意在新站露出，以及是否提供高解析原檔。
- 7 位名單已依 coesg.tw/plans/30day 頁面整理（見上表）。`docs/scraped/instructors/instructors.md` 有 7 筆舊資料（陳宜均、吳玟樺、楊佳璋、劉忠岳、郭開文、鑫判科技、ESG共學坊），其中兩筆是組織而不是人，**不能直接當成這 7 位**。
- 首頁是否需要新增生態圈區塊？目前判斷不需要，請客戶確認。
- 「企業合作夥伴」「國際連結網絡」節點原本的假 logo 拿掉後，是否改放真實夥伴 logo（可共用 H01 的 `clients.ts`）。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節（`next/image` 在 16 版有設定變更，見 `01-app/02-guides/upgrading/version-16.md`）。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。
