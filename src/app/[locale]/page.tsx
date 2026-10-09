import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { FlameMark } from "@/components/site/FlameMark"
import { HeroPetalArc } from "@/components/home/HeroPetalArc"
import { ProblemMosaic } from "@/components/home/ProblemMosaic"
import { EvidenceRing } from "@/components/home/EvidenceRing"
import { StoryDialog } from "@/components/home/StoryDialog"
import { TestimonialFlower } from "@/components/home/TestimonialFlower"
import { CtaArcs } from "@/components/home/CtaArcs"
import { ClientLogo } from "@/components/site/ClientLogo"
import { ReadMore } from "@/components/ux/Fold"
import { clients, clientLogo, clientName, getClient, type Client } from "@/data/clients"
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
      <strong key={i} className="font-bold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

// Grid cells of logos shown per partner group before "see all": three rows of
// four. A wide wordmark takes two cells, so the number of logos varies.
const LOGO_CELLS = 12

function logosInView(logos: readonly Client[]) {
  let cells = 0
  const count = logos.findIndex((c) => (cells += c.wide ? 2 : 1) > LOGO_CELLS)
  return count === -1 ? logos.length : count
}

// Home page: a bridge being built, top to bottom (docs/redesign/home-v2/).
// Shape roles — petal: value-driven partners (yellow), block: enterprises (grey),
// arc: what 共好玟化 does (orange). Seams are numbered as in 03-decisions.md.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const h = t.home

  // Door colours follow the colour roles: partners yellow, enterprises grey,
  // 共好玟化's own ESG共學坊 orange. Text stays ink or white for AA contrast.
  const doors: Record<string, { href: string; surface: string; text: string; sub: string; cta: string }> = {
    brand: { href: `/${locale}/consulting#solutions`, surface: "bg-brand-yellow", text: "text-ink", sub: "text-ink/80", cta: "text-ink" },
    enterprise: { href: `/${locale}/sustainability#ecosystem`, surface: "bg-brand-grey", text: "text-white", sub: "text-white/90", cta: "text-white" },
    learner: { href: `/${locale}/events#workshops`, surface: "bg-brand-orange", text: "text-ink", sub: "text-ink", cta: "text-ink" },
  }
  const doorOrder = ["brand", "learner", "enterprise"]
  const audiences = doorOrder.map((k) => h.audiences.items.find((a) => a.key === k)).filter((a) => a !== undefined)
  const partnerTone = ["bg-brand-yellow", "bg-brand-grey", "bg-brand-orange"]
  const english = locale === "en"
  const logoGrid = "grid grid-flow-dense grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-4"
  // Each testimonial's logo, when the client has supplied the file
  const testimonialLogos = h.trust.testimonials.map((item) => {
    const client = getClient(item.client)
    return client ? { src: clientLogo(client.id), alt: clientName(client, english) } : null
  })

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: the bridge appears for the first time */}
      <section className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(55%_60%_at_75%_10%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative grid items-center gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{h.hero.label}</p>
            <h1 className="mt-6 text-[2rem] font-black leading-[1.3] text-ink sm:text-5xl lg:text-[3.25rem]">
              {h.hero.titleLead}
              <span className="text-primary">{h.hero.titleEmphasis}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-bold leading-relaxed text-ink/85">{h.hero.subTitle}</p>
            <p className="mt-4 max-w-xl text-base leading-[1.9] text-muted-foreground">{h.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          </div>
          <div>
            <HeroPetalArc left={h.hero.bridgeLeft} right={h.hero.bridgeRight} center={h.hero.bridgeCenter} />
            <dl className="mx-auto mt-10 grid max-w-[560px] grid-cols-3 divide-x divide-border border-y border-border py-5 text-center">
              {t.impact.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse px-2">
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{m.label}</dt>
                  <dd className="font-display text-2xl font-bold text-ink tabular-nums sm:text-3xl">{formatImpactMetric(m)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Seam 1 · shape relay: the arch's last petal lands on the boundary */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
        <span className="absolute right-[8%] top-0 size-10 -translate-y-1/2 rotate-45 rounded-tr-full rounded-bl-full bg-brand-yellow sm:size-14 lg:right-[22%]" />
      </div>

      {/* S2 ── Partners: three groups of client logos, each card marked by a petal in its role colour */}
      <section aria-labelledby="partners-heading" className="border-y border-border bg-card py-16 md:py-20">
        <Container>
          <h2 id="partners-heading" className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">
            {h.partners.label}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {h.partners.groups.map((g, i) => {
              const logos = clients.filter((c) => c.group === g.key)
              const shown = logosInView(logos)
              const rest = logos.slice(shown)
              return (
                <li key={g.key} className="relative overflow-hidden rounded-2xl bg-paper p-6 pt-8">
                  <span aria-hidden="true" className={cn("absolute -right-4 -top-4 size-16 rounded-tr-full rounded-bl-full opacity-90", partnerTone[i], i === 1 && "-scale-x-100")} />
                  <p className="font-display text-xs font-bold text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-1 text-lg font-black text-ink">{g.title}</h3>
                  <ul className={cn("mt-4 border-t border-border pt-4", logoGrid)}>
                    {logos.slice(0, shown).map((c) => (
                      <li key={c.id} className={cn(c.wide && "col-span-2")}>
                        <ClientLogo client={c} english={english} className="h-16" />
                      </li>
                    ))}
                  </ul>
                  {rest.length > 0 && (
                    <ReadMore label={h.partners.showAll.replace("{n}", String(logos.length))} className="mt-2" contentClassName="mt-2">
                      <ul className={logoGrid}>
                        {rest.map((c) => (
                          <li key={c.id} className={cn(c.wide && "col-span-2")}>
                            <ClientLogo client={c} english={english} className="h-16" />
                          </li>
                        ))}
                      </ul>
                    </ReadMore>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {h.partners.othersLabel}
                    {english ? " " : "："}
                    {g.others.join(english ? ", " : "、")}
                  </p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* Seam 2 · quiet: both sections are low volume */}

      {/* S3 ── Problem: three questions and one answer close into a disc */}
      <section id="problem" className="pb-28 pt-20 md:pb-36 md:pt-28">
        <Container>
          <SectionHeader kicker={h.problem.label} title={h.problem.title} description={h.problem.description} />
          <div className="mt-12">
            <ProblemMosaic
              painPoints={h.problem.painPoints}
              solution={{ label: h.problem.solutionLabel, title: h.problem.solutionTitle, description: h.problem.solutionDescription, pillars: h.problem.solutionPillars }}
            />
          </div>
        </Container>
      </section>

      {/* S4 ── Story: the bridge is named. Seam 3 is the arched top edge. */}
      <section id="story" className="relative bg-surface-dark pb-32 text-white md:pb-40">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-full h-[clamp(48px,9vw,140px)] rounded-t-[50%_100%] bg-surface-dark" />
        <Container className="relative pt-6">
          <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{h.story.label}</p>
          <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col items-start">
              {/* Two mirrored flames lean together into an arch over the name */}
              <div aria-hidden="true" className="flex items-end gap-1">
                <FlameMark className="w-20 -rotate-12 sm:w-28" />
                <FlameMark className="w-20 -scale-x-100 -rotate-12 sm:w-28" />
              </div>
              <p lang="tay" className="mt-4 font-display text-7xl font-bold leading-none text-brand-yellow sm:text-8xl">
                Sayun
              </p>
              <h2 className="mt-5 text-2xl font-black sm:text-3xl">{h.story.headline}</h2>
              {locale !== "en" && <p className="mt-2 font-display text-sm tracking-[0.15em] text-white/65">{h.story.nameMeaning}</p>}
              {/* Society → business → environment as three rising blocks */}
              <ol className="mt-10 flex w-full max-w-sm items-end gap-2">
                {h.story.chain.map((c, i) => (
                  <li
                    key={c}
                    className={cn(
                      "flex flex-1 items-end rounded-t-2xl px-3 pb-3 text-xs font-bold sm:text-sm",
                      i === 0 && "h-16 bg-brand-orange text-ink",
                      i === 1 && "h-24 bg-brand-yellow text-ink",
                      i === 2 && "h-32 bg-white/90 text-ink",
                    )}
                  >
                    {c}
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
                    <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-tr-full rounded-bl-full bg-brand-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <StoryDialog triggerLabel={h.story.readMore} kicker={h.story.label} title={h.story.title} closeLabel={h.trust.closeLabel}>
                {h.story.fullStory.map((p) => (
                  <p key={p.slice(0, 16)}>{withBold(p)}</p>
                ))}
                <p className="pt-2 font-bold text-ink">
                  — {h.story.founderName}，{h.story.founderTitle}
                </p>
              </StoryDialog>
              <Link href={`/${locale}/sustainability#who-we-are`} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-yellow underline-offset-4 hover:underline">
                {h.story.moreLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* S5 ── Evidence. Seam 4: the dial straddles the boundary and turns into place. */}
      <section id="evidence" className="relative bg-card pb-20 md:pb-28">
        <div className="relative z-10 -mt-[5.5rem] sm:-mt-28">
          <EvidenceRing caption={h.evidence.ringCaption} />
        </div>
        <Container className="mt-10">
          <SectionHeader kicker={h.evidence.label} title={h.evidence.title} description={h.evidence.description} align="center" />
          <ol className="mx-auto mt-12 max-w-4xl divide-y divide-border border-y border-border">
            {h.evidence.cards.map((card, i) => {
              const m = t.impact.metrics[i]
              return (
                <li key={card.title} className="grid gap-4 py-8 sm:grid-cols-[13rem_1fr] sm:gap-10">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className={cn("mt-2 h-10 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-brand-orange" : i === 1 ? "bg-brand-yellow" : "bg-[#8A8E97]")} />
                    <div>
                      <p className="font-display text-5xl font-bold text-ink tabular-nums">
                        {formatImpactMetric(m)}
                        <sup className="ml-1 text-sm text-muted-foreground">{i + 1}</sup>
                      </p>
                      <p className="mt-1 text-sm font-bold text-ink">{m.label}</p>
                    </div>
                  </div>
                  <div>
                    <span className="rounded-full bg-yellow-soft px-3 py-1 text-xs font-bold text-ink">{card.tag}</span>
                    <h3 className="mt-3 text-lg font-black text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-[1.9] text-muted-foreground">{card.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="mx-auto mt-6 flex max-w-4xl flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <ol className="space-y-1 text-xs leading-relaxed text-muted-foreground">
              {t.impact.metrics.map((m, i) => (
                <li key={m.label}>
                  <sup>{i + 1}</sup> {m.note}
                </li>
              ))}
              <li>{h.evidence.sourceNote}</li>
            </ol>
            <Link href={`/${locale}/events#history`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              {h.evidence.moreLink}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* S6 ── Audiences. Seam 5 is the sand section's domed top. */}
      <section id="audiences" className="relative bg-sand pb-20 md:pb-28">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-full h-[clamp(40px,7vw,110px)] rounded-t-[50%_100%] bg-sand" />
        <Container className="relative pt-4">
          <SectionHeader kicker={h.audiences.label} title={h.audiences.title} description={h.audiences.description} align="center" />
          {/* One dome cut into three doors; on phones each door keeps its own arch */}
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-0 md:overflow-hidden md:rounded-b-3xl md:rounded-t-[50%_9rem]">
            {audiences.map((a, i) => {
              const d = doors[a.key]
              return (
                <li key={a.key}>
                  <Link
                    href={d.href}
                    className={cn(
                      "group flex h-full flex-col rounded-t-[50%_4.5rem] rounded-b-2xl px-7 pb-8 pt-16 transition-[filter] hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ink/40 md:rounded-none md:pb-10",
                      i === 1 ? "md:pt-24" : "md:pt-32",
                      d.surface,
                    )}
                  >
                    <span className={cn("font-display text-sm font-bold", d.sub)}>0{i + 1}</span>
                    <h3 className={cn("mt-2 text-xl font-black leading-snug", d.text)}>{a.title}</h3>
                    <p className={cn("mt-3 flex-1 text-sm leading-[1.9]", d.sub)}>{a.description}</p>
                    <span className={cn("mt-6 inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 group-hover:underline", d.cta)}>
                      {a.cta}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Roadmap: quarter → half → full disc */}
          <div className="mt-16 rounded-3xl bg-card p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h3 className="text-xl font-black text-ink sm:text-2xl">{h.audiences.roadmapTitle}</h3>
              <Link href={`/${locale}/events#roadmap`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                {h.audiences.roadmapLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {h.audiences.roadmap.map((r, i) => (
                <li key={r.period}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block bg-brand-orange",
                      i === 0 && "size-10 rounded-tl-full",
                      i === 1 && "h-5 w-10 rounded-t-full",
                      i === 2 && "size-10 rounded-full",
                    )}
                  />
                  <p className="mt-4 font-display text-sm font-bold text-muted-foreground">{r.period}</p>
                  <p className="mt-1 text-lg font-black text-ink">{r.title}</p>
                  <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{r.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* S7 ── Client feedback. Seam 6: petals gather into the flower as it scrolls in. */}
      <section id="testimonials" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={h.trust.label} title={h.trust.title} description={h.trust.description} />
          <div className="mt-12">
            <TestimonialFlower items={h.trust.testimonials} logos={testimonialLogos} openLabel={h.trust.openLabel} closeLabel={h.trust.closeLabel} />
          </div>
        </Container>
      </section>

      {/* S8 ── CTA. Seam 7: the two arcs draw in and close at the flame. */}
      <CtaArcs
        kicker={h.cta.label}
        title={h.cta.title}
        description={h.cta.description}
        steps={h.cta.steps}
        primary={{ label: h.cta.primaryLabel, href: `/${locale}/consulting#contact` }}
        secondary={{ label: h.cta.secondaryLabel, href: site.line.url }}
      />
    </div>
  )
}
