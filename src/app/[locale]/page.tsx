import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { HeroPetalArc } from "@/components/home/HeroPetalArc"
import { ProblemMosaic } from "@/components/home/ProblemMosaic"
import { StoryDialog } from "@/components/home/StoryDialog"
import { TestimonialFlower } from "@/components/home/TestimonialFlower"
import { CtaArcs } from "@/components/home/CtaArcs"
import { ClientLogo } from "@/components/site/ClientLogo"
import { clientsIn, clientLogo, clientName, getClient, type ClientGroup } from "@/data/clients"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { formatImpactMetric, cn } from "@/lib/utils"
import { contactFor } from "@/lib/site"
import { alternatesFor } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: { absolute: t.home.meta.title }, description: t.home.hero.subTitle, alternates: alternatesFor(locale) }
}

// _Italic_ spans (titles of films and books, R10) inside a story paragraph.
function withItalics(text: string) {
  return text.split(/(_[^_]+_)/g).map((part, i) => (part.length > 2 && part.startsWith("_") && part.endsWith("_") ? <em key={i}>{part.slice(1, -1)}</em> : part))
}

// Renders **bold** and _italic_ spans inside client-supplied story paragraphs.
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold text-ink">
        {withItalics(part.slice(2, -2))}
      </strong>
    ) : (
      <Fragment key={i}>{withItalics(part)}</Fragment>
    ),
  )
}

// Logo wall grids (rev2 #12): 20 clients and 10 partners. On wide screens the
// two areas sit side by side at 2:1, both five rows deep.
const LOGO_GRID: Record<ClientGroup, string> = {
  client: "grid-cols-3 sm:grid-cols-4",
  partner: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-2",
  ecosystem: "",
}

// The 學會 testimonial uses its vertical logo; the logo wall keeps the horizontal one (rev2 #13).
const TESTIMONIAL_LOGO: Record<string, string> = { tlaa: "/clients/tlaa-vertical.webp" }

