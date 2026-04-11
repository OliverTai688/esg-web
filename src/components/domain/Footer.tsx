import Link from "next/link"
import { Container } from "@/components/core/Container"
import type { Locale } from "@/i18n/config"

interface FooterProps {
  locale: Locale
  dict: {
    nav: {
      sustainability: string
      events: string
      learning: string
      consulting: string
    }
    footer: {
      brand: string
      brandAccent: string
      tagline: string
      copyright: string
    }
  }
}

export function Footer({ locale, dict }: FooterProps) {
  const { footer, nav } = dict

  return (
    <footer className="py-12 border-t border-border bg-muted/30 mt-auto">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <span className="text-xl font-black tracking-tight text-foreground">
            {footer.brand}<span className="text-primary">{footer.brandAccent}</span>
          </span>
          <span className="text-[11px] text-muted-foreground tracking-wide font-medium">
            {footer.tagline}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold text-muted-foreground">
          <Link href={`/${locale}/sustainability`} className="hover:text-primary transition-colors">{nav.sustainability}</Link>
          <Link href={`/${locale}/events`} className="hover:text-primary transition-colors">{nav.events}</Link>
          <Link href={`/${locale}/learning`} className="hover:text-primary transition-colors">{nav.learning}</Link>
          <Link href={`/${locale}/consulting`} className="hover:text-primary transition-colors">{nav.consulting}</Link>
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  )
}
