import { Block, Petal, Quarter } from "@/components/geo/shapes"
import { cn } from "@/lib/utils"

// The through-line of /consulting (docs/redesign/pages-v2/consulting/01-page-plan.md):
// petal (value-driven partner) + block (enterprise) = quarter-disc (共好).
// The hero shows it unsolved, with a caption under each term and a dashed
// outline where the answer goes; the contact section shows it solved.
export function Equation({
  labels,
  solved = false,
  tone = "light",
  animate = false,
  className,
}: {
  /** Captions under the three terms. With labels the shapes are drawn large. */
  labels?: { petal: string; block: string; result: string }
  solved?: boolean
  tone?: "light" | "dark"
  /** Terms slide together as the equation scrolls into view. */
  animate?: boolean
  className?: string
}) {
  const dark = tone === "dark"
  const box = labels ? "size-[clamp(4rem,19vw,7rem)]" : "size-12 sm:size-14"
  const term = cn("flex flex-col items-center", labels && "w-[clamp(4.5rem,22vw,8rem)]")
  const caption = "mt-3 text-center text-xs font-bold leading-snug text-ink/80 sm:text-sm"
  const operator = cn(
    "flex items-center font-display font-black",
    labels ? "h-[clamp(4rem,19vw,7rem)] text-2xl sm:text-3xl" : "h-12 text-xl sm:h-14",
    dark ? "text-white/50" : "text-ink/35",
  )

  return (
    <div
      role={labels ? "img" : undefined}
      aria-label={labels ? `${labels.petal} ＋ ${labels.block} ＝ ${labels.result}` : undefined}
      aria-hidden={labels ? undefined : true}
      className={cn("flex items-start justify-center gap-[clamp(0.4rem,2vw,1.25rem)]", className)}
    >
      <div className={term}>
        <Petal className={cn(box, labels && "petal-pop", animate && "scroll-gather [--gx:-2.5rem]")} />
        {labels && <p className={caption}>{labels.petal}</p>}
      </div>
      <span aria-hidden="true" className={operator}>
        ＋
      </span>
      <div className={term}>
        <Block className={cn(box, dark && "bg-[#8A8E97]", labels && "petal-pop [--i:2]", animate && "scroll-gather [--gx:2.5rem]")} />
        {labels && <p className={caption}>{labels.block}</p>}
      </div>
      <span aria-hidden="true" className={operator}>
        ＝
      </span>
      <div className={term}>
        {solved ? (
          <Quarter className={cn(box, animate && "scroll-turn-in")} />
        ) : (
          <span className={cn("block rounded-tl-full border-[3px] border-dashed border-brand-orange", box, labels && "petal-pop [--i:4]")} />
        )}
        {labels && <p className={caption}>{labels.result}</p>}
      </div>
    </div>
  )
}
