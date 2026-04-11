import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const cats = getCategories(posts)
  const locales = ["zh", "en"]
  return locales.flatMap((locale) =>
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
    title: `${categoryName} - ${t.insightsPage.label} | 共好玟化 CO-ESG`,
    description: `${categoryName} - ${t.insightsPage.description}`,
  }
}

interface InsightsCategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export default async function InsightsCategoryPage({ params }: InsightsCategoryPageProps) {
  const { locale, category } = await params
  const t = await getDictionary(locale as Locale)

  const posts = await getAllPosts()
  const cats = getCategories(posts)
  const categoryInfo = cats.find((c) => c.slug === category)
  const categoryName = categoryInfo?.name ?? category
  const filtered = getPostsByCategory(posts, category)

  return (
    <main className="flex min-h-screen flex-col">
      <Section padding="lg">
        <Container>
          <Heading
            level={1}
            label={t.insightsPage.label}
            title={categoryName}
            description={`共 ${filtered.length} 篇文章`}
            align="center"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/${locale}/insights/${post.slug}`} className="block">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-muted-foreground">作者：{post.author}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">此分類目前沒有文章。</p>
          )}
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <Link href={`/${locale}/insights`}>{t.insightsPage.back}</Link>
          </Button>
        </Container>
      </Section>
    </main>
  )
}
