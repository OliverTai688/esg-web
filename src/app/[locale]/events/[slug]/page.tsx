import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { getMessages } from "@/i18n/messages"
import { i18n, type Locale } from "@/i18n/config"
import { getCourseBySlug, workshops, services, courseText, courseStatusLabel } from "@/data/courses"
import { site } from "@/lib/site"

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return i18n.locales.flatMap((locale) => [...workshops, ...services].map((c) => ({ locale, slug: c.slug })))
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) return {}
  const ct = courseText(course, locale)
  return { title: ct.title, description: ct.description }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params
  const lang = locale === "en" ? "en" : "zh"
  const t = await getMessages(locale as Locale)
  const d = t.events.detail
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const ct = courseText(course, locale)
  const ended = course.status === "已結束"
  const related = [...workshops, ...services].filter((c) => c.slug !== course.slug && c.status !== "已結束").slice(0, 3)

  const facts = [
    { label: d.instructor, value: ct.instructor },
    { label: d.duration, value: ct.duration },
    { label: d.date, value: course.date ? course.date.replaceAll("-", ".") : course.status === "規劃中" ? d.dateTbd : undefined },
    { label: d.location, value: ct.location },
    { label: d.capacity, value: ct.capacity },
    // Ended events no longer show a price (C02)
    { label: d.price, value: ended ? undefined : course.price },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  return (
    <>
      <section className="bg-surface-dark text-white">
        <Container className="py-14 md:py-20">
          <Link href={`/${locale}/events#upcoming`} className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {d.back}
          </Link>
          <p className="mt-8 w-fit rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-ink">{courseStatusLabel[course.status][lang]}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.3] sm:text-5xl">{ct.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.9] text-white/75 sm:text-lg">{ct.description}</p>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            {ct.highlights && (
              <>
                <h2 className="text-xl font-black text-ink">{d.highlights}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {ct.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 font-bold text-ink">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-soft text-primary">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {related.length > 0 && (
              <div className="mt-14">
                <h2 className="text-xl font-black text-ink">{d.related}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/${locale}/events/${r.slug}`} className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                        <span className="font-bold leading-snug text-ink">{courseText(r, locale).title}</span>
                        <span className="mt-auto pt-3 font-display text-sm font-bold text-muted-foreground">{r.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <dl className="divide-y divide-border">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{f.label}</dt>
                  <dd className="text-right font-bold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            {!ended && (
              <div className="mt-6 flex flex-col gap-2.5">
                <Button variant="line" asChild>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    {d.enroll}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/consulting#contact`}>
                    {d.consult}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            )}
          </aside>
        </Container>
      </section>
    </>
  )
}
