# home-v2／01｜首頁整體視覺系統研究（第二輪）

> 專案：共好玟化 CO-ESG 首頁改版（第二輪）
> 品牌：橘 `#F25232`、黃 `#FAB40A`、冷灰 `#4D515B`；Logo 為橘＋黃的水滴／花瓣筆觸組成的火焰
> 研究日期：2026-10-09
> 前置文件：`../01-benchmark-research.md`（第一輪：資訊架構、影響力數字、信任訊號、轉換路徑）。**本文不重複第一輪內容**，只看「整頁如何成為一個視覺系統」。
> 對應程式：`home-v2/proposals/_geo.css` 已定義 petal／disc／quarter／half／ring／arc／block／tri 與 rotate／mirror 輔助類別，本文的「CO-ESG 怎麼做」都以這組形狀為詞彙。

---

## 0. 方法與限制（請先讀）

- **WebFetch 全數失敗**：本次嘗試直接抓取 pentagram.com、kontrapunkt.dk、metadesign.com、itsnicethat.com、zeusjones.com、developer.mozilla.org，全部回傳 `ENOTFOUND`（網路代理封鎖）。**本文沒有任何一頁是直接閱讀全文。**
- **所有事實都來自 WebSearch 的搜尋摘要**（設計公司案例頁、設計媒體、官方新聞稿、W3C 文件的索引摘要）。
- **標記規則**：
  - 無標記＝搜尋摘要中有文字依據（來源見各節與文末）。
  - **【推測】**＝研究者依對該網站／品牌的既有認識或業界慣例推論，本次**無法驗證**。網站的「段落如何銜接、動態細節、明暗節奏」幾乎都是搜尋摘要拿不到的，因此這些欄位大量標記【推測】。
  - **【二手】**＝來自 AI 生成或非官方的「design.md／style reference」整理站（shadcn.io、refero、webdesignhot、summify 等），可信度低於設計公司自述。
- **建議**：設計師以瀏覽器實際捲動以下網站並錄影（不是截圖——轉場只能用錄影核對），存於 `docs/redesign/home-v2/screens/`。
- 名單調整：Watershed 的品牌系統查無公開案例（搜尋僅見其內部招募品牌設計師），改為次要參考；以 **Circular Economy Institute（FORM）** 補上「從 logo 字形衍生模組化幾何」這個最貼近 CO-ESG 需求的案例。Vercel／Framer、Awwwards 得獎站查無可驗證的具體段落描述，不列為主要參考。

---

## 1. 逐站分析（11 個參考）

### 1-1 Ørsted（Kontrapunkt，2017）——「一條生命流」貫穿所有媒材

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 核心圖形裝置是一條「lifestream」（生命流）元素，被形容為 dynamic and living、視覺化風電這個核心產品。專屬字體為幾何、親和的現代主義風格，帶有受「風」啟發的捲曲細節。系統涵蓋數位品牌中心、標誌、船隻／車輛塗裝、出版品、**聲音與動畫風格**。 |
| 段落銜接 | 【推測】生命流線條可跨越版面邊界，作為不同內容區塊之間的連續線索。 |
| 節奏 | 【推測】大量白底＋深藍，生命流與攝影提供彩度。 |
| 動態 | 有正式定義的 animation style（搜尋可證），細節不明。 |
| **借什麼** | **一個可以「跨段落延續」的品牌線條**——對 CO-ESG 就是「拱橋弧線」：同一條弧在 Hero 出現、在段落交界被接續、在 CTA 收束。 |

來源（搜尋）：https://kontrapunkt.dk/work/a-global-energy-company-goes-green ・ https://www.brandhave.fun/projects/orsted-work-by-kontrapunkt ・ https://theindexproject.org/award/nominees/3340

### 1-2 Mastercard（Pentagram，2016／2019）——用「最簡單的形狀」當整個系統

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | Bierut 的理由：兩個原色與最簡單的形狀（圓）是品牌早已擁有的資產，所以放大它而不是取代它；2019 年拿掉字標只留圓。Fast Company：圓形母題是整個識別的貫穿線，出現在**照片裁切方式**、宣傳單的圖形點綴、實體卡片的圖樣。 |
| 段落銜接 | 【二手】官網服務區把照片遮罩成圓形，以細弧線連接、跨越整個視窗；每個圓旁掛一個小型白色「衛星」CTA。 |
| 節奏 | 【二手】暖奶油色底、攝影為主；**logo 的紅黃只用在 logo 本身，不當 UI 色**。 |
| 動態 | 查無可靠資料。 |
| **借什麼** | **形狀＝圖片遮罩**：CO-ESG 的照片不要用矩形，而是用 quarter-disc／petal 裁切；以及「logo 原色不濫用於 UI」的紀律。 |

