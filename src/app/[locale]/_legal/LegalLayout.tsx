import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"

// Shared frame for /terms and /privacy (rev2 #7). The `_legal` folder is private:
// it is not a route.

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container as="article" className="py-16 md:py-20">
      <header className="max-w-[72ch]">
        <h1 className="text-[2rem] font-black leading-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{updated}</p>
      </header>
      <div className="prose mt-10">{children}</div>
    </Container>
  )
}

// English stand-in until the client supplies the English text (EN rules R2, R37).
export function ChineseOnly({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <Container className="py-16 md:py-20">
      <h1 className="text-[2rem] font-black leading-tight text-ink sm:text-4xl">{title}</h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">This page is currently available in Chinese only.</p>
      <Link href={href} hrefLang="zh-TW" className="text-link mt-4 inline-flex min-h-11 items-center gap-1.5 font-bold">
        {linkLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Container>
  )
}
