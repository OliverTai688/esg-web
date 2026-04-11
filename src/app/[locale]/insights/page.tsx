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
import { getAllPosts, getCategories } from "@/lib/posts"

export async function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.insightsPage.label} | 共好玟化 CO-ESG`,
    description: t.insightsPage.description,
  }
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  const posts = await getAllPosts()
  const cats = getCategories(posts)

  const featured = posts[0]
  const remaining = posts.slice(1)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <Section padding="lg">
        <Container>
          <Heading
            level={1}
            label={t.insightsPage.label}
            title={t.insightsPage.title}
            description={t.insightsPage.description}
            align="center"
          />
        </Container>
      </Section>

      {/* 精選文章 */}
      {featured && (
        <Section>
          <Container>
            <h2 className="text-2xl font-bold mb-6">精選文章</h2>
            <Link href={`/${locale}/insights/${featured.slug}`} className="block">
              <Card className="overflow-hidden">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{featured.category}</Badge>
                    <span className="text-sm text-muted-foreground">{featured.date}</span>
                  </div>
                  <CardTitle className="text-3xl">{featured.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-base">{featured.excerpt}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-4">作者：{featured.author}</p>
                </CardContent>
              </Card>
            </Link>
          </Container>
        </Section>
      )}

      {/* 最新文章列表 */}
      {remaining.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl font-bold mb-6">最新文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remaining.map((post) => (
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
          </Container>
        </Section>
      )}

      {/* 分類篩選 */}
      {cats.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl font-bold mb-6">文章分類</h2>
            <div className="flex flex-wrap gap-3">
              {cats.map((cat) => (
                <Link key={cat.slug} href={`/${locale}/insights/category/${cat.slug}`}>
                  <Badge variant="outline" className="text-sm px-4 py-2 cursor-pointer">
                    {cat.name} ({cat.count})
                  </Badge>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container className="text-center">
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <Link href={`/${locale}`}>{t.insightsPage.back}</Link>
          </Button>
        </Container>
      </Section>
    </main>
  )
}
