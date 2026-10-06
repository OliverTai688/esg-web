# 01｜永續／ESG 品牌網站標竿研究（Benchmark Research）

> 專案：共好玟化 CO-ESG 網站改版
> 品牌色：橘 `#F25232`、黃 `#FAB40A`、冷灰 `#4D515B`
> 研究日期：2026-10-06
> 文件用途：作為資訊架構、視覺語言與轉換路徑設計的依據

---

## 0. 研究方法與限制（請先讀）

- **原訂方法**：以 WebFetch 直接抓取 10 個網站的首頁與 1–2 個內頁，輔以 WebSearch 查詢設計案例。
- **實際情況**：本次執行環境的網路出口代理（egress proxy）**封鎖了所有目標網域**，包括 patagonia.com、orsted.com、se.com、unilever.com、ikea.com、interface.com、naturaeco.com、deltaww.com、southpole.com、bcorporation.net，以及第三方設計案例網站（vizzuality.com、deptagency.com、landingdoctors.com、brand.bcorp.com、sciencebasedtargets.org）。**沒有任何一頁是直接抓取成功的。**
- **因此本文件所有內容都來自 WebSearch 的搜尋結果摘要**（官方新聞稿、官網頁面的搜尋索引摘要、第三方報導與設計案例摘要）。
- **標記規則**：
  - 無標記＝搜尋結果中有明確文字依據（來源見文末）。
  - **【推測】**＝根據研究者對該品牌網站的既有認識或業界慣例推論，**本次無法以抓取或搜尋驗證**。主要集中在「視覺語言」（字體、配色、動態）與「Hero 細節」（CTA 數量、媒體類型）——這些是搜尋摘要最無法呈現的部分。
- **建議**：正式定稿設計前，請設計師以瀏覽器實際瀏覽這 10 個網站，逐一核對標記為【推測】的項目並截圖存檔（建議存於 `docs/redesign/screenshots/`）。
- 10 個網站皆保留原名單，未替換（雖然都無法直接抓取，但每個都有足夠的搜尋結果可分析；替換成其他同樣被封鎖的網站沒有意義）。

---

## 1. 逐站分析

### 1-1 Patagonia（patagonia.com／Activism、Our Footprint）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 大幅全版戶外／行動現場攝影，搭配黑色實心按鈕，按鈕與 Hero 圖及標題文字形成強烈對比（第三方 CTA 分析提及「stark, black buttons」）。CTA 多為 1–2 個，一個導向購買、一個導向內容。CTA 數量【推測】 |
| **資訊架構** | 第三方案例（DEPT 改版案）指出：新導覽「以商品與使命導向的敘事並重」，網站內容約 **50/50 分配於購物與品牌歷史／哲學／環境行動**；Patagonia Action Works、The Footprint Chronicles 等計畫被提升到容易被發現的位置 |
| **影響力數字** | Footprint Chronicles：曾揭露 Spring 2012 產品線約 **90%** 的環境與社會足跡；數字直接放在**商品頁**（生產浪費量、產地、供應鏈仍面臨的挑戰）——「在做購買決定的地方揭露影響」 |
| **敘事手法** | 世界地圖檢視供應商，點開可看工廠照片與數據（生產哪些產品、工廠人員組成）；影片／照片導覽「產品如何被製造」；**誠實揭露仍未解決的問題**（「the challenges Patagonia continues to face」） |
| **信任訊號** | 供應鏈透明本身就是信任訊號；自 1972 年起資助草根環保行動者的長期紀錄；B Corp 認證（標示位置【推測】） |
| **轉換路徑** | **Patagonia Action Works**：把使用者連結到在地環保團體——找附近活動、連署、技能志工、捐款，四種參與方式並列 |
| **視覺語言** | 大幅美麗攝影（商品細節＋世界各地使用情境）、極簡版面；曾全站使用 **Avenir** 字體（2014 年改版報導；現行字體【推測】已更新）；以自然色調照片為主、介面色彩低調【推測】 |
| **值得偷學** | ① **「把影響力放在決策點」**：CO-ESG 可在每個服務方案卡片旁放「這個方案對應的 SDG／可產出的揭露項目」，而不是全部集中在一頁。② **Action Works 式的「參與階梯」**：把參與方式分級（看文章 → 加 LINE → 參加共學坊 → 諮詢），讓不同投入程度的人都有入口 |

