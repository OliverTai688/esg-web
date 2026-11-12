import { cn } from "@/lib/utils"

// rev2 #29: the Dual-Impact Leverage Model as drawn in chapter 2 of the book:
// environmental value + social value, two capsules side by side, whose lines
// meet at the leverage point and run down to economic value. Built from text
// and borders (not an image) so the labels translate (R31) and read aloud in
// order. Sits on the dark #difference section.
export function DualBenefitArch({
  labels,
  className,
}: {
  labels: { left: string; right: string; pivot: string; result: string }
  className?: string
}) {
  const capsule = "flex min-h-14 items-center justify-center rounded-full px-3 py-2.5 text-center text-sm font-black leading-tight sm:text-base"
  const line = "border-white/45"
  return (
    <figure className={cn("max-w-[460px]", className)}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <p className={cn(capsule, "bg-[#8A8E97] text-ink")}>{labels.left}</p>
        <p className="px-3 text-3xl font-black leading-none text-primary">+</p>
        <p className={cn(capsule, "bg-brand-grey text-white ring-1 ring-white/25")}>{labels.right}</p>
        {/* The two lines come down from the capsule centres and join */}
        <span aria-hidden="true" className={cn("ml-[50%] h-7 border-b-2 border-l-2", line)} />
        <span aria-hidden="true" className={cn("h-7 border-b-2", line)} />
        <span aria-hidden="true" className={cn("mr-[50%] h-7 border-b-2 border-r-2", line)} />
      </div>
      {/* The leverage point where they meet, then down to economic value */}
      <div className={cn("relative mx-auto h-11 w-0 border-l-2", line)}>
        <span aria-hidden="true" className="absolute -left-[5px] -top-[7px] size-3 rounded-full bg-brand-yellow ring-4 ring-surface-dark" />
        <p className="absolute left-3 top-1 whitespace-nowrap text-xs font-bold text-brand-yellow sm:text-sm">{labels.pivot}</p>
        <span aria-hidden="true" className="absolute -bottom-px -left-[5px] size-3 rotate-45 border-b-2 border-r-2 border-white/45" />
      </div>
      <p className={cn(capsule, "mx-auto mt-1 min-h-16 w-3/5 bg-brand-orange text-lg text-white sm:text-xl")}>{labels.result}</p>
    </figure>
  )
}
