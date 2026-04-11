# 共好玟化 CO-ESG 網站開發計劃

更新日期：2026-04-11

---

## 現況盤點

### 已完成

- Next.js App Router 專案建置（Next.js 16 + Tailwind CSS 4）
- 首頁 Landing Page 7 大區塊完成（Hero / Story / Problem / Evidence / Future / Trust / CTA）
- i18n 架構：`[locale]` 動態路由 + middleware 自動偵測語系 + 中英雙語辭典
- 元件系統：core（Container / Section / Heading）+ domain（10 個區塊元件）+ ui（Button / Card / Badge / Input）
- LocaleSwitcher 語系切換元件
- Navbar 已支援 locale + 翻譯 labels
- **[Phase 1 完成]** 路由結構 100% 對齊 Sitemap（sustainability / events / learning / consulting / join / insights）
- **[Phase 1 完成]** 舊路由已刪除（about / services / cases / contact），冗餘根層路由已清理
- **[Phase 1 完成]** 辭典 nav keys 已更新（zh.ts + en.ts），Navbar + Footer 連結已對齊
- **[Phase 2 完成]** Footer 已抽為共用元件，放入 `[locale]/layout.tsx`
- **[Phase 3 完成]** 資料層建立：`src/data/articles.ts`（16 篇文章 / 7 分類）+ `src/data/courses.ts`（4 工作坊 / 3 顧問服務）
- **[Phase 3 完成]** `/sustainability` — 6 大區塊（Hero / Vision&Mission / 理念 / 服務項目 / 共好實蹟 / 生態圈）
- **[Phase 3 完成]** `/events` — 5 大區塊（Hero / 即將舉辦活動 / 工作坊分類 / 顧問服務 / 過往活動）+ `[slug]` 詳情頁
- **[Phase 3 完成]** `/learning` — 文章列表 + 分類導覽 + `[slug]` 文章頁 + `category/[category]` 分類篩選頁
- **[Phase 3 完成]** `/consulting` — 5 大區塊（Hero / ESG 方案 / NPO 合作 / FAQ / 聯絡表單）
- **[Phase 3 完成]** `/join` — LINE OA 頁面（QR Code / Benefits / CTA）
- **[Phase 3 完成]** `/insights` — 文章發佈區（精選文章 / 列表 / 分類）+ `[slug]` + `category/[category]`
- **[Phase 4 完成]** Markdown 文章系統：`src/lib/posts.ts` 資料層（gray-matter + remark + remark-html）
- **[Phase 4 完成]** 16 篇 MD 文章建立於 `content/posts/`，含完整 frontmatter + 正文
- **[Phase 4 完成]** `/insights` + `/learning` 改用 MD 系統，支援 SSG（generateStaticParams）
- **[Phase 4 完成]** 文章詳情頁渲染 HTML 內容，prose 排版樣式
- **[Phase 4 完成]** 舊 `src/data/articles.ts` 已移除
- **[Phase 5 完成]** 所有頁面 `generateMetadata()`（title / description / OG）
- **[Phase 5 完成]** Layout 加入 metadataBase / title template / hreflang alternates / robots
- **[Phase 5 完成]** JSON-LD Organization schema（`<script type="application/ld+json">`）
- **[Phase 5 完成]** `sitemap.xml` 自動產生（靜態頁 + 文章 + 活動 × 雙語）
- **[Phase 5 完成]** `robots.txt` 允許全站爬取 + sitemap 指向
- **[Phase 5 完成]** RSS feed `/feed.xml`（全部文章）
- **Build 驗證**：112 頁靜態生成通過（zh + en 雙語 + sitemap + robots + feed）

### 待處理問題

| 問題 | 說明 |
|------|------|
| 部分頁面內容硬編碼中文 | sustainability / consulting / join / events 頁有未移入辭典的中文字串，標記為 TODO |
| 圖片資源缺失 | 尚無實際圖片素材（講師頭像、活動照片、QR Code 等） |

---

## 路由遷移對照

| Sitemap 路由 | 目前 `[locale]` 路由 | 動作 |
|---|---|---|
| `/sustainability` | `/about` + `/services` | 合併為 `/sustainability`，刪除 about & services |
| `/events` | `/events`（已存在） | 保留，補充內容 |
| `/events/[slug]` | `/events/[slug]`（已存在） | 保留 |
| `/learning` | 不存在 | 新建 |
| `/learning/[slug]` | 不存在 | 新建 |
| `/learning/category/[category]` | 不存在 | 新建 |
| `/consulting` | `/consulting`（已存在）+ `/contact` | 保留 consulting，刪除 contact |
| `/join` | 不存在 | 新建 |
| `/insights` | 不存在 | 新建（文章發佈區，擴充預留） |
| `/insights/[slug]` | 不存在 | 新建 |
| `/insights/category/[category]` | 不存在 | 新建 |
| — | `/about` | 刪除 |
| — | `/services` | 刪除 |
| — | `/cases` | 刪除（內容併入 events 案例研究） |
| — | `/contact` | 刪除（內容併入 consulting） |

---

## 開發階段

### Phase 1：路由結構整理與 i18n 對齊

