import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/core/Container"
import { SectionHeader } from "@/components/site/SectionHeader"
import { CtaBand } from "@/components/site/CtaBand"
import { FlowerGlyph } from "@/components/learning/FlowerGlyph"
import { getMessages } from "@/i18n/messages"
import { i18n, type Locale } from "@/i18n/config"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"
import { learningBackHref, categoryLabel, learningSections, topicOf } from "@/lib/learning-sections"
import { site } from "@/lib/site"

export async function generateStaticParams() {
  const cats = getCategories(await getAllPosts())
  return i18n.locales.flatMap((locale) => cats.map((cat) => ({ locale, category: cat.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getMessages(locale as Locale)
  const cat = getCategories(await getAllPosts()).find((c) => c.slug === category)
  if (!cat) return {}
  const topic = topicOf(cat.slug)
  return {
    title: `${categoryLabel(cat.slug, cat.name, t.learning)}｜${t.learning.label}`,
    description: topic ? t.learning.sections[topic].description : t.learning.description,
  }
}

// One topic's articles (docs/redesign/pages-v2/learning/, category A): the topic
// flower with this topic's petal lit → its articles as numbered rows → the other
// petals → the shared closing band.
export default async function LearningCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const posts = await getAllPosts()
  const cat = getCategories(posts).find((c) => c.slug === category)
  if (!cat) notFound()
  const name = categoryLabel(cat.slug, cat.name, l)
  const topic = topicOf(category)
  const list = getPostsByCategory(posts, category)

  return (
    <div className="overflow-x-clip">
      <section>
        <Container className="grid items-center gap-8 pb-12 pt-8 md:pb-16 md:pt-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
          <div>
            <Link href={learningBackHref(locale, category)} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {topic ? l.topics.back : l.back}
            </Link>
            <SectionHeader
              as="h1"
              className="mt-5"
              kicker={`${l.label}・${list.length} ${l.articlesCount}`}
              title={name}
              description={topic ? l.sections[topic].description : undefined}
            />
          </div>
          <FlowerGlyph topic={topic} className="mx-auto size-40 lg:size-60" />
        </Container>
      </section>

      <section className="bg-card py-10 md:py-14">
        <Container>
          <ol className="divide-y divide-border border-y border-border">
            {list.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}/learning/${p.slug}`}
                  className="group grid min-h-[76px] grid-cols-[2.75rem_1fr] items-baseline gap-x-2 py-5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[4rem_1fr]"
                >
                  <span aria-hidden="true" className="font-display text-sm font-bold text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span role="heading" aria-level={2} className="block text-lg font-black leading-[1.5] text-ink underline-offset-4 group-hover:underline sm:text-xl">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      <time dateTime={p.date} className="font-display tabular-nums">
                        {p.date.replaceAll("-", ".")}
                      </time>{" "}
                      · {p.readingMinutes} {l.article.readingTime}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="others-heading" className="bg-sand py-12 md:py-16">
        <Container>
          <h2 id="others-heading" className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">
            {l.topics.others}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {learningSections
              .filter((s) => s.id !== topic)
              .map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/learning/category/${s.slug}`}
                    className="flex min-h-12 items-center gap-2 rounded-full bg-card py-1 pl-3 pr-5 text-sm font-bold text-ink underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <FlowerGlyph topic={s.id} className="size-7" />
                    {l.sections[s.id].title}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={l.cta.title}
        description={l.cta.body}
        primary={{ label: l.cta.primary, href: `/${locale}/events#workshops` }}
        secondary={{ label: l.cta.secondary, href: site.line.url, external: true, line: true }}
      />
    </div>
  )
}
