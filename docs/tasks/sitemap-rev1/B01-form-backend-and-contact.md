# B01　表單後端基礎 + 聯絡表單串接 + 客服信箱改為 pt@coesg.tw

| 項目 | 內容 |
|---|---|
| 狀態 | **A 部分已完成（2026-10-06）**：舊 Gmail 全站移除，客服信箱顯示為可點擊的 `pt@coesg.tw`；所有沒有作用的按鈕都接上去處；聯絡表單在後端完成前先以開啟訪客郵件軟體的方式送出。B 部分（真正的表單後端）**不納入本次範圍（2026-10-06 決定）**，聯絡表單維持開啟訪客郵件軟體的做法。見文末「A 部分完成紀錄」 |
| 階段 | 信箱文字 Phase 1；後端 Phase 4 |
| 類型 | 後端（新基礎建設）+ TSX + 文案 |
| 規模 | M–L |
| 相依 | 客戶提供寄信網域的 DNS 設定權限；阻擋 J01、C04 候補、L02 |
| 需求來源 | PDF p.32「客服email pt@coesg.tw，PT帳號>>設定自動轉寄(vivi和我)」 |

## 背景

客戶指定客服信箱為 `pt@coesg.tw`，並會在該信箱設定自動轉寄給內部兩位同仁（轉寄是客戶信箱端的設定，不是網站功能）。

實際檢查後發現，網站的聯絡表單**根本不會送出任何東西**。所以這個需求要真正成立，得先把表單做成能運作的。這個後端基礎同時是 J01（email 名單）、C04（候補名單）的前置。

## 現況

- 聯絡表單：`src/app/[locale]/consulting/page.tsx:328-396`。
  - `<form className="space-y-5">`（`:340`）沒有 `action`、`onSubmit`，上方有 `// TODO: wire up form submission`（`:338`）。
  - 輸入欄位有 `id` 但沒有 `name`（`:346, :352, :359, :365-370`），原生送出只會重新整理頁面。
  - 頁面是 server component。
  - `contactForm.success`（`zh.ts:672`、`en.ts:658`）有定義但沒有被使用。
- 顯示的聯絡資訊（`:379-393`）：信箱 `90223501gungho@gmail.com`（`:384`，純文字不是 mailto）、服務時間「週一至週五 09:00-18:00」（`:391`），都寫死。
- 同一個舊信箱也在 JSON-LD：`src/app/[locale]/layout.tsx:98`。
- 專案內只有一個 route handler（`src/app/feed.xml/route.ts`）；沒有 `api/` 路由、server action、`process.env`、`.env*`、寄信或資料庫套件。
- 其他沒有作用的按鈕：`src/components/domain/CTASection.tsx:42-56`（主要與次要按鈕都沒有 href）、合作洽詢 Hero「預約諮詢時段」（`consulting/page.tsx:112-115`）、方案卡按鈕（`:170-173`）、活動詳情「立即報名」（`events/[slug]/page.tsx:170-172`）。

## 要做的事

**A. 立即可做（Phase 1）**

1. （`src/lib/site.ts` 已在 G04 建立）新增 `src/lib/site.ts` 集中站台常數：客服信箱 `pt@coesg.tw`、公司信箱 `gungho90223501@coesg.tw`、官方 LINE 網址與 ID、官網網址、服務時間。
2. `consulting/page.tsx:384` 與 `layout.tsx:98` 的舊 Gmail 改為引用常數（客服用 `pt@coesg.tw`），並改成 `mailto:` 連結。
3. （合作洽詢 Hero 與方案卡按鈕已在 C01 完成）把上面列的無作用按鈕接上去處：合作洽詢 Hero 與方案卡按鈕捲到 `#contact`；`CTASection` 增加 `primaryHref`／`secondaryHref` props 並由各頁傳入。

**B. 表單後端（Phase 4）**

4. 選定寄信服務（建議 Resend 這類交易型寄信服務；Vercel 部署下不需自架 SMTP）。需要客戶在 `coesg.tw` 網域加上寄信驗證的 DNS 紀錄（SPF、DKIM），否則信件容易進垃圾信。
5. 實作送出邏輯。動工前先讀 `node_modules/next/dist/docs/` 中 Server Actions／表單與 Route Handlers 的章節，以這個版本的寫法為準。
   - 伺服器端驗證（姓名、email 格式、訊息長度上限）。
   - 防濫用：隱藏的誘捕欄位（honeypot）+ 基本頻率限制；需要時再加 Turnstile 之類的驗證。
   - 成功後寄到 `pt@coesg.tw`，Reply-To 設為填表人的 email。