// rev2 #24: where 立即購書 / Buy the book leads (same link for both languages).
const BOOK_URL = "https://app.flashfalcon.info/esgevvon/shop/retail_1791864065_a47821e9"

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
    learner: { href: `/${locale}/consulting#solutions-self-learn`, surface: "bg-brand-orange", text: "text-ink", sub: "text-ink", cta: "text-ink" },
    supplier: { href: `/${locale}/sustainability#services-supply-chain`, surface: "bg-ink", text: "text-white", sub: "text-white/85", cta: "text-white" },
  }
  const doorOrder = ["brand", "learner", "enterprise", "supplier"]
  const audiences = doorOrder.map((k) => h.audiences.items.find((a) => a.key === k)).filter((a) => a !== undefined)
  const english = locale === "en"
  // Each testimonial's logo; entries without a client are text cards
  const testimonialLogos = h.trust.testimonials.map((item) => {
    const client = getClient(item.client)
    return client ? { src: TESTIMONIAL_LOGO[client.id] ?? clientLogo(client.id), alt: clientName(client, english) } : null
  })
  const situationHref: Record<string, string> = {
    supplyChain: `/${locale}/sustainability#services-supply-chain`,
    contact: `/${locale}/consulting#contact`,
    solutions: `/${locale}/consulting#solutions`,
  }

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
            <p className="mt-6 max-w-xl text-lg font-bold leading-relaxed text-ink/85">
              {h.hero.lead}
              {english ? " " : ""}
              {h.hero.subTitle}
            </p>
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

      {/* S2 ── Logo wall: 服務客戶 and 合作夥伴 (rev2 #12) */}
      <section aria-labelledby="partners-heading" className="border-y border-border bg-card py-16 md:py-20">
        <Container>
          <h2 id="partners-heading" className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">
            {h.partners.label}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
            {h.partners.groups.map((g) => {
              const group = g.key as ClientGroup
              const logos = clientsIn(group)
              return (
                <div key={g.key} className="rounded-2xl bg-paper p-6">
                  <h3 className="flex items-baseline gap-2 text-lg font-black text-ink">
                    {g.title}
                    <span className="font-display text-sm font-bold text-muted-foreground tabular-nums">{logos.length}</span>
                  </h3>
                  <ul className={cn("mt-4 grid grid-flow-dense gap-2 border-t border-border pt-4", LOGO_GRID[group])}>
                    {logos.map((c) => (
                      <li key={c.id} className={cn(c.wide && "col-span-2")}>
                        <ClientLogo client={c} english={english} className="h-16" />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Seam 2 · quiet: both sections are low volume */}

      {/* S3 ── Problem: three questions and one answer close into a disc */}
      <section id="problem" className="pb-28 pt-20 md:pb-36 md:pt-28">
        <Container>
          <SectionHeader kicker={h.problem.label} title={h.problem.title} />
          <div className="mt-12">
            <ProblemMosaic
              english={english}
              situations={h.problem.situations.map((s) => ({ ...s, href: situationHref[s.link] }))}
              solution={{
                label: h.problem.solutionLabel,
                title: h.problem.solutionTitle,
                claim: h.problem.solutionClaim,
                description: h.problem.solutionDescription,
                tagline: h.problem.solutionTagline,
                services: h.problem.services.map((sv) => ({ label: sv.label, href: `/${locale}/sustainability#${sv.anchor}` })),
              }}
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
              <p lang="tay" className="font-display text-7xl font-bold leading-none text-brand-yellow sm:text-8xl">
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
                  — {h.story.founderName}{english ? ", " : "，"}{h.story.founderTitle}
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

      {/* S5 ── Evidence */}
      <section id="evidence" className="relative bg-card py-20 md:py-28">
        <Container>
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
                    <h3 className="text-lg font-black text-ink">{card.title}</h3>
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
            <Link href={`/${locale}/events#history`} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-link">
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
          {/* One dome cut into four doors on wide screens; smaller screens give each door its own arch */}
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:rounded-b-3xl lg:rounded-t-[50%_9rem]">
            {audiences.map((a, i) => {
              const d = doors[a.key]
              return (
                <li key={a.key}>
                  <Link
                    href={d.href}
                    className={cn(
                      "group flex h-full flex-col rounded-t-[50%_4.5rem] rounded-b-2xl px-7 pb-8 pt-16 transition-[filter] hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ink/40 lg:rounded-none lg:px-6 lg:pb-10",
                      i === 1 || i === 2 ? "lg:pt-24" : "lg:pt-32",
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
              <Link href={`/${locale}/events#roadmap`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-link">
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
      {/* Fixed anchor #testimonials: the navbar's 客戶回饋 / Testimonials item leads here (rev2 #22) */}
      <section id="testimonials" className="scroll-mt-24 py-20 md:py-28">
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
        secondary={{ label: h.cta.secondaryLabel, ...contactFor(locale, "follow") }}
      />

      {/* S9 ── The book (rev2 #24) */}
      <section id="book" aria-labelledby="book-heading" className="border-t border-border bg-card py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14 lg:grid-cols-[minmax(0,17rem)_1fr]">
          <Image
            src="/books/sustainability-new-language.webp"
            alt={h.book.coverAlt}
            width={700}
            height={1000}
            sizes="(min-width: 768px) 272px, 60vw"
            className="mx-auto h-auto w-3/5 max-w-[17rem] rounded-md shadow-[0_24px_48px_-24px_rgba(31,32,34,0.45)] md:w-full"
          />
          <div>
            <h2 id="book-heading" className={cn("text-2xl font-black leading-snug text-ink sm:text-3xl", english && "italic")}>
              {h.book.title}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {h.book.meta.map((m, i) => (
                <li key={m} className="flex gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-border">
                      |
                    </span>
                  )}
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-bold leading-[1.7] text-ink sm:text-xl">{h.book.tagline}</p>
            <p className="mt-4 max-w-2xl text-base leading-[1.9] text-muted-foreground">{h.book.description}</p>
            <Button size="lg" asChild className="mt-8">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer">
                {h.book.cta}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only">{t.footer.newWindow}</span>
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