**目標**：讓 `[locale]` 下的路由 100% 對應 Sitemap，消除冗餘路由

- [ ] 1-1. 在 `[locale]` 下建立新路由頁面
  - `[locale]/sustainability/page.tsx`
  - `[locale]/learning/page.tsx`
  - `[locale]/learning/[slug]/page.tsx`
  - `[locale]/learning/category/[category]/page.tsx`
  - `[locale]/join/page.tsx`
  - `[locale]/insights/page.tsx`
  - `[locale]/insights/[slug]/page.tsx`
  - `[locale]/insights/category/[category]/page.tsx`
- [ ] 1-2. 刪除 `[locale]` 下的舊路由
  - `[locale]/about/`
  - `[locale]/services/`
  - `[locale]/cases/`
  - `[locale]/contact/`
- [ ] 1-3. 刪除根層非本地化冗餘路由
  - `src/app/sustainability/`
  - `src/app/events/`
  - `src/app/learning/`
  - `src/app/consulting/`
  - `src/app/join/`
  - `src/app/insights/`
- [ ] 1-4. 更新辭典 nav keys（zh.ts + en.ts）
  - `nav.about` → `nav.sustainability`（共好永續力）
  - `nav.services` → `nav.events`（永續足跡）
  - `nav.cases` → `nav.learning`（共好學習）
  - `nav.contact` → `nav.consulting`（合作洽詢）
  - 新增 `nav.join`（加入我們）
  - `nav.cta` 保留（預約諮詢）
- [ ] 1-5. 更新 Navbar navLinks 對應新 key
- [ ] 1-6. 更新辭典子頁面翻譯 keys
  - 移除 `aboutPage` / `servicesPage` / `casesPage` / `contactPage`
  - 保留並擴充 `sustainabilityPage` / `eventsPage` / `learningPage` / `consultingPage` / `joinPage` / `insightsPage`
- [ ] 1-7. 更新首頁 Hero CTA 和 Footer 內的連結路徑
- [ ] 1-8. 驗證 build 通過，所有路由可正常訪問

### Phase 2：共用元件抽取

**目標**：將重複結構抽為共用元件，為子頁面開發做準備

- [ ] 2-1. 抽取 Footer 為獨立元件 `src/components/domain/Footer.tsx`
  - 接收 `locale` + `labels` props
  - 導覽連結對應新的 5 項 Sitemap 路由
- [ ] 2-2. 在 `[locale]/layout.tsx` 引入 Footer（Navbar 已在此）
- [ ] 2-3. 從首頁 `[locale]/page.tsx` 移除 inline Footer
- [ ] 2-4. 建立 PageHero 元件（子頁面共用的頂部 Hero 區塊）
  - 比首頁 HeroSection 精簡，適用於子頁面
- [ ] 2-5. 建立 ArticleCard 元件（文章卡片，用於 learning / insights 列表頁）
- [ ] 2-6. 建立 EventCard 元件（活動卡片，用於 events 列表頁）

### Phase 3：子頁面內容建置

**目標**：依 Sitemap 規格為每個子頁面填入內容區塊

#### 3-A. 共好永續力 `/sustainability`

- [ ] 3-A-1. Hero 區塊（願景一句話）
- [ ] 3-A-2. Vision & Mission 區塊（願景 / 使命）
- [ ] 3-A-3. 理念介紹區塊（共好永續力核心概念）
- [ ] 3-A-4. 服務項目卡片區（顧問輔導 / 白皮書 / 共學坊 / 媒合平台）
- [ ] 3-A-5. 共好實蹟區（成果亮點數據）
- [ ] 3-A-6. 共好生態圈區（合作夥伴 logo grid / 照片牆）

#### 3-B. 永續足跡 `/events`

- [ ] 3-B-1. 即將舉辦活動列表（Upcoming Events）
- [ ] 3-B-2. 永續工作坊分類區
- [ ] 3-B-3. 過往活動回顧（照片 / 影片 gallery）
- [ ] 3-B-4. 案例研究列表（Case Studies，原 `/cases` 內容遷移至此）
- [ ] 3-B-5. 活動詳情頁 `[slug]` 模板

#### 3-C. 共好學習 `/learning`

- [ ] 3-C-1. 學習專區首頁（分類導覽 + 文章列表）
- [ ] 3-C-2. 分類定義（企業合作 / 溝通策略 / 創新策略 / 數據競爭力 / 永續發展 / 人物專訪 / 共學坊公告）
- [ ] 3-C-3. 文章詳情頁 `[slug]` 模板（Markdown / MDX 渲染）
- [ ] 3-C-4. 分類頁 `category/[category]` 篩選功能

#### 3-D. 合作洽詢 `/consulting`

- [ ] 3-D-1. Hero + Coffee Chat CTA（沿用現有 contact 設計）
- [ ] 3-D-2. 企業 ESG 解決方案（服務導覽卡片）
- [ ] 3-D-3. 非營利組織合作模式
- [ ] 3-D-4. 案例分享區
- [ ] 3-D-5. 常見問題 FAQ（手風琴元件）
- [ ] 3-D-6. 聯絡表單（Email 或 LINE 導向）

