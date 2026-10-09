import Link from "next/link"
import type { Metadata } from "next"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { toSummary } from "@/components/site/PostCard"
import { PostFilter } from "@/components/site/PostFilter"
import { CtaBand } from "@/components/site/CtaBand"
import { ArchSeam, Petal } from "@/components/geo/shapes"
import { FlowerGlyph } from "@/components/learning/FlowerGlyph"
import { TopicExplorer } from "@/components/learning/TopicExplorer"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { pageChapters } from "@/lib/chapters"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"
import { learningSections, categoryLabel, topicOf } from "@/lib/learning-sections"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.learning.meta.title, description: t.learning.meta.description }
}

// Topic hub (docs/redesign/pages-v2/learning/). One shape carries the page, the
// petal: sprout (hero) → six-petal flower (topics) → one large petal (featured)
// → petals in rows (all articles) → the flame (closing band).
export default async function LearningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const posts = await getAllPosts()
  const label = (slug: string, fallback: string) => categoryLabel(slug, fallback, l)
  const summaries = posts.map((p) => ({ ...toSummary(p), category: label(p.categorySlug, p.category) }))
  // Feature the newest article rather than a platform announcement
  const featured = summaries.find((p) => p.categorySlug !== "announcements") ?? summaries[0]
  // Filter chips follow the flower's order; categories off the flower come last
  const order = (slug: string) => {
    const i = learningSections.findIndex((s) => s.slug === slug)
    return i < 0 ? learningSections.length : i
  }
  const categories = getCategories(posts)
    .map((c) => ({ ...c, name: label(c.slug, c.name) }))
    .sort((a, b) => order(a.slug) - order(b.slug))

  const topics = learningSections.map((s) => {
    const list = getPostsByCategory(posts, s.slug)
    const copy = l.sections[s.id]
    const href = `/${locale}/learning/category/${s.slug}`
    return {
      id: s.id,
      short: copy.short,
      count: list.length,
      href,
      panel: (
        <>
          <h3 className="flex flex-wrap items-baseline gap-x-3 text-2xl font-black text-ink">
            {copy.title}
            <span className="font-display text-sm font-bold text-muted-foreground">
              {list.length} {l.articlesCount}
            </span>
          </h3>
          <p className="mt-3 max-w-xl text-base leading-[1.85] text-muted-foreground">{copy.description}</p>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {list.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}/learning/${p.slug}`}
                  className="group flex min-h-12 items-center justify-between gap-4 py-3 font-bold leading-[1.5] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="underline-offset-4 group-hover:underline">{p.title}</span>
                  <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
            {l.topics.viewTopic}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </>
      ),
    }
  })

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: the sprout. Two petals from one point, which is also an open book. */}
      <section>
        <Container className="grid items-center gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <SectionHeader as="h1" kicker={l.label} title={l.title} description={l.description}>
            <Button size="lg" asChild className="mt-3">
              <a href="#topics">
                {l.hero.cta}
                <ArrowDown />
              </a>
            </Button>
            <p className="text-[13px] text-muted-foreground">{l.hero.byline}</p>
          </SectionHeader>
          <div className="relative mx-auto grid w-full max-w-[240px] grid-cols-2 pb-6 sm:max-w-[400px] sm:pb-7">
            <p className="petal-pop flex aspect-square flex-col items-center justify-center rounded-tr-full rounded-bl-full bg-brand-yellow text-xs font-bold text-ink sm:text-sm" style={{ ["--i" as string]: 0 }}>
              <span className="font-display text-4xl leading-none tabular-nums sm:text-6xl">{posts.length}</span>
              {l.articlesCount}
            </p>
            <p className="petal-pop flex aspect-square flex-col items-center justify-center rounded-tl-full rounded-br-full bg-brand-orange text-xs font-bold text-ink sm:text-sm" style={{ ["--i" as string]: 2 }}>
              <span className="font-display text-4xl leading-none tabular-nums sm:text-6xl">{learningSections.length}</span>
              {l.hero.topicsCount}
            </p>
            <span aria-hidden="true" className="absolute bottom-0 left-1/2 size-6 -translate-x-1/2 rounded-full bg-brand-grey sm:size-7" />
          </div>
        </Container>
      </section>

      {/* Seam 1 · quiet: the chapter pills are the boundary */}
      <ChapterNav chapters={pageChapters(l.chapters)} label={l.label} />

      {/* S2 ── Six topics: the flower opens. Old topic anchors (#innovation …) land here. */}
      <section id="topics" className="relative bg-card pb-28 pt-16 md:pb-40 md:pt-24">
        {learningSections.map((s) => (
          <span key={s.id} id={s.id} className="absolute top-0" />
        ))}
        <Container>
          <TopicExplorer
            header={<SectionHeader kicker={l.topics.label} title={l.topics.title} size="md" />}
            topics={topics}
            label={l.topics.label}
            countLabel={l.articlesCount}
          />
        </Container>
      </section>

      {/* S3 ── Featured: one petal is picked. Seam 2 is the arched top edge; the page's only dark section. */}
      {featured && (
        <section id="featured" className="relative bg-surface-dark pb-20 text-white md:pb-28">
          <ArchSeam className="bg-surface-dark" />
          <Container className="grid items-end gap-10 pt-4 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{l.featured.label}</p>
              <article className="mt-8 max-w-3xl rounded-tr-[clamp(4.5rem,16vw,9.5rem)] rounded-bl-[clamp(4.5rem,16vw,9.5rem)] bg-brand-yellow px-7 py-10 text-ink sm:px-12 sm:py-14">
                <p className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">{featured.category}</p>
                <h2 className="mt-4 text-2xl font-black leading-[1.45] sm:text-[2rem]">{featured.title}</h2>
                <p className="mt-4 text-base leading-[1.85]">{featured.excerpt}</p>
                <p className="mt-4 flex flex-wrap gap-x-2 text-[13px] text-ink/80">
                  <span>{featured.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featured.date}>{featured.date.replaceAll("-", ".")}</time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {featured.readingMinutes} {l.article.readingTime}
                  </span>
                </p>
                <Button size="lg" asChild className="mt-7 w-full sm:w-auto">
                  <Link href={`/${locale}/learning/${featured.slug}`}>
                    {l.featured.cta}
                    <ArrowRight />
                  </Link>
                </Button>
              </article>
            </div>
            <FlowerGlyph topic={topicOf(featured.categorySlug)} tone="dark" className="hidden size-56 lg:block" />
          </Container>
        </section>
      )}

      {/* Seam 3 · shape relay: a petal lands on the boundary and becomes the rows' topic mark */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
        <Petal className="absolute right-[9%] top-0 size-10 -translate-y-1/2 bg-brand-orange sm:size-16 lg:right-[14%]" />
      </div>

      {/* S4 ── All articles: petals in rows */}
      <section id="articles" className="bg-sand py-16 md:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <SectionHeader kicker={l.articles.label} title={l.articles.title} size="md" />
            <Link href={`/${locale}/insights`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              {l.articles.toInsights}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <PostFilter
            posts={summaries}
            categories={categories}
            labels={{ all: l.articles.all, filter: l.articles.filterLabel, showAll: l.articles.showAll, minRead: l.minutes }}
            locale={locale}
          />
        </Container>
      </section>

      {/* S5 ── Closing band. Seam 4: its two arcs draw in over the flame. */}
      <CtaBand
        title={l.cta.title}
        description={l.cta.body}
        primary={{ label: l.cta.primary, href: `/${locale}/events#workshops` }}
        secondary={{ label: l.cta.secondary, href: site.line.url, external: true, line: true }}
      />
    </div>
  )
}