### 1-2 Ørsted（orsted.com／Sustainability）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 以單一大主張開場（綠色轉型）＋離岸風場航拍影像【推測】；CTA 1 個為主【推測】 |
| **資訊架構** | Sustainability 底下有子頁，例如 `/about-us/sustainability/decarbonisation`（頁名「Towards net zero」），依議題拆分（減碳、生物多樣性、供應鏈等）【子頁清單部分推測】 |
| **影響力數字** | 以「大百分比」講轉型故事：**99% 再生能源占比**、**98% 排放減量**；目標以「基準年＋目標年＋範疇」完整寫出：範疇 1–3 能源組合排放較 **2018** 年減 99%、範疇 3 產品使用排放絕對量減 90%、**2040** 全價值鏈淨零 |
| **敘事手法** | **「從黑到綠」轉型敘事**——從化石燃料公司轉為再生能源公司，是時間軸型故事的教科書範例；供應鏈減碳計畫（要求策略供應商揭露、設定科學基礎目標、製造使用 100% 綠電） |
| **信任訊號** | **SBTi**：第一家依 Net-Zero Standard 取得科學基礎淨零目標驗證的能源公司（SBTi 官方將其作為案例研究）——「第一個」＋「第三方驗證」雙重背書 |
| **轉換路徑** | 永續報告／ESG 績效報告下載、投資人與媒體專區【推測】 |
| **視覺語言** | 深藍＋白為主、大量留白、航拍風場攝影、資料視覺化簡潔【推測】 |
| **值得偷學** | ① **目標必寫「基準年／目標年／範圍」三要素**，連小型顧問也應以此格式呈現自身承諾（例如「2027 年前陪伴 50 家中小企業完成首次碳盤查」）。② **用第三方案例頁背書**：把合作夥伴、主管機關或協會對 CO-ESG 的報導／案例連結放上來 |

### 1-3 Schneider Electric（se.com／Sustainability）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 企業主張式標題（「Impact company」定位）＋人物／現場影像【推測】 |
| **資訊架構** | 以「6 大長期 ESG 承諾」為骨架，下接「11 項全球永續目標」與在地倡議；新聞室（newsroom）每季發布進度 |
| **影響力數字** | **SSI（Schneider Sustainability Impact）計分卡**：把多項指標合成一個 **0–10 分的總分**（2024 年底 7.55/10，超越目標 7.40；2021–2025 計畫結束時 8.86/10）；並列具體成果：自 2018 年起協助客戶節省與避免 **6.79 億噸 CO₂**、**5,340 萬人**取得乾淨電力（提前一年超越 5,000 萬目標） |
| **敘事手法** | **每季更新的進度敘事**（「heads full speed toward its end-year targets」）；全球目標＋「strong local impact」在地故事並行；計畫有明確起訖（2021–2025）並預告「下一章」 |
| **信任訊號** | Corporate Knights「全球百大永續企業」2021 年第 1 名（前一年第 29 名）；宣稱 6 大承諾對應聯合國**全部 SDGs** |
| **轉換路徑** | 季度新聞稿、永續報告下載、聯繫業務【推測】 |
| **視覺語言** | 品牌綠＋白、企業攝影、卡片式模組化版面【推測】 |
| **值得偷學** | ① **單一「進度分數」或進度條**：CO-ESG 可做一個「年度承諾達成率」儀表（例如 3/5 項已達成），比一堆散數字好讀。② **計畫有起訖、有「下一章」**：把共學坊、白皮書做成有期別的計畫（第 1 期／第 2 期），自然產生時間軸與 roadmap |

### 1-4 Unilever（unilever.com／Planet & Society、Sustainability）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 永續頁以議題標題開場（如「Addressing climate change with action」、「Protecting and regenerating nature」）——**動詞＋議題**句型 |
| **資訊架構** | 永續聚焦 **4 大議題：氣候、自然、塑膠、生計（livelihoods）**，每個議題一個子頁（`/sustainability/climate/`、`/sustainability/nature/` 等）；另有「Our position on」立場聲明頁，以及「Take action」倡議頁 |
| **影響力數字** | 以「比例＋情境」呈現，例如：簽署 Living Wage Promise 的供應商占採購支出的 **32%**；定期發布「signs of progress」進度新聞 |
| **敘事手法** | **Unilever Compass** 作為路線圖；議題頁內穿插倡議案例（如教育青少年對塑膠採取行動） |
| **信任訊號** | 明確的立場聲明頁（Our position on）；進度報告 |
| **轉換路徑** | 報告下載、新聞、投資人關係【推測】 |
| **設計案例** | Vizzuality 為 Unilever.com 首頁改版：首頁需同時服務多元利害關係人、展示 Growth Action Plan 進度，並且**以永續網頁設計（sustainable web design）降低網站本身的環境衝擊**，兼顧效能與無障礙；需考量 **51 個市場企業網站** |
| **視覺語言** | Unilever 藍、大量品牌圖示（logo 由多個小圖示組成）、圓角卡片、攝影＋插畫並用【推測】 |
| **值得偷學** | ① **「立場聲明頁」**：CO-ESG 可寫「我們對漂綠、碳權、中小企業揭露義務的立場」，對 B2B 客戶是強烈的專業訊號。② **網站本身實踐永續網頁設計**（圖片壓縮、深色模式、輕量字型、低 JS），並在頁尾揭露——對 ESG 顧問而言是「言行一致」的證明 |

