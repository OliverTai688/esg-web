import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { StepRing } from "@/components/events/steps"
import { Emphasis, InstructorCard } from "@/components/events/InstructorCard"
import { WhitepaperDownload } from "@/components/forms/WhitepaperDownload"
import { getMessages } from "@/i18n/messages"
import { i18n, type Locale } from "@/i18n/config"
import { courses, offeredCourses, getCourseBySlug, courseText, courseStatusLabel } from "@/data/courses"
import { solutionPrice } from "@/data/solutions"
import { whitepaperCases, whitepaperDownloads } from "@/data/whitepapers"
import { getConsultant } from "@/data/team"
import { ChannelButton } from "@/components/site/ChannelButton"
import { cn } from "@/lib/utils"
import { alternatesFor } from "@/lib/seo"

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return i18n.locales.flatMap((locale) => courses.map((c) => ({ locale, slug: c.slug })))
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) return {}
  const ct = courseText(course, locale)
  return { title: ct.title, description: ct.description, alternates: alternatesFor(locale, `/events/${slug}`) }
}

// One service or course up close (rev2 #51–#53). Sold items lead back to the
// 方案總表 on /consulting; the past event leads back to 我們走過的路 on /events.
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
  const advisory = course.kind === "advisory"
  const record = course.kind === "record"
  const isWhitepaper = course.slug === "impact-whitepaper"

  // The way back: past events to their chapter on /events, everything else to the 方案總表.
  const historyLabel = t.events.chapters.find((c) => c.id === "history")?.label ?? t.events.label
  const back = record
    ? { href: `/${locale}/events#history`, label: historyLabel }
    : { href: `/${locale}/consulting#solutions`, label: d.backToSolutions }
  // 其他方案: the three pages that are sold, never this one (#51)
  const related = offeredCourses.filter((c) => c.slug !== course.slug)
  const status = ct.statusLabel ?? courseStatusLabel[course.status][lang]
  const price = course.solutionId ? solutionPrice(course.solutionId, locale) : undefined

  const facts = [
    { label: advisory ? d.timeline : d.duration, value: ct.duration },
    { label: d.date, value: course.date ? course.date.replaceAll("-", ".") : planned && course.solutionId ? d.dateTbd : undefined },
    { label: d.location, value: ct.location },
    { label: d.capacity, value: ct.capacity },
    // Ended events no longer show a price (C02)
    { label: d.price, value: ended ? undefined : price },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  const instructors = course.instructors.filter((id) => getConsultant(id))

  return (
    <div className="overflow-x-clip">
      <section className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_60%_at_75%_10%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative pb-12 pt-6 md:pb-16 md:pt-10">
          <Link
            href={back.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>
              {d.backTo} <span className="text-ink">{back.label}</span>
            </span>
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <h1 className="max-w-3xl text-3xl font-black leading-[1.3] text-ink sm:text-5xl">{ct.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{ct.description}</p>
              {/* Next step: advisory services book through the contact form (#51);
                  courses being planned and past events ask for a notice on LINE (English: email). */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {advisory ? (
                  <Button size="lg" asChild>
                    <Link href={`/${locale}/consulting#contact`}>
                      {d.consult}
                      <ArrowRight />
                    </Link>
                  </Button>
                ) : (
                  <ChannelButton locale={locale} purpose="notify" externalLabel={t.common.externalParen}>
                    {ended ? d.notify : d.waitlist}
                  </ChannelButton>
                )}
                {isWhitepaper && (
                  <Button size="lg" variant="outline" asChild>
                    <a href="#cases">
                      {d.cases.title}
                      <ArrowRight />
                    </a>
                  </Button>
                )}
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
          {facts.length > 0 && (
            <dl className="grid grid-cols-2 gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label} className="bg-card py-4 pr-3 lg:px-4 lg:first:pl-0">
                  <dt className="text-xs text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-[15px] font-bold leading-snug text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {ct.body && (
            <div className="mt-10 max-w-3xl space-y-4 text-base leading-[1.9] text-ink/85">
              {ct.body.map((p) => (
                <p key={p.slice(0, 16)}>{p}</p>
              ))}
            </div>
          )}

          {/* Instructor / advisor cards (#52) */}
          {instructors.length > 0 && (
            <>
              <h2 className="mt-12 text-xl font-black text-ink">{advisory ? d.advisorsTitle : d.instructorsTitle}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {instructors.map((id) => (
                  <InstructorCard key={id} id={id} locale={locale} bio={d.bios[id]} moreLabel={d.meetInstructor} />
                ))}
              </div>
            </>
          )}

          {ct.highlights && (
            <>
              <h2 className="mt-12 text-xl font-black text-ink">{advisory ? d.services : d.highlights}</h2>
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
        </Container>
      </section>

      {isWhitepaper && (
        <>
          {/* 白皮書案例 (#53①): one card per white paper, each with its own page (D3a) */}
          <section id="cases" className="scroll-mt-24 py-16 md:py-20">
            <Container>
              <h2 className="text-2xl font-black text-ink sm:text-3xl">{d.cases.title}</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {whitepaperCases.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${locale}/events/impact-whitepaper/cases/${c.slug}`} className="group block h-full rounded-3xl bg-card p-4 outline-none ring-1 ring-border transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring">
                      <Image
                        src={c.cover}
                        alt=""
                        width={1000}
                        height={700}
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 92vw"
                        className="aspect-[4/3] w-full rounded-2xl bg-paper object-cover"
                      />
                      <h3 className="mt-4 font-black text-ink">{lang === "en" ? c.name.en : c.name.zh}</h3>
                      <p className="mt-2 text-sm leading-[1.8] text-ink/80">{lang === "en" ? c.summary.en : c.summary.zh}</p>
                      <span className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-link">
                        {d.cases.readCase}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>

          {/* 白皮書下載 (#53②): the form (WP-F) with the founder line beside it */}
          <section id="download" className="scroll-mt-24 bg-sand py-16 md:py-20">
            <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-black text-ink sm:text-3xl">{d.download.title}</h2>
                <div className="mt-6 flex gap-4">
                  {getConsultant("evvon-wu") && (
                    <Image
                      src={getConsultant("evvon-wu")!.photo}
                      alt={lang === "en" ? "Evvon Wu" : "吳玟樺"}
                      width={160}
                      height={200}
                      sizes="80px"
                      className="aspect-[4/5] w-20 shrink-0 self-start rounded-2xl object-cover"
                    />
                  )}
                  <p className="text-base leading-[1.9] text-ink/85">
                    <Emphasis text={d.download.founder} />
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-card p-6 sm:p-8">
                <WhitepaperDownload locale={locale} papers={whitepaperDownloads(locale)} />
              </div>
            </Container>
          </section>
        </>
      )}

      {related.length > 0 && (
        <section className={cn("py-12 md:py-16", isWhitepaper ? "bg-card" : "")}>
          <Container>
            <h2 className="text-xl font-black text-ink">{d.related}</h2>
            <ul className="mt-2 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${locale}/events/${r.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-bold text-link">
                    {courseText(r, locale).title}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </div>
  )
}
