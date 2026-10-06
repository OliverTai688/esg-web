import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import { learningBackHref } from "@/lib/learning-sections"
import type { Locale } from "@/i18n/config"
import { i18n } from "@/i18n/config"
import { getAllSlugs, getPostBySlug } from "@/lib/posts"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return i18n.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: `${t.learningPage.label} | 共好玟化 CO-ESG` }
  }

  return {
    title: `${post.title} | ${t.learningPage.label} | 共好玟化 CO-ESG`,
    description: post.excerpt,
  }
}

interface LearningArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function LearningArticlePage({ params }: LearningArticlePageProps) {
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
          <div className="mb-6">
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link href={learningBackHref(locale, post.categorySlug)}>{t.learningPage.back}</Link>
            </Button>
          </div>

          <article>
            <div className="mb-4 flex items-center gap-3">
              <Link href={`/${locale}/learning/category/${post.categorySlug}`}>
                <Badge variant="accent" className="cursor-pointer">
                  {post.category}
                </Badge>
              </Link>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </article>
        </Container>
      </Section>
    </main>
  )
}
