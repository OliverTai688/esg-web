"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Backlight } from "@/components/ui/backlight"

interface TrustIndicator {
  metric: string
  label: string
}

interface HeroSectionProps {
  label: string
  title: string
  subTitle?: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  trustIndicators?: readonly TrustIndicator[]
}

import BlurIn from "@/components/magicui/BlurIn"
const HeroSection = ({
  label,
  title,
  subTitle,
  description,
  primaryCta,
  secondaryCta,
  trustIndicators,
}: HeroSectionProps) => {
  return (
    <Section padding="lg" background="default" className="min-h-[100vh] flex items-center justify-center pt-32 pb-20 overflow-hidden relative">
      {/* Warm gradient overlay — adds orange brand warmth (#12) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-primary/[0.03] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none z-10" />

      <Container className="relative z-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Label — accent orange for consistency with Heading labels (#6) */}
          {label && (
            <Badge variant="outline" className="mb-8 h-9 px-5 text-[11px] font-bold uppercase tracking-[0.3em] border-accent/30 text-accent bg-accent/5 backdrop-blur-sm">
              {label}
            </Badge>
          )}

          {/* Main headline — dark foreground, readable (#1) */}
          <BlurIn
            word={title}
            className="text-heading-1 mb-8 drop-shadow-sm"
          />

          {/* Subtitle — green brand voice */}
          <h2 className="text-lg md:text-2xl font-bold text-primary max-w-[850px] mx-auto mb-10 tracking-tight leading-snug animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            {subTitle}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 leading-relaxed">
            {description}
          </p>

          {/* Single primary CTA (orange) + subordinate secondary (#3 preview) */}
          <div className="flex flex-wrap justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Backlight blur={24}>
              <Button variant="accent" size="lg" className="rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300 group h-14 px-10 text-base font-bold" asChild>
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </Backlight>
            {secondaryCta && (
              <Button variant="ghost" size="lg" className="rounded-full text-muted-foreground hover:text-primary h-14 px-10 text-base font-medium transition-all duration-300" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>

          {/* Trust indicators — foreground color to reduce green overload (#2) */}
          {trustIndicators && trustIndicators.length > 0 && (
            <div className="mt-20 pt-10 border-t border-border w-full grid grid-cols-2 md:grid-cols-4 gap-10">
              {trustIndicators.map((indicator, idx) => (
                <div key={idx} className="flex flex-col gap-2 animate-in fade-in duration-1000" style={{ animationDelay: `${600 + idx * 100}ms` }}>
                  <span className="text-3xl font-black text-foreground tracking-tight">{indicator.metric}</span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">{indicator.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

export { HeroSection }
