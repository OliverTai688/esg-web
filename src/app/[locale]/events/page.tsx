import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { CtaBand } from "@/components/site/CtaBand"
import { ArchSeam, Disc, Half, Quarter, Seam } from "@/components/geo/shapes"
import { Tabs } from "@/components/ux/Tabs"
import { FoldList, ReadMore } from "@/components/ux/Fold"
import { SnapRail } from "@/components/ux/SnapRail"
import { FootprintTrail } from "@/components/events/FootprintTrail"
import { Footprints, PartnerDisc, StepRing } from "@/components/events/steps"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { workshops, services, courseText, courseStatusLabel } from "@/data/courses"
import { site } from "@/lib/site"
import { ClientLogo } from "@/components/site/ClientLogo"
import { getClient } from "@/data/clients"
import { cn } from "@/lib/utils"
import { pageChapters } from "@/lib/chapters"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.events.meta.title, description: t.events.meta.description }
}

// Learning-map level colours. The level name always accompanies the colour (E02).
const LEVEL_DISC: Record<string, string> = {
  blue: "bg-level-blue text-white",
  green: "bg-level-green text-white",
  yellow: "bg-brand-yellow text-ink",
  red: "bg-level-red text-white",
}

// The year disc grows with every year: the footprint accumulates.
const YEAR_DISC = [
  "size-24 text-2xl lg:size-32 lg:text-4xl",
  "size-28 text-3xl lg:size-36 lg:text-4xl",
  "size-32 text-3xl lg:size-40 lg:text-5xl",
  "size-36 text-4xl lg:size-44 lg:text-5xl",
  "size-40 text-4xl lg:size-48 lg:text-6xl",
]

// How far each service walks with you: once, one project, every month.
const SERVICE_STEPS = [
  { count: 1, tone: "bg-brand-orange" },
  { count: 4, tone: "bg-brand-yellow" },
  { count: 8, tone: "bg-brand-grey" },
]

