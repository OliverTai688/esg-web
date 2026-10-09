import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { FlameMark } from "@/components/site/FlameMark"

interface CtaBandProps {
  kicker?: string
  title: string
  description?: string
  primary: { label: string; href: string; external?: boolean; line?: boolean }
  secondary?: { label: string; href: string; external?: boolean; line?: boolean }
  steps?: readonly string[]
  /** A small line under the buttons, e.g. a contact address. */
  note?: React.ReactNode
}

function Action({ action, variant }: { action: NonNullable<CtaBandProps["secondary"]>; variant: "default" | "outline" | "line" }) {
  const content = (
    <>
      {action.line && <MessageCircle />}
      {action.label}
      {!action.line && variant === "default" && <ArrowRight />}
    </>
  )
  return (
    <Button size="lg" variant={action.line && variant === "default" ? "line" : variant} asChild>
      {action.external ? (
        <a href={action.href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={action.href}>{content}</Link>
      )}
    </Button>
  )
}

// Closing call to action for every page except the home page. A small arch
// closes over the flame: the same "bridge completed" ending as the home page's
// CtaArcs, at a lower volume so the home page keeps the loudest version.
export function CtaBand({ kicker, title, description, primary, secondary, steps, note }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24">
      <Container className="relative flex flex-col items-center text-center">
        <svg viewBox="0 0 240 96" className="h-auto w-44 sm:w-56" aria-hidden="true">
          <path d="M10 96 C 10 44, 60 14, 104 12" fill="none" stroke="#FAB40A" strokeWidth="12" strokeLinecap="round" pathLength={1} className="scroll-draw" />
          <path d="M230 96 C 230 44, 180 14, 136 12" fill="none" stroke="#F25232" strokeWidth="12" strokeLinecap="round" pathLength={1} className="scroll-draw" />
        </svg>
        <FlameMark className="-mt-[5.25rem] w-8 sm:-mt-[6.5rem] sm:w-9" />
        <div className="mt-10 max-w-2xl sm:mt-14">
          {kicker && <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{kicker}</p>}
          <h2 className="mt-3 text-[1.75rem] font-black leading-[1.3] text-ink sm:text-4xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-[1.85] text-muted-foreground">{description}</p>}
        </div>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Action action={primary} variant="default" />
          {secondary && <Action action={secondary} variant={secondary.line ? "line" : "outline"} />}
        </div>
        {note && <p className="mt-5 text-sm text-muted-foreground">{note}</p>}
        {steps && (
          <ol className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-ink/80">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="font-display text-xs text-primary tabular-nums">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  )
}