### 1-5 IKEA（about.ikea.com／ikea.com Sustainability）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 生活情境攝影＋溫暖口吻標題（例如「Taking action for the climate」）【Hero 細節推測】 |
| **資訊架構** | 依 **People & Planet Positive** 策略分 **3 大領域**：Healthy & Sustainable Living、Circular & Climate Positive、Fair & Equal；另有「Sustainability Report highlights」精華頁與年度報告新聞 |
| **影響力數字** | 以「相對基準年」呈現：氣候足跡較 FY23 **減 5%**、較基準年 FY16 **減 28%**（絕對量）；目標：**FY30** 氣候正效益（且**不依賴碳抵換**）、2030 循環企業；口號式大數字：「激勵 **10 億人**過更好的日常生活」 |
| **敘事手法** | 策略有版本歷史（2012 首發 → 2018 更新至 2030 目標），並列出**已達成的舊目標**（永續棉花、全面 LED）證明可信；推出互動式循環設計線上工具 |
| **信任訊號** | 年度 Sustainability Report 與 Climate Report 雙報告；明確排除碳抵換的方法論說明 |
| **轉換路徑** | 報告精華頁 → 完整 PDF 下載；消費者端連到二手回收、零件服務【推測】 |
| **視覺語言** | 溫暖生活攝影、IKEA 藍黃、親切口語、插畫圖示輔助【推測】 |
| **值得偷學** | ① **「報告精華頁」(highlights)**：每份白皮書先做一頁網頁版精華（3–5 個重點數字＋圖），再提供 PDF 下載，SEO 與轉換都更好。② **列出「已完成的承諾」**：時間軸中把已達成項目打勾，比只列未來目標更可信 |

### 1-6 Interface（interface.com／Sustainability、Climate Take Back）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 使命名稱即標題（Climate Take Back：「以逆轉全球暖化的方式經營事業」）【頁面呈現方式推測】 |
| **資訊架構** | 永續頁圍繞兩個命名計畫：**Mission Zero**（1994–2019）與 **Climate Take Back**（2016 起）；產品端連結 EPD（環境產品宣告）【推測其導覽位置】 |
| **影響力數字** | 以**產品層級碳足跡**呈現：全球首款「搖籃到大門」**負碳地毯磚**（2020 Embodied Beauty 系列），且**不靠購買碳抵換**；Mission Zero 提前一年（2019）達成 |
| **敘事手法** | **創辦人頓悟故事**：1994 年 Ray Anderson 因客戶一個環境問題讀了《The Ecology of Commerce》，形容為「胸口被長矛刺穿（spear in the chest）」——強烈的人物起源故事；清晰時間軸：1994 Mission Zero → 2016 Climate Take Back → 2019 達成 Mission Zero → 2020 負碳產品 → 2040 全面負碳 |
| **信任訊號** | 業界首家發布 EPD；後來**停止使用碳抵換**改為直接減量（被 Trellis 等媒體報導）——願意公開調整策略本身是信任訊號 |
| **轉換路徑** | 產品樣品、EPD 下載、設計師資源【推測】 |
| **視覺語言** | 建築／室內攝影、材質特寫、低彩度大地色【推測】 |
| **值得偷學** | ① **為計畫命名**：把 CO-ESG 的方法論、共學坊期別、承諾取一個好記的名字（例如「共好 2030」），時間軸自然有主角。② **創辦人起源故事**：一段真誠的「為什麼開始做這件事」比任何願景標語都有力，放在 /sustainability「我們是誰」 |

