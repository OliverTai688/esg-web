"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// A horizontal, swipeable row of cards (CSS scroll-snap). On phones one card
// shows with the next one peeking in; arrows appear from `md` up. All cards are
// in the HTML, so nothing is lost without JavaScript — it is just a scrollable row.
// Each item is `relative` so absolutely positioned children (e.g. `sr-only` text)
// stay inside the scroll box instead of widening the page.
export function SnapRail({
  children,
  label,
  prevLabel,
  nextLabel,
  tone = "light",
  itemClassName = "w-[82%] sm:w-[46%] lg:w-[31.5%]",
  className,
}: {
  children: React.ReactNode
  /** Accessible name of the row. */
  label: string
  prevLabel: string
  nextLabel: string
  tone?: "light" | "dark"
  /** Width of each card at each breakpoint. */
  itemClassName?: string
  className?: string
}) {
  const ref = React.useRef<HTMLUListElement>(null)
  const [edge, setEdge] = React.useState({ start: true, end: false })
  const dark = tone === "dark"

  const update = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }, [])

  React.useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }

  const arrow = cn(
    "flex size-11 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
    dark ? "border-white/30 text-white hover:bg-white/10" : "border-ink/20 text-ink hover:bg-ink/[0.05]",
  )

  return (
    <div className={className}>
      <ul
        ref={ref}
        aria-label={label}
        onScroll={update}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child) => (
          <li className={cn("relative shrink-0 snap-start", itemClassName)}>{child}</li>
        ))}
      </ul>
      <div className={cn("mt-4 hidden justify-end gap-2 md:flex", edge.start && edge.end && "md:hidden")}>
        <button type="button" className={arrow} onClick={() => step(-1)} disabled={edge.start} aria-label={prevLabel}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" className={arrow} onClick={() => step(1)} disabled={edge.end} aria-label={nextLabel}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
