# 官網第二版修改（2026-10）：修改方案

- 需求來源（兩份，皆為客戶 2026-11-01 版）：
  - `202610官網第二版修改.docx`：中文版 53 項＋顧問團隊、Logo 牆三區名單、四個請教題（已有網站公司 10/31 回覆與客戶決定）、白皮書案例四則、上線檢核清單 14 條。逐字原文見 [source/zh.md](source/zh.md)。
  - `202610官網第二版修改＿英文.docx`：英文撰寫規則 R1–R37、用詞對照表、合作單位與顧問英文名、/en 盤點結果、英文修改表（對應中文版項次＋EN1–EN8）、三階段上線。逐字原文見 [source/en.md](source/en.md)。
- 素材：已下載到 `assets-raw/rev2-202610/`（不進版控），清單與待處理事項見 [assets-status.md](assets-status.md)。
- 比對對象：`main` 分支 `d6be24e`（工作目錄另有 `site.ts` 的 `storeUrl` 改為 `/categories/branding`，正好符合第 41 項）。
- 本次需求**取代** `docs/tasks/sitemap-rev1/` 中尚未完成的項目；兩者不一致時以本次為準。

## 一、結論先講

1. **這不是文案微調，是一次「產品與價格結構」的改版。** 53 項裡約一半是逐字換文案，但最大的工作是把全站服務重組成一張「方案總表」（第 44 項）：拿掉按時數計價的顧問、會員方案與候補名單，品項內頁 7 頁變 3 頁＋轉址，價格只寫在總表與內頁。首頁、共好永續力、永續足跡、共好學習、加入我們的按鈕都要改連到這張表。這一包要最先定下來，其他頁才有地方可以連。
2. **需要新增後端能力**：聯絡表單（第 48 項，目前是 mailto）、Email 訂閱（第 50 項）、白皮書填資料下載（第 53 項）三個表單送出後**直接寄信到 gho001@coesg.tw，不寫進 Google 試算表或資料庫**（2026-11-09 決定，與客戶文件寫的「存入後台或 Google 試算表」不同，回覆客戶時要說明）。專案目前沒有任何 API 路由，剩下要決定的是用什麼寄信（見第四節 D1）。
3. **素材這次幾乎都到齊了**：128 個指定檔案中 128 個已取得（見 assets-status）。剩下的是處理工作：55 MB 的 PNG 要壓縮、星芽禮盒圖要裁掉售價欄、四本白皮書 PDF（最大 101 MB）要壓成 10 MB 以內的網頁版並**先交客戶確認**、花壇國中照片不可用可辨識學生臉孔。
4. **英文版不是翻譯工作，是照稿貼上**。客戶已給英文定稿，規則是「不要自行翻譯或改寫」。英文分三階段：第一階段與中文版同時上線，第二階段晚 1–2 週，第三階段（3 篇英文定義頁）等客戶給稿。
5. **有一件事要立刻做**：測試站目前允許搜尋引擎收錄（`robots.ts` 是 `allow: '/'`，sitemap 指向 coesg.tw），要先改成 noindex（上線檢核第 1 條）。另外 `src/proxy.ts` 依瀏覽器語言自動導向 `/en`，違反英文規則 R35，要改。
6. **「商城時討論」的項目這次只做過渡版**：新商城上線前一律連 `https://coesg.tw/categories/branding`，《影響力健檢手冊》按鈕先做「洽詢購買→LINE」，「訂閱 3 步驟」文章暫留 ESG共學坊 LINE。

## 二、工作包與階段

依「改哪一塊程式碼」分成 10 個工作包。每包內列出對應的中文版項次（#）與英文版項次（EN/R），開發時一次把中英兩邊做完，避免同一個檔案改兩次。

