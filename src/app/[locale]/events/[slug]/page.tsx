import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { StepRing } from "@/components/events/steps"
import { getMessages } from "@/i18n/messages"
import { i18n, type Locale } from "@/i18n/config"
import { getCourseBySlug, workshops, services, courseText, courseStatusLabel, courseChapter } from "@/data/courses"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

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

// One footprint up close (docs/redesign/pages-v2/events/01-page-plan.md §9).
// The disc carries the status: dashed while the next run is being planned,
// solid orange when it can be booked, solid grey once it has ended.
export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params
  const lang = locale === "en" ? "en" : "zh"
  const t = await getMessages(locale as Locale)
  const d = t.events.detail
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const ct = courseText(course, locale)
  const ended = course.status === "已結束"
  const planned = course.status === "規劃中"
  // The way back lands on the chapter this course is listed in, not on the top of /events.
  const chapterId = courseChapter(course)
  const chapter = t.events.chapters.find((c) => c.id === chapterId)
  const group = chapterId === "services" ? services : workshops
  const related = group.filter((c) => c.slug !== course.slug && c.status !== "已結束").slice(0, 2)
  const status = courseStatusLabel[course.status][lang]

  const facts = [
    { label: d.instructor, value: ct.instructor },
    { label: d.duration, value: ct.duration },
    { label: d.date, value: course.date ? course.date.replaceAll("-", ".") : planned ? d.dateTbd : undefined },
    { label: d.location, value: ct.location },
    { label: d.capacity, value: ct.capacity },
    // Ended events no longer show a price (C02)
    { label: d.price, value: ended ? undefined : course.price },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  return (
    <div className="overflow-x-clip">
      <section className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_60%_at_75%_10%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative pb-12 pt-6 md:pb-16 md:pt-10">
          <Link
            href={`/${locale}/events#${chapterId}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>
              {d.backTo} <span className="text-ink">{chapter?.label ?? t.events.label}</span>
            </span>
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <h1 className="max-w-3xl text-3xl font-black leading-[1.3] text-ink sm:text-5xl">{ct.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{ct.description}</p>
              {/* Next step: LINE first for every status; then the learning map, or a Coffee Chat for advisory services */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="line" asChild>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    {planned ? d.waitlist : ended ? d.notify : d.enquire}
                    <span className="sr-only">（{t.common.external}）</span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  {chapterId === "services" ? (
                    <Link href={`/${locale}/consulting#contact`}>
                      {d.consult}
                      <ArrowRight />
                    </Link>
                  ) : (
                    <Link href={`/${locale}/events#workshops`}>
                      {d.map}
                      <ArrowRight />
                    </Link>
                  )}
                </Button>
              </div>
            </div>
            {planned ? (
              <StepRing className="size-40 px-6 text-base font-black leading-snug text-ink sm:size-52 sm:text-lg">{status}</StepRing>
            ) : (
              <span
                className={cn(
                  "flex size-40 shrink-0 items-center justify-center rounded-full px-6 text-balance text-center text-base font-black leading-snug sm:size-52 sm:text-lg",
                  ended ? "bg-brand-grey text-white" : "bg-brand-orange text-ink",
                )}
              >
                {status}
              </span>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-card py-12 md:py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {facts.map((f) => (
              <div key={f.label} className="bg-card py-4 pr-3 lg:px-4 lg:first:pl-0">
                <dt className="text-xs text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 text-[15px] font-bold leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          {ct.highlights && (
            <>
              <h2 className="mt-12 text-xl font-black text-ink">{d.highlights}</h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ct.highlights.map((h, i) => (
                  <li key={h} className="flex items-center gap-3 font-bold text-ink">
                    <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-display text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {h}
                  </li>
                ))}
              </ol>
            </>
          )}

          {related.length > 0 && (
            <>
              <h2 className="mt-12 text-xl font-black text-ink">{d.related}</h2>
              <ul className="mt-2 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/${locale}/events/${r.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline">
                      {courseText(r, locale).title}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>
    </div>
  )
}
