import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

// The test site (esg-web-flame.vercel.app) must not be indexed (launch checklist 1).
// Pages carry a noindex meta tag until SITE_INDEXABLE=true is set for the real domain;
// crawling stays allowed so search engines can read that tag. No sitemap is advertised
// before launch.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    ...(site.indexable ? { sitemap: 'https://coesg.tw/sitemap.xml' } : {}),
  }
}