### 1-7 Natura &Co（naturaeco.com）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 集團願景主張＋人物／自然影像（亞馬遜）【推測】 |
| **資訊架構** | 集團站＋投資人站（ri.naturaeco.com 有「Sustainability Vision」頁）；年度報告有獨立網頁版（`/annual-report-2024`，標題「Creating the best beauty group」） |
| **影響力數字** | **Commitment to Life 2030**：3 大支柱、**31 項目標**、**40 個永續 KPI**；代表數字：2030 淨零（比聯合國承諾早 20 年）、協助保護 **300 萬公頃**亞馬遜、多元性提升 30%、10 年投入 **8 億美元**；**IP&L（整合損益）**：每 1 元營收產生 1.5 元正向社會環境影響 |
| **敘事手法** | 3 支柱：「應對氣候危機並保護亞馬遜」、「捍衛人權、成為 human-kind」、「擁抱循環與再生」；每年發布「One Year On」進度更新 |
| **信任訊號** | B Corp 認證（B Corp 目錄中有 Natura &Co 頁面）；整合性報導（Integrated Reporting）先驅；永續連結債券（募得 10 億美元） |
| **轉換路徑** | 年度整合報告網頁版＋PDF、投資人關係【推測】 |
| **視覺語言** | 暖色、自然素材、人物肖像攝影【推測】 |
| **值得偷學** | ① **把影響力換算成一句好記的比例**（「每 1 元產生 1.5 元影響」）：CO-ESG 可做「每場共學坊平均帶出 X 份企業行動計畫」之類的單一記憶點。② **「一年後」進度回報**：承諾公開後每年回報一次，做成 /events 時間軸上的固定節點 |

### 1-8 台達電 Delta Electronics（deltaww.com／esg.deltaww.com）— 台灣標竿

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 企業使命「環保 節能 愛地球」作為核心標語；Hero 媒體類型【推測】為綠建築／產品攝影 |
| **資訊架構** | **獨立 ESG 子網域 esg.deltaww.com**，有「管理重點（manage_focus）」頁；報告書內容架構：永續管理與關鍵績效、公司治理、環保節能（氣候策略、能源管理、水資源、資源循環、綠色產品）、員工關係及社會參與——網站架構大致對應報告章節【對應關係推測】 |
| **影響力數字** | RE100 多據點達成、超越 SBT 範疇 1、2 減量目標、內部碳定價機制；**連續性數字**：DJSI 連續 14 年入選（自 2011）、CDP 氣候與水安全雙 A、供應鏈議合領袖連續 8 年 |
| **敘事手法** | 重大性分析（利害關係人關注度 → 風險與機會 → 調整長期目標）；治理沿革（2007 年成立永續委員會、2019 年設永續長、每季向董事會報告）；台達基金會、綠建築與教育活動【頁面呈現推測】 |
| **信任訊號** | 報告書採用 **GRI、SASB、TNFD、DJSI、SBTi**；SGS／資誠第三方查證確信；MSCI ESG Leaders 指數；歷年報告 PDF 皆以固定命名（`20XX_Delta_ESG_Report_CH.pdf`）存放於 filecenter，**歷年版本完整可下載** |
| **轉換路徑** | 報告書下載（多年份）、利害關係人溝通管道【推測】 |
| **視覺語言** | 台達藍＋綠、企業正式感、資訊密度較高、中文排版【推測】 |
| **值得偷學** | ① **「連續 N 年」型信任訊號**：小公司也能用（「連續 3 年舉辦 ESG 共學坊」「累計 N 期」），持續性比單次獎項更可信。② **歷年白皮書檔案庫**：固定命名、年份排序、每份標示採用框架（GRI／SDGs），台灣讀者（尤其上市櫃中小供應商）非常熟悉這個模式 |

### 1-9 South Pole（southpole.com）— 氣候顧問標竿

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 顧問公司常見的「問題導向」標題＋單一主要 CTA（聯繫專家）【推測】 |
| **資訊架構** | 「What we do」頁（「climate experts in net zero strategy and carbon markets」）；服務頁如 `/sustainability-solutions/net-zero`（「Getting to Net Zero – start your climate journey」）；**Events／Webinars** 獨立頁；Publications／News／Blog；區域子站（如 `/australia-new-zealand`）；案例頁（如 Nordic Platform for Mobilising Climate Finance） |
| **影響力數字** | 公司規模與累計成果：**750+ 位專家、30+ 辦公室、20+ 國**；**850+ 減量專案、50+ 國、2 億噸 CO₂ 減量**（第三方彙整數字） |
| **敘事手法** | **旗艦年度報告**：Net Zero Report 已連續 4 年（2024「Destination zero」調查 12 國 14 產業 1,400 家企業；2025 版調查 350 家金融機構）；年度「Carbon Market Buyer's Guide」＋發布研討會；「start your climate journey」**旅程隱喻** |
| **信任訊號** | 名列 SBTN（科學基礎目標網絡）專家顧問；客戶案例（Nestlé、Philips 等）；自 2006 年成立的歷史 |
| **轉換路徑** | **報告下載（留資料換報告）→ 網路研討會 → 聯繫顧問**的典型 B2B 內容漏斗；事件頁直接報名 |
| **視覺語言** | 深色／自然攝影、乾淨顧問風格【推測】 |
| **值得偷學** | ① **旗艦年度報告＋發表會**：CO-ESG 白皮書可固定每年一本（例如「台灣中小企業 ESG 準備度調查」），並以共學坊形式發表——一次產生內容、活動與名單。② **「氣候旅程」框架**：把服務排成「起步 → 盤查 → 目標 → 揭露」步驟，讓 SME 自我定位在哪一步 |