來源（搜尋）：https://www.fastcompany.com/3061799/mastercard-gets-its-first-new-logo-in-20-years ・ https://www.creativereview.co.uk/new-mastercard-logo-pentagram/ ・ https://www.dezeen.com/2019/01/10/mastercard-rebrand-pentagram-design/ ・ https://www.designweek.co.uk/mastercard-new-logo-first-time-20-years-2/ ・【二手】https://www.shadcn.io/design/mastercard

### 1-3 Climeworks（Metadesign）——形狀「變態」講一個轉化故事

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 品牌核心是「轉化／蛻變（metamorphosis）」：CO₂ 從氣態變成石頭。Logo 用兩套字體表達狀態轉換；**圓形與方形**以圖形化、玩味的方式在整個品牌體驗中反覆出現，是後續所有應用的核心元素。影像呈現「不同物態的自然」質地。 |
| 段落銜接 | 【推測】圓→方的變形可作為段落轉場的語意（從問題到解方）。 |
| 節奏 | 搜尋只提「colorful design elements」，無具體色票。 |
| 動態 | 查無。 |
| **借什麼** | **讓形狀變化承載敘事**：CO-ESG 的「品牌／農場／NPO（花瓣、有機）」→「企業（方塊、格線）」，中間由「拱橋（弧）」連接——形狀本身就是商業模式圖。 |

來源（搜尋）：https://metadesign.com/en/work/climeworks ・ https://www.horizont.net/schweiz/nachrichten/climeworks-metadesign-gestaltet-marke-von-co2-absorber-184533

### 1-4 Circular Economy Institute（FORM Brands Studio，2024 後）——從字母衍生的模組

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 把字母 C **旋轉**組成一個由相互關聯部件構成的球體；這些部件成為可「調整、重複、連接」的積木，延伸到整個識別。創意總監：要把循環表現為「主動的系統，而不是靜態符號」。刻意**避開綠色／棕色與葉子**等永續陳腔，改用鮮明當代色；字體 Satoshi。 |
| 段落銜接／節奏／動態 | 查無網站層級資料。 |
| **借什麼** | **logo 拆解成零件→零件再重組**的方法論，與 CO-ESG 完全同構：火焰拆成數片花瓣，花瓣旋轉 90° 的倍數即可拼成圓、拱、四分圓。也證明「不用綠色的永續品牌」可行——CO-ESG 的橘黃是優勢。 |

來源（搜尋）：https://www.creativeboom.com/news/form-brands-studio-refreshes-the-circular-economy-institute-with-a-people-powered-identity ・ https://visuelle.co.uk/circular-economy-institute/

### 1-5 Ecosia（Koto，2022）——沒有直線的形狀語言

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 兩個概念：「Power the regeneration」「Never Neutral」。樹木插畫須為向量、可縮到很小，因此不用材質；**刻意不用直線**，形成柔和、傾斜的造型，單株插畫常合併成**互相咬合的森林場景**。Animade 的動畫延伸為「大膽色彩＋刻意的不完美」、2D 角色放在略歪的 3D 背景上。 |
| 段落銜接 | 【推測】咬合的插畫場景可橫跨段落邊界，形成「地景式」連續背景。 |
| 動態 | 有正式動畫延伸（Animade），細節見來源。 |
| **借什麼** | **「單件→咬合成場景」**：首頁上分散的花瓣在某一段「長成」完整的場景（例如共好生態系段落）。 |

來源（搜尋）：https://www.itsnicethat.com/news/koto-ecosia-graphic-design-160822 ・ https://animade.tv/notes/ecosia-animation ・ https://techcrunch.com/2022/06/09/ecosia-updates/

### 1-6 B Lab／B Corp Month（Nice and Serious 等，2022；Zeus Jones，2025）——logo 變窗、logo 被拉伸

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 2022「Behind the B」：B 標誌變成一扇**窗**，讓人看見背後的工作；另建 B 形紋樣系統疊入版面；標題 Helvetica Neue Bold；須同時適用中小企業與跨國企業。2025「Gen B」（Zeus Jones）：脫離乾淨極簡的非營利美學，**B 形被拉伸**以暗示成長與動感。 |
| 段落銜接 | 【推測】「窗」天然是遮罩揭示（mask reveal）轉場。 |
| **借什麼** | **logo 當遮罩窗口**：CO-ESG 的火焰／花瓣輪廓作為 `mask`，透出下一段的照片或色塊——同時講「看見背後的價值」。另外「同一套系統要讓小農與上市公司都能用」與 CO-ESG 的雙客群完全一致。 |

