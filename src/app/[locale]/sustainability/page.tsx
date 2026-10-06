import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { MethodologyBeam } from "@/components/domain/MethodologyBeam"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import { formatImpactMetric } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import {
  ArrowRight,
  AlertTriangle,
  MessageSquareX,
  FileX2,
  Unplug,
  Building2,
  BookOpen,
  Users,
  Link2,
  TrendingUp,
  Quote,
  UserCheck,
  Globe,
  Eye,
  Target,
  ChevronRight,
  Leaf,
  Heart,
  Briefcase,
  Handshake,
} from "lucide-react"

import { MethodologyTerminal } from "@/components/domain/MethodologyTerminal"

import { FlipCard } from "@/components/ui/flip-card"
import { EcosystemNetwork } from "@/components/domain/EcosystemNetwork"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.sustainabilityPage.label} | 共好玟化 CO-ESG`,
    description: t.sustainabilityPage.description,
  }
}

export default async function SustainabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  const s = t.sustainabilityPage

  const problemIcons = [MessageSquareX, FileX2, Unplug]
  const serviceIcons = [Building2, BookOpen, Users, Link2]
  const metricIcons = [TrendingUp, Handshake, Globe]

  return (
    <main className="flex min-h-screen flex-col">
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — Value Proposition + CTA
          Dark primary background for maximum impact
       ═══════════════════════════════════════════════════════════════ */}
      <Section
        background="primary"
        padding="lg"
        withPattern={true}
        bigText="ESG"
        backgroundSlot={<AnimatedGradientBackground variant="dark" interactive intensity={0.8} />}
      >
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <Badge className="mb-8 bg-white/15 text-primary-foreground border-white/20 backdrop-blur-sm text-sm px-4 py-1.5">
              {s.hero.badge}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-primary-foreground leading-[1.1] mb-6">
              {s.hero.title}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 font-medium mb-4 max-w-2xl leading-relaxed">
              {s.hero.subtitle}
            </p>

            <p className="text-base text-primary-foreground/60 mb-10 max-w-2xl leading-relaxed">
              {s.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="rounded-full text-base px-8 gap-2 shadow-lg" asChild>
                <Link href={`/${locale}/consulting`}>
                  {s.hero.primaryCta}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base px-8 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white transition-all duration-300"
                asChild
              >
                <Link href="#methodology">
                  {s.hero.secondaryCta}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          2. PROBLEM — Why ESG is hard
          Light background, empathetic tone, 3 pain-point cards
       ═══════════════════════════════════════════════════════════════ */}
      <Section withTopo={true}>
        <Container>
          <Heading
            level={2}
            label={s.problem.label}
            title={s.problem.title}
            description={s.problem.description}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {s.problem.painPoints.map((point: { title: string; description: string }, i: number) => {
              const Icon = problemIcons[i] ?? AlertTriangle
              return (
                <FlipCard
                  key={i}
                  title={point.title}
                  description={point.description}
                  icon={<Icon size={32} />}
                />
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          3. SOLUTION — 3-step system
          Muted bg, numbered steps with connecting visual
       ═══════════════════════════════════════════════════════════════ */}
      <Section background="muted" withPattern={true} bigText="HOW">
        <Container>
          <Heading
            level={2}
            label={s.solution.label}
            title={s.solution.title}
            description={s.solution.description}
            align="center"
          />
          <MethodologyBeam steps={s.solution.steps} />
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          4. SERVICES — Productized cards (SaaS style)
          Light bg, 4 cards with tags and highlights
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="services" bigText="SERVICE">
        <Container>
          <Heading
            level={2}
            label={s.services.label}
            title={s.services.title}
            description={s.services.description}
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.services.items.map(
              (service: { tag: string; title: string; description: string; highlight: string }, i: number) => {
                const Icon = serviceIcons[i] ?? Building2
                return (
                  <Card
                    key={i}
                    className="group relative border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Highlight badge */}
                    {service.highlight && (
                      <div className="absolute -top-3 right-4">
                        <Badge variant="accent" className="text-[10px] px-2.5 py-0.5 shadow-sm">
                          {service.highlight}
                        </Badge>
                      </div>
                    )}

                    <CardHeader>
                      <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider mb-3">
                        {service.tag}
                      </Badge>
                      <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                        <Icon size={24} />
                      </div>
                      <CardTitle className="text-lg leading-snug">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              }
            )}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          5. PROOF — Metrics + case study
          Dark primary bg for high contrast metrics
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="impact" background="primary" withPattern={true} bigText="IMPACT">
        <Container>
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <span className="text-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
              {s.proof.label}
            </span>
            <h2 className="text-heading-2 !text-primary-foreground">{s.proof.title}</h2>
            <p className="text-base md:text-lg text-primary-foreground/70 mt-4 max-w-[700px] leading-relaxed">
              {s.proof.description}
            </p>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {t.impact.metrics.map(
              (metric, i) => {
                const Icon = metricIcons[i] ?? TrendingUp
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="size-14 rounded-full bg-white/10 flex items-center justify-center text-accent mb-4 transition-transform duration-300 hover:scale-110">
                      <Icon size={26} />
                    </div>
                    <span className="text-4xl md:text-5xl font-black text-primary-foreground tracking-tight mb-2">
                      {formatImpactMetric(metric)}
                    </span>
                    <span className="text-sm text-primary-foreground/70 font-medium uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                )
              }
            )}
          </div>

          {/* Case study quote */}
          <div className="max-w-2xl mx-auto text-center border-t border-white/10 pt-10">
            <Quote size={32} className="text-accent/60 mx-auto mb-4" />
            <blockquote className="text-lg md:text-xl text-primary-foreground/90 font-medium leading-relaxed italic mb-4">
               &ldquo;{s.proof.caseQuote}&rdquo;
            </blockquote>
            <p className="text-sm text-primary-foreground/50 font-medium">{s.proof.caseAuthor}</p>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          6. METHODOLOGY — Framework / Philosophy
          Light bg, vision/mission + Terminal Sequence
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="methodology" withTopo={true} bigText="VALUES">
        <Container>
          <Heading
            level={2}
            label={s.methodology.label}
            title={s.methodology.title}
            description={s.methodology.description}
            align="center"
          />

          <MethodologyTerminal principles={s.methodology.principles} className="mb-16" />

          {/* Vision & Mission cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-muted/50 border border-border/50">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Eye size={20} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-1 block">{s.methodology.visionLabel}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{s.methodology.visionText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-muted/50 border border-border/50">
              <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Target size={20} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent/80 mb-1 block">{s.methodology.missionLabel}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{s.methodology.missionText}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          7. ECOSYSTEM — Network visualization
          Muted bg, hub-and-spoke layout
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="ecosystem" background="muted" withPattern={true} bigText="NETWORK">
        <Container>
          <Heading
            level={2}
            label={s.ecosystem.label}
            title={s.ecosystem.title}
            description={s.ecosystem.description}
            align="center"
          />

          <EcosystemNetwork roles={s.ecosystem.roles} centerLabel={s.ecosystem.centerLabel} />
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          8. CTA — Final conversion section
          Dark primary bg, strong headline, dual CTAs
       ═══════════════════════════════════════════════════════════════ */}
      <Section
        background="default"
        padding="lg"
        backgroundSlot={<AnimatedGradientBackground variant="light" intensity={0.7} />}
      >
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
             <h2 className="text-heading-2 mb-6">
              {s.cta.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
              {s.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="rounded-full text-base px-10 h-14 gap-2 shadow-lg shadow-accent/25" asChild>
                <Link href={`/${locale}/consulting`}>
                  {s.cta.primaryLabel}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base px-10 h-14 border-border text-foreground hover:bg-muted transition-all duration-300"
                asChild
              >
                <Link href={`/${locale}`}>
                  {s.cta.secondaryLabel}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
