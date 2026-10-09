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
import { ArchSeam, Block, Disc, Half, Quarter, Seam } from "@/components/geo/shapes"
import { FoldList, ReadMore } from "@/components/ux/Fold"
import { Tabs } from "@/components/ux/Tabs"
import { HeroArch } from "@/components/sustainability/HeroArch"
import { ValuesArch } from "@/components/sustainability/ValuesArch"
import { IooiSpan } from "@/components/sustainability/IooiSpan"
import { DualBenefitArch } from "@/components/sustainability/DualBenefitArch"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { formatImpactMetric, cn } from "@/lib/utils"
import { consultants } from "@/data/team"
import { pageChapters } from "@/lib/chapters"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.sustainability.meta.title, description: t.sustainability.meta.description }
}

const KICKER = "kicker-rule text-[13px] font-bold tracking-[0.12em]"
const METRIC_RULES = ["border-brand-orange", "border-brand-yellow", "border-[#8A8E97]"]
// Issue → system → business model grows like the roadmap: quarter → half → disc.
const LAYER_SHAPES = [
  <Quarter key="q" className="size-5 bg-brand-yellow" />,
  <Half key="h" className="h-2.5 w-5 bg-brand-yellow" />,
  <Disc key="d" className="size-5 bg-brand-yellow" />,
]

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
                        ｜
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
              {/* The founder in an arch-topped doorway, standing on a block */}
              <div className="relative w-32 shrink-0 sm:w-40 lg:w-[220px]">
                <Block className="absolute -bottom-3 -right-3 size-14 bg-brand-yellow lg:-bottom-[18px] lg:-right-[18px] lg:size-20" />
                <Image
                  src="/team/consultant-01.jpg"
                  alt={t.home.story.founderName}
                  width={300}
                  height={300}
                  className="relative aspect-[3/4] w-full rounded-t-full object-cover"
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
              {s.whoWeAre.paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </ReadMore>
            {/* Credentials: the four foundation stones of the pier */}
            <h3 className="mt-6 text-sm font-bold text-muted-foreground">{s.whoWeAre.credentialsTitle}</h3>
            <ul className="mt-3 grid max-w-xl grid-cols-2 gap-[3px]">
              {s.whoWeAre.credentials.map((c, i) => (
                <li key={c} className={cn("flex min-h-13 items-center px-4 py-2 text-sm font-bold leading-snug text-[#A8321A]", i % 3 === 0 ? "bg-[#FBE0D8]" : "bg-orange-soft")}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Seam 2 · shape relay: the pier's top stone becomes the first voussoir */}
      <Seam className="mx-auto max-w-[1120px] px-6 md:px-8">
        <Block className="size-7 bg-brand-orange sm:size-11" />
      </Seam>

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
          <IooiSpan steps={s.approach.steps} className="mt-8" />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h3 className="text-base font-bold text-ink">{s.approach.pillarsIntro}</h3>
              <FoldList
                name="pillars"
                className="mt-4"
                items={s.approach.pillars.map((p) => ({ meta: p.number, title: p.title, content: p.description }))}
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
        <Container className="relative pt-6">
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
            {/* Sub-anchor kept for old #theory links */}
            <div id="theory" className="scroll-mt-[8.5rem]">
              <p className="text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{s.theory.label}</p>
              <h3 className="mt-3 text-2xl font-black leading-[1.5] sm:text-[1.75rem]">{s.theory.title}</h3>
              <DualBenefitArch labels={s.theory.diagram} className="mt-7" />
              <ReadMore tone="dark" label={s.theory.readMore} className="mt-3">
                {s.theory.paragraphs.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </ReadMore>
              <p className="mt-4 text-sm font-bold leading-[1.8] text-white">{s.theory.layersIntro}</p>
              <FoldList
                tone="dark"
                name="layers"
                className="mt-4"
                items={s.theory.layers.map((layer, i) => ({ meta: LAYER_SHAPES[i], title: layer.name, content: layer.description }))}
              />
            </div>
          </div>
          {/* Seam 5 · overlap: the theory's conclusion straddles into the services section */}
          <p className="relative z-10 mt-10 max-w-2xl translate-y-1/2 rounded-bl-[2rem] rounded-tr-[2rem] bg-brand-yellow px-6 py-5 text-base font-black leading-[1.7] text-ink sm:px-8 sm:py-6 sm:text-lg">
            {s.theory.closing}
          </p>
        </Container>
      </section>

      {/* ── 5 Services: one arch-topped door, four tabs ── */}
      <section id="services" className="bg-card pb-28 pt-28 md:pb-36 md:pt-32">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeader kicker={s.services.label} title={s.services.title} description={s.services.description} />
            <Link
              href={`/${locale}/consulting#solutions`}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              {s.services.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <Tabs
            className="mt-8"
            label={s.services.label}
            items={s.services.items.map((item, i) => ({
              id: `service-${i}`,
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
          <p className={cn(KICKER, "text-primary")}>{s.proof.label}</p>
          <h2 className="mt-4 max-w-4xl text-2xl font-black leading-[1.5] text-ink sm:text-[2rem]">{s.proof.title}</h2>
          <p className="mt-4 text-base leading-[1.85] text-muted-foreground sm:text-lg">{s.proof.lead}</p>

          <div className="mt-8">
            <svg viewBox="0 0 800 96" fill="none" className="block h-auto w-full" aria-hidden="true">
              <path d="M170 90 C 290 -16, 510 -16, 630 90" stroke="#F25232" strokeWidth="14" strokeLinecap="round" />
              <circle cx="170" cy="86" r="10" fill="#8A8E97" />
              <circle cx="630" cy="86" r="10" fill="#F25232" />
            </svg>
            <div className="-mt-1 grid grid-cols-2 gap-3 md:gap-[22%]">
              <p className="rounded-b-2xl border-t-[5px] border-[#8A8E97] bg-card p-4 text-sm leading-[1.75] text-muted-foreground sm:p-5 sm:text-base">{s.proof.before}</p>
              <p className="rounded-b-2xl border-t-[5px] border-brand-orange bg-card p-4 text-sm font-bold leading-[1.75] text-ink sm:p-5 sm:text-base">{s.proof.after}</p>
            </div>
          </div>

          <Tabs
            className="mt-12"
            label={s.proof.label}
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
                        <h3 className="text-lg font-black text-ink">{q.title}</h3>
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

      {/* Seam 7 · shape relay: the arch's orange end lands on the boundary and grows into the ring */}
      <Seam className="mx-auto flex max-w-[1120px] justify-end px-6 md:px-8">
        <Disc className="size-6 sm:size-9" />
      </Seam>

      {/* ── 7 Ecosystem: the arch closes into a ring ── */}
      <section id="ecosystem" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={s.ecosystem.label} title={s.ecosystem.title} description={s.ecosystem.description} align="center" />
          <div className="mt-12">
            <EcosystemHub roles={s.ecosystem.roles} centerLabel={s.ecosystem.center} consultants={consultants} consultantsTitle={s.ecosystem.consultantsTitle} english={english} />
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
