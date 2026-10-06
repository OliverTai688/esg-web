import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { HeroSection } from "@/components/domain/HeroSection"
import { StorySection } from "@/components/domain/StorySection"
import { ProblemSolutionSection } from "@/components/domain/ProblemSolutionSection"
import { EvidenceCard } from "@/components/domain/EvidenceCard"
import { FutureSection } from "@/components/domain/FutureSection"
import { TrustSection } from "@/components/domain/TrustSection"
import { CTASection } from "@/components/domain/CTASection"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Handshake,
  BookOpen,
  Network,
  MapPin,
  Search,
  Factory,
  Globe,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/getDictionary"
import { formatImpactMetric } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getDictionary(typedLocale)

  const title =
    typedLocale === "zh"
      ? "共好玟化 CO-ESG | 永續品牌的專業橋樑"
      : "CO-ESG | Professional Bridge for Sustainable Brands"

  return {
    title,
    description: dict.hero.description,
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getDictionary(typedLocale)
  const t = dict
  const evidenceIcons = [TrendingUp, Handshake, Globe]

  return (
    <main className="flex min-h-screen flex-col">
      {/* ─── Section 1: Hero ─── */}
      <HeroSection
        label={t.hero.label}
        title={t.hero.title}
        subTitle={t.hero.subTitle}
        description={t.hero.description}
        primaryCta={{ label: t.hero.primaryCta, href: `/${locale}/consulting` }}
        secondaryCta={{ label: t.hero.secondaryCta, href: `/${locale}/sustainability` }}
        trustIndicators={t.impact.metrics.map((metric) => ({
          metric: formatImpactMetric(metric),
          label: metric.label,
        }))}
      />

      {/* ─── Section 2: Brand Story — bg-muted/30 ─── */}
      <StorySection
        label={t.story.label}
        title={t.story.title}
        headline={t.story.headline}
        nameMeaning={t.story.nameMeaning}
        summary={t.story.summary}
        bullets={[...t.story.bullets]}
        readMore={t.story.readMore}
        fullStory={[...t.story.fullStory]}
        founderName={t.story.founderName}
        founderTitle={t.story.founderTitle}
      />

      {/* ─── Section 3: Problem → Solution — white bg (#11) ─── */}
      <ProblemSolutionSection
        label={t.problem.label}
        title={t.problem.title}
        description={t.problem.description}
        painPoints={[
          { icon: Search, ...t.problem.painPoints[0] },
          { icon: Factory, ...t.problem.painPoints[1] },
          { icon: Globe, ...t.problem.painPoints[2] },
        ]}
        solutionTitle={t.problem.solutionTitle}
        solutionDescription={t.problem.solutionDescription}
        solutionPillars={t.problem.solutionPillars}
        background="default"
        withPattern={true}
      />

      {/* ─── Section 4: Evidence — muted bg (#11) ─── */}
      <Section background="muted" id="evidence" withTopo={true} bigText="IMPACT">
        <Container>
          {/* Fixed layout — badge below heading (#8) */}
          <div className="mb-16">
            <Heading
              level={2}
              label={t.evidence.label}
              title={t.evidence.title}
              description={t.evidence.description}
              spacing="none"
              align="center"
            />
            <div className="flex justify-center mt-6">
              <Badge variant="outline" className="h-7 px-3 text-[11px] font-semibold border-accent/30 text-accent">
                {t.evidence.badge}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cards pair by index with t.impact.metrics: resources → partnerships → forums */}
            {t.evidence.cards.map((card, idx) => {
              const metric = t.impact.metrics[idx]
              return (
                <EvidenceCard
                  key={card.title}
                  tag={card.tag}
                  title={card.title}
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  unit={metric.label}
                  description={card.description}
                  icon={evidenceIcons[idx]}
                />
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── Mid-page CTA — conversion path (#4) ─── */}
      <Section background="default" padding="sm" className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/[0.04] via-accent/[0.03] to-primary/[0.04] border border-border">
            <div className="text-center md:text-left">
              <p className="text-lg md:text-xl font-bold text-foreground mb-2">
                {typedLocale === "zh" ? "想了解我們如何協助你？" : "Want to learn how we can help?"}
              </p>
              <p className="text-sm text-muted-foreground">
                {typedLocale === "zh" ? "15 分鐘 Coffee Chat，聊聊你的永續下一步。" : "A 15-min Coffee Chat about your sustainability next step."}
              </p>
            </div>
            <Button variant="accent" size="lg" className="rounded-full shadow-md shadow-accent/20 group shrink-0" asChild>
              <Link href={`/${locale}/consulting`}>
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── Section 5: Future — secondary bg (#11) ─── */}
      <FutureSection
        label={t.future.label}
        title={t.future.title}
        description={t.future.description}
        services={[
          { iconName: "BookOpen", ...t.future.services[0] },
          { iconName: "Network", ...t.future.services[1] },
          { iconName: "MapPin", ...t.future.services[2] },
        ]}
        timeline={[...t.future.timeline]}
        withPattern={true}
        background="secondary"
        bigText="VISION"
      />

      {/* ─── Section 6: Trust — muted bg (#11) ─── */}
      <TrustSection
        label={t.trust.label}
        title={t.trust.title}
        description={t.trust.description}
        testimonials={[...t.trust.testimonials]}
      />

      {/* ─── Section 7: CTA ─── */}
      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryLabel={t.cta.primaryLabel}
        secondaryLabel={t.cta.secondaryLabel}
      />
    </main>
  )
}