### 1-10 B Lab／B Corporation（bcorporation.net）

| 面向 | 觀察 |
|---|---|
| **Hero 模式** | 運動式宣言：「We are a global movement working to benefit people and the planet」；（「Make business a force for good」為長期使用的運動口號）【Hero 版面推測】 |
| **資訊架構** | 主要入口：**Find a B Corp（B Corp 目錄，可依關鍵字、地點、產業搜尋）**、認證說明、Resources、News（Updates & Insights）、FAQ；各區域有自己的站（B Lab U.S. & Canada、B Lab Europe） |
| **影響力數字** | 運動規模數字列：**5 大洲、102 國、163 產業、10,916 家企業、1,109,480 名員工**——用「社群規模」當影響力 |
| **敘事手法** | 「20 年前創辦人問：企業能否被不同方式衡量？」的起源故事；公開信（Open letter to the B Corp community）——以第一人稱回應社群；B Corp Month 年度主題活動 |
| **信任訊號** | **評分透明**：每家企業檔案頁顯示總分（例如 96.1）、**合格門檻 80 分**、**一般企業中位數 50.9**，並拆分治理、員工、社區、環境、客戶 5 大面向分數——**「分數＋門檻＋對照組」**的三點比較 |
| **轉換路徑** | 認證流程說明 → B Impact Assessment；品牌手冊（Brand Book）提供新認證企業溝通工具 |
| **視覺語言** | 黑白為主＋高飽和點綴色、粗體無襯線大字、社群肖像攝影【推測】 |
| **值得偷學** | ① **「分數＋門檻＋對照組」呈現法**：CO-ESG 可做「ESG 健檢」小工具，結果顯示「你的分數／法規門檻／同業平均」。② **社群目錄**：把參與共學坊或會員企業做成「共好夥伴」目錄（經同意），社群本身就是最好的信任訊號 |

---

## 2. 跨站設計原則（14 條）

> 每條原則附「為什麼」（出自哪些站）與「CO-ESG 怎麼做」。

**P1｜一句話主張＋單一主 CTA 的 Hero**
各站 Hero 都只講一件事（Ørsted 的綠色轉型、Interface 的 Climate Take Back、B Lab 的運動宣言）。CO-ESG：首頁 Hero 一句主張（例：「讓每一家中小企業與 NPO，都能走得動的 ESG」），主 CTA 一個（預約諮詢或加入 LINE），次 CTA 最多一個（看共學坊）。

**P2｜目標寫法 = 指標＋基準年＋目標年＋範圍**
Ørsted（2018→2040、範疇 1–3）、IKEA（FY16→FY30、不靠抵換）。CO-ESG 自身承諾與客戶案例成果都用這個格式，避免空泛「致力於」。

**P3｜數字要有「對照」才有意義**
IKEA 對基準年、B Lab 對門檻與中位數、Schneider 對年度目標。CO-ESG 的數字卡設計固定為「大數字＋單位＋一行說明＋對照（vs 去年／vs 目標）＋註腳來源」。

**P4｜每個數字都有出處（註腳或「資料說明」）**
台達報告標示 GRI／SASB／第三方查證；Interface 明講「不靠碳抵換」。CO-ESG：數字卡下方放小字註腳（統計期間、計算方式），並有一個「資料說明」錨點。

**P5｜命名計畫，讓時間軸有主角**
Mission Zero／Climate Take Back、Commitment to Life、SSI、People & Planet Positive。CO-ESG：為方法論（IOOI 模型）、共學坊期別、年度承諾命名，時間軸與 roadmap 以這些計畫為節點。

**P6｜時間軸要同時呈現「已完成」與「未來」**
IKEA 列已達成舊目標、Interface 1994→2040、Schneider 有起訖與「下一章」、Natura「One Year On」。CO-ESG /events：已完成節點打勾＋日期，未來節點標示「規劃中」，並每年做一次進度回顧。

**P7｜起源故事與真人**
Interface 的「spear in the chest」、B Lab 的創辦人提問。CO-ESG /sustainability「我們是誰」：創辦人為什麼開始、團隊真人照片，比抽象願景圖更有效。