來源（搜尋）：https://itsnicethat.com/news/nice-and-serious-behind-the-b-graphic-design-010322 ・ https://niceandserious.com/work/3-years-of-b-corp-month ・ https://zeusjones.com/work/b-lab

### 1-7 Oatly（Forsman & Bodenfors，2015）——語氣就是版面系統

| 面向 | 觀察 |
|---|---|
| 幾何／色塊系統 | 把包裝當主要媒體；看起來「像 Oatly 炒了設計公司自己做」，介於龐克傳單與漫畫之間；手寫字＋客製字體（John Rounded、Toni Grotesk）、內文 FF Magda；文字以奇怪角度繞圖。 |
| 段落銜接 | 【二手】官網 Hero 為兩欄：大寫巨標＋圖片；插畫少而醒目，像手蓋印章。 |
| 節奏／動態 | 查無。 |
| **借什麼** | **一個「大聲」的時刻就夠**：CO-ESG 不需要全頁都很吵，但需要一個像 Oatly 那樣有個性的段落（例如創辦人手寫的一句話、或「我們不做漂綠」的立場宣言）。 |

來源（搜尋）：https://www.lovethework.com/work-awards/entries/103794 ・ https://fontsinuse.com/uses/37736/oatly-packaging-2015 ・【二手】https://styles.refero.design/style/bb09f629-517a-4f74-93f2-26a55ffa9e13

### 1-8 Too Good To Go（內部團隊，2023）——從功能到情感的改版

| 面向 | 觀察 |
|---|---|
| 系統 | 2023 年 3 月（拯救 2 億份餐點時）發表；由哥本哈根、倫敦、巴黎、馬德里、米蘭、多倫多的內部團隊完成；從「功能／宏觀環境效益」轉向「與社群的情感連結」；個性：友善、誠實、謙遜、真誠；要跨世代。 |
| 幾何／色彩／轉場 | **搜尋查無具體色票、形狀與網站轉場描述。**【推測】綠色系＋插畫＋圓角卡片。 |
| **借什麼** | **里程碑數字當改版敘事起點**（「2 億份」）——CO-ESG 首頁的「大聲時刻」可以是一個累積數字。形狀層面無可驗證內容，僅作語氣參考。 |

來源（搜尋）：https://www.toogoodtogo.com/en-gb/press/brand-launch ・ https://www.markt-kom.com/en/?p=194260

### 1-9 Stripe（2020 → 2026 首頁）——段落用「形狀與色塊」而非線條分隔

| 面向 | 觀察 |
|---|---|
| 系統 | 2020 版的漸層波浪「無法好好延展」，新版以內部工具生成波浪（調整模糊、顆粒、旋轉、粗細、質地、顏色）。產品以 **bento 格**呈現，hover 展開 modal 做漸進揭露；首頁有「佔全球 GDP 比例」計數器作信任訊號。第三方分析：多個線性漸層以旋轉網格排列，部分地方**刻意用銳利邊界製造角度與色彩分隔**。 |
| 段落銜接 | 【二手】斜切色帶（約 −8°）內放漸層——此描述來自非官方模板，不能當成 Stripe 實作。【推測】Stripe 以斜切邊界取代水平分隔線，是業界最常被模仿的「斜切轉場」。 |
| 節奏 | 【推測】淺色為主，中段插入一個深色區塊（開發者／程式碼）。 |
| **借什麼** | **(a) 品牌圖形必須「能延展」**——Stripe 自己承認舊波浪不行，提醒我們每個幾何母題都要在 375px 到 1440px 驗證；**(b) bento 格＝模組格**，與 `_geo.css` 的 `.geo-grid` 天然對應；**(c) 計數器作為證明段的單一大數字**。 |

來源（搜尋）：https://startup.whatfinger.com/2026/04/22/how-stripe-built-their-new-website/ ・ https://archive.leerob.io/blog/how-stripe-designs-beautiful-websites ・【二手】https://summify.io/discover/how-stripe-built-their-new-website-ypzNhw/ ・ https://designmodo.com/websites-gradients/

### 1-10 Linear（官網）——暗色節奏與色彩克制

| 面向 | 觀察 |
|---|---|
| 系統 | 評論者認為 Linear 官網對網頁設計最明顯的影響是**深色模式**；LogRocket（2025）指出改版後「大幅減少用色」。產品端 2024 改用 LCH 色彩空間產生主題；2026 年 3 月再調整（降低側欄亮度、柔化邊框）【二手摘要】。 |
| 段落銜接 | 【推測】以深色底上的細微漸層光暈與產品截圖區分段落，幾乎不用硬分隔線。 |
| **借什麼** | **顏色越少，品牌色越亮**：CO-ESG 若在中段放一個冷灰 `#4D515B`／墨色深色段，橘色在深底上會是全頁最亮的點——這就是「大聲時刻」的舞台。 |

