import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { CtaBand } from "@/components/site/CtaBand"
import { EcosystemHub } from "@/components/site/EcosystemHub"
import { ArchSeam } from "@/components/geo/shapes"
import { FoldList, ReadMore } from "@/components/ux/Fold"
import { Tabs } from "@/components/ux/Tabs"
import { HeroArch } from "@/components/sustainability/HeroArch"
import { ValuesArch } from "@/components/sustainability/ValuesArch"
import { IooiSpan } from "@/components/sustainability/IooiSpan"
import { DualBenefitArch } from "@/components/sustainability/DualBenefitArch"
import { Credentials } from "@/components/sustainability/Credentials"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { formatImpactMetric, cn } from "@/lib/utils"
import { consultants } from "@/data/team"
import { clientsIn } from "@/data/clients"
import { pageChapters } from "@/lib/chapters"
import { alternatesFor } from "@/lib/seo"

const SILVERLINING_URL = "https://www.silverliningesg.com/"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.sustainability.meta.title, description: t.sustainability.meta.description, alternates: alternatesFor(locale, "/sustainability") }
}

const KICKER = "kicker-rule text-[13px] font-bold tracking-[0.12em]"
const METRIC_RULES = ["border-brand-orange", "border-brand-yellow", "border-[#8A8E97]"]

