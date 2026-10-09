import { cn } from "@/lib/utils"

// The dual-benefit theory as the reason an arch stands: two half-arches
// (society & environment / economic value) lean on each other and meet at the
// keystone. The halves draw in as the section scrolls into view; at rest the
// arch is complete.
export function DualBenefitArch({
  labels,
  className,
}: {
  labels: { left: string; keystone: string; right: string }
  className?: string
}) {
  return (
    <figure className={cn("max-w-[460px]", className)}>
      <svg viewBox="0 0 460 150" fill="none" className="block h-auto w-full" aria-hidden="true">
        <path d="M14 138 C 14 70, 110 26, 208 22" stroke="#FAB40A" strokeWidth="20" strokeLinecap="round" pathLength={1} className="scroll-draw" />
        <path d="M446 138 C 446 70, 350 26, 252 22" stroke="#F25232" strokeWidth="20" strokeLinecap="round" pathLength={1} className="scroll-draw" />
        <rect x="216" y="6" width="28" height="32" fill="#FFFFFF" />
      </svg>
      <figcaption className="mt-2 grid grid-cols-[1fr_auto_1fr] items-start gap-2 text-xs font-bold text-white sm:text-sm">
        <span>{labels.left}</span>
        <span className="rounded bg-white px-2.5 py-0.5 text-ink">{labels.keystone}</span>
        <span className="text-right">{labels.right}</span>
      </figcaption>
    </figure>
  )
}