來源（搜尋）：https://anthonyhobday.com/blog/20230119.html ・ https://blog.logrocket.com/how-do-you-implement-accessible-linear-design-across-light-and-dark-modes/ ・ https://linear.app/blog/how-we-redesigned-the-linear-ui

### 1-11 Patagonia（BASIC/DEPT®）——攝影是唯一的「色塊」

| 面向 | 觀察 |
|---|---|
| 系統 | BASIC/DEPT 負責整體 UX，與 Patagonia 內部團隊共同處理藝術指導與設計系統，並重新設計 Footprint Chronicles；產出高擬真風格指南涵蓋首頁、導覽、商品篩選；Webby 2021、行動營收 +25%（代理商自述）。【二手】兩份第三方摘要對字體與色彩描述互相矛盾（Futura 風＋品牌紅 vs. 自有 Ridgeway Sans、介面無品牌彩色），**不採信**。 |
| 段落銜接 | 【推測】全出血照片區塊與奶油色文字區塊交替，攝影本身構成明暗節奏。 |
| **借什麼** | **照片也要納入色塊系統**：CO-ESG 的現場照片（農場、共學坊）應依暖／冷調分級，當作「彩色色塊」排入節奏，而非隨意插入。 |

來源（搜尋）：https://basicagency.com/case-studies/patagonia-ecommerce-website ・ https://www.deptagency.com/en-uki/case/a-branded-commerce-experience/

### 1-12 補充：動態與無障礙的規範來源

- W3C WCAG 2.3.3 Animation from Interactions（AAA）：互動觸發的非必要動態須可關閉；**捲動是主要例子，視差（parallax）被點名為常見非必要動畫**；前庭障礙者可能暈眩、噁心、偏頭痛。自動開始的動態屬 2.2.2 Pause, Stop, Hide（AA）。可用 `prefers-reduced-motion` 或頁面開關，建議兩者併用。
- CSS 捲動驅動動畫（`animation-timeline: scroll()／view()`）：MDN 標示 `view()` **尚非 Baseline**；各來源對 Firefox 支援說法不一致——**以實作當下的 caniuse／MDN 為準**。共識作法：預設呈現「完成狀態」，動畫包在 `@supports (animation-timeline: view())` 與 `@media (prefers-reduced-motion: no-preference)` 內；注意 `animation` 簡寫會把 `animation-timeline` 重設為 `auto`，必須寫在簡寫之後。

來源（搜尋）：https://w3c.github.io/wcag/understanding/animation-from-interactions.html ・ https://dequeuniversity.com/resources/wcag2.1/2.3.3-animations-from-interactions ・ https://developer.mozilla.org/docs/Web/CSS/animation-timeline/view ・ https://tympanus.net/codrops/?p=75216 ・ https://12daysofweb.dev/2023/css-scroll-driven-animations/

---

## 2. 綜合原則（12 條）

形狀詞彙（沿用 `_geo.css`）：**花瓣 petal**（火焰筆觸）、**弧／拱 arc**（橋＝連結品牌與企業）、**四分圓 quarter／半圓 half／圓 disc**（火焰圓底在格線上切開）、**色塊 block**（平塗 CIS 色方塊）。
變形動詞：**旋轉 rotate（90° 倍數）、鏡射 mirror、縮放 scale、換色 recolour、重組 recombine**。

**H1｜一個母題、多個狀態**（Mastercard、CEI）
整頁只有一個母題家族，所有形狀都能回溯到 logo。
→ CO-ESG：Hero 出現完整火焰 logo；之後每段只用它的「零件」。規則寫成表：petal ×2 旋轉 180° 相接＝disc；quarter ×4 旋轉 0/90/180/270＝disc；half ×2 鏡射＝arc。**不得引入 logo 外的任何形狀**（不用三角形裝飾、不用葉子 icon）。

**H2｜形狀變化＝敘事進度**（Climeworks）
形狀不是裝飾，是商業模式圖。
→ CO-ESG：有機端（品牌／小農／NPO）＝花瓣；企業端＝方塊格；兩者之間＝拱橋。首頁從上到下由「花瓣多、方塊少」漸變到「方塊格中嵌一片花瓣」，中段由一道大拱連接——讀者捲完一頁，就看完了「橋接」這件事。

**H3｜一條線貫穿全頁**（Ørsted 生命流）
→ CO-ESG：一條 `arc` 弧線從 Hero 右下角開始，在每個段落交界被下一段「接住」（形狀接力），最後在 CTA 段閉合成完整的 `ring`。閉合＝合作成立。