| 階段 | 工作包 | 內容（項次） | 規模 | 卡在 |
|---|---|---|---|---|
| 0 立即 | [P0 測試站設定](#p0-測試站設定) | 檢核 1（noindex）、R35（取消依語言自動導向） | XS | — |
| 1 | [WP-A 全站基礎](#wp-a-全站基礎) | #1 標語、#2 CIS 色、#3 左右對齊、#4 裝飾圖形、#5 LINE 與社群圖示、#6 信箱、#8 #9 名稱勘誤、檢核 5 meta description；EN1 EN2 EN4 EN5、R3 R9 R12 | L | — |
| 1 | [WP-B 方案總表與品項重構](#wp-b-方案總表與品項重構) | #10 #30（服務分頁）#35 #44 #45 #49 #51 #52；EN 對應項 | XL | D2（課程連結待客戶補） |
| 1 | [WP-C 首頁](#wp-c-首頁) | #11–#24 | L | — |
| 1 | [WP-D 共好永續力](#wp-d-共好永續力) | #25–#34、銀色連線一句 | L | — |
| 1 | [WP-E Logo 牆與案例](#wp-e-logo-牆與案例) | #12 #13 #23 #32（Logo）、#38 #39（足跡案例）、#46 #47（照片牆）、#53①（白皮書案例） | L | 素材處理 |
| 1 | [WP-F 表單後端](#wp-f-表單後端) | #48 聯絡表單、#50 Email 訂閱、#53② 白皮書下載、#7 條款與隱私（依個資實際蒐集寫） | M | D1 寄信方式 |
| 2 | [WP-G 永續足跡與共好學習其餘](#wp-g-永續足跡與共好學習其餘) | #36 #37、#41 #42 #43 | M | #41 說明文案需客戶確認 |
| 2 | [WP-H 英文版第二、三階段](#wp-h-英文版第二三階段) | EN 第二階段（#36–#39、#41–#43、新內頁、講師卡、EN6 EN7）、第三階段 EN8 | M | EN8 稿件 |
| 上線 | [WP-I 上線與 SEO](#wp-i-上線與-seo) | #40（8 篇 AEO 文章 301）、檢核 6–14、hreflang 每頁對應（R36）、canonical、llms.txt、markdown 版、JSON-LD | M | 網域切換日 |

規模：XS（一兩小時）、S（半天）、M（一到兩天）、L（三天以上）、XL（一週左右）。是相對大小，不是工時承諾。

**建議順序**：P0 → WP-A（色票與全站元件先換，後面每頁才不用重看）→ WP-B（方案總表是全站連結的目的地）→ WP-C／D／E 可平行 → WP-F（寄信方式 D1 決定後開工，可與 C／D／E 平行）→ 第一階段整體驗收（中英）→ WP-G、WP-H → 上線日 WP-I。

---

### P0 測試站設定

| 項 | 做法 | 檔案 |
|---|---|---|
| 檢核 1 | 非正式網域一律 `noindex`：`robots.ts` 依環境變數（如 `SITE_INDEXABLE=true` 才 allow），layout metadata 同步加 `robots: { index: false }`。正式網域上線那天打開 | `src/app/robots.ts`、`src/app/[locale]/layout.tsx` |
| R35 | `proxy.ts` 不再依 `Accept-Language` 決定語言；根路徑 `/` 預設 `/zh`，若有使用者選過語言的 cookie 則依 cookie（R34「記住選擇」） | `src/proxy.ts`、`src/components/domain/LocaleSwitcher.tsx` |

### WP-A 全站基礎

| # | 要做的事 | 主要檔案 | 注意 |
|---|---|---|---|
| 1 | 首頁 title／og:title「共好玟化 CO-ESG｜永續價值的專業橋樑」；頁尾「CO-ESG｜點亮你獨特的專業價值」；首屏小標改 slogan；合作洽詢頁首補「獨特」；「我們的答案」標題改「成為永續價值的專業橋樑」；共好永續力願景改句。英文：Bring your value to light.／Your bridge to sustainable value | `layout.tsx`、`i18n/messages/*/common.ts`、`home.ts`、`consulting.ts`、`sustainability.ts` | 全站搜尋「永續品牌的專業橋樑」「Professional Bridge」「unlocking the professional value」須為 0。核心價值那句不改 |
| 2 | CIS 色：橘 `#E8532A`、黃 `#F9A500`、灰 `#595959`。`--primary` 等深紅與相近橘紅一律換 `#E8532A`；`#FAB40A`→`#F9A500`；`#4D515B`→`#595959`。Logo SVG（`public/brand/gungho-*.svg`、`src/app/icon.svg`）重新上色。可讀性：白字在橘上只有 3.7:1，按鈕字用粗體 ≥19px；14–16px 小字連結改深灰字＋橘色箭頭／底線 | `src/app/globals.css`（第 15–144、247 行）、`public/brand/*.svg`、`src/app/icon.svg`、`join/page.tsx:31` 寫死的色碼 | 改完跑一次對比檢查。`--color-level-*` 學習地圖色另見 #36 |
| 3 | 中文多行內文 `text-align: justify`（最後一行置左）；標題、按鈕、單行、原置中區塊不動。**英文維持靠左**（R12） | `globals.css`：以 `:lang(zh)` 限定在內文段落元件 | 用 class 或元件限定，不要全域套 `p`，避免卡片短句被拉開 |
| 4 | 拿掉：品牌故事兩隻火焰手；首頁／共好永續力／永續足跡／共好學習最下方弧形頂端的火焰；無標籤幾何裝飾（首頁數據區三色圓環、足跡案例卡左上圓形、合作洽詢表單「葉片＋方塊＝扇形」、共好學習精選文章花瓣與紅葉、加入我們 QR 周圍葉片環）。保留：拱橋圖、白皮書弧線、足跡路徑、學習地圖編號、合作洽詢頁首有標籤的式子、導覽列與頁尾 Logo、首屏弧形中間 Logo | 候選元件：`site/FlameMark`、`home/CtaArcs`、`home/EvidenceRing`、`consulting/Equation`、`learning/FlowerGlyph`、`join/PetalRing`、`site/PostCard`、`geo/shapes`、`events/page.tsx` 案例卡 | 客戶要求「回覆時列出拿掉的位置」：做完產出清單（頁面＋區塊＋元件） |
| 5 | 中文版 LINE 一律改共好玟化 `https://lin.ee/tGr7ynY`（@379nlxcq），QR 改新帳號；**例外**：文章「訂閱 3 步驟」暫留 ESG共學坊 LINE；永續商城區塊不加 LINE。頁尾品牌資訊區改三個社群圖示：LINE、LinkedIn `https://www.linkedin.com/company/113301214/`、Facebook `https://www.facebook.com/gunghoculture/`。**英文版不放 LINE**：聯絡類→Email／表單、追蹤類→LinkedIn，頁尾只放 LinkedIn＋Facebook（R17） | `src/lib/site.ts`（`line`）、`site/LineQr.tsx`、`domain/Footer.tsx`、各頁 LINE 按鈕 | `LineQr` 目前用 `qrcode` 套件即時產生，可直接用新網址產生；客戶的 QR 圖檔留作比對。上線後一週手機掃描確認（檢核 12） |
| 6 | `supportEmail` 改 `gho001@coesg.tw` | `site.ts`、`i18n/messages/*/common.ts` | 全站搜尋 `pt@coesg.tw` 須為 0 |
| 8、9、13 | 名稱勘誤：臺灣休閒農業學會（5 處）、臺北市政府、臺北市萬華社區大學、思凡自然農園（含「永續定位白皮書」→「永續白皮書」）、「品牌設計公司」→「科技公司」（3 處） | `home.ts`、`events.ts`、`sustainability.ts`、`data/clients.ts` | 把舊寫法加進 `scripts/check-terms.mjs` 的禁用詞，防止回頭 |
| 檢核 5 | 每頁 meta description 各自撰寫、不共用 | 各 `page.tsx` 的 `generateMetadata` | 英文版同樣要英文 description（R32） |
| EN1、EN2、EN4、EN5 | 英文分頁標題後綴改「\| Gung-Ho Culture CO-ESG」；英文頁尾公司資訊（地址補 10553 與 (R.O.C.)）；英文頁全形符號改半形；Who We Are 公司名改 Gung-Ho Culture Ltd. | `layout.tsx`、`site.ts`（`address.en`）、`en/*.ts` | 語言切換鈕文字改「中文 / English」（R33） |

#### P0／WP-A 完成狀態（2026-11-09，未 commit）

已完成並以 `pnpm build`、`pnpm start` 實測（中英各頁）：

- P0：`noindex`（`SITE_INDEXABLE=true` 才可索引）、robots.txt 上線前不列 sitemap；`/` 不再依瀏覽器語言跳轉，預設 `/zh`，記住使用者選的語言（cookie `NEXT_LOCALE`，一年）。
- 1 標語、2 CIS 色（含 Logo SVG、`apple-icon.png`、`og-image.png` 依新標語與色票重產；實心橘按鈕字 19px 粗體；小連結灰字橘底線）、3 中文內文左右對齊。
- 4 裝飾圖形：拿掉的位置見 [`removed-decorations.md`](removed-decorations.md)（回覆客戶用），第四節列出暫留、請客戶決定的小圖示。
- 5 LINE：中文版全站改共好玟化 LINE；頁尾改 LINE／LinkedIn／Facebook 三個圖示。英文版依 R17：詢問與開課通知 → `mailto:gho001@coesg.tw`，追蹤 → LinkedIn；英文「加入我們」只留 LinkedIn 按鈕（拿掉 QR、LINE ID、三步驟），第 49 項第四張卡兩語同步改。`src/lib/site.ts` 的 `contactFor()` 與 `ChannelButton` 統一處理。
- 6 信箱、8 9 名稱勘誤（中英；`scripts/check-terms.mjs` 加入舊寫法檢查）、43 頁尾「線上工具」連結。
- EN1 標題後綴、EN2 頁尾（地址、Gung-Ho Culture Ltd.、CO-ESG Store、LinkedIn／Facebook）、EN3 每頁 hreflang 指向自己的中英版並加 x-default、EN4 英文頁半形符號、EN5 公司全名。英文頁的中文單位名稱依第三節換成英文名。
- 另修：導覽列 CTA 改 19px 後，英文版在 1024px 寬時選單換行；改為不換行並在 1280px 以下縮小選單間距。

未做、留給後續工作包：

- 第 7 項使用者條款、隱私權政策頁（等條文；頁尾連結隨頁面一起加）。
- 英文顧問 NPO 案例的「鍾榕榕」英文名（第三、四節沒有，需問客戶）；天成／天晟醫院名稱與內文（第 47 項，隨 WP-B 照片牆）。
- 加入我們頁 Email 訂閱欄（第 50 項，WP-F）。
- 文章「訂閱 3 步驟」暫留 ESG共學坊 LINE：文章只用文字寫「加入ESG共學坊官方 LINE」，沒有連結，維持原樣；`site.academyLine` 已備好，新金流上線時連同文章一起處理。

### WP-B 方案總表與品項重構

先做資料，再做頁面。建議新增 `src/data/solutions.ts` 作為**全站價格唯一來源**，方案總表、品項內頁、其他頁的說明都從這裡讀。

| # | 要做的事 | 主要檔案 |
|---|---|---|
| 44 | 合作洽詢頁：拿掉六張服務卡、會員方案、「共好生態圈會員」候補、五個篩選標籤、「價格為參考價」那句；換成方案總表（錨點 `#solutions`；「自己學、自己寫」`#solutions-self-learn`）。五類 15 個品項逐字照原文（說明｜價格｜按鈕），按鈕規則：談需求→本頁表單、活動課程通知→LINE（英文改 Email）、購買→購買頁。FAQ 改一題、新增兩題；聯絡表單選項改 7 個；頁內導覽改「01 方案總表／02 合作案例／03 常見問題／04 聯絡表單」；開場說明與頁首按鈕「預約 15 分鐘 Coffee Chat」 | `consulting/page.tsx`、`consulting/OfferCard.tsx`、`i18n/messages/*/consulting.ts`、新 `data/solutions.ts` |
| 45 | 「最受歡迎」標在永續白皮書（共好永續力與方案總表一致） | 同上 |
| 10 | 永續白皮書：拿掉「精華版」、價格「最高 NT$400,000，依規模報價」、工期 6–12 週、內頁說明改句、FAQ 工期答案改句 | `data/courses.ts`、`consulting.ts`、`events.ts` |
| 51 | 品項內頁：`brand-positioning-consulting` 刪除→轉 `/consulting#solutions`；`subscription-plan` 刪除→轉 `https://coesg.tw/categories/branding`；`sustainable-brand-workshop`→新網址 `whitepaper-workshop`（2 天實體、台北、25–30 人、NT$12,800／人、講師吳玟樺＋石珮萱、三項產出、「下一梯次規劃中」）；`sustainable-business-creator-basic`／`-advanced` 合併為 `sustainable-business-innovator`（「規劃中」，拿掉價格、天數、名額、認證）；`impact-whitepaper` 改為顧問服務樣式（顧問／工期、服務內容、主按鈕「預約諮詢」）；`survey-design-workshop` 只改下方按鈕。所有內頁「其他課程」→「其他方案」（只從三頁挑、不放自己）、拿掉「看永續學習地圖」、「返回 持續服務」→「返回 方案總表」 | `data/courses.ts`、`app/[locale]/events/[slug]/page.tsx`、`next.config.ts`（`redirects()`，中英文網址都要）、`app/sitemap.ts` |
| 52 | 內頁「講師」欄改小講師卡：照片（顧問團隊同一張）、兩三行背景（原文定稿）、「認識講師 →」連共好永續力顧問團隊區塊；白皮書工作坊兩位講師各一張 | `events/[slug]/page.tsx`、`data/team.ts` |
| 30 | 共好永續力服務分頁改四個（白皮書／課程／工作坊／供應鏈），加固定錨點 `#services-whitepaper` `#services-course` `#services-workshop` `#services-supply-chain`；分頁內不寫價格；三大支柱各加一行「對應服務」；副標與生態圈顧問團隊句改寫 | `sustainability/page.tsx`、`ux/Tabs.tsx`（需支援以 hash 打開指定分頁）、`sustainability.ts` |
| 35 | 永續足跡：下一梯次三張卡→一張「永續白皮書工作坊」（不寫價格、規劃中、加入 LINE 搶先通知）；學習地圖說明改為「企業與組織工作坊的可選主題」；按鈕改「看課程與方案」「洽詢企業與組織工作坊」；延伸課程拿掉農創師 2025 報名頁、預錄課標「線上課程更新中」；「持續服務」整區與頁內導覽 03 拿掉並遞補；頁尾「企業包班」改「企業與組織工作坊」 | `events/page.tsx`、`events.ts` |
| 49 | 加入我們第四張卡改「合作夥伴優惠／合作夥伴的獨家折扣。」；英文整頁改為 Follow us on LinkedIn（拿掉 LINE ID、QR、三步驟） | `join/page.tsx`、`join.ts` |
| 21 | 首頁「我們服務誰」按鈕改連方案總表（見 WP-C） | — |

驗收：全站搜尋 `NT$6,000`、`NT$100,000`、`NT$25,000`、`NT$22,000`、「精華版」、「會員方案」、「共好生態圈會員」、「企業包班」、「持續服務」須為 0；舊網址 5 個（中英共 10 個）都正確轉址；方案總表以外只有內頁與書籍區塊出現價格。

### WP-C 首頁

| # | 要做的事 |
|---|---|
| 11 | 首屏弧形葉片圖：Logo 不與葉片重疊、四周留白（桌機與手機） — `home/HeroPetalArc.tsx` |
| 12 | Logo 牆改兩區「服務客戶 20／合作夥伴 10」，只放客戶名單內的單位，**名單外的現有 logo 全部拿掉**（目前 49 個）；ESG共學坊夥伴改放共好永續力 — `data/clients.ts`、`page.tsx` |
| 13 | 客戶回饋的學會補 logo（直式檔），Logo 牆用橫式檔 |
| 14 | 「我們在解決什麼」三塊換成三張處境卡（標題、內文、按鈕逐字照原文）；副標改「你現在卡在哪裡？」 — `home/ProblemMosaic.tsx`、`home.ts` |
| 15 | 「我們的答案」下方加主張句（字級介於內文與標題），與「說清楚，才能被看見。」並存 |
| 16 | 四個服務標籤改名並做成連結，連到共好永續力對應分頁錨點；標籤上方內文改句 |
| 17 | 完整故事片名改「電影《賽德克．巴萊》」；英文用 Rev. Nolay Piho 與 *Warriors of the Rainbow: Seediq Bale* — `home/StoryDialog.tsx` |
| 18 | 品牌故事第四點雙效益句改寫 |
| 19 | 三張數字卡拿掉小標籤 |
| 20、21 | 「我們服務誰」導言改「三種對象」；卡 01 標題與按鈕、卡 02 按鈕改連方案總表；新增卡 04「被客戶要求回應 ESG 的中小供應商」；首屏說明開頭加一句 |
| 22 | 補回「身心靈產業｜活動策劃者」回饋（文字卡，不畫 logo）；區塊加固定錨點 `#testimonials`；導覽列「共好永續力」下拉加「客戶回饋」 — `home/TestimonialFlower.tsx`、`lib/nav.ts` |
| 23 | 兔耳生活等客戶回饋 logo 完整落在圓框內 |
| 24 | 頁尾新增書籍介紹區塊（書名、作者、出版社、定價 380、標語、介紹、「立即購書」、書封） |
| 4 | 本頁要拿掉的裝飾：品牌故事火焰手、數據區三色圓環、結尾弧形頂端火焰 |

### WP-D 共好永續力

| # | 要做的事 |
|---|---|
| 25 | 拱橋圖第四個標籤「成果」→「改變」（英文 Change） — `sustainability/HeroArch.tsx` |
| 26 | 創辦人照片在弧形框內置中、頭部不裁切（照片不換） |
| 27 | 創辦人專業資格改六項（含年份），拿掉 ICF；證照圖片放在該區、點圖放大（需新增 lightbox）。社會工作師只用遮蔽版 |
| 28 | IOOI 彩虹弧改成由左到右五格水平箭頭鏈（投入→活動→產出→成果→影響力），手機改直排；引言、五格說明、圖下小字逐字照書 — `sustainability/IooiSpan.tsx`。示意圖（`00-示意圖/事件鏈示意圖`）另有兩個標註：產出下方「回答『我們做了什麼？』」、影響力下方「回答『所以呢？』」（橘色），五格等高、不做弧形，色塊依序灰／深灰／黃／橘／深橘 |
| 29 | 雙效益理論整段照書改寫：標語、圖（環境＋社會→經濟，槓桿支點）、展開內容（收合只顯示前兩句）、出處；「議題→系統→商模」拿掉。英文名 Dual-Impact Leverage Model — `sustainability/DualBenefitArch.tsx`。示意圖用的是「兩個膠囊＋號、線往下匯到經濟效益」的樹狀圖（不是弧形），標題旁並列英文名；收合時右側只顯示第一段，按「讀完整論述」展開其餘與出處。示意圖上方寫「第 31 項」是舊編號，對應現在的 #29 |
| 30 | 服務分頁四個＋錨點（見 WP-B） |
| 31 | 實際成果加標籤「白皮書案例｜ModuLab」、標題改句、加按鈕連 `/events/impact-whitepaper#cases`、量化質化上方加小標「共好玟化累計成果」 |
| 32 | 共好生態圈新增「ESG共學坊夥伴」Logo 區（12 個，EverLab360、星芽、微碳石代放最前） — `site/EcosystemHub.tsx` |
| 33 | 顧問團隊上方新增「我們背後的夥伴網絡」段落 |
| 34 | 顧問團隊換成 10 位（吳玟樺第一），照片、單位、專長照第二節 — `data/team.ts`、`public/team/` |
| 第三節 | 「我們是誰」創辦人介紹加「現任銀色連線股份有限公司顧問專家」，公司名連到銀色連線官網 |
| 8 | 質化成果的學會與思凡名稱 |

### WP-E Logo 牆與案例

| # | 要做的事 |
|---|---|
| 12、32 | 依第三節三份名單重建 `data/clients.ts`：每筆加 `group: 'client' \| 'partner' \| 'ecosystem'`、正式全名（alt 與核對用）、英文名（英文第三節）、官網。用 `scripts/build-assets.mjs` 從 `assets-raw/rev2-202610/06-Logo/` 產出 WebP |
| 38 | 永續足跡案例：補回案例四「讓台灣永續被國際看見」（GSA logo）；四則案例都加照片與雙方 logo；案例一夥伴改「星芽社會企業 × 思凡自然農園」。RAFAC 三張 PNG 最大 55 MB 要壓縮；星芽兩張要裁掉底部售價欄 |
| 39 | 案例三夥伴與內文改正式全名、「董事長魏名聰」 |
| 46 | 合作洽詢「02 合作案例」照片牆：16 格（照片＋單位＋活動＋一句說明，逐字照原文），分類按鈕「全部／企業／醫療與社福／農業與地方／校園／國際與社群」，類內新到舊。只有四個非營利機構可點，點了用彈出視窗顯示原本的案例內容（沿用現有文字），其餘 12 格不可點樣式。原「公益夥伴方案」縮成方案總表最下方一行、「跨界溝通」拿掉 |
| 47 | 天晟醫院案例：標題「天晟醫院（天成醫療體系）」、照片說明、補一句、引言出處 |
| 46 | 愛慈案例副標改「特殊需求兒少安置」 |
| 53① | 白皮書內頁新增「白皮書案例」（錨點 `#cases`）：四張卡（封面＋客戶＋一句話），點進去是本站案例內容（產業／挑戰／我們怎麼做／成果／延伸閱讀，逐字照第五節），沒有官網的 ModuLab、勤億不放延伸閱讀。路由建議 `/events/impact-whitepaper/cases/[slug]` 或內頁彈出視窗（D3） |

### WP-F 表單後端

三個表單共用一支「寄信」API：送出後把填寫內容寄到 gho001@coesg.tw，**不另外存資料**（2026-11-09 決定）。信件主旨標明表單種類（如「[官網] 合作洽詢｜王小明」「[官網] 白皮書下載｜大古鑄鐵｜王小明」），`Reply-To` 設為填表人的 Email，收信後直接回覆即可。

| # | 表單 | 欄位 | 送出後 |
|---|---|---|---|
| 48 | 合作洽詢聯絡表單 | 現有欄位；「想聊的方向」7 個選項 | 寄信到 gho001@coesg.tw、頁面顯示成功訊息（英文定稿：Thank you. We have received your message and will reply by email.）；不再開啟 mailto |
| 50 | 加入我們 Email 訂閱 | Email | 寄信到 gho001@coesg.tw；英文欄位 Your email／Subscribe＋小字 |
| 53② | 白皮書下載 | 姓名、職稱、Email（必填） | 寄信到 gho001@coesg.tw（含下載哪一本）；送出後頁面直接給下載連結（四本壓縮版 PDF）。旁邊放創辦人介紹句 |
| 7 | 使用者條款、隱私權政策 | — | 新增 `/zh/terms`、`/zh/privacy`（英文 `/en/terms`、`/en/privacy` 等客戶給稿），頁尾加連結。隱私權政策要寫清楚上面三個表單蒐集的欄位、用途、存放方式（只寄到公司信箱 gho001@coesg.tw，網站本身不儲存）、Cookie 與分析工具。**我方依個資法起草，客戶確認後上線**，須在正式上線前完成 |

實作：Next.js Route Handler（`app/api/forms/route.ts`）或 Server Action，伺服端驗證、蜜罐欄位與頻率限制防垃圾、寄信失敗時顯示可重試的錯誤（不可顯示成功）。寄信方式依 D1。

注意：客戶文件把 Email 訂閱與白皮書下載當成「之後的名單收集入口」。只寄信的話，名單散在信箱裡，日後要用時需由客戶自己從信件整理（可在 Gmail 用主旨前綴篩選匯出）。這點回覆客戶時一併說明。

### WP-G 永續足跡與共好學習其餘

| # | 要做的事 |
|---|---|
| 36 | 學習地圖依階段配色：探索 01–03 黃 `#F9A500`、實作 04–07 橘 `#E8532A`、整合 08 深灰 `#595959` — `globals.css` `--color-level-*`、`learning/TopicExplorer.tsx` 或 `events/steps.tsx` |
| 37 | 時間軸拿掉資本額與增資金額（三處）；英文日期改 May 2022 格式 |
| 41 | 「逛逛永續商城」區塊：只留 CLASS logo；標題與按鈕改「永續商城」；連 `https://coesg.tw/categories/branding`；不加 LINE。區塊說明只談課程，**由我方提建議文案、客戶確認** — `site/CoesgBand.tsx` |
| 42 | 共好學習最下方新增「ESG共學坊訂閱」介紹（不寫價格）＋「前往永續商城」；開頭一句說明三個入口怎麼選；「讀完了，下一步呢？」改連方案總表 |
| 43 | 新增「線上工具」入口連 `https://go.coesg.tw/`：共好學習卡片＋頁尾一行文字連結（不放主選單） |

### WP-H 英文版第二、三階段

- 第二階段（中文上線後 1–2 週）：#36–#39 英文、#41–#43 英文、`whitepaper-workshop`／`sustainable-business-innovator`／`survey-design-workshop` 英文內頁、講師卡；EN6（16 篇文章在英文版只列英文標題＋[in Chinese] 並連中文原文，`/en/learning/<slug>` 轉 `/zh/learning/<slug>`，6 個英文分類頁轉 `/en/learning`）；EN7（`/en/insights` 與 `/en/learning` 重複，保留後者、前者轉址）。
- 第一階段期間，第二階段的英文頁面不可上半翻譯版本：顯示「This page is currently available in Chinese only」並連中文頁（R37）；第 35 項的「See course details →」先連 `/en/consulting#solutions`。
- 第三階段：3 篇英文定義頁（EN8），等客戶稿件與 #40 文章搬家完成。
- 全程依 R1–R37；所有英文字串從 [source/en.md](source/en.md) 的「請改為」欄逐字貼上。英文版版面要能伸縮（R30），定稿套上後用手機逐頁檢查。

### WP-I 上線與 SEO

正式上線、換上 coesg.tw 網域時一起做（上線檢核 6–11、13–14）：

1. #40：8 篇 AEO 文章搬到 `/zh/learning/<slug>`，`coesg.tw/posts/<slug>` 一律 301；文章頁公開、列入 sitemap。8 篇文章內容尚未提供到 repo（目前 `content/posts` 16 篇都不是這 8 篇），需向客戶或從舊站取得。
2. `robots.txt` 沿用舊站：明確允許 GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended、CCBot，保留 `Content-Signal: ai-input=yes`。
3. `/llms.txt`、每頁 canonical、文章 markdown 版（保留 H2）、首頁 JSON-LD Organization（共好玟化組織發展顧問有限公司／Gung-Ho Culture／coesg.tw）。
4. hreflang：每頁指向自己的中英版本＋`x-default`（目前 `layout.tsx` 只指向首頁）。這項可以提早在第一階段做。
5. 上線前檢核 2–4：條款隱私上線、三個表單實測一次、白皮書壓縮版經客戶確認、預錄課新網址補齊。

## 三、不在這次範圍（「商城時討論」）

新商城、藍新金流、訂閱流程、《影響力健檢手冊》線上購買、「訂閱 3 步驟」文章改寫或下架。這次只做過渡版連結（第一節第 6 點），程式裡把商城網址、手冊按鈕集中在 `site.ts` 與 `data/solutions.ts`，上線新商城時改一處即可。

## 四、需要決定的事

| # | 事項 | 選項 | 建議 |
|---|---|---|---|
| D1 | 三個表單用什麼寄信（已決定：只寄信、不存試算表） | (a) 寄信服務 API（如 Resend）：在 coesg.tw 的 DNS 加 SPF／DKIM 驗證寄件網域，從 `noreply@coesg.tw` 寄到 gho001；(b) 用 gho001 信箱本身的 SMTP（需該信箱的應用程式密碼，存在 Vercel 環境變數） | (a)：不用保管信箱密碼，寄信紀錄可查，免費額度足夠。需要能改 coesg.tw DNS 的人加三筆記錄；DNS 還沒能改之前，可先用服務商提供的測試寄件網域在測試站驗證 |
| D2 | 白皮書 PDF 下載檔放哪裡 | (a) 壓縮後放 `public/`（四本合計 ≤40 MB，進版控）；(b) 放 Vercel Blob 或客戶 Drive 公開連結 | (b) Drive 或 Blob：PDF 不進 git，也方便客戶日後換檔。不論哪種，壓縮版都要先給客戶確認 |
| D3 | 白皮書案例內容的呈現 | (a) 四個獨立頁 `/events/impact-whitepaper/cases/<slug>`；(b) 內頁彈出視窗 | (a)：每則案例有自己的網址，可被搜尋與 AI 引用，也方便分享 |
| D4 | 條款與隱私權政策條文 | 我方起草 → 客戶確認 | 寫明三個表單的資料只寄到公司信箱、網站不儲存 |
| D5 | #41 商城區塊說明文案 | 我方提 2–3 個版本 → 客戶確認 | — |

## 五、文件內的細節與風險（開發時注意）

1. **「目前」欄標【前次已提出】的項目**（#10 #24 #27 #33 #40 #45 #50 #53）客戶特別要求優先處理。
2. **兩份文件都說「逐字照用」**：中文第 15 項主張句、英文全部定稿。實作時從 `source/*.md` 複製，不要自行潤飾。
3. **#4 的範圍是開放式的**：「其他頁面若還有同類圖形，一併拿掉，並在回覆時列出」。做完要附清單。
4. **#12 會拿掉大量現有 logo**（49 個中只有部分在新名單內），`public/clients/` 未使用的檔案也一併清掉。
5. **照片的隱私與授權要求**：花壇國中不可用可辨識學生臉孔；滬尾不可用 `_01`（桌上有議員宣傳水瓶）；社工師證書只用遮蔽版；星芽禮盒圖要裁售價欄；李詠婕照片不可與資料夾內另一位 Joyce Li 混用。
6. **R35 與現況衝突**：目前根路徑依瀏覽器語言導向，要改（P0）。
7. **網域**：`site.url` 寫的是 coesg.tw，那是現在的 ESG共學坊平台。正式上線前不可讓測試站被收錄（P0），上線當天要配合 #40 的 301。
8. **白皮書工作坊價格**：方案總表與內頁顯示 NT$12,800／人，但永續足跡「下一梯次」卡「不寫價格」，兩處規則不同，是客戶刻意的（全站價格只放總表與內頁）。
