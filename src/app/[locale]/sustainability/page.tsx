import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowDown, Check, Quote } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { BridgeArc } from "@/components/site/BridgeArc"
import { CtaBand } from "@/components/site/CtaBand"
import { EcosystemHub } from "@/components/site/EcosystemHub"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { formatImpactMetric } from "@/lib/utils"
import { consultants } from "@/data/team"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.sustainability.meta.title, description: t.sustainability.meta.description }
}

// IOOI steps get progressively "warmer" surfaces, ending on the dark impact card.
const IOOI_STYLES = [
  "bg-card border border-border text-ink",
  "bg-yellow-soft text-ink",
  "bg-orange-soft text-ink",
  "bg-surface-dark text-white",
]

export default async function SustainabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const s = t.sustainability
  const nav = t.nav.sustainability

  const chapters = [
    { id: "who-we-are", label: nav.whoWeAre },
    { id: "approach", label: nav.approach },
    { id: "theory", label: nav.theory },
    { id: "services", label: nav.services },
    { id: "impact", label: nav.practices },
    { id: "ecosystem", label: nav.ecosystem },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-surface-dark text-white">
        <BridgeArc tone="dark" className="pointer-events-none absolute -right-20 bottom-0 w-[760px] max-w-none opacity-30" />
        <Container className="relative py-20 md:py-28">
          <p className="kicker-rule mb-6 text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{s.hero.kicker}</p>
          <h1 className="text-[2.5rem] font-black leading-[1.15] sm:text-6xl lg:text-7xl">
            {s.hero.titleParts.map((part, i) => (
              <span key={part} className="inline-block">
                <span className={cn(i === s.hero.titleParts.length - 1 && "text-brand-orange")}>{part}</span>
                {i < s.hero.titleParts.length - 1 && <span aria-hidden="true" className="mx-3 text-white/30 sm:mx-5">｜</span>}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-medium leading-[1.8] text-white sm:text-xl">{s.hero.subtitle}</p>
          <p className="mt-4 max-w-2xl text-base leading-[1.9] text-white/70">{s.hero.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={`/${locale}/consulting#contact`}>
                {s.hero.primaryCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outlineInverse" asChild>
              <a href="#approach">
                {s.hero.secondaryCta}
                <ArrowDown />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <ChapterNav chapters={chapters} label={s.toc.title} />

      {/* ── Chapter 1: who we are → vision & mission → values ── */}
      <section id="who-we-are" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
            <figure className="flex flex-col items-start gap-5">
              <div className="relative">
                <Image
                  src="/team/consultant-01.jpg"
                  alt={t.home.story.founderName}
                  width={300}
                  height={300}
                  className="size-40 rounded-3xl object-cover sm:size-48"
                />
                <span aria-hidden="true" className="absolute -bottom-3 -right-3 size-12 rounded-2xl bg-brand-yellow" />
              </div>
              <figcaption>
                <p className="text-lg font-black text-ink">{t.home.story.founderName}</p>
                <p className="text-sm text-muted-foreground">{t.home.story.founderTitle}</p>
              </figcaption>
              <dl className="flex gap-8 border-t border-border pt-5">
                {s.whoWeAre.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-display text-3xl font-bold text-ink tabular-nums">{f.value}</dd>
                    <dd className="text-xs text-muted-foreground">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </figure>
            <div>
              <SectionHeader kicker={s.whoWeAre.label} title={s.whoWeAre.title} />
              <div className="mt-6 max-w-[68ch] space-y-5 text-base leading-[1.95] text-ink/85 sm:text-[17px]">
                {s.whoWeAre.paragraphs.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </div>
              <h3 className="mt-8 text-sm font-bold text-muted-foreground">{s.whoWeAre.credentialsTitle}</h3>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {s.whoWeAre.credentials.map((c) => (
                  <li key={c} className="flex items-center gap-2 rounded-full border border-primary/25 bg-orange-soft px-4 py-2 text-sm font-bold text-[#A8321A]">
                    <Check className="size-4" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="vision" className="bg-sand py-20 md:py-24">
        <Container>
          <p className="kicker-rule mb-8 text-[13px] font-bold tracking-[0.12em] text-primary">{s.vision.label}</p>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-primary p-8 text-white sm:p-10">
              <p className="font-display text-xs font-bold tracking-[0.25em] text-white/80">VISION</p>
              <h2 className="mt-2 text-lg font-bold text-white/90">{s.vision.visionLabel}</h2>
              <p className="mt-5 text-2xl font-black leading-[1.55] sm:text-[1.75rem]">{s.vision.visionText}</p>
            </div>
            <div className="rounded-3xl bg-surface-dark p-8 text-white sm:p-10">
              <p className="font-display text-xs font-bold tracking-[0.25em] text-brand-yellow">MISSION</p>
              <h2 className="mt-2 text-lg font-bold text-white/90">{s.vision.missionLabel}</h2>
              <p className="mt-5 text-lg font-bold leading-[1.8] sm:text-xl">{s.vision.missionText}</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="values" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={s.values.label} title={s.values.title} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {s.values.items.map((v, i) => (
              <li key={v.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <span className="font-display text-sm font-bold text-primary tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-2xl font-black text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Chapter 2: approach (IOOI + pillars) → SDGs → difference ── */}
      <section id="approach" className="border-t border-border bg-card py-20 md:py-28">
        <Container>
          <SectionHeader kicker={s.approach.label} title={s.approach.title} description={s.approach.intro} />
          <ol className="mt-12 grid gap-3 md:grid-cols-4">
            {s.approach.steps.map((step, i) => (
              <li key={step.en} className={cn("relative flex flex-col rounded-2xl p-6", IOOI_STYLES[i])} style={{ minHeight: `${11 + i * 1.5}rem` }}>
                <span className={cn("font-display text-sm font-bold", i === 3 ? "text-brand-yellow" : "text-primary")}>
                  STEP {i + 1}
                </span>
                <span className="mt-auto pt-6 text-2xl font-black">{step.zh}</span>
                {step.en !== step.zh && (
                  <span className={cn("font-display text-sm font-bold tracking-wide", i === 3 ? "text-white/70" : "text-muted-foreground")}>{step.en}</span>
                )}
                <span className={cn("mt-3 text-sm leading-relaxed", i === 3 ? "text-white/80" : "text-ink/75")}>{step.description}</span>
                {i < 3 && (
                  <ArrowRight aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-card p-1 text-primary shadow md:block" />
                )}
              </li>
            ))}
          </ol>

          <p className="mt-14 text-base font-bold text-ink">{s.approach.pillarsIntro}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {s.approach.pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border-t-4 border-brand-orange bg-paper p-6">
                <p className="text-xs font-bold tracking-[0.15em] text-primary">{p.number}</p>
                <h3 className="mt-2 text-xl font-black text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="sdgs" className="bg-card pb-20 md:pb-28">
        <Container>
          <div className="rounded-3xl bg-paper p-6 sm:p-10">
            <SectionHeader kicker={s.sdgs.label} title={s.sdgs.title} size="md" />
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {s.sdgs.items.map((g) => (
                <li key={g.code} className="flex gap-4 rounded-2xl bg-card p-5">
                  <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-ink text-white">
                    <span className="font-display text-[10px] font-bold tracking-widest text-white/70">SDG</span>
                    <span className="font-display text-xl font-bold leading-none text-brand-yellow">{g.code}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-ink">{g.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="difference" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={s.difference.label} title={s.difference.title} description={s.difference.intro} />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {s.difference.items.map((d, i) => (
              <li key={d.title} className="bg-card p-6 sm:p-8">
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-black text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-2xl bg-surface-dark px-6 py-5 text-base font-bold leading-relaxed text-white sm:text-lg">{s.difference.closing}</p>
        </Container>
      </section>

      {/* ── Chapter 3: dual-benefit theory ── */}
      <section id="theory" className="bg-sand py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <SectionHeader kicker={s.theory.label} title={s.theory.title} />
              <div className="mt-6 max-w-[68ch] space-y-5 text-base leading-[1.95] text-ink/85">
                {s.theory.paragraphs.map((p) => (
                  <p key={p.slice(0, 12)}>{p}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-ink">{s.theory.layersIntro}</p>
              <ol className="mt-5 flex flex-col gap-3">
                {s.theory.layers.map((layer, i) => (
                  <li key={layer.name} className="flex gap-4 rounded-2xl bg-card p-5 shadow-[0_1px_0_rgba(31,32,34,0.05)]" style={{ marginLeft: `${i * 1.25}rem` }}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-lg font-black text-white">{layer.name}</span>
                    <p className="text-sm leading-[1.85] text-ink/80">{layer.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-12 border-l-4 border-brand-orange bg-card px-6 py-5 text-lg font-bold leading-relaxed text-ink">{s.theory.closing}</p>
        </Container>
      </section>

      {/* ── Chapter 4: services ── */}
      <section id="services" className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader kicker={s.services.label} title={s.services.title} description={s.services.description} />
            <Button variant="outline" asChild className="shrink-0">
              <Link href={`/${locale}/consulting#solutions`}>
                {s.services.cta}
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.services.items.map((item) => {
              const featured = Boolean(item.highlight)
              return (
                <div key={item.title} className={cn("relative flex flex-col rounded-2xl p-6", featured ? "bg-surface-dark text-white" : "border border-border bg-card")}>
                  <div className="flex items-center justify-between">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", featured ? "bg-white/10 text-white" : "bg-sand text-ink")}>{item.tag}</span>
                    {featured && <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-bold text-ink">{item.highlight}</span>}
                  </div>
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className={cn("mt-3 text-sm leading-[1.85]", featured ? "text-white/75" : "text-muted-foreground")}>{item.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Chapter 5: impact (story → quantitative → qualitative) ── */}
      <section id="impact" className="bg-surface-dark py-20 text-white md:py-28">
        <Container>
          <p className="kicker-rule mb-5 text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{s.proof.label}</p>
          <h2 className="max-w-4xl text-2xl font-black leading-[1.45] sm:text-[2rem]">{s.proof.title}</h2>
          <p className="mt-4 text-white/70">{s.proof.lead}</p>
          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <p className="rounded-2xl border border-white/15 p-6 text-base leading-[1.85] text-white/80">{s.proof.before}</p>
            <ArrowRight aria-hidden="true" className="mx-auto size-6 rotate-90 self-center text-brand-orange md:rotate-0" />
            <p className="rounded-2xl bg-white p-6 text-base font-bold leading-[1.85] text-ink">{s.proof.after}</p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="text-sm font-bold tracking-[0.12em] text-white/60">{s.proof.quantTitle}</h3>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
                {t.impact.metrics.map((m, i) => (
                  <div key={m.label} className="bg-surface-dark p-6">
                    <dt className="text-sm font-bold text-white/85">{m.label}</dt>
                    <dd className="mt-2 font-display text-4xl font-bold text-brand-yellow tabular-nums">{formatImpactMetric(m)}</dd>
                    <dd className="mt-3 text-xs leading-relaxed text-white/60">
                      <sup className="mr-1 text-brand-yellow">{i + 1}</sup>
                      {m.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-[0.12em] text-white/60">{s.proof.qualTitle}</h3>
              <ul className="mt-5 space-y-3">
                {s.proof.qualItems.map((q) => (
                  <li key={q.title} className="flex gap-3 rounded-2xl border border-white/15 p-5">
                    <Quote className="mt-0.5 size-5 shrink-0 text-brand-orange" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-white">{q.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{q.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="ecosystem" className="py-20 md:py-28">
        <Container>
          <SectionHeader kicker={s.ecosystem.label} title={s.ecosystem.title} description={s.ecosystem.description} align="center" />
          <div className="mt-14">
            <EcosystemHub roles={s.ecosystem.roles} centerLabel={s.ecosystem.center} consultants={consultants} consultantsTitle={s.ecosystem.consultantsTitle} />
          </div>
        </Container>
      </section>

      <CtaBand
        title={s.cta.title}
        description={s.cta.description}
        primary={{ label: s.cta.primaryLabel, href: `/${locale}/consulting#contact` }}
        secondary={{ label: s.cta.secondaryLabel, href: `/${locale}/events#history` }}
      />
    </>
  )
}
