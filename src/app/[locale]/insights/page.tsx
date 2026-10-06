import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Mail, MessageCircle, Rss } from "lucide-react"
import { Container } from "@/components/core/Container"
import { SectionHeader } from "@/components/site/SectionHeader"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { getAllPosts } from "@/lib/posts"
import { categoryLabel } from "@/lib/learning-sections"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.learning.insights.meta.title, description: t.learning.insights.meta.description }
}

// Chronological newsroom. /learning organises the same articles by topic.
export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const n = l.insights
  const posts = await getAllPosts()

  const typeOf = (slug: string) =>
    slug === "announcements" ? n.types.announcement : slug === "interviews" ? n.types.interview : n.types.article
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))]

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-20">
          <SectionHeader as="h1" kicker={n.label} title={n.title} description={n.description} />
          {posts[0] && (
            <p className="mt-6 text-sm text-muted-foreground">
              {n.latestUpdate}：<time dateTime={posts[0].date}>{posts[0].date.replaceAll("-", ".")}</time>
            </p>
          )}
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="space-y-14">
            {years.map((year) => (
              <div key={year}>
                <h2 className="sticky top-[68px] z-10 -mx-2 bg-background/95 px-2 py-2 font-display text-3xl font-bold text-ink backdrop-blur">
                  {year}
                  {n.year}
                </h2>
                <ol className="mt-2 divide-y divide-border border-t border-border">
                  {posts
                    .filter((p) => p.date.startsWith(year))
                    .map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/${locale}/learning/${p.slug}`}
                          className="group grid gap-2 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                        >
                          <span className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                            <time dateTime={p.date} className="font-display text-sm font-bold text-ink">
                              {p.date.slice(5).replace("-", ".")}
                            </time>
                            <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink/80">{typeOf(p.categorySlug)}</span>
                          </span>
                          <span>
                            <span className="block text-lg font-black leading-[1.5] text-ink group-hover:text-primary">{p.title}</span>
                            <span className="mt-1.5 block line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</span>
                            <span className="mt-2 block text-xs text-muted-foreground">
                              {categoryLabel(p.categorySlug, p.category, l)}・{p.readingMinutes} {l.article.readingTime}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl bg-surface-dark p-6 text-white">
              <p className="font-black">{n.mediaTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{n.mediaBody}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                <li>
                  <a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2 font-bold text-brand-yellow underline-offset-4 hover:underline">
                    <Mail className="size-4" aria-hidden="true" />
                    {site.supportEmail}
                  </a>
                </li>
                <li>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-brand-yellow underline-offset-4 hover:underline">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    LINE {site.line.id}
                  </a>
                </li>
              </ul>
            </div>
            <Link href={`/${locale}/learning`} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 font-bold text-ink hover:border-primary/40">
              {n.byTopic}
              <ArrowRight className="size-4 text-primary" aria-hidden="true" />
            </Link>
            <a href="/feed.xml" className="flex items-center gap-2 rounded-2xl border border-border bg-card p-5 text-sm font-bold text-ink hover:border-primary/40">
              <Rss className="size-4 text-primary" aria-hidden="true" />
              {n.rss}
            </a>
          </aside>
        </Container>
      </section>
    </>
  )
}
