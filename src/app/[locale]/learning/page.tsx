import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { getAllPosts, getCategories } from "@/lib/posts"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.learningPage.label} | 共好玟化 CO-ESG`,
    description: t.learningPage.description,
  }
}

export default async function LearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  const posts = await getAllPosts()
  const cats = getCategories(posts)

  const [featured, ...rest] = posts

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <Section padding="sm" background="muted" withPattern>
        <Container>
          <Heading
            level={1}
            label={t.learningPage.label}
            title={t.learningPage.title}
            description={t.learningPage.description}
            align="center"
            spacing="none"
          />
        </Container>
      </Section>

      {/* 分類導覽 + 精選文章 + 文章列表 */}
      <Section>
        <Container>
          {/* 分類標籤 */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/learning/category/${cat.slug}`}
              >
                <Badge
                  variant="outline"
                  className="cursor-pointer text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {cat.name} ({cat.count})
                </Badge>
              </Link>
            ))}
          </div>

          {/* 精選文章 */}
          {featured && (
            <Link
              href={`/${locale}/learning/${featured.slug}`}
              className="group block mb-12"
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 flex items-center justify-center p-8 md:p-12">
                    <span className="text-5xl md:text-6xl font-black text-primary/20 select-none leading-none">
                      {featured.title.slice(0, 2)}
                    </span>
                  </div>
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="mb-3">
                      <Badge variant="accent">{featured.category}</Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors leading-snug">
                      {featured.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm md:text-base mb-4">
                      {featured.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.author}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {/* 文章列表 */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
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
        </Container>
      </Section>
    </main>
  )
}
