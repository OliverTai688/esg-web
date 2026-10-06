import Link from "next/link"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { site } from "@/lib/site"
import type { Locale } from "@/i18n/config"
import type { Messages } from "@/i18n/messages"

interface FooterProps {
  locale: Locale
  dict: Pick<Messages, "nav" | "footer">
}

export function Footer({ locale, dict }: FooterProps) {
  const { footer, nav } = dict
  const lang = locale === "zh" ? "zh" : "en"

  const navLinks = [
    { href: `/${locale}/sustainability`, label: nav.sustainability.label },
    { href: `/${locale}/events`, label: nav.events.label },
    { href: `/${locale}/learning`, label: nav.learning.label },
    { href: `/${locale}/insights`, label: nav.learning.insights },
    { href: `/${locale}/consulting`, label: nav.consulting.label },
    { href: `/${locale}/join`, label: nav.join },
  ]

  const linkClass = "text-white/85 underline-offset-4 transition-colors hover:text-brand-yellow hover:underline"

  return (
    <footer className="relative mt-auto bg-surface-dark pt-16 pb-8 text-white">
      {/* CIS colour rule along the top edge */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
        <span className="flex-[3] bg-brand-orange" />
        <span className="flex-1 bg-brand-yellow" />
      </div>
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.7fr_1.6fr]">
          {/* Brand + LINE */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2">
              <Image
                src="/brand/gungho-horizontal-white.svg"
                alt={`${footer.brand}${footer.brandAccent}`}
                width={240}
                height={95}
                className="h-12 w-auto"
              />
              <span className="text-xs font-medium tracking-wide text-white/70">
                {footer.tagline}
              </span>
            </div>
            {/* LINE brand green; dark label keeps the text at AA contrast */}
            <a
              href={site.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#06C755] px-5 text-sm font-bold text-[#073B1A] shadow-sm transition-all hover:brightness-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark active:scale-[0.98]"
            >
              <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
              {footer.lineCta}
            </a>
          </div>

          {/* Site navigation */}
          <nav aria-label={footer.navTitle}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/60">
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
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/60">
              {footer.company.title}
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-sm">
              <dt className="text-white/60">{footer.company.name}</dt>
              <dd className="text-white/85">
                {site.legalName.zh}
                <span className="block text-xs text-white/60">{site.legalName.en}</span>
              </dd>

              <dt className="text-white/60">{footer.company.taxId}</dt>
              <dd className="text-white/85 tabular-nums">{site.taxId}</dd>

              <dt className="text-white/60">{footer.company.founder}</dt>
              <dd className="text-white/85">{site.founder[lang]}</dd>

              <dt className="text-white/60">{footer.company.founded}</dt>
              <dd className="text-white/85 tabular-nums">
                {lang === "zh" ? `${site.foundingYear} 年` : site.foundingYear}
              </dd>

              <dt className="text-white/60">{footer.company.address}</dt>
              <dd className="text-white/85">
                <address className="not-italic">{site.address[lang]}</address>
              </dd>

              <dt className="text-white/60">{footer.company.website}</dt>
              <dd>
                <a href={site.url} className={linkClass}>
                  {site.url.replace("https://", "")}
                </a>
              </dd>

              <dt className="text-white/60">{footer.company.email}</dt>
              <dd className="break-all">
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </dd>

              <dt className="text-white/60">{footer.supportEmail}</dt>
              <dd className="break-all">
                <a href={`mailto:${site.supportEmail}`} className={linkClass}>
                  {site.supportEmail}
                </a>
              </dd>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs font-medium text-white/60">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  )
}
