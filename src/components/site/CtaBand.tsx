import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { BridgeArc } from "@/components/site/BridgeArc"

interface CtaBandProps {
  kicker?: string
  title: string
  description?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string; external?: boolean; line?: boolean }
  steps?: readonly string[]
}

// Closing call to action: dark band with the bridge motif.
export function CtaBand({ kicker, title, description, primary, secondary, steps }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-white">
      <BridgeArc tone="dark" className="pointer-events-none absolute -right-24 -bottom-10 w-[640px] max-w-none opacity-25" />
      <Container className="relative py-20 md:py-28">
        <div className="max-w-2xl">
          {kicker && <p className="kicker-rule mb-4 text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{kicker}</p>}
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-black leading-[1.25]">{title}</h2>
          {description && <p className="mt-5 text-base sm:text-lg leading-[1.85] text-white/75">{description}</p>}
          {steps && (
            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm text-white/85">
                  <span className="font-display text-lg font-bold text-brand-yellow tabular-nums">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight />
              </Link>
            </Button>
            {secondary &&
              (secondary.external ? (
                <Button size="lg" variant="outlineInverse" asChild>
                  <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                    {secondary.line && <MessageCircle />}
                    {secondary.label}
                  </a>
                </Button>
              ) : (
                <Button size="lg" variant="outlineInverse" asChild>
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