// /sustainability: the bridge taken apart to show why it stands
// (docs/redesign/pages-v2/sustainability/). One arch state per section —
// pier (people) → springing (beliefs) → voussoirs (method) → keystone (theory,
// the one dark section) → doors (services) → deck (results) → ring (ecosystem).
// Seams are numbered as in 01-page-plan.md §7.
export default async function SustainabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const s = t.sustainability
  const english = locale === "en"

  return (
    <div className="overflow-x-clip">
      {/* ── Hero: the whole arch, stone by stone ── */}
      <section>
        <Container className="grid items-center gap-10 pb-14 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-20">
          <div>
            <p className={cn(KICKER, "text-primary")}>{s.hero.kicker}</p>
            <h1 className="mt-6 text-4xl font-black leading-[1.25] text-ink sm:text-5xl lg:text-[3.25rem]">
              {/* The last keyword takes its own line, so no divider is left hanging at a line end */}
              {s.hero.titleParts.map((part, i) => {
                const last = i === s.hero.titleParts.length - 1
                return (
                  <span key={part} className={last ? "block text-primary" : "inline-block"}>
                    {i > 0 && !last && (
                      <span aria-hidden="true" className="mx-2.5 font-normal text-ink/20 sm:mx-4">
                        {english ? "|" : "｜"}
                      </span>
                    )}
                    {part}
                  </span>
                )
              })}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-bold leading-[1.8] text-ink/85">{s.hero.subtitle}</p>
            <ReadMore label={s.hero.more} className="mt-1 max-w-xl">
              <p>{s.hero.description}</p>
            </ReadMore>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={`/${locale}/consulting#contact`}>
                  {s.hero.primaryCta}
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#approach">
                  {s.hero.secondaryCta}
                  <ArrowDown />
                </a>
              </Button>
            </div>
          </div>
          <HeroArch labels={s.hero.map} />
        </Container>
      </section>

      {/* Seam 1 · quiet: the chapter pills are the boundary */}
      <ChapterNav chapters={pageChapters(s.chapters)} label={s.toc.title} />

      {/* ── 1 Who we are: the pier. Header first in the DOM so the kicker leads on phones. ── */}
      <section id="who-we-are" className="bg-card pb-20 pt-16 md:pb-24 md:pt-20">
        <Container className="grid gap-x-16 gap-y-8 lg:grid-cols-[300px_1fr] lg:grid-rows-[auto_1fr]">
          <SectionHeader kicker={s.whoWeAre.label} title={s.whoWeAre.title} className="lg:col-start-2" />
          <figure className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="flex items-end gap-7 lg:block">
              {/* The founder in an arch-topped doorway. rev2 #26: the photo is a square
                  head-and-shoulders shot with the face left of centre and the hair close
                  to the top edge, so the frame is 4:5 anchored top-left (face centred) and
                  the arch is elliptical (50% / 30%) so its curve clears the head. */}
              <div className="relative w-32 shrink-0 sm:w-40 lg:w-[220px]">
                <Image
                  src="/team/consultant-01.jpg"
                  alt={t.home.story.founderName}
                  width={300}
                  height={300}
                  sizes="(min-width: 1024px) 220px, 160px"
                  className="relative aspect-[4/5] w-full rounded-t-[50%_30%] object-cover object-left-top"
                />
              </div>
              <figcaption className="lg:mt-9">
                <p className="text-lg font-black text-ink">{t.home.story.founderName}</p>
                <p className="text-sm text-muted-foreground">{t.home.story.founderTitle}</p>
              </figcaption>
            </div>
            <dl className="mt-8 flex gap-8">
              {s.whoWeAre.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-3xl font-bold text-ink tabular-nums">{f.value}</dd>
                  <dd className="text-xs text-muted-foreground">{f.label}</dd>
                </div>
              ))}
            </dl>
          </figure>
          <div className="lg:col-start-2">
            <p className="max-w-[60ch] text-base leading-[1.9] text-ink/85 sm:text-[17px]">{s.whoWeAre.lead}</p>
            <ReadMore label={s.whoWeAre.readMore} className="mt-1 max-w-[68ch]">
              {s.whoWeAre.paragraphs.map((p, i) => (
                <p key={p.slice(0, 12)}>
                  {p}
                  {/* Rev2 section 3, partner #9: the founder's current advisory role */}
                  {i === 0 && (
                    <>
                      {english ? " " : ""}
                      {s.whoWeAre.affiliation.before}
                      <a href={SILVERLINING_URL} target="_blank" rel="noopener noreferrer" className="text-link font-bold">
                        {s.whoWeAre.affiliation.link}
                      </a>
                      {s.whoWeAre.affiliation.after}
                    </>
                  )}
                </p>
              ))}
            </ReadMore>
            {/* Credentials (rev2 #27): six stones of the pier, each opening its certificate */}
            <h3 className="mt-6 text-sm font-bold text-muted-foreground">{s.whoWeAre.credentialsTitle}</h3>
            <Credentials
              items={s.whoWeAre.credentials}
              openLabel={s.whoWeAre.credentialOpen}
              closeLabel={s.whoWeAre.credentialClose}
              className="mt-3 max-w-2xl"
            />
          </div>
        </Container>
      </section>

      {/* ── 2 Vision & mission, with the five values as the stones of an arch ── */}
      <section id="vision" className="bg-sand pb-20 pt-16 md:pb-24 md:pt-20">
        <Container>
          <p className={cn(KICKER, "text-primary")}>{s.vision.label}</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="flex items-baseline gap-3 text-base font-bold text-ink">
                {!english && (
                  <span aria-hidden="true" className="font-display text-xs tracking-[0.25em] text-primary">
                    VISION
                  </span>
                )}
                {s.vision.visionLabel}
              </h2>
              <p className="mt-4 text-2xl font-black leading-[1.6] text-ink sm:text-[1.75rem]">{s.vision.visionText}</p>
            </div>
            <div>
              <h2 className="flex items-baseline gap-3 text-base font-bold text-ink">
                {!english && (
                  <span aria-hidden="true" className="font-display text-xs tracking-[0.25em] text-primary">
                    MISSION
                  </span>
                )}
                {s.vision.missionLabel}
              </h2>
              <p className="mt-4 text-base font-bold leading-[1.9] text-ink/90 sm:text-lg">{s.vision.missionText}</p>
            </div>
          </div>

          {/* Sub-anchor kept for old #values links */}
          <div id="values" className="mt-16 scroll-mt-[8.5rem] md:mt-20">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[13px] font-bold tracking-[0.12em] text-primary">{s.values.label}</p>
              <h3 className="text-xl font-black leading-[1.4] text-ink sm:text-2xl">{s.values.title}</h3>
            </div>
            <ValuesArch items={s.values.items} label={s.values.label} className="mt-10" />
          </div>
        </Container>
      </section>

      {/* Seam 3 · quiet: sand → paper, the separate stones become one span */}

      {/* ── 3 Approach: the span built in four pieces, standing on three piers ── */}
      <section id="approach" className="pb-28 pt-16 md:pb-36 md:pt-20">
        <Container>
          <SectionHeader kicker={s.approach.label} title={s.approach.title} description={s.approach.intro} />
          <IooiSpan steps={s.approach.steps} caption={s.approach.caption} className="mt-8" />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h3 className="text-base font-bold text-ink">{s.approach.pillarsIntro}</h3>
              <FoldList
                name="pillars"
                className="mt-4"
                items={s.approach.pillars.map((p) => ({
                  meta: p.number,
                  title: p.title,
                  content: (
                    <>
                      <p>{p.description}</p>
                      {/* rev2 #30: the services under this pillar, linked to their tabs */}
                      <p className="mt-2 font-bold text-ink">
                        {p.related.label}
                        {english ? ": " : "："}
                        {p.related.items.map((r, i) => (
                          <span key={r.name}>
                            {i > 0 && (english ? ", " : "、")}
                            {r.href ? (
                              <a href={r.href} className="text-link">
                                {r.name}
                              </a>
                            ) : (
                              r.name
                            )}
                          </span>
                        ))}
                      </p>
                    </>
                  ),
                }))}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-[0.12em] text-muted-foreground">{s.sdgs.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.sdgs.items.map((g) => (
                  <li key={g.code} className="flex h-9 items-center rounded-lg bg-ink px-3 font-display text-sm font-bold text-brand-yellow tabular-nums">
                    {g.code}
                  </li>
                ))}
              </ul>
              <ReadMore label={s.sdgs.title} className="mt-2">
                <ul className="space-y-4">
                  {s.sdgs.items.map((g) => (
                    <li key={g.code}>
                      <strong className="block font-bold text-ink">
                        SDG {g.code}　{g.name}
                      </strong>
                      {g.description}
                    </li>
                  ))}
                </ul>
              </ReadMore>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4 Our difference + dual-benefit theory: the keystone, the page's one dark section.
             Seam 4 is its arched top edge. ── */}
      <section id="difference" className="relative bg-surface-dark text-white">
        <ArchSeam className="translate-y-px bg-surface-dark" />
        <Container className="relative pb-20 pt-6 md:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeader tone="dark" kicker={s.difference.label} title={s.difference.title} description={s.difference.intro} />
              <FoldList
                tone="dark"
                name="capabilities"
                className="mt-8"
                items={s.difference.items.map((d) => ({ title: d.title, content: d.description }))}
              />
              <p className="mt-6 text-base font-bold leading-[1.85] text-white">{s.difference.closing}</p>
            </div>
            {/* rev2 #29: the Dual-Impact Leverage Model, as in chapter 2 of the book.
                Sub-anchor kept for old #theory links. */}
            <div id="theory" className="scroll-mt-[8.5rem]">
              <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl font-black leading-[1.4] sm:text-[1.75rem]">
                {s.theory.title}
                {s.theory.nameEn && <span className="font-display text-sm font-bold text-white/65 sm:text-base">{s.theory.nameEn}</span>}
              </h3>
              <p className="mt-3 text-lg font-black leading-[1.6] text-brand-yellow sm:text-xl">{s.theory.slogan}</p>
              <DualBenefitArch labels={s.theory.diagram} className="mt-7" />
              {/* Folded: the first two sentences only; the rest and the source open below */}
              <p className="mt-7 text-sm leading-[1.9] text-white/80 sm:text-base">{s.theory.lead}</p>
              <ReadMore tone="dark" label={s.theory.readMore} className="mt-1" contentClassName="sm:text-base">
                {s.theory.paragraphs.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
                <p className="text-right text-xs text-white/60 sm:text-sm">
                  {s.theory.source.before}
                  <cite className={english ? "italic" : "not-italic"}>{s.theory.source.book}</cite>
                  {s.theory.source.after}
                </p>
              </ReadMore>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5 Services: one arch-topped door, four tabs ── */}
      <section id="services" className="bg-card pb-28 pt-16 md:pb-36 md:pt-20">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeader kicker={s.services.label} title={s.services.title} description={s.services.description} />
            {/* rev2 #30: prices live only in the solutions table on /consulting */}
            <Button className="shrink-0" asChild>
              <Link href={`/${locale}/consulting#solutions`}>
                {s.services.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          {/* Each tab has a fixed anchor (#services-whitepaper, -course, -workshop,
              -supply-chain): opening the page at one selects that tab. */}
          <Tabs
            className="mt-8"
            label={s.services.label}
            items={s.services.items.map((item) => ({
              id: item.id,
              anchor: `services-${item.id}`,
              label: (
                <>
                  {item.title}
                  {item.highlight && <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-[11px] text-ink">{item.highlight}</span>}
                </>
              ),
              content: (
                <div className="rounded-t-[clamp(4rem,16vw,9rem)] bg-paper px-6 pb-9 pt-14 text-center sm:px-16 sm:pt-20">
                  <span className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">{item.tag}</span>
                  <h3 className="mt-4 text-xl font-black text-ink sm:text-2xl">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-xl text-base leading-[1.85] text-muted-foreground">{item.description}</p>
                </div>
              ),
            }))}
          />
        </Container>
      </section>

      {/* ── 6 Results: before → after joined by a low arch. Seam 6 is the arched top edge. ── */}
      <section id="impact" className="relative bg-sand pb-20 md:pb-24">
        <ArchSeam className="translate-y-px bg-sand" />
        <Container className="relative pt-4">
          {/* rev2 #31: the label is tagged as a white paper case */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className={cn(KICKER, "text-primary")}>{s.proof.label}</p>
            <span className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">{s.proof.tag}</span>
          </div>
          <h2 className="mt-4 max-w-4xl text-2xl font-black leading-[1.5] text-ink sm:text-[2rem]">{s.proof.title}</h2>
          <p className="mt-4 text-base leading-[1.85] text-muted-foreground sm:text-lg">{s.proof.lead}</p>

          <div className="mt-8">
            <svg viewBox="0 0 800 96" fill="none" className="block h-auto w-full" aria-hidden="true">
              <path d="M170 90 C 290 -16, 510 -16, 630 90" stroke="#E8532A" strokeWidth="14" strokeLinecap="round" />
              <circle cx="170" cy="86" r="10" fill="#8A8E97" />
              <circle cx="630" cy="86" r="10" fill="#E8532A" />
            </svg>
            <div className="-mt-1 grid grid-cols-2 gap-3 md:gap-[22%]">
              <p className="rounded-b-2xl border-t-[5px] border-[#8A8E97] bg-card p-4 text-sm leading-[1.75] text-muted-foreground sm:p-5 sm:text-base">{s.proof.before}</p>
              <p className="rounded-b-2xl border-t-[5px] border-brand-orange bg-card p-4 text-sm font-bold leading-[1.75] text-ink sm:p-5 sm:text-base">{s.proof.after}</p>
            </div>
            <Button className="mt-6" asChild>
              <Link href={`/${locale}/events/impact-whitepaper#cases`}>
                {s.proof.casesCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* rev2 #31: the cumulative figures are the company's, not ModuLab's */}
          <h3 className="mt-14 border-t border-ink/10 pt-8 text-xl font-black text-ink sm:text-2xl">{s.proof.totalsTitle}</h3>
          <Tabs
            className="mt-5"
            label={s.proof.totalsTitle}
            items={[
              {
                id: "quant",
                label: s.proof.quantTitle,
                content: (
                  <>
                    <dl className="grid grid-cols-3 gap-3 sm:gap-6">
                      {t.impact.metrics.map((m, i) => (
                        <div key={m.label} className={cn("flex flex-col-reverse justify-end border-t-[5px] pt-3", METRIC_RULES[i % METRIC_RULES.length])}>
                          <dt className="mt-1 text-xs font-bold leading-snug text-ink sm:text-sm">
                            {m.label}
                            <sup className="ml-0.5 text-muted-foreground">{i + 1}</sup>
                          </dt>
                          <dd className="font-display text-2xl font-bold text-ink tabular-nums sm:text-5xl">{formatImpactMetric(m)}</dd>
                        </div>
                      ))}
                    </dl>
                    <ReadMore label={s.proof.notesLabel} className="mt-3">
                      <ol className="list-decimal space-y-1 pl-5">
                        {t.impact.metrics.map((m) => (
                          <li key={m.label}>{m.note}</li>
                        ))}
                      </ol>
                    </ReadMore>
                  </>
                ),
              },
              {
                id: "qual",
                label: s.proof.qualTitle,
                content: (
                  <ul className="grid gap-3 md:grid-cols-3">
                    {s.proof.qualItems.map((q) => (
                      <li key={q.title} className="rounded-2xl bg-card p-5">
                        <h4 className="text-lg font-black text-ink">{q.title}</h4>
                        <p className="mt-2 text-sm leading-[1.8] text-muted-foreground">{q.description}</p>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </Container>
      </section>

      {/* ── 7 Ecosystem: the arch closes into a ring ── */}
      <section id="ecosystem" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={s.ecosystem.label} title={s.ecosystem.title} description={s.ecosystem.description} align="center" />
          <div className="mt-12">
            <EcosystemHub
              roles={s.ecosystem.roles}
              centerLabel={s.ecosystem.center}
              partners={clientsIn("ecosystem")}
              partnersTitle={s.ecosystem.partnersTitle}
              network={s.ecosystem.network}
              consultants={consultants}
              consultantsTitle={s.ecosystem.consultantsTitle}
              expertiseLabel={s.ecosystem.expertiseLabel}
              english={english}
            />
          </div>
        </Container>
      </section>

      {/* Seam 8 · the shared closing band: a small arch closes over the flame */}
      <CtaBand
        title={s.cta.title}
        description={s.cta.description}
        primary={{ label: s.cta.primaryLabel, href: `/${locale}/consulting#contact` }}
        secondary={{ label: s.cta.secondaryLabel, href: `/${locale}/events#history` }}
      />
    </div>
  )
}
