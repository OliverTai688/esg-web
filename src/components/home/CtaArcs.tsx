import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"

// S8 · CTA: two arcs rise from either side and close at the flame — the bridge
// that opened in the hero is completed here (home-v2 decision S8-A,
// transition 7). The arcs draw themselves in as the section scrolls in.
export function CtaArcs({
  kicker,
  title,
  description,
  steps,
  primary,
  secondary,
}: {
  kicker: string
  title: string
  description: string
  steps: readonly string[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}) {
  return (
    <section id="cta" className="relative overflow-hidden pb-20 pt-10 md:pb-28 md:pt-16">
      <Container className="relative">
        <div className="relative mx-auto max-w-4xl">
          <svg viewBox="0 0 800 400" className="h-auto w-full md:absolute md:inset-x-0 md:top-0" aria-hidden="true">
            <path d="M40 400 C 40 190, 190 70, 372 62" fill="none" stroke="#FAB40A" strokeWidth="26" strokeLinecap="round" pathLength={1} className="scroll-draw" />
            <path d="M760 400 C 760 190, 610 70, 428 62" fill="none" stroke="#F25232" strokeWidth="26" strokeLinecap="round" pathLength={1} className="scroll-draw" />
            <image href="/brand/gungho-mark.svg" x="371" y="8" width="58" height="75" />
          </svg>
          <div className="relative mx-auto -mt-[14%] max-w-xl px-8 text-center md:mt-0 md:px-0 md:pt-[150px]">
            <p className="kicker-rule mx-auto justify-center text-[13px] font-bold tracking-[0.12em] text-primary">{kicker}</p>
            <h2 className="mt-4 text-[1.75rem] font-black leading-[1.3] text-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-5 text-base leading-[1.85] text-muted-foreground sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {secondary.label}
                </a>
              </Button>
            </div>
          </div>
        </div>
        <ol className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-bold text-ink">
              <span
                aria-hidden="true"
                className={i === 0 ? "size-6 shrink-0 rounded-tl-full bg-brand-yellow" : i === 1 ? "h-3 w-6 shrink-0 rounded-t-full bg-brand-orange" : "size-6 shrink-0 rounded-full bg-brand-orange"}
              />
              <span className="font-display text-xs text-muted-foreground">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
