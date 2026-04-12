import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"
import {
  Lightbulb,
  TrendingUp,
  Shield,
  Handshake,
  MessageCircle,
  Mic2,
} from "lucide-react"
import { FilterablePosts } from "@/components/domain/FilterablePosts"

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

  // Topic sections mapping: sectionId → categorySlug → icon
  const topicSections = [
    { id: "innovation", slug: "innovation-strategy", icon: Lightbulb },
    { id: "market", slug: "data-market-competition", icon: TrendingUp },
    { id: "responsibility", slug: "sustainability-esg", icon: Shield },
    { id: "collaboration", slug: "corporate-nonprofit-collaboration", icon: Handshake },
    { id: "communication", slug: "communication-empathy", icon: MessageCircle },
    { id: "interviews", slug: "interviews", icon: Mic2 },
  ] as const

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

      {/* 分類導覽 + 動態內容切換 */}
      <Section>
        <Container>
          <FilterablePosts 
            posts={posts} 
            categories={cats} 
            locale={locale} 
            allLabel={locale === "zh" ? "全部文章" : "All Articles"}
          />
        </Container>
      </Section>

      {/* ── Topic Sections ── */}
      {topicSections.map((topic, idx) => {
        const sectionData = t.learningPage.sections[topic.id]
        const topicPosts = getPostsByCategory(posts, topic.slug)
        const Icon = topic.icon
        return (
          <Section
            key={topic.id}
            id={topic.id}
            background={idx % 2 === 0 ? "muted" : "default"}
            {...(idx % 2 === 0 ? { withTopo: true } : { withPattern: true })}
          >
            <Container>
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{sectionData.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{sectionData.description}</p>
                </div>
              </div>

              {topicPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {topicPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${locale}/learning/${post.slug}`}
                      className="group"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
                        <div className="h-1.5 bg-gradient-to-r from-primary/40 to-accent/40" />
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
              ) : (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 p-12 text-center">
                  <Icon size={32} className="mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground text-sm">
                    {locale === "zh" ? "即將推出更多內容，敬請期待。" : "More content coming soon. Stay tuned."}
                  </p>
                </div>
              )}
            </Container>
          </Section>
        )
      })}
    </main>
  )
}
