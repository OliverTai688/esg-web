import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { site } from "@/lib/site"
import { FacebookIcon, LineIcon, LinkedInIcon } from "@/components/site/SocialIcons"
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

  // rev2 #5⑧: three icons on the Chinese site; the English site has no LINE (EN rule R17)
  const socials = [
    ...(locale === "en" ? [] : [{ label: "LINE", href: site.line.url, Icon: LineIcon }]),
    { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
    { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
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
          {/* Brand + social icons */}
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
            <ul aria-label={footer.social} className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}${footer.newWindow}`}
                    className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-surface-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
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
              <li>
                <a href={site.storeUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                  {footer.store}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              {/* rev2 #43: online tools, a footer text link only (not in the main menu) */}
              <li>
                <a href={site.toolsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                  {footer.tools}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
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
