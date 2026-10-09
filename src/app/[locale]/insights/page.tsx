import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Rss } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { CtaBand } from "@/components/site/CtaBand"
import { FoldList } from "@/components/ux/Fold"
import { ArchSeam, Petal } from "@/components/geo/shapes"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { getAllPosts, type Post } from "@/lib/posts"
import { learningSections } from "@/lib/learning-sections"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.learning.insights.meta.title, description: t.learning.insights.meta.description }
}

// Rows under the lead story, and months drawn on the hero's timeline.
const RECENT = 4
const TIMELINE_MONTHS = 6

const day = (date: string) => date.slice(5).replace("-", ".")
// A month's petal grows with its number of articles (in em, capped).
const petalSize = (count: number) => Math.min(2.2 + count * 0.6, 7)

// Chronological newsroom (docs/redesign/pages-v2/learning/). The same petals as
// /learning, laid along a line instead of around a centre: the date is the
// loudest thing in every row, and the last section hands readers back to topics.
export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const n = l.insights
  const posts = await getAllPosts()
  const [lead, ...rest] = posts

  const typeOf = (slug: string) =>
    slug === "announcements" ? n.types.announcement : slug === "interviews" ? n.types.interview : n.types.article
  const href = (p: Post) => `/${locale}/learning/${p.slug}`

  // Newest month first
  const months = [...new Set(posts.map((p) => p.date.slice(0, 7)))].map((key) => ({
    key,
    posts: posts.filter((p) => p.date.startsWith(key)),
  }))
  const timeline = months.slice(0, TIMELINE_MONTHS).reverse()

  return (
    <div className="overflow-x-clip">
      {/* N1 ── Hero: one petal per month on a line; the newest is orange */}
      <section>
        <Container className="grid items-end gap-10 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <SectionHeader as="h1" kicker={n.label} title={n.title} description={n.description}>
            {lead && (
              <div className="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button size="lg" asChild>
                  <Link href={href(lead)}>
                    {n.cta}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${locale}/learning#topics`}>{n.byTopic}</Link>
                </Button>
              </div>
            )}
          </SectionHeader>
          {lead && (
            <div>
              <div aria-hidden="true" className="flex items-end justify-center gap-[0.6em] border-b-2 border-dashed border-ink/20 pb-2 text-[11px] sm:text-base">
                {timeline.map((m, i) => (
                  <span
                    key={m.key}
                    className={cn("petal-pop block shrink-0 rounded-tr-full rounded-bl-full", i === timeline.length - 1 ? "bg-brand-orange" : "bg-brand-yellow")}
                    style={{ width: `${petalSize(m.posts.length)}em`, height: `${petalSize(m.posts.length)}em`, ["--i" as string]: i }}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {n.latestUpdate}{" "}
                <time dateTime={lead.date} className="font-display font-bold text-ink tabular-nums">
                  {lead.date.replaceAll("-", ".")}
                </time>
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Seam 1 · shape relay: the newest petal drops onto the boundary */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
        <Petal className="absolute right-[10%] top-0 size-9 -translate-y-1/2 bg-brand-orange sm:size-14 lg:right-[18%]" />
      </div>

      {/* N2 ── Latest: the lead story with a large date, then the next few */}
      {lead && (
        <section id="latest" className="bg-card py-16 md:py-24">
          <Container>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{n.latest.label}</p>
            <Link href={href(lead)} className="group mt-6 grid gap-x-12 gap-y-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[13rem_1fr]">
              <time dateTime={lead.date} className="font-display font-bold text-ink tabular-nums">
                <span className="block text-sm text-muted-foreground">{lead.date.slice(0, 4)}</span>
                <span className="block text-6xl leading-none sm:text-7xl">{day(lead.date)}</span>
              </time>
              <span className="block">
                <span className="rounded-full bg-yellow-soft px-3 py-1 text-xs font-bold text-ink">{typeOf(lead.categorySlug)}</span>
                <span role="heading" aria-level={2} className="mt-4 block text-2xl font-black leading-[1.45] text-ink underline-offset-4 group-hover:underline sm:text-[2rem]">
                  {lead.title}
                </span>
                <span className="mt-3 block max-w-2xl text-base leading-[1.85] text-muted-foreground">{lead.excerpt}</span>
              </span>
            </Link>
            <ol className="mt-10 divide-y divide-border border-y border-border">
              {rest.slice(0, RECENT).map((p) => (
                <li key={p.slug}>
                  <Link href={href(p)} className="group flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <time dateTime={p.date} className="w-12 font-display text-sm font-bold text-ink tabular-nums">
                      {day(p.date)}
                    </time>
                    <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink/80">{typeOf(p.categorySlug)}</span>
                    <span className="w-full font-bold leading-[1.5] text-ink underline-offset-4 group-hover:underline sm:w-auto sm:flex-1">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Seam 2 · quiet */}

      {/* N3 ── By month: the whole record, one row per month */}
      <section id="archive" className="pb-28 pt-16 md:pb-40 md:pt-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <SectionHeader kicker={n.archive.label} title={n.archive.title.replace("{n}", String(posts.length))} size="md" />
            <a href="/feed.xml" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              <Rss className="size-4" aria-hidden="true" />
              {n.archive.rss}
            </a>
          </div>
          <FoldList
            name="insights-archive"
            items={months.map((m) => ({
              meta: m.key.replace("-", "."),
              title: (
                <span className="font-display text-sm text-muted-foreground">
                  {m.posts.length} {n.archive.count}
                </span>
              ),
              content: (
                <ol>
                  {m.posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={href(p)} className="group flex min-h-11 items-baseline gap-4 py-2 text-[15px] font-bold leading-[1.6] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <time dateTime={p.date} className="w-12 shrink-0 font-display text-sm tabular-nums text-muted-foreground">
                          {day(p.date)}
                        </time>
                        <span className="underline-offset-4 group-hover:underline">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ),
            }))}
          />
        </Container>
      </section>

      {/* N4 ── By topic: the line folds back into the flower. Seam 3 is the domed top. */}
      <section id="by-topic" className="relative bg-sand pb-20 md:pb-28">
        <ArchSeam className="bg-sand" />
        <Container className="pt-2">
          <SectionHeader kicker={n.topics.label} title={n.topics.title} size="md" align="center" />
          <ul className="mx-auto mt-10 grid max-w-[26rem] grid-cols-3 gap-2 md:max-w-4xl md:grid-cols-6 md:gap-3">
            {learningSections.map((s, i) => (
              <li key={s.id} className="scroll-gather" style={{ "--gy": "30%", "--gr": i % 2 ? "12deg" : "-12deg" } as React.CSSProperties}>
                <Link
                  href={`/${locale}/learning#${s.id}`}
                  className={cn(
                    "flex aspect-square items-center justify-center bg-brand-yellow p-1 text-center text-xs font-bold leading-snug text-ink outline-none transition-colors hover:bg-brand-orange focus-visible:ring-4 focus-visible:ring-ring/60 sm:text-sm",
                    i % 2 ? "rounded-tl-full rounded-br-full" : "rounded-tr-full rounded-bl-full",
                  )}
                >
                  {l.sections[s.id].short}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* N5 ── Closing band: the newsroom's own next step */}
      <CtaBand
        title={n.mediaTitle}
        description={n.mediaBody}
        primary={{ label: n.mediaPrimary, href: `/${locale}/consulting#contact` }}
        secondary={{ label: n.mediaSecondary, href: site.line.url, external: true, line: true }}
        note={
          <a href={`mailto:${site.supportEmail}`} className="inline-flex min-h-11 items-center font-bold text-primary underline-offset-4 hover:underline">
            {site.supportEmail}
          </a>
        }
      />
    </div>
  )
}
