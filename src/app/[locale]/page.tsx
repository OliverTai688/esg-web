import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, ChevronDown, Search, Link2, Globe2 } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { BridgeArc } from "@/components/site/BridgeArc"
import { CtaBand } from "@/components/site/CtaBand"
import { TestimonialWall } from "@/components/site/TestimonialWall"
import Marquee from "@/components/magicui/marquee"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { formatImpactMetric, cn } from "@/lib/utils"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: { absolute: t.home.meta.title }, description: t.home.hero.subTitle }
}

// Renders **bold** spans inside client-supplied story paragraphs.
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

const PAIN_ICONS = [Search, Link2, Globe2]

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const h = t.home

  const audienceHrefs: Record<string, string> = {
    brand: `/${locale}/consulting#solutions`,
    enterprise: `/${locale}/sustainability#ecosystem`,
    learner: `/${locale}/events#workshops`,
  }
  const partnerNames = h.partners.groups.flatMap((g) => g.names)

  return (
    <>
      {/* 01 ── Hero: one statement, the bridge between two sides, three numbers */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative pt-16 pb-12 text-center md:pt-24">
          <p className="kicker-rule mx-auto text-[13px] font-bold tracking-[0.12em] text-primary">{h.hero.label}</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-[2rem] font-black leading-[1.3] text-ink sm:text-5xl lg:text-[3.5rem]">
            {h.hero.titleLead}
            <br className="hidden sm:block" />
            <span className="text-primary">{h.hero.titleEmphasis}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-relaxed text-ink/85">{h.hero.subTitle}</p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.9] text-muted-foreground">{h.hero.description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={`/${locale}/consulting#contact`}>
                {h.hero.primaryCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${locale}/sustainability`}>{h.hero.secondaryCta}</Link>
            </Button>
          </div>

          {/* The bridge: who is on each end */}
          <div className="relative mx-auto mt-14 max-w-3xl">
            <BridgeArc />
            <div className="mt-3 flex items-start justify-between gap-4 text-left text-xs font-bold text-ink/80 sm:text-sm">
              <span className="max-w-[40%]">{h.hero.bridgeLeft}</span>
              <span className="hidden rounded-full bg-ink px-3 py-1 text-white sm:inline-block">{h.hero.bridgeCenter}</span>
              <span className="max-w-[40%] text-right">{h.hero.bridgeRight}</span>
            </div>
          </div>

          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-border border-y border-border py-6">
            {t.impact.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse px-2">
                <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{m.label}</dt>
                <dd className="font-display text-2xl font-bold text-ink tabular-nums sm:text-4xl">{formatImpactMetric(m)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 02 ── Trust strip: who has worked with us (names until logos are cleared) */}
      <section aria-label={h.partners.label} className="border-y border-border bg-card py-6">
        <p className="mb-3 text-center text-xs font-bold tracking-[0.12em] text-muted-foreground">{h.partners.label}</p>
        <Marquee pauseOnHover repeat={3} className="[--duration:60s] [--gap:2.5rem] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          {partnerNames.map((name) => (
            <span key={name} className="flex items-center gap-2.5 whitespace-nowrap text-base font-bold text-ink/70">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* 03 ── Problem → our answer */}
      <section id="problem" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={h.problem.label} title={h.problem.title} description={h.problem.description} />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {h.problem.painPoints.map((p, i) => {
              const Icon = PAIN_ICONS[i]
              return (
                <li key={p.title} className="relative flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <span aria-hidden="true" data-n={`0${i + 1}`} className="absolute right-6 top-5 font-display text-4xl font-bold text-sand after:content-[attr(data-n)]" />
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-bold text-primary">{p.label}</p>
                  <h3 className="mt-1.5 text-xl font-black leading-snug text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-[1.9] text-muted-foreground">{p.description}</p>
                </li>
              )
            })}
          </ol>
          <div className="mt-5 grid gap-6 rounded-3xl bg-surface-dark p-7 text-white sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-brand-yellow">{h.problem.solutionLabel}</p>
              <h3 className="mt-2 text-2xl font-black sm:text-3xl">{h.problem.solutionTitle}</h3>
              <p className="mt-4 text-sm leading-[1.9] text-white/75 sm:text-base">{h.problem.solutionDescription}</p>
            </div>
            <ul className="grid grid-cols-2 gap-2.5">
              {h.problem.solutionPillars.map((pillar) => (
                <li key={pillar} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold">
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 04 ── Story: Sayun = bridge */}
      <section id="story" className="relative overflow-hidden bg-surface-dark py-20 text-white md:py-28">
        <Container className="relative">
          <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{h.story.label}</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p lang="tay" className="font-display text-7xl font-bold leading-none text-brand-yellow sm:text-8xl">Sayun</p>
              <h2 className="mt-5 text-2xl font-black sm:text-3xl">{h.story.headline}</h2>
              {h.story.nameMeaning !== h.story.headline && locale !== "en" && (
                <p className="mt-2 font-display text-sm tracking-[0.15em] text-white/60">{h.story.nameMeaning}</p>
              )}
              <BridgeArc tone="dark" className="mt-10 max-w-sm" />
              <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold">
                {h.story.chain.map((c, i) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1.5">{c}</span>
                    {i < h.story.chain.length - 1 && <ArrowRight className="size-4 text-brand-orange" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-black">{h.story.title}</h3>
              <p className="mt-4 text-base leading-[1.95] text-white/80">{h.story.summary}</p>
              <ul className="mt-6 space-y-3">
                {h.story.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-[1.85] text-white/80">
                    <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-brand-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <details className="group mt-8 rounded-2xl border border-white/15 open:bg-white/[0.04]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold [&::-webkit-details-marker]:hidden">
                  {h.story.readMore}
                  <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="space-y-4 px-5 pb-6 text-sm leading-[1.95] text-white/80">
                  {h.story.fullStory.map((p) => (
                    <p key={p.slice(0, 16)}>{withBold(p)}</p>
                  ))}
                  <p className="pt-2 text-white">
                    — {h.story.founderName}，{h.story.founderTitle}
                  </p>
                </div>
              </details>
              <Link href={`/${locale}/sustainability#who-we-are`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-yellow underline-offset-4 hover:underline">
                {h.story.moreLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 05 ── Evidence: number + story + footnote */}
      <section id="evidence" className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader kicker={h.evidence.label} title={h.evidence.title} description={h.evidence.description} />
            <Link href={`/${locale}/events#history`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              {h.evidence.moreLink}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {h.evidence.cards.map((card, i) => {
              const m = t.impact.metrics[i]
              return (
                <li key={card.title} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                  <span className="w-fit rounded-full bg-yellow-soft px-3 py-1 text-xs font-bold text-ink">{card.tag}</span>
                  <p className="mt-6 font-display text-5xl font-bold text-primary tabular-nums">
                    {formatImpactMetric(m)}
                    <sup className="ml-1 text-sm text-muted-foreground">{i + 1}</sup>
                  </p>
                  <p className="mt-1 text-sm font-bold text-ink">{m.label}</p>
                  <h3 className="mt-6 border-t border-border pt-5 text-lg font-black text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-[1.9] text-muted-foreground">{card.description}</p>
                </li>
              )
            })}
          </ol>
          <ol className="mt-6 space-y-1 text-xs leading-relaxed text-muted-foreground">
            {t.impact.metrics.map((m, i) => (
              <li key={m.label}>
                <sup>{i + 1}</sup> {m.note}
              </li>
            ))}
            <li>{h.evidence.sourceNote}</li>
          </ol>
        </Container>
      </section>

      {/* 06 ── Who we serve → where we are heading */}
      <section id="audiences" className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeader kicker={h.audiences.label} title={h.audiences.title} description={h.audiences.description} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {h.audiences.items.map((a, i) => (
              <Link
                key={a.key}
                href={audienceHrefs[a.key] ?? `/${locale}`}
                className={cn(
                  "group flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(31,32,34,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === 1 ? "bg-surface-dark text-white" : "bg-card text-ink",
                )}
              >
                <span className={cn("font-display text-sm font-bold", i === 1 ? "text-brand-yellow" : "text-primary")}>0{i + 1}</span>
                <h3 className="mt-3 text-xl font-black leading-snug">{a.title}</h3>
                <p className={cn("mt-3 flex-1 text-sm leading-[1.9]", i === 1 ? "text-white/75" : "text-muted-foreground")}>{a.description}</p>
                <span className={cn("mt-6 inline-flex items-center gap-1.5 text-sm font-bold", i === 1 ? "text-brand-yellow" : "text-primary")}>
                  {a.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-card p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h3 className="text-xl font-black text-ink sm:text-2xl">{h.audiences.roadmapTitle}</h3>
              <Link href={`/${locale}/events#roadmap`} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                {h.audiences.roadmapLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ol className="relative mt-8 grid gap-8 md:grid-cols-3">
              <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-0.5 bg-gradient-to-r from-brand-orange via-brand-yellow to-border md:block" />
              {h.audiences.roadmap.map((r, i) => (
                <li key={r.period} className="relative">
                  <span aria-hidden="true" className={cn("block size-4 rounded-full border-4 border-card", i === 0 ? "bg-brand-orange" : i === 1 ? "bg-brand-yellow" : "bg-brand-grey")} />
                  <p className="mt-4 font-display text-sm font-bold text-muted-foreground">{r.period}</p>
                  <p className="mt-1 text-lg font-black text-ink">{r.title}</p>
                  <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{r.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 07 ── Client feedback: logo wall + dialog */}
      <section id="testimonials" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={h.trust.label} title={h.trust.title} description={h.trust.description} align="center" />
          <div className="mx-auto mt-12 max-w-5xl">
            <TestimonialWall items={h.trust.testimonials} openLabel={h.trust.openLabel} closeLabel={h.trust.closeLabel} />
          </div>
        </Container>
      </section>

      {/* 08 ── The other end of the bridge */}
      <CtaBand
        kicker={h.cta.label}
        title={h.cta.title}
        description={h.cta.description}
        steps={h.cta.steps}
        primary={{ label: h.cta.primaryLabel, href: `/${locale}/consulting#contact` }}
        secondary={{ label: h.cta.secondaryLabel, href: site.line.url, external: true, line: true }}
      />
    </>
  )
}
