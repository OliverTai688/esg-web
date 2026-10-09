import { Block, Petal, Quarter } from "@/components/geo/shapes"
import { cn } from "@/lib/utils"

// Which end of the bridge a starting point stands on: petal for value-driven
// partners (brands, non-profits), block for teams and enterprises, a small
// quarter-disc for "start small" (membership).
export type OfferMark = "petal" | "block" | "quarter"

export function OfferMarkShape({ mark, className }: { mark: OfferMark; className?: string }) {
  if (mark === "block") return <Block className={cn("bg-[#8A8E97]", className)} />
  if (mark === "quarter") return <Quarter className={className} />
  return <Petal className={className} />
}

// One offer inside a chooser panel: what it is, who it is for, and (when it has
// one) its single price. The corner shape repeats the tab's mark.
export function OfferCard({
  mark,
  unit,
  badge,
  title,
  description,
  price,
}: {
  mark: OfferMark
  unit: string
  badge?: string
  title: string
  description: string
  price?: string
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-paper p-6 sm:p-7">
      <OfferMarkShape
        mark={mark}
        className={cn(
          "absolute",
          mark === "petal" && "-right-4 -top-4 size-16",
          mark === "block" && "right-0 top-0 size-11",
          mark === "quarter" && "right-0 top-0 size-12 -rotate-90",
        )}
      />
      <p className="flex flex-wrap items-center gap-2 pr-14 text-xs font-bold text-muted-foreground">
        {unit}
        {badge && <span className="rounded-full bg-yellow-soft px-2.5 py-1 text-ink">{badge}</span>}
      </p>
      <h3 className="mt-2 pr-10 text-xl font-black text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-[1.9] text-muted-foreground">{description}</p>
      {price && <p className="mt-4 border-t border-border pt-4 font-display text-2xl font-bold text-ink tabular-nums">{price}</p>}
    </article>
  )
}
