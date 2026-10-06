import * as React from "react"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

// Internal paths use client-side navigation; absolute URLs open in a new tab.
const CTALink = ({ href, children }: { href: string; children: React.ReactNode }) =>
  /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  )

const CTASection = ({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) => {
  return (
    <Section padding="lg" background="primary" className="overflow-hidden py-24 md:py-32 relative">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 pointer-events-none" />
      <div className="absolute top-0 left-0 h-full w-1/3 bg-white/[0.04] skew-x-12 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-full w-1/3 bg-white/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-white/[0.05] blur-[120px] pointer-events-none" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-3xl bg-white/10 mb-10 mx-auto border border-white/20">
            <div className="size-3 rounded-full bg-accent animate-pulse shadow-[0_0_20px_var(--accent)]" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            {description}
          </p>

          {/* Strong primary CTA — solid accent orange for maximum contrast (#3) */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="accent"
              size="lg"
              className="h-16 px-10 sm:px-16 text-lg font-black rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-accent/30"
              asChild
            >
              <CTALink href={primaryHref}>{primaryLabel}</CTALink>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button
                variant="ghost"
                size="lg"
                className="h-14 px-10 text-base font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                asChild
              >
                <CTALink href={secondaryHref}>{secondaryLabel}</CTALink>
              </Button>
            )}
          </div>

          <div className="mt-20 flex items-center justify-center gap-8 opacity-30">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-[11px] text-white/50 uppercase tracking-[0.3em] font-semibold">
              Enterprise ESG Solutions
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { CTASection }
