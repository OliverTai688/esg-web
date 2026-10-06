import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CTASection } from "@/components/domain/CTASection"
import Link from "next/link"
import {
  Newspaper,
  CalendarCheck,
  Handshake,
  Gift,
  QrCode,
  Users,
  Building2,
  Calendar,
  Globe,
  ArrowRight,
} from "lucide-react"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import { site } from "@/lib/site"
import type { Locale } from "@/i18n/config"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"

const LINE_URL = site.line.url
const LINE_ID = site.line.id

const benefitIcons = [Newspaper, CalendarCheck, Handshake, Gift]
const communityIcons = [Users, Building2, Calendar, Globe]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.joinPage.label} | 共好玟化 CO-ESG`,
    description: t.joinPage.description,
  }
}

export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  return (
    <main className="flex min-h-screen flex-col">
      {/* ─── 1. Hero ─── */}
      <Section
        padding="lg"
        className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden relative"
        backgroundSlot={<AnimatedGradientBackground variant="light" interactive intensity={0.9} />}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-primary/[0.03] pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none z-10" />

        <Container className="relative z-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-8 h-9 px-5 text-[11px] font-bold uppercase tracking-[0.3em] border-accent/30 text-accent bg-accent/5 backdrop-blur-sm"
            >
              {t.joinPage.hero.badge}
            </Badge>

            <h1 className="text-heading-1 mb-6">{t.joinPage.title}</h1>

            <p className="text-lg md:text-xl text-primary font-bold max-w-2xl mx-auto mb-6 tracking-tight leading-snug">
              {t.joinPage.hero.subtitle}
            </p>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {t.joinPage.description}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button
                variant="accent"
                size="lg"
                className="rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300 group h-14 px-10 text-base font-bold"
                asChild
              >
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
                  {t.joinPage.line.lineBtn}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 2. Benefits ─── */}
      <Section background="muted" withTopo>
        <Container>
          <Heading
            level={2}
            label={t.joinPage.benefits.label}
            title={t.joinPage.benefits.title}
            description={t.joinPage.benefits.description}
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.joinPage.benefits.items.map((item, idx) => {
              const Icon = benefitIcons[idx]
              return (
                <Card key={idx} className="text-center group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                      <Icon size={28} />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── 3. Community Impact ─── */}
      <Section bigText="COMMUNITY">
        <Container>
          <Heading
            level={2}
            label={t.joinPage.community.label}
            title={t.joinPage.community.title}
            description={t.joinPage.community.description}
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {t.joinPage.community.metrics.map((metric, idx) => {
              const Icon = communityIcons[idx]
              return (
                <div key={idx} className="flex flex-col items-center gap-3 text-center">
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon size={24} />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                    {metric.label}
                  </span>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── 4. How to Join (Steps) ─── */}
      <Section background="muted" withPattern>
        <Container>
          <Heading
            level={2}
            label={t.joinPage.steps.label}
            title={t.joinPage.steps.title}
            description={t.joinPage.steps.description}
            align="center"
          />
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {t.joinPage.steps.items.map((step, idx) => (
              <div key={idx} className="relative text-center">
                {/* Connector line */}
                {idx < t.joinPage.steps.items.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-accent/40 to-accent/10" />
                )}
                <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-accent/10 text-accent mb-6 mx-auto border border-accent/20">
                  <span className="text-2xl font-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── 5. LINE QR Code & Join ─── */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading
              level={2}
              title={t.joinPage.line.title}
              description={t.joinPage.line.description}
              align="center"
              spacing="sm"
            />

            {/* QR Code placeholder */}
            <div className="mx-auto mt-10 flex size-56 items-center justify-center rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5">
              <div className="flex flex-col items-center gap-3 text-accent">
                <QrCode size={48} />
                <span className="text-sm font-medium">{t.joinPage.line.qrCodeLabel}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {t.joinPage.line.lineId}: <span className="font-mono font-semibold text-foreground">{LINE_ID}</span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                className="rounded-full w-full sm:w-auto h-14 px-10 text-base font-bold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
                  {t.joinPage.line.lineBtn}
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <Link href={`/${locale}`}>{t.joinPage.back}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 6. Final CTA ─── */}
      <CTASection
        title={t.joinPage.cta.title}
        description={t.joinPage.cta.description}
        primaryLabel={t.joinPage.cta.primaryLabel}
        primaryHref={LINE_URL}
        secondaryLabel={t.joinPage.cta.secondaryLabel}
        secondaryHref={`/${locale}`}
      />
    </main>
  )
}
