# 共好玟化 CO-ESG 官網

共好玟化（Gung-Ho Culture）品牌形象官網。Next.js 16（App Router）＋ Tailwind CSS 4，中英雙語，全站靜態產生。

## 開發

```bash
pnpm install
pnpm dev          # http://localhost:3000 → 自動導向 /zh
pnpm lint
pnpm build && pnpm start
pnpm check:terms  # 用語檢查（永續白皮書／ESG共學坊／不用「媒合」）
```

寫程式前請先讀 `AGENTS.md`：本專案的 Next.js 版本有破壞性變更，請以 `node_modules/next/dist/docs/` 為準。

## 路由

| 路由 | 內容 |
|---|---|
| `/[locale]` | 首頁：Hero、合作單位、痛點、品牌故事、行動證據、服務對象與藍圖、客戶回饋、CTA |
| `/[locale]/sustainability` | 共好永續力：我們是誰、願景使命、核心價值、IOOI、SDGs、我們的不同、雙效益理論、服務、成果、生態圈 |
| `/[locale]/events` | 永續足跡：近期課程、永續學習地圖、顧問與訂閱、我們走過的路、發展藍圖、永續承諾、合作案例 |
| `/[locale]/events/[slug]` | 課程與服務詳情 |
| `/[locale]/learning` | 共好學習：主題書架、精選、全部文章（可篩選） |
| `/[locale]/learning/[slug]` | 文章（唯一正式網址） |
| `/[locale]/learning/category/[category]` | 主題文章列表 |
| `/[locale]/insights` | 最新文章（依年份的新聞室）；`/insights/[slug]` 會永久轉址到 `/learning/[slug]` |
| `/[locale]/consulting` | 合作洽詢：方案、非營利合作、會員方案、FAQ、聯絡表單 |
| `/[locale]/join` | 加入官方 LINE |

## 要改內容時

| 想改什麼 | 檔案 |
|---|---|
| 網站文字（中文） | `src/i18n/messages/zh/*.ts`，依頁面分檔；英文在 `src/i18n/messages/en/`，結構必須相同 |
| 三個主數字與累計數字 | `src/i18n/messages/zh/common.ts` 的 `impact`（全站只有這一份） |
| 課程、價格、狀態 | `src/data/courses.ts`（`規劃中` 會顯示「下一梯次規劃中」） |
| 顧問團隊 | `src/data/team.ts` |
| 公司資料、客服信箱、LINE | `src/lib/site.ts` |
| 文章 | `content/posts/*.md`（front matter 的 `categorySlug` 決定主題） |
| 品牌色 | `src/app/globals.css` 的 `@theme` 與 `:root` |

## 設計文件

改版的研究、旅程分析、三案提案與決策紀錄在 `docs/redesign/`：

- `01-benchmark-research.md`：十大 ESG 形象官網研究與 15 條設計原則
- `02-journey-analysis.md`：使用者角色與每條路由的旅程定位
- `proposals/*.html`：每條路由 A/B/C 三案（首頁為逐區塊三案），直接用瀏覽器開啟
- `03-decisions.md`：評分、選擇理由與待客戶確認事項

客戶第一次修改需求的任務拆解在 `docs/tasks/sitemap-rev1/`。
