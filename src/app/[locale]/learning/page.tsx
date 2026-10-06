import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Lightbulb, TrendingUp, Shield, Handshake, MessageCircle, Mic2 } from "lucide-react"
import { Container } from "@/components/core/Container"
import { SectionHeader } from "@/components/site/SectionHeader"
import { PostCard, toSummary } from "@/components/site/PostCard"
import { PostFilter } from "@/components/site/PostFilter"
import { CtaBand } from "@/components/site/CtaBand"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { getAllPosts, getCategories } from "@/lib/posts"
import { learningSections, categoryLabel, type LearningSectionId } from "@/lib/learning-sections"
import { site } from "@/lib/site"

const SECTION_ICONS: Record<LearningSectionId, typeof Lightbulb> = {
  innovation: Lightbulb,
  market: TrendingUp,
  responsibility: Shield,
  collaboration: Handshake,
  communication: MessageCircle,
  interviews: Mic2,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.learning.meta.title, description: t.learning.meta.description }
}

export default async function LearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const posts = await getAllPosts()
  const counts = new Map(getCategories(posts).map((c) => [c.slug, c.count]))
  const label = (slug: string, fallback: string) => categoryLabel(slug, fallback, l)
  const summaries = posts.map((p) => ({ ...toSummary(p), category: label(p.categorySlug, p.category) }))
  // Feature the newest article rather than a platform announcement
  const featured = summaries.find((p) => p.categorySlug !== "announcements") ?? summaries[0]
  const categories = getCategories(posts).map((c) => ({ ...c, name: label(c.slug, c.name) }))

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeader as="h1" kicker={l.label} title={l.title} description={l.description} />
        </Container>
      </section>

      {/* Topic shelf: each card is the anchor target for its topic (nav + back links) */}
      <section aria-labelledby="topics-heading" className="py-14 md:py-16">
        <Container>
          <h2 id="topics-heading" className="text-sm font-bold tracking-[0.12em] text-muted-foreground">
            {l.topicsTitle}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningSections.map((s) => {
              const Icon = SECTION_ICONS[s.id]
              const count = counts.get(s.slug) ?? 0
              return (
                <li key={s.id} id={s.id}>
                  <Link
                    href={`/${locale}/learning/category/${s.slug}`}
                    className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-black text-ink">{l.sections[s.id].title}</span>
                        <span className="font-display text-xs font-bold text-muted-foreground">
                          {count} {l.articlesCount}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{l.sections[s.id].description}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {featured && (
        <section aria-label={l.featured} className="pb-14 md:pb-16">
          <Container>
            <p className="mb-4 text-sm font-bold tracking-[0.12em] text-muted-foreground">{l.featured}</p>
            <PostCard post={featured} href={`/${locale}/learning/${featured.slug}`} minRead={l.article.readingTime} featured />
          </Container>
        </section>
      )}

      <section aria-labelledby="all-heading" className="bg-card py-16 md:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="all-heading" className="text-2xl font-black text-ink sm:text-3xl">
              {l.allLabel}
            </h2>
            <Link href={`/${locale}/insights`} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              {t.nav.learning.insights}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <PostFilter posts={summaries} categories={categories} allLabel={l.allLabel} minRead={l.article.readingTime} locale={locale} />
        </Container>
      </section>

      <CtaBand
        title={l.article.endTitle}
        description={l.article.endBody}
        primary={{ label: l.article.endPrimary, href: `/${locale}/events#workshops` }}
        secondary={{ label: l.article.endSecondary, href: site.line.url, external: true, line: true }}
      />
    </>
  )
}
