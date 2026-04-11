import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { i18n } from "@/i18n/config"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const cats = getCategories(posts)
  return i18n.locales.flatMap((locale) =>
    cats.map((cat) => ({ locale, category: cat.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getDictionary(locale as Locale)
  const posts = await getAllPosts()
  const cats = getCategories(posts)
  const categoryInfo = cats.find((c) => c.slug === category)
  const categoryName = categoryInfo?.name ?? category

  return {
    title: `${categoryName} | ${t.learningPage.label} | 共好玟化 CO-ESG`,
    description: t.learningPage.description,
  }
}

interface LearningCategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export default async function LearningCategoryPage({ params }: LearningCategoryPageProps) {
  const { locale, category } = await params
  const t = await getDictionary(locale as Locale)

  const posts = await getAllPosts()
  const cats = getCategories(posts)
  const categoryInfo = cats.find((c) => c.slug === category)
  const categoryName = categoryInfo?.name ?? category
  const filteredPosts = getPostsByCategory(posts, category)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <Section padding="sm" background="muted" withPattern>
        <Container>
          <div className="mb-6">
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link href={`/${locale}/learning`}>{t.learningPage.back}</Link>
            </Button>
          </div>
          <Heading
            level={1}
            label={t.learningPage.label}
            title={categoryName}
            description={`${filteredPosts.length} 篇文章`}
            align="center"
            spacing="none"
          />
        </Container>
      </Section>

      {/* Article Grid */}
      <Section>
        <Container>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">此分類目前沒有文章。</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/learning/${post.slug}`}
                  className="group"
                >
                  <Card className="h-full flex flex-col overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
                    <div className="h-2 bg-gradient-to-r from-primary/40 to-accent/40" />
                    <CardHeader className="pb-3">
                      <div className="mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pt-0">
                      <CardDescription className="line-clamp-2 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground gap-2 pt-0">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.author}</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href={`/${locale}/learning`}>{t.learningPage.back}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