**P8｜誠實揭露挑戰，是比得獎更強的信任**
Patagonia 揭露仍面臨的挑戰、Interface 公開停止碳抵換、Unilever 立場聲明頁。CO-ESG：個案故事包含「卡關之處」；新增「我們的立場」區塊（漂綠、碳權、法規）。

**P9｜信任訊號分層：框架 → 第三方 → 持續性 → 社群**
框架（SDGs／GRI／SBTi）、第三方（SGS 查證、SBTi 驗證、Corporate Knights）、持續性（台達「連續 14 年」）、社群（B Lab 1 萬家企業）。小型顧問沒有大獎，就主打「框架對應＋持續性＋合作夥伴社群」。

**P10｜報告＝網頁精華頁＋PDF，並建立歷年檔案庫**
IKEA highlights、Natura 網頁版年報、台達歷年 PDF。CO-ESG 白皮書：每份一頁網頁精華（3–5 數字、重點摘要、適合誰讀）＋下載按鈕；/learning 內有「歷年白皮書」列表。

**P11｜內容漏斗：報告 → 活動 → 諮詢**
South Pole 的旗艦報告＋發表研討會＋聯繫專家。CO-ESG：白皮書 → 共學坊 → 諮詢／會員，每篇文章與每份白皮書結尾都有「下一步」區塊。

**P12｜參與階梯：讓不同投入程度都有入口**
Patagonia Action Works（看活動、連署、志工、捐款）。CO-ESG：讀文章（0 成本）→ 加 LINE（低）→ 報名共學坊（中）→ 會員方案／諮詢（高），在首頁以 4 階卡片呈現。

**P13｜議題分頁、少而清楚（3–4 個支柱）**
Unilever 4 大議題、IKEA 3 領域、Natura 3 支柱、Schneider 6 承諾。CO-ESG 服務與內容分類維持 3–4 個支柱（例：企業 ESG 輔導／NPO 合作／教育共學／研究白皮書），全站導覽、文章標籤、服務頁都用同一套分類。

**P14｜網站本身實踐永續網頁設計**
Vizzuality 為 Unilever 首頁改版把「降低網站環境衝擊」列為目標。CO-ESG：圖片 AVIF/WebP＋延遲載入、系統字或子集化中文字型、減少動畫與追蹤腳本、支援深色模式，頁尾放一行「本網站採永續網頁設計原則」。

**P15｜色彩：品牌色做強調，不做底色**【多站推測】
大企業永續頁普遍大量留白、以攝影為主、品牌色僅用於按鈕與重點數字。CO-ESG：橘 `#F25232` 只給主 CTA 與關鍵數字；黃 `#FAB40A` 做標籤、進度與高亮（注意黃色文字在白底對比不足，只用於色塊或搭深灰文字）；冷灰 `#4D515B` 做內文與次要元素；底色用暖白／淺灰。

---

## 3. 對應到 CO-ESG 各路由

### `/`（首頁）
- **Hero**：一句主張＋1 主 CTA（預約諮詢）＋1 次 CTA（加入 LINE）【P1】
- **影響力數字列**：3–4 張數字卡（陪伴企業數、共學坊場次／人次、白皮書份數、合作 NPO 數），每張有對照與註腳【P3、P4】
- **三／四大支柱入口**：對應服務分類【P13】
- **參與階梯**：讀文章 → 加 LINE → 共學坊 → 諮詢【P12】
- **最新白皮書精華卡**＋最新文章【P10、P11】
- **夥伴 logo 牆＋框架標章（SDGs／GRI）**【P9】

### `/sustainability`（我們是誰、願景使命、核心價值、IOOI 模型、SDGs、服務、影響力、生態系）
- **我們是誰**：創辦人起源故事＋團隊真人照片【P7】
- **願景／使命／核心價值**：各一句，不超過 3–4 個價值【P13】
- **IOOI 模型**（Input → Output → Outcome → Impact）：做成橫向 4 步驟圖，每一步附一個 CO-ESG 實例與指標【P2、P5】
- **SDGs**：只列實際對應的 SDG（不要 17 個全放），每個附「我們做了什麼」一句話＋連結到案例【P8、P9】
- **影響力**：數字卡＋資料說明註腳＋年度回顧連結【P3、P4】
- **生態系**：夥伴／會員／NPO 目錄式呈現（仿 B Corp 目錄）【P9】
- **我們的立場**（新增建議）：漂綠、碳權、法規揭露立場【P8】

