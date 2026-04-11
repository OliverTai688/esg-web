import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  categorySlug: string
  tags: string[]
  author: string
  cover?: string
  published: boolean
  content: string // rendered HTML
}

export interface PostCategory {
  name: string
  slug: string
  count: number
}

let cachedPosts: Post[] | null = null

export async function getAllPosts(): Promise<Post[]> {
  if (cachedPosts) {
    return cachedPosts
  }

  if (!fs.existsSync(postsDirectory)) {
    cachedPosts = []
    return cachedPosts
  }

  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))

  const posts: Post[] = []

  for (const filename of filenames) {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContents)

    if (!data.published) {
      continue
    }

    const processed = await remark().use(html).process(content)
    const contentHtml = processed.toString()

    posts.push({
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      categorySlug: data.categorySlug,
      tags: data.tags ?? [],
      author: data.author,
      cover: data.cover,
      published: data.published,
      content: contentHtml,
    })
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))

  cachedPosts = posts
  return cachedPosts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((post) => post.slug)
}

export function getCategories(posts: Post[]): PostCategory[] {
  const map = new Map<string, PostCategory>()

  for (const post of posts) {
    const existing = map.get(post.categorySlug)
    if (existing) {
      existing.count++
    } else {
      map.set(post.categorySlug, {
        name: post.category,
        slug: post.categorySlug,
        count: 1,
      })
    }
  }

  return Array.from(map.values())
}

export function getPostsByCategory(posts: Post[], categorySlug: string): Post[] {
  return posts.filter((post) => post.categorySlug === categorySlug)
}
