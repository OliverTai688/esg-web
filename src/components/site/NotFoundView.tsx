"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"

interface NotFoundMessages {
  kicker: string
  title: string
  body: string
  home: string
  linksLabel: string
  links: readonly string[]
}

const PATHS = ["/sustainability", "/events", "/learning", "/consulting"]

// 404: the bridge with its keystone missing. The two arcs are the closing
// CtaBand's, stopped short — the page says "not here" in the site's own shapes
// and then offers the ways on.
export function NotFoundView({ messages }: { messages: { zh: NotFoundMessages; en: NotFoundMessages } }) {
  const locale = usePathname()?.split("/")[1] === "en" ? "en" : "zh"
  const t = messages[locale]

  return (
    <section className="py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <svg viewBox="0 0 240 96" className="h-auto w-52 sm:w-64" aria-hidden="true">
          <path d="M10 96 C 10 52, 44 24, 78 16" fill="none" stroke="#FAB40A" strokeWidth="12" strokeLinecap="round" />
          <path d="M230 96 C 230 52, 196 24, 162 16" fill="none" stroke="#F25232" strokeWidth="12" strokeLinecap="round" />
          <path d="M96 12 C 112 9, 128 9, 144 12" fill="none" stroke="#4D515B" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
        </svg>
        <p className="kicker-rule mt-10 font-display text-[13px] font-bold tracking-[0.12em] text-primary">{t.kicker}</p>
        <h1 className="mt-3 text-[1.75rem] font-black leading-[1.3] text-ink sm:text-4xl">{t.title}</h1>
        <p className="mt-4 max-w-md text-base leading-[1.85] text-muted-foreground">{t.body}</p>
        <Button size="lg" className="mt-8" asChild>
          <Link href={`/${locale}`}>
            {t.home}
            <ArrowRight />
          </Link>
        </Button>
        <nav aria-label={t.linksLabel} className="mt-10">
          <p className="text-sm text-muted-foreground">{t.linksLabel}</p>
          <ul className="mt-2 flex flex-wrap justify-center gap-x-2">
            {PATHS.map((path, i) => (
              <li key={path}>
                <Link
                  href={`/${locale}${path}`}
                  className="inline-flex min-h-11 items-center px-3 text-sm font-bold text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.links[i]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