**H4｜形狀當遮罩，不當貼紙**（Mastercard 照片裁切、B Corp 的窗）
→ CO-ESG：所有照片以 quarter（scale 放大、rotate 決定朝向）或 petal 裁切；個案故事段以火焰輪廓作 `mask-image` 透出現場照。形狀「承載內容」時才有意義，純裝飾形狀每屏最多 1–2 個。

**H5｜換色而不換形，標示角色**
→ CO-ESG：同一片 petal，橘＝CO-ESG 自己／主行動；黃＝夥伴（品牌、小農、NPO）；冷灰＝企業端／資料。證明段的數字卡：同一個 quarter 形狀以三色區分「陪伴企業／合作 NPO／共學人次」。

**H6｜模組格是底層秩序**（Stripe bento、CEI 積木）
→ CO-ESG：以 `--geo-unit` 為模組，所有色塊、卡片、照片的尺寸皆為單位整數倍；服務入口做 2×2 或 3×2 bento，每格角落嵌一個 quarter（rotate 決定位於哪個角），四格的 quarter 朝向中心時合成一個 disc——**重組**成為隱藏的整體感。

**H7｜一頁只有一個「大聲時刻」**（Oatly、Linear）
→ CO-ESG：全頁唯一的滿版橘色段（或深灰底上的巨大橘 disc）放在「故事」段（立場宣言／創辦人一句話），其他段都以白／米白為底、橘只做重點。不要讓 Hero 和 CTA 也同時滿版橘，否則失去高峰。

**H8｜明暗交替要有規律，但不要機械**（Linear、Patagonia）
→ CO-ESG 建議節奏：米白（Hero）→ 白（證明）→ **冷灰深色（故事，大聲時刻）**→ 米白（服務 bento）→ 白（生態系／文章）→ 黃色塊（參與階梯，次高峰）→ 橘（最終 CTA，面積小於故事段）→ 墨色頁尾。深色段只用一次。

**H9｜轉場由形狀負責，不由分隔線負責**（Stripe 斜切）
→ CO-ESG：段落間不畫 `<hr>`、不用陰影；以「上一段的形狀溢出到下一段」或「下一段的色塊以弧形邊界切入」完成交接（見第 3 節）。

**H10｜圖形要先在手機上成立**（Stripe 自承舊波浪無法延展）
→ CO-ESG：每個母題在 375px 驗證：大拱在手機上改為「半拱」（只留右半弧，mirror 不用）；bento 退回單欄時 quarter 角飾仍保留在每張卡同一角，維持秩序。

**H11｜動態只放大「變形動詞」，且預設靜止**（WCAG 2.3.3、2.2.2）
→ CO-ESG：允許的動態只有：rotate 90°（≤600ms）、scale 0.94→1、recolour、拱弧描邊（stroke-dashoffset）。全部包在 `prefers-reduced-motion: no-preference` 內，靜止狀態即完整設計；不做視差、不做捲動劫持、無限循環動畫（如 `_geo.css` 的 `.geo-spin`）提供暫停或只在 hover 時播放。

**H12｜系統要讓「兩種客群」都看得見自己**（B Corp「SME 與跨國企業都能用」）
→ CO-ESG：首頁至少一處讓花瓣（價值型品牌）與方塊（企業）在同一個畫面「重組」成新形狀——例如生態系段：黃 petal ＋ 灰 block 拼成一個 quarter-disc，即「共好」的視覺定義。這是全頁的概念高點，可以和 H7 的大聲時刻合併。

---

## 3. 轉場技法目錄（10 種）

> 通則：**預設＝靜態完成狀態**；動態一律 `@media (prefers-reduced-motion: no-preference)` ＋ `@supports (animation-timeline: view())` 雙層包覆；不支援的瀏覽器看到的就是設計稿。裝飾形狀一律 `aria-hidden="true"`、`pointer-events: none`。

### T1｜形狀接力（Shape Relay）
- **怎麼運作**：上一段尾端的形狀（如一片 petal 或半個 disc）跨出段落邊界，下一段把它「接住」並變形（rotate 90°／recolour）成自己的開頭元素。
- **實作**：形狀 `position: absolute; bottom: calc(var(--geo-unit) * -0.5)`，段落 `overflow: visible` 並以 `z-index` 控制層級；接住的一方用同尺寸形狀放在相同 x 座標。可加 `animation-timeline: view(); animation-range: entry 0% cover 40%` 做 rotate。
- **風險**：負邊距溢出可能遮擋下一段標題／可點元素（a11y：點擊目標被覆蓋）；手機版易造成水平捲動——父層加 `overflow-x: clip`。
- **最適合**：Hero → 證明、證明 → 故事（建立「同一系統」第一印象）。