// /events: footsteps on the bridge (docs/redesign/pages-v2/events/). One disc is
// one step — dashed: not taken yet, solid: taken, growing: accumulated.
// Seams are numbered as in 01-page-plan.md §6.
export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "zh"
  const t = await getMessages(locale as Locale)
  const e = t.events

  // Each section's kicker is its chapter label, so the menu and the page cannot drift apart.
  const kicker = Object.fromEntries(e.chapters.map((c) => [c.id, c.label]))
  const upcoming = workshops.filter((w) => w.status !== "已結束")
  const past = workshops.filter((w) => w.status === "已結束")
  const levelName = Object.fromEntries(e.learningMap.levels.map((l) => [l.key, l.name]))

  // The timeline, regrouped by calendar year; each year keeps its phase header.
  const years = e.history.phases.flatMap((phase) => {
    const list: string[] = []
    for (const entry of phase.entries) {
      const year = entry.date.match(/\d{4}/)?.[0] ?? phase.period.slice(0, 4)
      if (!list.includes(year)) list.push(year)
    }
    return list.map((year) => ({ year, phase, entries: phase.entries.filter((entry) => entry.date.includes(year)) }))
  })

  const external = <span className="sr-only">（{t.common.external}）</span>

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: steps climb the bridge deck; the dashed disc is the next one */}
      <section className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_75%_10%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative grid items-center gap-10 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-20">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{e.hero.kicker}</p>
            <h1 className="mt-6 text-[1.75rem] font-black leading-[1.3] text-ink sm:text-5xl lg:text-[2.75rem]">
              {/* Break after the comma, never inside a word */}
              {e.hero.title.split(/(?<=，)/).map((part) => (
                <span key={part} className="inline-block">
                  {part}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{e.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="line" asChild>
                <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {e.hero.primaryCta}
                  {external}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#workshops">{e.hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
          <div>
            <FootprintTrail start={e.hero.trailStart} next={e.hero.trailNext} />
            <dl className="mx-auto mt-8 grid max-w-[560px] grid-cols-2 divide-x divide-border border-y border-border py-4 text-center">
              {t.impact.reach.map((s) => (
                <div key={s.label} className="flex flex-col-reverse px-1">
                  <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-ink tabular-nums sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <ChapterNav chapters={pageChapters(e.chapters)} label={e.label} />

      {/* Seam 1 · static relay: the hero's dashed disc returns enlarged */}

      {/* S2 ── Next cohort: the step that has not landed yet */}
      <section id="upcoming" className="py-16 md:py-24">
        <Container>
          <SectionHeader kicker={kicker.upcoming} title={e.upcoming.title} description={e.upcoming.description} />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:flex-col lg:items-center">
              <StepRing className="size-44 px-6 text-lg font-black leading-snug text-ink sm:size-52">{courseStatusLabel["規劃中"][lang]}</StepRing>
              <Button size="lg" variant="line" asChild>
                <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {e.upcoming.notifyCta}
                  {external}
                </a>
              </Button>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {upcoming.map((c) => {
                const ct = courseText(c, locale)
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/${locale}/events/${c.slug}`}
                      className="group flex min-h-16 items-center gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <StepRing className="size-9" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold leading-snug text-ink group-hover:text-primary">{ct.title}</span>
                        <span className="mt-0.5 block text-[13px] text-muted-foreground">{[ct.duration, ct.location].filter(Boolean).join("・")}</span>
                      </span>
                      <span className="font-display text-[15px] font-bold text-ink">{c.price}</span>
                      <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="sr-only">{e.upcoming.viewDetails}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* Seam 2 · quiet: paper to white */}

      {/* S3 ── Learning map: eight steps on one path, start anywhere */}
      <section id="workshops" className="bg-card pt-16 md:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeader kicker={kicker.workshops} title={e.learningMap.title} />
              <p className="mt-5 font-display text-base font-bold text-ink">{e.learningMap.levelsLine}</p>
              <ReadMore label={e.learningMap.introLabel} className="mt-3">
                <p>{e.learningMap.intro}</p>
                <ul className="space-y-1.5">
                  {e.learningMap.levels.map((l, i) => (
                    <li key={l.key} className="flex items-baseline gap-2">
                      {i === 0 ? <Quarter className="size-2.5" /> : i === 1 ? <Half className="h-[5px] w-2.5" /> : <Disc className="size-2.5" />}
                      <span className="shrink-0 font-bold text-ink">{l.name}</span>
                      {l.description}
                    </li>
                  ))}
                </ul>
              </ReadMore>
            </div>
            <FoldList
              name="learning-map"
              className="relative before:absolute before:bottom-7 before:left-[20px] before:top-7 before:border-l-[3px] before:border-dotted before:border-ink/20"
              items={e.learningMap.modules.map((m, i) => ({
                open: i === 0,
                meta: (
                  <span className={cn("relative flex size-11 items-center justify-center rounded-full text-sm font-bold ring-4 ring-card", LEVEL_DISC[m.level])}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ),
                title: (
                  <>
                    <span className="block text-xs font-bold text-muted-foreground">{levelName[m.stage]}</span>
                    {m.title}
                  </>
                ),
                content: (
                  <div className="space-y-2 pl-[3.75rem]">
                    <p className="font-bold text-primary">
                      {m.theme}｜{m.subtitle}
                    </p>
                    <p className="text-ink/80">{m.description}</p>
                    <p>
                      <span className="font-bold text-ink">{e.learningMap.audienceLabel}｜</span>
                      {m.audience}
                    </p>
                  </div>
                ),
              }))}
            />
          </div>

          {/* Seam 3 · colour extension: this sand strip grows into the next section */}
          <div className="-mx-6 mt-14 flex flex-col gap-x-8 gap-y-2 rounded-t-3xl bg-sand px-6 pb-2 pt-7 md:mx-0 md:flex-row md:flex-wrap md:items-center md:px-10">
            <p className="font-bold text-ink">{e.learningMap.inquire}</p>
            <Link href={`/${locale}/consulting#contact`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              {e.learningMap.inquireCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <ReadMore label={e.learningMap.externalTitle} className="md:ml-auto">
              <ul>
                {e.learningMap.externalLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-ink underline-offset-4 hover:text-primary hover:underline">
                      {link.label}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      {external}
                    </a>
                  </li>
                ))}
              </ul>
            </ReadMore>
            <ReadMore label={e.learningMap.farmCourse.label}>
              <p className="font-bold text-ink">{e.learningMap.farmCourse.title}</p>
              <p>{e.learningMap.farmCourse.meta}</p>
              <p>{e.learningMap.farmCourse.focus}</p>
              <ul className="space-y-1.5 pb-4">
                {e.learningMap.farmCourse.modules.map((m) => (
                  <li key={m.name}>
                    <span className="font-bold text-ink">{m.name}</span>
                    {locale === "en" ? ": " : "："}
                    {m.items.join(locale === "en" ? "; " : "、")}
                  </li>
                ))}
              </ul>
            </ReadMore>
          </div>
        </Container>
      </section>

      {/* S4 ── Ongoing support: the dots say how far each one walks with you */}
      <section id="services" className="bg-sand pb-32 pt-14 md:pb-44 md:pt-20">
        <Container>
          <SectionHeader kicker={kicker.services} title={e.servicesSection.title} description={e.servicesSection.description} />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((s, i) => {
              const st = courseText(s, locale)
              const type = s.type === "subscription" ? e.servicesSection.subscription : e.servicesSection.consulting
              const step = SERVICE_STEPS[i % SERVICE_STEPS.length]
              return (
                <li key={s.slug}>
                  <Link
                    href={`/${locale}/events/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl bg-card p-6 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Footprints count={step.count} className={step.tone} />
                    {type !== st.title && <p className="mt-5 text-xs font-bold text-muted-foreground">{[type, st.duration].filter(Boolean).join("・")}</p>}
                    <h3 className={cn("text-lg font-black leading-snug text-ink group-hover:text-primary", type !== st.title ? "mt-1" : "mt-5")}>{st.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-[1.85] text-muted-foreground">{st.description}</p>
                    <span className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-display text-lg font-bold text-ink">{s.price}</span>
                      <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                      <span className="sr-only">{e.servicesSection.viewMore}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* S5 ── The road so far: the page's one dark, loud moment. Seam 4 is the arched top edge. */}
      <section id="history" className="relative bg-surface-dark pb-24 text-white md:pb-28">
        <ArchSeam className="bg-surface-dark" />
        <Container className="pt-6">
          <SectionHeader kicker={kicker.history} title={e.history.title} description={e.history.intro} tone="dark" />
          <Tabs
            tone="dark"
            label={e.history.yearsLabel}
            className="mt-10"
            panelClassName="mt-10"
            items={years.map(({ year, phase, entries }, i) => ({
              id: year,
              label: year,
              meta: e.history.yearNotes[year],
              content: (
                <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
                  <div>
                    <span
                      aria-hidden="true"
                      className={cn("flex items-center justify-center rounded-full bg-brand-orange font-display font-bold text-ink", YEAR_DISC[Math.min(i, YEAR_DISC.length - 1)])}
                    >
                      {year}
                    </span>
                    <p className="mt-6 text-sm font-bold text-brand-yellow">
                      {phase.name}
                      <span className="ml-2 font-display text-white/65">{phase.period}</span>
                    </p>
                    <h3 className="mt-1 text-xl font-black">{phase.tagline}</h3>
                    <p className="mt-3 text-sm leading-[1.9] text-white/75">{phase.intro}</p>
                  </div>
                  <ol className="space-y-7">
                    {entries.map((entry) => {
                      const href = "href" in entry ? entry.href : undefined
                      return (
                        <li key={entry.date + entry.text.slice(0, 6)}>
                          <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-display text-sm font-bold text-brand-yellow">{entry.date}</span>
                          <p className="mt-2.5 text-base leading-[1.9] text-white/85">{entry.text}</p>
                          {href && (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-yellow underline-offset-4 hover:underline">
                              {e.history.linkLabel}
                              <ArrowUpRight className="size-4" aria-hidden="true" />
                              {external}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ),
            }))}
          />

          {past.length > 0 && (
            <div className="mt-12 border-t border-white/15 pt-5">
              <h3 className="text-xs font-bold tracking-[0.12em] text-white/65">{e.history.pastLabel}</h3>
              <ul>
                {past.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${locale}/events/${c.slug}`} className="group flex min-h-12 items-center gap-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow">
                      <Disc className="size-3 bg-white/50" />
                      <span className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-0.5">
                        <span className="font-bold group-hover:text-brand-yellow">{courseText(c, locale).title}</span>
                        <span className="text-sm text-white/65">
                          {c.date?.replaceAll("-", ".")}・{e.history.ended}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {/* Seam 5 · shape relay: the latest year's disc rolls on into the roadmap */}
      <Seam>
        <Disc className="ml-[10vw] size-14 sm:size-20" />
      </Seam>

      {/* S6 ── Roadmap: quarter → half → full disc, then our own commitment */}
      <section id="roadmap" className="pt-24 md:pt-32">
        <Container>
          <SectionHeader kicker={kicker.roadmap} title={e.roadmap.title} description={e.roadmap.intro} />
          <Tabs
            label={e.roadmap.horizonsLabel}
            className="mt-10"
            items={e.roadmap.horizons.map((h, i) => ({
              id: h.name,
              label: (
                <span className="flex items-center gap-2">
                  {i === 0 ? <Quarter className="size-4" /> : i === 1 ? <Half className="h-2 w-4" /> : <Disc className="size-4" />}
                  {h.name}
                </span>
              ),
              meta: h.period,
              content: (
                <div>
                  <h3 className="flex flex-wrap items-center gap-3 text-2xl font-black text-ink">
                    {h.title}
                    {i === 0 && <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-bold text-ink">{e.roadmap.currentLabel}</span>}
                  </h3>
                  <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
                    {h.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.85] text-ink/80">
                        <span aria-hidden="true" className="mt-3 h-0.5 w-3 shrink-0 bg-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />

          {/* Seam 6 · overlap: the commitment card sits on the boundary with the case stories */}
          <figure className="relative z-10 -mb-14 mt-12 overflow-hidden rounded-3xl bg-orange-soft p-7 pr-16 sm:p-10 sm:pr-28">
            <Disc className="absolute -right-8 -top-8 size-24 sm:size-32" />
            <figcaption className="text-[13px] font-bold tracking-[0.12em] text-[#A8321A]">{e.commitment.label}</figcaption>
            <blockquote>
              <p className="mt-3 max-w-2xl text-xl font-black leading-[1.6] text-ink sm:text-2xl">{e.commitment.lead}</p>
              <ReadMore label={e.commitment.readMore} className="mt-2 [&>div]:text-ink/80">
                <p className="max-w-2xl text-base">{e.commitment.body}</p>
              </ReadMore>
            </blockquote>
          </figure>
        </Container>
      </section>

      {/* S7 ── Case stories (no numbers, per client): two halves close into one disc */}
      <section id="cases" className="bg-card pb-20 pt-32 md:pb-28 md:pt-36">
        <Container>
          <SectionHeader kicker={kicker.cases} title={e.cases.title} description={e.cases.description} />
          <SnapRail label={kicker.cases} prevLabel={e.cases.prev} nextLabel={e.cases.next} className="mt-10">
            {e.cases.items.map((c, i) => (
              // `relative` keeps the sr-only label inside the rail's scroll box (it is absolutely positioned)
              <article key={c.title} className="relative h-full rounded-2xl bg-paper p-6 sm:p-7">
                {/* Stands in for a photo: the client has not supplied photos of these three cases yet (E04) */}
                <PartnerDisc turn={i} />
                <h3 className="mt-6 text-lg font-black leading-snug text-ink">{c.title}</h3>
                <p className="mt-2 text-sm font-bold text-muted-foreground">
                  <span className="sr-only">{e.cases.partnersLabel}：</span>
                  {c.partners}
                </p>
                {c.logos.length > 0 && (
                  <ul className="mt-3 flex gap-2">
                    {c.logos.map((id) => {
                      const client = getClient(id)
                      return client ? (
                        <li key={id}>
                          <ClientLogo client={client} english={locale === "en"} className="h-12 w-24" />
                        </li>
                      ) : null
                    })}
                  </ul>
                )}
                <ReadMore label={e.cases.readStory} className="mt-1 [&>div]:text-ink/80">
                  <p>{c.description}</p>
                </ReadMore>
              </article>
            ))}
          </SnapRail>
        </Container>
      </section>

      {/* S8 ── Closing: the shared arch closes over the flame (seam 7) */}
      <CtaBand
        title={e.cta.title}
        description={e.cta.description}
        primary={{ label: e.cta.primaryLabel, href: site.line.url, external: true, line: true }}
        secondary={{ label: e.cta.secondaryLabel, href: `/${locale}/consulting#contact` }}
      />
    </div>
  )
}
