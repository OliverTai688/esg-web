import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  en: string
  zh: string
  description: string
  /** Short line under the box (rev2 #28: 回答「…」). */
  note?: string
  /** Show the note in orange. */
  accent?: boolean
}

// rev2 #28: the chain of events (IOOI) as in chapter 2 of the book: five boxes
// of equal height, left to right, joined by arrows; stacked top to bottom on
// phones. Header colours in order: grey, dark grey, yellow, orange, dark orange
// (CIS). White text only on the darker three (contrast).
const HEADS = [
  "bg-[#8A8E97] text-ink",
  "bg-brand-grey text-white",
  "bg-brand-yellow text-ink",
  "bg-brand-orange text-white",
  "bg-[#B8401F] text-white",
]

export function IooiSpan({ steps, caption, className }: { steps: readonly Step[]; caption?: string; className?: string }) {
  return (
    <div className={className}>
      <ol className="flex flex-col md:flex-row md:gap-7">
        {steps.map((step, i) => (
          <li key={step.en} className="relative flex flex-1 flex-col">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="flex justify-center py-1.5 text-primary md:absolute md:-left-7 md:top-[calc(50%-1.25rem)] md:w-7 md:-translate-y-1/2 md:py-0"
              >
                <ArrowRight className="size-5 rotate-90 md:rotate-0" strokeWidth={3} />
              </span>
            )}
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border">
              <div className={cn("flex items-baseline justify-between gap-2 px-4 py-3 md:flex-col-reverse md:items-start md:justify-start md:gap-0.5", HEADS[i % HEADS.length])}>
                <p className="text-lg font-black leading-tight sm:text-xl">{step.zh}</p>
                {step.en !== step.zh && <p className="font-display text-xs font-bold uppercase tracking-[0.1em]">{step.en}</p>}
              </div>
              <p className="flex-1 px-4 py-3.5 text-sm leading-[1.75] text-ink/80">{step.description}</p>
            </div>
            {/* Every column keeps the note row on wide screens, so the boxes stay the same height */}
            <p
              className={cn(
                "mt-2 min-h-8 text-right text-sm font-bold leading-snug md:text-center",
                step.accent ? "text-primary" : "text-brand-grey",
                !step.note && "hidden md:block",
              )}
            >
              {step.note}
            </p>
          </li>
        ))}
      </ol>
      {caption && <p className="mt-3 text-xs leading-[1.7] text-muted-foreground sm:text-sm">{caption}</p>}
    </div>
  )
}
