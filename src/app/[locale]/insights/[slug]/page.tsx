import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/posts"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  const locales = ["zh", "en"]
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: "Not Found" }
  }
  return {
    title: `${post.title} | 共好玟化 CO-ESG`,
    description: post.excerpt,
  }
}

interface InsightArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Section padding="lg">
        <Container className="max-w-3xl">
          {/* Back link */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${locale}/insights`}>&larr; {t.insightsPage.back}</Link>
            </Button>
          </div>

          <article>
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-4">
              <Link href={`/${locale}/insights/category/${post.categorySlug}`}>
                <Badge variant="secondary">{post.category}</Badge>
              </Link>
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <span className="text-sm text-muted-foreground">作者：{post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{post.title}</h1>

            {/* Rendered HTML content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </article>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href={`/${locale}/insights`}>{t.insightsPage.back}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
