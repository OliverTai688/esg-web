import type { NextConfig } from "next";
import { site } from "./src/lib/site";

// Old /events/<slug> pages (rev2 #51, EN #51): removed or renamed, in both locales.
const movedEventPages: { from: string; to: string }[] = [
  // 永續品牌定位顧問: removed → 方案總表
  { from: "brand-positioning-consulting", to: "/consulting#solutions" },
  // 永續品牌初階工作坊 → 永續白皮書工作坊
  { from: "sustainable-brand-workshop", to: "/events/whitepaper-workshop" },
  // 永續商創師初階／進階 → one 永續商創師 page
  { from: "sustainable-business-creator-basic", to: "/events/sustainable-business-innovator" },
  { from: "sustainable-business-creator-advanced", to: "/events/sustainable-business-innovator" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...movedEventPages.map(({ from, to }) => ({
        source: `/:locale(zh|en)/events/${from}`,
        destination: `/:locale${to}`,
        permanent: true,
      })),
      // 訂閱方案: removed → the store. Temporary: it moves to the new store's
      // subscription page when that launches (#51, 商城時討論).
      {
        source: "/:locale(zh|en)/events/subscription-plan",
        destination: site.storeUrl,
        permanent: false,
      },

      // English stage 2 (EN6): the articles are Chinese only, so the English
      // article URLs go to the Chinese article, and the six English topic pages go
      // to /en/learning. Temporary, because the three English definition pages
      // (EN8) will later live at /en/learning/<slug>. Only /en is matched.
      {
        source: "/en/learning/category/:category*",
        destination: "/en/learning",
        permanent: true,
      },
      {
        source: "/en/learning/:slug((?!category$)[^/]+)",
        destination: "/zh/learning/:slug",
        permanent: false,
      },
      // EN7: /en/insights duplicates /en/learning; keep /en/learning.
      {
        source: "/en/insights",
        destination: "/en/learning",
        permanent: true,
      },
      {
        source: "/en/insights/category/:category*",
        destination: "/en/learning",
        permanent: true,
      },
      {
        source: "/en/insights/:slug((?!category$)[^/]+)",
        destination: "/zh/learning/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
