import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { site } from "@/lib/site"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/dictionaries/zh"

interface FooterProps {
  locale: Locale
  dict: Pick<Dictionary, "nav" | "footer">
}

export function Footer({ locale, dict }: FooterProps) {
  const { footer, nav } = dict
  const lang = locale === "zh" ? "zh" : "en"

  const navLinks = [
    { href: `/${locale}/sustainability`, label: nav.sustainability.label },
    { href: `/${locale}/events`, label: nav.events.label },
    { href: `/${locale}/learning`, label: nav.learning.label },
    { href: `/${locale}/consulting`, label: nav.consulting.label },
    { href: `/${locale}/join`, label: nav.join },
  ]

  const linkClass = "text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"

  return (
    <footer className="mt-auto border-t border-border bg-muted/30 pt-14 pb-8">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.7fr_1.6fr]">
          {/* Brand + LINE */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-black tracking-tight text-foreground">
                {footer.brand}<span className="text-primary">{footer.brandAccent}</span>
              </span>
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                {footer.tagline}
              </span>
            </div>
            {/* LINE brand green; dark label keeps the text at AA contrast */}
            <a
              href={site.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#06C755] px-5 text-sm font-bold text-[#073B1A] shadow-sm transition-all hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
              {footer.lineCta}
            </a>
          </div>

          {/* Site navigation */}
          <nav aria-label={footer.navTitle}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {footer.navTitle}
            </h2>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company information */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {footer.company.title}
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-sm">
              <dt className="text-muted-foreground">{footer.company.name}</dt>
              <dd className="text-foreground/80">
                {site.legalName.zh}
                <span className="block text-xs text-muted-foreground">{site.legalName.en}</span>
              </dd>

              <dt className="text-muted-foreground">{footer.company.taxId}</dt>
              <dd className="text-foreground/80 tabular-nums">{site.taxId}</dd>

              <dt className="text-muted-foreground">{footer.company.founder}</dt>
              <dd className="text-foreground/80">{site.founder[lang]}</dd>

              <dt className="text-muted-foreground">{footer.company.founded}</dt>
              <dd className="text-foreground/80 tabular-nums">
                {lang === "zh" ? `${site.foundingYear} 年` : site.foundingYear}
              </dd>

              <dt className="text-muted-foreground">{footer.company.address}</dt>
              <dd className="text-foreground/80">
                <address className="not-italic">{site.address[lang]}</address>
              </dd>

              <dt className="text-muted-foreground">{footer.company.website}</dt>
              <dd>
                <a href={site.url} className={linkClass}>
                  {site.url.replace("https://", "")}
                </a>
              </dd>

              <dt className="text-muted-foreground">{footer.company.email}</dt>
              <dd className="break-all">
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </dd>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-xs font-medium text-muted-foreground">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  )
}