### T2｜色塊延伸（Colour-Block Extension）
- **怎麼運作**：下一段的底色先以一個 block 或 quarter 的形態「伸進」上一段的角落，捲到後才擴成整段背景。
- **實作**：下一段加 `::before` 色塊，`translate` 到上方；靜態版即為一個角落色塊。動態版以 `view()` 驅動 `scale`（transform-origin 設在角落），避免動畫 `width/height` 造成重排。
- **風險**：色塊上方若有文字，需檢查對比（黃 `#FAB40A` 底上只能放深灰／墨色字）。
- **最適合**：淺色段 → 色塊段（如服務 bento → 黃色參與階梯）。

### T3｜弧線連續（Continuous Arc）
- **怎麼運作**：一條品牌弧線（拱橋）跨越多個段落，每段只看到其中一截，整頁拼成一道完整的拱或環（H3）。
- **實作**：一張 `position: absolute` 的全頁 SVG（`preserveAspectRatio="none"` 不可用，會變形——改為每段一截 SVG，端點座標對齊模組格）；可選 `stroke-dasharray/dashoffset` 以 `scroll()` timeline 描繪。
- **風險**：段落高度隨內容變化，端點會錯位——端點一律落在段落上下緣的固定 x（如 `75%`），不要依賴累計高度；描邊動畫屬捲動觸發動態，需 reduced-motion 停用。
- **最適合**：Hero → CTA 的全頁主線；尤其故事 → 生態系（橋接意象最強處）。

### T4｜斜切／弧切邊界（Angled or Arched Seam）
- **怎麼運作**：段落邊界不是水平線，而是斜線或弧線（CO-ESG 優先用**弧切**，與拱橋同源；斜切只用一次）。
- **實作**：`clip-path: ellipse(…)` 或 `clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 100%)`；弧切也可用下一段頂部的半圓 `border-radius: 50% 50% 0 0 / 100% 100% 0 0`。純 CSS、零 JS、無動態風險。
- **風險**：`clip-path` 會裁掉焦點外框（focus ring）與溢出的陰影——可聚焦元素需離邊界一個模組以上；角度用 `vw` 時大螢幕過陡，請 `clamp()`。
- **最適合**：淺 → 深的明暗交界（證明 → 故事深色段）。

### T5｜遮罩揭示（Mask Reveal）
- **怎麼運作**：以火焰／petal 輪廓為窗，先露出下一段影像的一部分，捲動時窗口放大到全幅（B Corp「窗」的動態版）。
- **實作**：`mask-image: url(flame.svg); mask-size: 30%` → `view()` 驅動 `mask-size` 到 `300%`。靜態版保留小窗＋旁邊正常大小的圖。`mask-size` 動畫會觸發重繪，限一頁一次、圖片先壓縮。
- **風險**：重繪成本高（低階手機掉幀）；輪廓內的圖若帶資訊須另有 `alt`，被遮住部分不能含關鍵文字。
- **最適合**：故事 → 個案（「看見背後」）；或 Hero 本身。

### T6｜黏著分鏡（Sticky Storyboard）
- **怎麼運作**：一側（或背景）的形狀組合 `position: sticky` 固定，另一側文字捲動；每段文字對應形狀一次變形（例如 IOOI 四步：petal → arc → quarter ×4 → disc）。
- **實作**：容器 `display: grid`，圖形欄 `position: sticky; top: 15vh`；狀態切換以 `view-timeline-name` 綁在各文字段，或用 IntersectionObserver 加 class（後者相容性最好）。**不做 scroll-snap 強制停頓、不劫持滾輪。**
- **風險**：最易造成「捲動劫持」感與前庭不適；鍵盤／讀屏使用者無法感知形狀變化——每個狀態的意義必須也寫在文字裡。手機改為「每段文字上方放一張靜態形狀圖」。
- **最適合**：故事段內部（IOOI 或「我們怎麼橋接」流程），全頁限一次。

### T7｜重疊卡片（Overlapping Cards）
- **怎麼運作**：下一段的卡片（數字卡、bento 第一列）以負邊距往上壓進上一段的色塊，形成「前景跨越背景」的層次。
- **實作**：`margin-top: calc(var(--geo-unit) * -1.5)`，卡片白底＋quarter 角飾；可選 `position: sticky` 堆疊卡片（每張 `top` 遞增 1rem）。
- **風險**：疊層造成 DOM 順序與視覺順序不符時，Tab 順序會混亂——保持 DOM 順序＝視覺順序；堆疊卡片時注意被覆蓋卡片內的連結仍可聚焦但看不見。
- **最適合**：Hero → 證明（數字卡壓在 Hero 底部）；服務段 → 文章段。

