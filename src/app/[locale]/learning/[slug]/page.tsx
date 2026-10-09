import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleView } from "@/components/site/ArticleView"
import { getMessages } from "@/i18n/messages"
import { site } from "@/lib/site"
import { i18n, type Locale } from "@/i18n/config"
import { getAllPosts, getAllSlugs, getNextPost, getPostBySlug } from "@/lib/posts"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return i18n.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/learning/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, authors: [post.author], images: [site.ogImage] },
  }
}

export default async function LearningArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = await getMessages(locale as Locale)
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const next = getNextPost(await getAllPosts(), post)
  return <ArticleView post={post} next={next} locale={locale} l={t.learning} />
}