### `/events`（學習地圖、時間軸、路線圖、承諾、個案故事）
- **學習地圖**：仿 South Pole「氣候旅程」，分「起步 → 盤查 → 目標 → 揭露」階段，每階段對應共學坊場次與文章【P11】
- **時間軸**：已完成（打勾＋日期＋成果連結）與未來（規劃中）並列【P6】
- **路線圖／承諾**：每個承諾用「指標＋基準年＋目標年」，附進度條或達成率總分（仿 SSI）【P2、P3】
- **個案故事**：挑戰 → 做法 → 成果（數字）→ 仍在努力的地方 → 引言（真人）【P7、P8】
- **命名期別**：共學坊以期別命名（第 N 期）【P5】

### `/learning`（文章中心）
- 依 3–4 支柱分類＋學習地圖階段雙重篩選【P13】
- **白皮書檔案庫**：網頁精華頁＋PDF，依年份排序，標示對應框架【P10】
- 每篇文章結尾「下一步」：相關共學坊或諮詢 CTA【P11】

### `/consulting`（ESG 解決方案、NPO 合作、會員方案、FAQ、聯絡表單）
- **解決方案**：依旅程階段排列，每個方案卡附「產出物」與「對應揭露框架／SDG」（把影響力放在決策點，仿 Patagonia）【P3、P12】
- **NPO 合作**：獨立區塊，案例故事＋合作模式【P7】
- **會員方案**：3 欄比較表，推薦方案以橘色強調【P15】
- **ESG 健檢小工具**（進階）：「你的分數／門檻／同業平均」【P3】
- **FAQ**：含「我們的立場」常見問題（漂綠、碳權）【P8】
- **聯絡表單**：欄位精簡（姓名、單位、類型：企業／NPO、需求階段、聯絡方式），旁邊並列 LINE 替代管道

### `/join`（LINE 官方帳號）
- 單一目的頁：一句價值主張（加入能得到什麼：共學坊通知、白皮書搶先看）＋ QR code（桌機）／「加入好友」按鈕（手機）【P1、P12】
- 社群規模數字（好友人數、共學坊參與人次）作為社會證明【P9】

### `/insights`（文章）
- 立場與觀點文章（仿 Unilever「Our position on」）【P8】
- 年度旗艦報告發表頁（仿 South Pole Net Zero Report）＋發表會報名【P10、P11】
- 文章頁：清楚的作者（真人）、發布日期、資料來源註腳【P4、P7】

---

## 4. 來源清單

### 4-1 直接抓取（WebFetch）
**無。** 以下網址皆嘗試抓取但遭網路出口代理封鎖（EGRESS_BLOCKED）：
- https://www.patagonia.com/activism/
- https://www.patagonia.com/our-footprint/
- https://orsted.com/en/sustainability
- https://www.se.com/ww/en/about-us/sustainability/
- https://www.unilever.com/planet-and-society/
- https://www.ikea.com/global/en/our-business/sustainability/
- https://www.southpole.com/
- https://www.bcorporation.net/en-us/
- https://www.deltaww.com/zh-TW/Sustainability
- https://www.interface.com/US/en-US/sustainability.html
- https://www.naturaeco.com/
- https://vizzuality.com/project/unilever-homepage-redesign
- https://landingdoctors.com/es/teardowns/patagonia-com
- https://deptagency.com/en-nl/?p=4252270
- https://brand.bcorp.com/new-bcorps
- https://sciencebasedtargets.org/companies-taking-action/case-studies/net-zero-case-study-orsted

### 4-2 經由搜尋結果參考（WebSearch 摘要，非直接閱讀全文）

**Patagonia**
- https://deptagency.com/en-nl/?p=4252270 （改版案例）
- https://eu.patagonia.com/nl/en/stories/planet/our-footprint/introducing-the-new-footprint-chronicles-on-patagoniacom/story-18443.html
- https://www.patagoniaworks.com/press/2014/7/16/a-new-patagoniacom-press-blog
- https://sgbonline.com/?p=42550
- https://triplepundit.com/2012/05/patagonia-footprint-chronicles-supply-chain-transparency
- https://greenamerica.org/node/4349
- https://www.patagonia.com/actionworks/about/
- https://www.nssmag.com/en/pills/13747/patagonia-launches-a-platform-for-environmental-activism

**Ørsted**
- https://sciencebasedtargets.org/companies-taking-action/case-studies/net-zero-case-study-orsted
- https://orsted.com/en/about-us/sustainability/decarbonisation
- https://orsted.com/en/media/news/2021/10/13634593
- https://esgnews.com/orsted-becomes-first-energy-major-to-complete-full-green-transition/