### T8｜背景色漸移（Background Colour Handoff）
- **怎麼運作**：不切段落邊界，而是整個頁面背景色隨捲動從米白漸移到冷灰（或黃），讓「大聲時刻」溫和地到來。
- **實作**：以 `view()` timeline 動畫 `body` 或段落容器的 `background-color`；不支援時，各段直接用自己的底色（硬切，仍成立）。或以 `linear-gradient` 在段落上下 20% 處漸變（純靜態）。
- **風險**：漸變中段若文字色未同步切換，會出現短暫對比不足——文字色與背景綁定同一動畫，或漸變區不放文字；`background-color` 動畫觸發重繪但成本低。
- **最適合**：故事深色段的進場與退場；頁尾前的收束。

### T9｜形狀重組（Recombine / Assemble）
- **怎麼運作**：分散在一段中的 4 個 quarter（或 2 個 petal）在捲到段落中心時旋轉／位移合成一個 disc（或火焰），象徵「共好」。
- **實作**：每片 `transform: translate(var(--dx), var(--dy)) rotate(var(--r))`，以 `view()` 的 `animation-range: entry 20% cover 50%` 歸零。靜態版＝已合成的完整形狀（**完成狀態才是預設**）。
- **風險**：動態屬「位移＋旋轉」，對前庭敏感者最刺激——位移距離 ≤1 模組、時間短；reduced-motion 直接顯示合成結果。
- **最適合**：生態系／夥伴段（H12 的概念高點），或最終 CTA 前。

### T10｜比例縮放接棒（Scale Handoff）
- **怎麼運作**：上一段的小形狀（如 CTA 旁一個小 disc）在下一段放大成整段背景圖形；或反向，大拱縮成下一段卡片上的小角飾——同一形狀、不同尺度，形成記憶點。
- **實作**：純靜態即可成立（相同形狀在兩段以不同 `--s` 出現、位置對齊）；動態版以 `view()` 驅動 `scale`，`transform-origin` 對準上一段形狀的位置。
- **風險**：大尺度 scale 動畫面積大，屬 WCAG 2.3.3 所稱「大面積移動」——預設採靜態版；動態版僅在桌機、reduced-motion 關閉時啟用。
- **最適合**：Hero → 證明（Hero 大火焰 → 數字卡上的小 quarter）；故事 → 參與階梯。

---

## 4. 首頁節奏建議（Hero → 證明 → 故事 → 轉換）

| # | 段落 | 底色 | 主形狀（動詞） | 進入此段的轉場 | 音量 |
|---|---|---|---|---|---|
| 1 | Hero：一句主張＋主次 CTA | 米白 | 完整火焰 logo＋大拱起點 | — | 中 |
| 2 | 證明：3–4 數字卡 | 白 | quarter 角飾（recolour 三色） | T7 重疊卡片＋T10 縮放接棒 | 低 |
| 3 | 故事：立場／創辦人一句話 | 冷灰深色 | 巨大橘 disc／火焰遮罩 | T4 弧切＋T8 背景漸移 | **最高（唯一）** |
| 4 | 方法：IOOI 或「我們怎麼橋接」 | 深色延續或米白 | petal → arc → quarter → disc | T6 黏著分鏡（限一次） | 中 |
| 5 | 服務 bento | 米白 | 模組格＋四角 quarter 重組 | T1 形狀接力 | 低 |
| 6 | 生態系（品牌／小農／NPO ⇄ 企業） | 白 | petal＋block → quarter（recombine） | T9 形狀重組＋T3 弧線連續 | 中高（概念高點） |
| 7 | 參與階梯（讀→LINE→共學→諮詢） | 黃色塊 | 四階方塊（scale 遞增） | T2 色塊延伸 | 中 |
| 8 | 最終 CTA | 橘（小面積） | 弧線閉合成 ring | T3 弧線收束 | 中高 |
| 9 | 頁尾 | 墨色 | 小火焰 | 硬切 | 低 |

- 證明段要「安靜」：第一輪已決定數字＋註腳，本輪只要求數字卡尺寸落在模組格、角飾統一。
- 深色段只出現一次；若第 4 段延續深色，則第 3+4 合成一個「深色章節」，進出各一次轉場。
- 每屏裝飾形狀 ≤2 個（不含承載內容的遮罩）；全頁捲動驅動動畫 ≤4 處（建議 T5 或 T6 二選一）。

---

## 5. 來源總表

