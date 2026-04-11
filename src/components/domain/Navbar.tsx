"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/domain/LocaleSwitcher"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  locale: Locale
  labels: {
    sustainability: string
    events: string
    learning: string
    consulting: string
    join: string
    cta: string
  }
}

const Navbar = ({ locale, labels }: NavbarProps) => {
  const [open, setOpen] = React.useState(false)

  const navLinks: NavLink[] = [
    { label: labels.sustainability, href: `/${locale}/sustainability` },
    { label: labels.events, href: `/${locale}/events` },
    { label: labels.learning, href: `/${locale}/learning` },
    { label: labels.consulting, href: `/${locale}/consulting` },
    { label: labels.join, href: `/${locale}/join` },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-1.5 group">
          <span className="text-xl font-black tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
            共好<span className="text-primary group-hover:text-primary/80 transition-colors">玟化</span>
          </span>
        </Link>

        {/* Desktop Nav — sentence case for readability (#10) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Locale */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Button variant="default" size="sm" className="rounded-full" asChild>
            <Link href={`/${locale}/consulting`}>{labels.cta}</Link>
          </Button>
        </div>

        {/* Mobile Toggle — min 44px touch target */}
        <button
          className="md:hidden p-2.5 text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-border/40 bg-white",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <Container className="py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-2">
            <LocaleSwitcher locale={locale} />
            <Button variant="default" size="sm" className="rounded-full flex-1" asChild>
              <Link href={`/${locale}/consulting`} onClick={() => setOpen(false)}>
                {labels.cta}
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  )
}

export { Navbar }
