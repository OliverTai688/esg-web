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