**直接抓取（WebFetch）**：無。以下皆嘗試失敗（ENOTFOUND）：pentagram.com/work/mastercard、kontrapunkt.dk、metadesign.com/en/work/climeworks、itsnicethat.com（Ecosia）、zeusjones.com/work/b-lab、developer.mozilla.org（scroll-driven animations）。

**僅經搜尋摘要（WebSearch）**
- Ørsted：https://kontrapunkt.dk/work/a-global-energy-company-goes-green ・ https://www.brandhave.fun/projects/orsted-work-by-kontrapunkt ・ https://theindexproject.org/award/nominees/3340
- Mastercard：https://www.fastcompany.com/3061799/mastercard-gets-its-first-new-logo-in-20-years ・ https://www.creativereview.co.uk/new-mastercard-logo-pentagram/ ・ https://www.dezeen.com/2019/01/10/mastercard-rebrand-pentagram-design/ ・ https://www.designweek.co.uk/mastercard-new-logo-first-time-20-years-2/ ・【二手】https://www.shadcn.io/design/mastercard
- Climeworks：https://metadesign.com/en/work/climeworks ・ https://www.horizont.net/schweiz/nachrichten/climeworks-metadesign-gestaltet-marke-von-co2-absorber-184533
- Circular Economy Institute：https://www.creativeboom.com/news/form-brands-studio-refreshes-the-circular-economy-institute-with-a-people-powered-identity ・ https://visuelle.co.uk/circular-economy-institute/
- Ecosia：https://www.itsnicethat.com/news/koto-ecosia-graphic-design-160822 ・ https://animade.tv/notes/ecosia-animation ・ https://animade.tv/work/ecosia-animation ・ https://techcrunch.com/2022/06/09/ecosia-updates/
- B Lab／B Corp Month：https://itsnicethat.com/news/nice-and-serious-behind-the-b-graphic-design-010322 ・ https://niceandserious.com/work/3-years-of-b-corp-month ・ https://zeusjones.com/work/b-lab
- Oatly：https://www.lovethework.com/work-awards/entries/103794 ・ https://fontsinuse.com/uses/37736/oatly-packaging-2015 ・【二手】https://styles.refero.design/style/bb09f629-517a-4f74-93f2-26a55ffa9e13 ・ https://brandkit.pro/brand/oatly
- Too Good To Go：https://www.toogoodtogo.com/en-gb/press/brand-launch ・ https://www.markt-kom.com/en/?p=194260 ・ https://www.toogoodtogo.com/es/press/new-brand
- Stripe：https://startup.whatfinger.com/2026/04/22/how-stripe-built-their-new-website/ ・ https://archive.leerob.io/blog/how-stripe-designs-beautiful-websites ・ https://designmodo.com/websites-gradients/ ・【二手】https://summify.io/discover/how-stripe-built-their-new-website-ypzNhw/ ・【二手】https://slidespeak.co/slide-design-prompts/prompts/stripe-style
- Linear：https://anthonyhobday.com/blog/20230119.html ・ https://blog.logrocket.com/how-do-you-implement-accessible-linear-design-across-light-and-dark-modes/ ・ https://linear.app/blog/how-we-redesigned-the-linear-ui ・【二手】https://www.plushcap.com/companies/linear/blog/summaries/2026/03
- Patagonia：https://basicagency.com/case-studies/patagonia-ecommerce-website ・ https://www.deptagency.com/en-uki/case/a-branded-commerce-experience/
- 無障礙／CSS：https://w3c.github.io/wcag/understanding/animation-from-interactions.html ・ https://dequeuniversity.com/resources/wcag2.1/2.3.3-animations-from-interactions ・ https://developer.mozilla.org/docs/Web/CSS/animation-timeline/view ・ https://tympanus.net/codrops/?p=75216 ・ https://12daysofweb.dev/2023/css-scroll-driven-animations/ ・ https://ics.media/en/entry/230718/
- 查無可用內容（已排除）：Watershed（僅見招募頁 https://watershed.com/careers/27b50853-brand-design-lead）、Pentagram DECC（模組框形，但非圓弧系統 https://www.pentagram.com/work/decc）、Awwwards sustainability 元素頁（無日期與段落細節）。

**後續待辦**
1. 以瀏覽器**錄影**捲動 Ørsted、Mastercard、Stripe、Linear、Ecosia 首頁，核對所有【推測】的段落銜接與明暗節奏。
2. 實作前以 caniuse 確認 `animation-timeline: view()` 與 `mask-size` 動畫在目標瀏覽器（含 iOS Safari、Firefox）的當下支援度。
3. 在 375px 與 1440px 各驗證一次 T3 弧線端點對齊與 T1 溢出是否造成水平捲動。
