import type { MetadataRoute } from 'next'
import { getAllPosts, getCategories } from '@/lib/posts'
import { courses } from '@/data/courses'
import { whitepaperCases } from '@/data/whitepapers'

const BASE_URL = 'https://coesg.tw'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const locales = ['zh', 'en']

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  // /en/insights redirects to /en/learning (EN7), so /insights is Chinese only
  const staticPages = ['', '/sustainability', '/events', '/learning', '/consulting', '/join', '/insights']
  for (const locale of locales) {
    for (const page of staticPages) {
      if (locale === 'en' && page === '/insights') continue
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // Post pages (canonical address is /learning/[slug]). The articles are Chinese
  // only: /en/learning/<slug> redirects to the Chinese article (EN6).
  for (const locale of ['zh']) {
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/learning/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  // Topic landing pages (the English ones redirect to /en/learning, EN6)
  for (const locale of ['zh']) {
    for (const category of getCategories(posts)) {
      entries.push({
        url: `${BASE_URL}/${locale}/learning/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  // Service and course pages (rev2 #51), and the white paper cases (#53)
  for (const locale of locales) {
    for (const course of courses) {
      entries.push({
        url: `${BASE_URL}/${locale}/events/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
    for (const c of whitepaperCases) {
      entries.push({
        url: `${BASE_URL}/${locale}/events/impact-whitepaper/cases/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
