import { cn } from "@/lib/utils"

// The site's shape grammar (docs/redesign/home-v2/02-master-plan.md §2), as
// decorative elements. Every shape comes from the logo: size it with `size-*`
// / `w-* h-*`, colour it with `bg-*`, turn it with `rotate-90` steps or
// `-scale-x-100`. All are aria-hidden: they never carry meaning on their own.

// `style` is for the motion variables (`--i`, `--gx`, `--gy`, `--gr`).
type ShapeProps = { className?: string; style?: React.CSSProperties }

/** Flame stroke. Stands for value-driven partners (yellow by default). */
export function Petal({ className, style }: ShapeProps) {
  return <span aria-hidden="true" style={style} className={cn("block shrink-0 rounded-tr-full rounded-bl-full bg-brand-yellow", className)} />
}

/** Quarter disc. Four of them (0/90/180/270°) make one disc. */
export function Quarter({ className, style }: ShapeProps) {
  return <span aria-hidden="true" style={style} className={cn("block shrink-0 rounded-tl-full bg-brand-orange", className)} />
}

/** Half disc (give it a 2:1 box, e.g. `h-5 w-10`). */
export function Half({ className, style }: ShapeProps) {
  return <span aria-hidden="true" style={style} className={cn("block shrink-0 rounded-t-full bg-brand-orange", className)} />
}

/** Full disc: a result, something completed. */
export function Disc({ className, style }: ShapeProps) {
  return <span aria-hidden="true" style={style} className={cn("block shrink-0 rounded-full bg-brand-orange", className)} />
}

/** Flat CIS block. Stands for enterprises (grey by default). */
export function Block({ className, style }: ShapeProps) {
  return <span aria-hidden="true" style={style} className={cn("block shrink-0 bg-brand-grey", className)} />
}

/**
 * Arched top edge for a section (transition T4). Put it first inside a
 * `relative` section and give it the section's background colour:
 *   <section className="relative bg-sand …"><ArchSeam className="bg-sand" />…
 */
export function ArchSeam({ className }: ShapeProps) {
  return <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 bottom-full h-[clamp(40px,7vw,110px)] translate-y-px rounded-t-[50%_100%]", className)} />
}

/**
 * A shape that sits on the boundary between two sections (transition T1).
 * Place between the sections; `className` lays out the row the shape sits in,
 * e.g. `justify-end pr-[8%]` or `justify-center`.
 */
export function Seam({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
      <div className={cn("absolute inset-x-0 top-0 flex -translate-y-1/2", className)}>{children}</div>
    </div>
  )
}

/**
 * A single arc (the bridge), drawn as an SVG stroke so it can be any colour and
 * weight. `draw` makes it draw itself in as it scrolls into view.
 */
export function Arc({ className, color = "#F25232", weight = 22, draw = false }: ShapeProps & { color?: string; weight?: number; draw?: boolean }) {
  return (
    <svg viewBox="0 0 400 210" fill="none" aria-hidden="true" className={cn("h-auto w-full", className)}>
      <path d="M12 198 C 12 80, 110 12, 200 12 S 388 80, 388 198" stroke={color} strokeWidth={weight} strokeLinecap="round" pathLength={1} className={draw ? "scroll-draw" : undefined} />
    </svg>
  )
}
