import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, CalendarClock, Check, Clock, MapPin, MessageCircle, Repeat, Briefcase, Flag } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { CtaBand } from "@/components/site/CtaBand"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { workshops, services, courseText, courseStatusLabel } from "@/data/courses"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.events.meta.title, description: t.events.meta.description }
}

// Learning-map level colours. Text labels always accompany the colour (E02).
const LEVEL_STYLES: Record<string, { dot: string; bar: string; text: string }> = {
  blue: { dot: "bg-level-blue", bar: "before:bg-level-blue", text: "text-level-blue" },
  green: { dot: "bg-level-green", bar: "before:bg-level-green", text: "text-level-green" },
  yellow: { dot: "bg-brand-yellow", bar: "before:bg-brand-yellow", text: "text-level-yellow" },
  red: { dot: "bg-level-red", bar: "before:bg-level-red", text: "text-level-red" },
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "zh"
  const t = await getMessages(locale as Locale)
  const e = t.events
  const nav = t.nav.events

  const upcoming = workshops.filter((w) => w.status !== "已結束")
  const past = workshops.filter((w) => w.status === "已結束")
  const levelName = Object.fromEntries(e.learningMap.levels.map((l) => [l.key, l.name]))

  const chapters = [
    { id: "upcoming", label: nav.list },
    { id: "workshops", label: nav.workshops },
    { id: "services", label: nav.services },
    { id: "history", label: nav.history },
    { id: "roadmap", label: nav.roadmap },
    { id: "cases", label: nav.caseStudies },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-surface-dark text-white">
        {/* Footprint path motif */}
        <svg aria-hidden="true" viewBox="0 0 800 300" className="pointer-events-none absolute -right-10 bottom-0 w-[720px] max-w-none opacity-40" fill="none">
          <path d="M10 280 C 200 260, 260 120, 420 140 S 640 60, 790 20" stroke="#F25232" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
          {[[10, 280], [230, 200], [420, 140], [610, 80], [790, 20]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 4 ? 10 : 6} fill={i === 4 ? "#FAB40A" : "#F25232"} />
          ))}
        </svg>
        <Container className="relative py-20 md:py-28">
          <p className="kicker-rule mb-6 text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{e.hero.kicker}</p>
          <h1 className="max-w-4xl text-[2.25rem] font-black leading-[1.25] sm:text-5xl lg:text-[3.5rem]">{e.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-[1.9] text-white/75 sm:text-lg">{e.hero.description}</p>
          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
            {t.impact.track.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-surface-dark p-4">
                <dt className="text-xs text-white/65">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-brand-yellow tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-white/50">{t.impact.trackNote}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#workshops">
                {e.hero.primaryCta}
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="outlineInverse" asChild>
              <a href="#history">{e.hero.secondaryCta}</a>
            </Button>
          </div>
        </Container>
      </section>

      <ChapterNav chapters={chapters} label={e.label} />

      {/* ── Upcoming: honest "next run in planning" state ── */}
      <section id="upcoming" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={e.upcoming.label} title={e.upcoming.title} description={e.upcoming.description} />
          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
            {upcoming.map((c) => {
              const ct = courseText(c, locale)
              return (
                <Link
                  key={c.slug}
                  href={`/${locale}/events/${c.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex w-fit items-center gap-1.5 rounded-full bg-yellow-soft px-3 py-1 text-xs font-bold text-ink">
                    <CalendarClock className="size-3.5" aria-hidden="true" />
                    {courseStatusLabel[c.status][lang]}
                  </span>
                  <h3 className="mt-5 text-lg font-black leading-snug text-ink group-hover:text-primary">{ct.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ct.description}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                    {ct.duration && (
                      <li className="flex items-center gap-2">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {ct.duration}
                      </li>
                    )}
                    {ct.location && (
                      <li className="flex items-center gap-2">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {ct.location}
                      </li>
                    )}
                  </ul>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-ink">{c.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                      {e.upcoming.viewDetails}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
            <div className="flex flex-col justify-between rounded-2xl bg-surface-dark p-6 text-white">
              <div>
                <p className="text-lg font-black">{e.upcoming.planning}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{e.upcoming.planningNote}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                <Button variant="line" asChild>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    {e.upcoming.notifyCta}
                  </a>
                </Button>
                <Button variant="outlineInverse" asChild>
                  <Link href={`/${locale}/consulting#contact`}>{e.upcoming.inquireCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Learning map: 3 levels × 8 modules ── */}
      <section id="workshops" className="bg-card py-20 md:py-28">
        <Container>
          <SectionHeader kicker={e.learningMap.label} title={e.learningMap.title} description={e.learningMap.intro} />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-paper px-5 py-4">
            <span className="font-display text-sm font-bold text-ink">{e.learningMap.levelsLine}</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {e.learningMap.levels.map((l) => (
                <li key={l.key} className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className={cn("size-3 rounded-full", LEVEL_STYLES[l.key].dot)} />
                  <span className="font-bold text-ink">{l.name}</span>
                  <span className="text-muted-foreground">{l.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {e.learningMap.modules.map((m, i) => {
              const style = LEVEL_STYLES[m.level]
              return (
                <li
                  key={m.title}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border border-border bg-paper p-6 pt-7 before:absolute before:inset-x-0 before:top-0 before:h-1.5",
                    style.bar,
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">{i + 1}</span>
                    <span className={cn("flex items-center gap-1.5 text-xs font-bold", style.text)}>
                      <span aria-hidden="true" className={cn("size-2 rounded-full", style.dot)} />
                      {levelName[m.level]}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold text-muted-foreground">{m.theme}</p>
                  <h3 className="mt-1 text-lg font-black leading-snug text-ink">{m.title}</h3>
                  <p className="mt-1 text-sm font-bold text-primary">{m.subtitle}</p>
                  <p className="mt-3 flex-1 text-sm leading-[1.85] text-ink/75">{m.description}</p>
                  <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-bold text-ink">{e.learningMap.audienceLabel}｜</span>
                    {m.audience}
                  </p>
                </li>
              )
            })}
          </ol>

          <div className="mt-10 grid gap-6 rounded-3xl border border-border p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground">{e.learningMap.externalTitle}</h3>
              <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {e.learningMap.externalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-sand px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-orange-soft hover:text-[#A8321A]"
                    >
                      {link.label}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span className="sr-only">（{t.common.external}）</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 lg:items-end">
              <p className="text-sm font-bold text-ink">{e.learningMap.inquire}</p>
              <Button asChild>
                <Link href={`/${locale}/consulting#contact`}>
                  {e.learningMap.inquireCta}
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Ongoing services ── */}
      <section id="services" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={e.servicesSection.label} title={e.servicesSection.title} description={e.servicesSection.description} />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((s) => {
              const st = courseText(s, locale)
              const Icon = s.type === "subscription" ? Repeat : Briefcase
              return (
                <li key={s.slug}>
                  <Link
                    href={`/${locale}/events/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-orange-soft text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">
                        {s.type === "subscription" ? e.servicesSection.subscription : e.servicesSection.consulting}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-black text-ink group-hover:text-primary">{st.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{st.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-display text-lg font-bold text-ink">{s.price}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                        {e.servicesSection.viewMore}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* ── The road so far: two phases, dated entries ── */}
      <section id="history" className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeader kicker={e.history.label} title={e.history.title} description={e.history.intro} />
          <div className="mt-12 space-y-10">
            {e.history.phases.map((phase, pi) => (
              <div key={phase.name} className="overflow-hidden rounded-3xl bg-card">
                <div className={cn("grid gap-4 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:gap-8", pi === 0 ? "bg-ink text-white" : "bg-surface-dark text-white")}>
                  <div>
                    <p className="font-display text-3xl font-bold text-brand-yellow">{phase.period}</p>
                    <h3 className="mt-1 text-xl font-black">{phase.name}</h3>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{phase.tagline}</p>
                    <p className="mt-2 text-sm leading-[1.85] text-white/70">{phase.intro}</p>
                  </div>
                </div>
                <ol className="relative px-6 py-8 sm:px-8">
                  <span aria-hidden="true" className="absolute bottom-8 left-[calc(1.5rem+5px)] top-8 w-0.5 bg-border sm:left-[calc(2rem+5px)] md:left-[calc(2rem+8.5rem+5px)]" />
                  {phase.entries.map((entry) => {
                    const href = "href" in entry ? entry.href : undefined
                    return (
                      <li key={entry.date + entry.text.slice(0, 6)} className="relative grid gap-2 pb-7 pl-8 last:pb-0 md:grid-cols-[8.5rem_1fr] md:gap-6 md:pl-0">
                        <span className="w-fit rounded-full bg-orange-soft px-3 py-1 font-display text-sm font-bold text-[#A8321A] md:mt-0.5 md:justify-self-start">{entry.date}</span>
                        <span aria-hidden="true" className="absolute left-0 top-2 size-3 rounded-full border-2 border-card bg-brand-orange md:left-[8.5rem]" />
                        <p className="text-[15px] leading-[1.85] text-ink/85 md:pl-8">
                          {entry.text}
                          {href && (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-0.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                              {e.history.linkLabel}
                              <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              <span className="sr-only">（{t.common.external}）</span>
                            </a>
                          )}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>

          {past.length > 0 && (
            <div id="past" className="mt-12">
              <h3 className="text-sm font-bold text-muted-foreground">{e.past.label}</h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {past.map((c) => {
                  const ct = courseText(c, locale)
                  return (
                    <li key={c.slug}>
                      <Link href={`/${locale}/events/${c.slug}`} className="flex items-center gap-4 rounded-2xl bg-card p-5 transition-colors hover:bg-paper">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand">
                          <Check className="size-5 text-ink" aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-bold text-ink">{ct.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {c.date?.replaceAll("-", ".")}・{e.past.ended}
                          </span>
                        </span>
                        <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {/* ── Roadmap + commitment ── */}
      <section id="roadmap" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={e.roadmap.label} title={e.roadmap.title} description={e.roadmap.intro} />
          <ol className="mt-12 grid gap-4 lg:grid-cols-3">
            {e.roadmap.horizons.map((h, i) => (
              <li key={h.name} className={cn("flex flex-col rounded-2xl p-7", i === 0 ? "bg-surface-dark text-white" : "border border-border bg-card")}>
                <div className="flex items-center justify-between">
                  <span className={cn("font-display text-sm font-bold", i === 0 ? "text-brand-yellow" : "text-primary")}>
                    {h.name}・{h.period}
                  </span>
                  {i === 0 && (
                    <span className="flex items-center gap-1.5 rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-bold text-ink">
                      <Flag className="size-3.5" aria-hidden="true" />
                      {e.roadmap.currentLabel}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-2xl font-black">{h.title}</h3>
                <ul className="mt-5 space-y-3">
                  {h.items.map((item) => (
                    <li key={item} className={cn("flex gap-3 text-sm leading-[1.85]", i === 0 ? "text-white/80" : "text-ink/80")}>
                      <span aria-hidden="true" className={cn("mt-2.5 h-0.5 w-3 shrink-0", i === 0 ? "bg-brand-yellow" : "bg-brand-orange")} />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <figure id="commitment" className="mt-8 grid gap-6 rounded-3xl bg-orange-soft p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">
            <p className="text-sm font-bold tracking-[0.12em] text-[#A8321A]">{e.commitment.label}</p>
            <blockquote>
              <p className="text-xl font-black leading-[1.6] text-ink sm:text-2xl">{e.commitment.lead}</p>
              <p className="mt-4 text-base leading-[1.9] text-ink/80">{e.commitment.body}</p>
            </blockquote>
          </figure>
        </Container>
      </section>

      {/* ── Case stories (no numbers, per client) ── */}
      <section id="cases" className="bg-card py-20 md:py-28">
        <Container>
          <SectionHeader kicker={e.cases.label} title={e.cases.title} description={e.cases.description} />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {e.cases.items.map((c, i) => {
              const [left, right] = c.partners.split(" × ")
              return (
                <li key={c.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-paper">
                  {/* Partner lock-up stands in for a photo until images are cleared */}
                  <div className={cn("flex aspect-[16/9] flex-col items-center justify-center gap-2 p-6 text-center", i === 1 ? "bg-surface-dark text-white" : i === 0 ? "bg-orange-soft text-ink" : "bg-yellow-soft text-ink")}>
                    <span className="text-lg font-black leading-snug">{left}</span>
                    <span aria-hidden="true" className="font-display text-2xl font-bold text-brand-orange">×</span>
                    <span className="text-lg font-black leading-snug">{right}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold text-muted-foreground">
                      {e.cases.partnersLabel}｜{c.partners}
                    </p>
                    <h3 className="mt-2 text-lg font-black leading-snug text-ink">{c.title}</h3>
                    <p className="mt-3 text-sm leading-[1.9] text-ink/75">{c.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={e.cta.title}
        description={e.cta.description}
        primary={{ label: e.cta.primaryLabel, href: `/${locale}/consulting#contact` }}
        secondary={{ label: e.cta.secondaryLabel, href: site.line.url, external: true, line: true }}
      />
    </>
  )
}