#### 3-E. 加入我們 `/join`

- [ ] 3-E-1. LINE OA QR Code 展示
- [ ] 3-E-2. 加入說明文案
- [ ] 3-E-3. CTA 按鈕（外連至 LINE 官方帳號）

#### 3-F. 文章專區 `/insights`（擴充預留）

- [ ] 3-F-1. 精選文章區
- [ ] 3-F-2. 最新文章列表（分頁或無限捲動）
- [ ] 3-F-3. 分類篩選
- [ ] 3-F-4. 文章詳情頁 `[slug]` 模板
- [ ] 3-F-5. 分類頁 `category/[category]`

### Phase 4：文章系統架構

**目標**：建立可持續發佈文章的內容管理架構

- [ ] 4-1. 確定內容管理方案（二選一）
  - **方案 A：本地 MDX**：文章以 `.mdx` 檔案存放於 `src/content/`，搭配 `next-mdx-remote` 或 `@next/mdx` 渲染
  - **方案 B：Headless CMS**：接 Contentful / Sanity / Notion API，適合非工程師直接發文
- [ ] 4-2. 建立文章 Schema 定義
  - title, slug, excerpt, category, tags, author, publishedAt, coverImage, body
- [ ] 4-3. 實作 `getAllArticles()` / `getArticleBySlug()` 資料層
- [ ] 4-4. 實作 `generateStaticParams()` 靜態生成文章頁
- [ ] 4-5. 實作 `generateMetadata()` 動態 SEO metadata
- [ ] 4-6. RSS Feed 產生（`/feed.xml`）

### Phase 5：SEO 與 Metadata

**目標**：完成需求書要求的基本 SEO 設定

- [ ] 5-1. 每頁 `generateMetadata()` 動態產生 title / description
- [ ] 5-2. Open Graph 圖片設定（og:image）
- [ ] 5-3. JSON-LD 結構化資料（Organization / Article / Event）
- [ ] 5-4. `sitemap.xml` 自動產生
- [ ] 5-5. `robots.txt` 設定
- [ ] 5-6. canonical URL 與 hreflang 標籤（i18n SEO）

### Phase 6：RWD 與細節打磨

**目標**：確保所有頁面在各裝置上的體驗

- [ ] 6-1. 桌機版（>1024px）逐頁檢查
- [ ] 6-2. 平板（768–1024px）逐頁檢查
- [ ] 6-3. 手機版（<768px）逐頁檢查
- [ ] 6-4. 圖片最佳化（next/image + WebP）
- [ ] 6-5. 載入效能檢測（Lighthouse ≥ 90）
- [ ] 6-6. 無障礙檢查（aria labels / contrast / keyboard nav）

### Phase 7：部署

**目標**：上線至正式環境

- [ ] 7-1. Vercel / Cloudflare 部署設定
- [ ] 7-2. 網域 DNS 設定
- [ ] 7-3. 環境變數設定（如有 CMS API key）
- [ ] 7-4. 正式環境驗證
- [ ] 7-5. Analytics 埋設（Google Analytics / Plausible）

---

## 目標路由結構（最終）

```
src/app/
├── layout.tsx                                    # Root layout（fonts / globals.css）
├── page.tsx                                      # 根首頁（redirect 至 /zh）
├── globals.css
├── favicon.ico
│
├── [locale]/                                     # 'zh' | 'en'
│   ├── layout.tsx                                # Locale layout（Navbar + Footer）
│   ├── page.tsx                                  # 首頁 Landing Page
│   │
│   ├── sustainability/                           # 共好永續力
│   │   └── page.tsx
│   │
│   ├── events/                                   # 永續足跡
│   │   ├── page.tsx                              # 活動列表
│   │   └── [slug]/
│   │       └── page.tsx                          # 活動詳情
│   │
│   ├── learning/                                 # 共好學習
│   │   ├── page.tsx                              # 文章列表
│   │   ├── [slug]/
│   │   │   └── page.tsx                          # 文章內容
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx                      # 分類頁
│   │
│   ├── consulting/                               # 合作洽詢
│   │   └── page.tsx
│   │
│   ├── join/                                     # 加入我們
│   │   └── page.tsx
│   │
│   └── insights/                                 # 文章發佈區（擴充）
│       ├── page.tsx                              # 文章列表
│       ├── [slug]/
│       │   └── page.tsx                          # 文章內容
│       └── category/
│           └── [category]/
│               └── page.tsx                      # 分類頁
```

---

## 優先級建議

| 優先級 | Phase | 說明 |
|--------|-------|------|
| P0 | Phase 1 | 路由結構是所有後續工作的基礎，必須先完成 |
| P0 | Phase 2 | 共用元件影響所有頁面開發效率 |
| P1 | Phase 3-A~E | 核心 5 頁是網站上線的最低要求 |
| P1 | Phase 5 | SEO 設定應與頁面開發同步進行 |
| P2 | Phase 3-F + 4 | 文章系統可在核心頁面完成後再建置 |
| P2 | Phase 6 | RWD 打磨在內容到位後進行 |
| P3 | Phase 7 | 部署在全站驗收後執行 |
