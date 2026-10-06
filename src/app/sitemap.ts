import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { workshops, services } from '@/data/courses'

const BASE_URL = 'https://coesg.tw'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const locales = ['zh', 'en']

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  const staticPages = ['', '/sustainability', '/events', '/learning', '/consulting', '/join', '/insights']
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  // Post pages (canonical address is /learning/[slug])
  for (const locale of locales) {
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/learning/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
      entries.push({
        url: `${BASE_URL}/${locale}/learning/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  // Event pages
  const allCourses = [...workshops, ...services]
  for (const locale of locales) {
    for (const course of allCourses) {
      entries.push({
        url: `${BASE_URL}/${locale}/events/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
