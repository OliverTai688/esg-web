import { cn } from "@/lib/utils"

// The /events protagonist is the disc: one disc is one step. These are its
// states beyond the plain shapes in src/components/geo/shapes.tsx
// (docs/redesign/pages-v2/events/01-page-plan.md §3).

/** A step not taken yet: a dashed, unfilled disc. Size it with `size-*`. */
export function StepRing({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      aria-hidden={children ? undefined : true}
      className={cn("flex shrink-0 items-center justify-center rounded-full border-[2.5px] border-dashed border-ink/40 text-balance text-center", className)}
    >
      {children}
    </span>
  )
}

/** How far a service walks with you: one dot per step. */
export function Footprints({ count, className }: { count: number; className?: string }) {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cn("size-3 rounded-full bg-brand-orange", className)} />
      ))}
    </span>
  )
}

const TURN = ["", "rotate-90", "-scale-x-100"]

/**
 * Two partners' steps meeting: two half discs close into one, with 共好玟化 as
 * the orange dot between them. `turn` varies the pose (0°, 90°, mirrored).
 * The halves slide together as the card scrolls in; at rest the disc is whole.
 */
export function PartnerDisc({ turn = 0, className }: { turn?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative flex w-fit", TURN[turn % TURN.length], className)}>
      <span className="scroll-gather h-24 w-12 rounded-l-full bg-brand-yellow" style={{ ["--gx" as string]: "-45%" }} />
      <span className="scroll-gather h-24 w-12 rounded-r-full bg-brand-grey" style={{ ["--gx" as string]: "45%" }} />
      <span className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange ring-4 ring-paper" />
    </span>
  )
}