**Schneider Electric**
- https://www.se.com/ww/en/about-us/newsroom/news/press-releases/Schneider-Electric-completes-its-Sustainability-Impact-SSI-20212025-program-setting-the-stage-for-the-next-chapter-699d9ef70c43e12f770ab803/
- https://www.se.com/us/en/about-us/newsroom/news/press-releases/schneider%E2%80%99s-sustainability-program-heads-full-speed-toward-its-end-year-targets-with-strong-local-impact-672250305206a57f6604a4d1
- https://csrwire.com/press-release/schneider-electric-exceeds-its-2024-sustainability-target-and-approaches-end/
- https://www.businesswire.com/news/home/20210125005155/en/4907052/Schneider-Electric-Accelerates-Its-Sustainability-Strategy-Comes-Top-in-Corporate-Knights-Ranking-of-World%E2%80%99s-Most-Sustainable-Corporations

**Unilever**
- https://www.unilever.com/sustainability/climate/
- https://www.unilever.com/sustainability/nature/
- https://www.unilever.com/our-company/our-position-on/
- https://www.unilever.com/sustainability/take-action/initiative/educate-and-inspire-young-people-to-take-action-on-plastic/
- https://www.unilever.com/news/news-search/2025/unilever-sees-early-signs-of-progress-on-sustainability-goals/
- https://www.vizzuality.com/project/unilever-homepage-redesign （首頁改版案例）

**IKEA**
- https://www.ikea.com/global/en/newsroom/sustainability/ikea-sustainability-and-climate-reports-fy24-250130/
- https://www.ikea.com/global/en/our-business/sustainability/sustainability-report-highlights/
- https://www.ikea.com/us/en/this-is-ikea/climate-environment/climate-action-pub85dbcef0/
- https://www.circularonline.co.uk/news/ikea-launches-new-people-planet-positive-strategy/

**Interface**
- https://en.wikipedia.org/wiki/Interface,_Inc.
- https://www.dezeen.com/2021/06/23/carbon-negative-emmissions-interface-carpet-brand-interview/
- https://www.prnewswire.com/news-releases/interface-announces-mission-zero-success-commits-to-climate-take-back-300949740.html
- https://trellis.net/article/no-more-funding-forests-cambodia-interface-ending-offsets-go-carbon-negative/
- https://blog.drawdownga.org/making-ray-proud-the-legacy-of-an-early-climate-visionary-from-georgia

**Natura &Co**
- https://www.prnewswire.com/news-releases/natura-co-unveils-its-commitment-to-life-for-2030-301076770.html
- https://sustainablebrands.com/read/circularity-human-rights-regeneration-pillars-of-natura-s-2030-commitment-to-life-strategy
- https://ri.naturaeco.com/en/?p=6614
- https://naturaeco.com/annual-report-2024
- https://www.icaew.com/insights/viewpoints-on-the-news/2022/dec-2022/natura-brazils-integrated-reporting-pioneers

**台達電**
- https://esg.deltaww.com/manage_focus
- https://filecenter.deltaww.com/about/download/2023_Delta_ESG_Report_CH.pdf
- https://filecenter.deltaww.com/about/download/2024_Delta_ESG_Report_CH.pdf
- https://www.sustaihub.com/reports/ （台達 2024 永續報告書彙整頁）
- https://www.ithome.com.tw/pr/175867
- https://en.wikipedia.org/wiki/Delta_Electronics

**South Pole**
- https://www.southpole.com/what-we-do
- https://www.southpole.com/sustainability-solutions/net-zero
- https://www.southpole.com/events
- https://www.southpole.com/news/south-pole-launches-2025-net-zero-report
- https://www.southpole.com/nordic-platform-for-mobilising-climate-finance
- https://netzerocompare.com/services/south-pole
- https://sciencebasedtargetsnetwork.org/company/expert-advisors/south-pole/

**B Lab／B Corporation**
- https://www.bcorporation.net/en-us/
- https://www.bcorporation.net/en-us/news/blog/open-letter-b-corp-community/
- https://www.bcorporation.net/en-us/find-a-b-corp/company/greatest-good-group （評分呈現範例）
- https://usca.bcorporation.net/brand-guidelines-for-b-corps/
- https://brand.bcorp.com/new-bcorps

### 4-3 後續待辦
- 以瀏覽器實際檢視 10 站，核對所有【推測】項目（Hero CTA 數量、字體、配色、動態效果），補截圖。
- 特別建議實看：台達 esg.deltaww.com（中文排版與數字呈現）、South Pole 服務頁（顧問轉換漏斗）、B Corp 企業檔案頁（分數視覺化）。