6. 表單區塊抽成 client component `ContactForm`：欄位加上 `name`，處理送出中、成功（顯示 `contactForm.success`）、失敗三種狀態，錯誤訊息可被螢幕閱讀器讀到。
7. 設計成共用的「名單收集」介面，讓 J01 與 C04 重用：同一個伺服器端函式接受 `{ source: "contact" | "newsletter" | "waitlist-ecosystem", email, ... }`。
8. 環境變數（寄信服務金鑰、收件信箱）設定在 Vercel，並新增 `.env.example` 說明需要哪些變數。金鑰不可進版控。
9. 表單下方加上個資蒐集告知文字與隱私權政策連結（目前網站沒有隱私權政策頁，需要新增一頁，內容請客戶提供或確認）。

## 驗收條件

- A：全站看不到 `90223501gungho@gmail.com`；客服信箱顯示為 `pt@coesg.tw` 且可點擊；列出的按鈕都有實際去處。
- B：在 `/zh/consulting#contact` 填表送出後，`pt@coesg.tw` 收到信，畫面顯示成功訊息；必填未填或 email 格式錯誤會顯示錯誤；誘捕欄位被填時不寄信。
- 版控內沒有任何金鑰；`.env.example` 存在。
- `pnpm lint`、`pnpm build` 通過。

## 待確認／風險

- **需客戶配合**：`coesg.tw` 的 DNS 管理權限（加寄信驗證紀錄）；`pt@coesg.tw` 的自動轉寄由客戶自行在信箱端設定。
- 名單是否需要保存下來（而不只是寄通知信）？若要保存與後續發送電子報，需要資料庫或電子報服務的名單功能，見 J01。
- 表單後端不在原需求書第一階段的範圍內（`docs/requirement-doc.md`），需確認是否另計。
- 寄信服務、防濫用驗證的免費額度與方案，動工時以官方文件為準。

## 共通規範

- 動工前先讀 `AGENTS.md`：本專案是 Next.js 16.2.3，寫碼前查 `node_modules/next/dist/docs/` 的對應章節。
- `zh.ts` 是辭典型別來源，`en.ts` 必須同步鍵與結構，否則 build 失敗。英文文案客戶未提供，先自行翻譯並在 PR 標註待審。
- 用語依 G01：永續白皮書／ESG共學坊／溝通。

## A 部分完成紀錄（2026-10-06）

按鈕去處：

| 位置 | 按鈕 | 去處 |
|---|---|---|
| 首頁頁尾 CTA | 預約 15 分鐘 Coffee Chat | `/consulting#contact` |
| 首頁頁尾 CTA | 瀏覽永續商城 | 暫時連到首頁；客戶提供商城連結後，填入 `src/lib/site.ts` 的 `storeUrl` 即可 |
| 永續足跡頁尾 CTA | 預約免費諮詢 | `/consulting#contact` |
| 永續足跡頁尾 CTA | 瀏覽所有活動 | `/events#upcoming` |
| 加入我們頁尾 CTA | 加入 LINE 官方帳號 | 官方 LINE（另開分頁） |
| 加入我們頁尾 CTA | 返回首頁 | 首頁 |
| 活動／課程詳情頁 | 立即報名 | 官方 LINE（另開分頁） |
| 合作洽詢 Hero 與方案卡 | 預約諮詢時段 | `#contact`（C01 已完成） |

- `CTASection` 新增 `primaryHref`、`secondaryHref`；次要按鈕只有在同時有文字與連結時才顯示。
- 「立即報名」連到官方 LINE（已確認採用），是因為現行報名流程就是從官方 LINE 開始（見「訂閱 3 步驟」文章），而且各課程沒有自己的報名網址。之後若有報名表單或金流，改這一處即可。
- 聯絡表單的過渡做法：寄到客服信箱 `pt@coesg.tw`（與頁面上顯示的相同），欄位補上 `name`。送出時會開啟訪客的郵件軟體並帶入填寫內容。這只在訪客裝置有設定郵件軟體時有效，沒有的話按了不會有反應；它是 B 部分完成前的權宜之計，B 部分要換成真正的送出邏輯並顯示成功訊息。這個行為沒有實際送出測試過（會開啟本機郵件軟體），只確認了表單屬性正確。
