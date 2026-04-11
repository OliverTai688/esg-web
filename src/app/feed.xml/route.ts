import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://coesg.tw'

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/zh/insights/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <guid isPermaLink="true">${BASE_URL}/zh/insights/${post.slug}</guid>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>共好玟化 CO-ESG</title>
    <link>${BASE_URL}</link>
    <description>永續品牌的專業橋樑 — 最新文章與永續觀點</description>
    <language>zh-TW</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
