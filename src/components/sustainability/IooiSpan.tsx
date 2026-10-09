import { cn } from "@/lib/utils"

interface Step {
  en: string
  zh: string
  description: string
}

// IOOI as one span built in four pieces, cool grey → deep orange. The control
// points sit at thirds, so x is linear in t and each piece sits over its column.
const P = [
  [14, 118],
  [271, -22],
  [529, -22],
  [786, 118],
] as const
const COLORS = ["#8A8E97", "#FAB40A", "#F25232", "#C0391A"]
const BORDERS = ["border-[#8A8E97]", "border-brand-yellow", "border-brand-orange", "border-primary"]
const SLICE = 0.02 // gap between pieces, in t

const lerp = (a: readonly number[], b: readonly number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

// The part of the cubic between t0 and t1 (de Casteljau, twice).
function piece(t0: number, t1: number) {
  const split = (pts: readonly (readonly number[])[], t: number) => {
    const a = lerp(pts[0], pts[1], t)
    const b = lerp(pts[1], pts[2], t)
    const c = lerp(pts[2], pts[3], t)
    const d = lerp(a, b, t)
    const e = lerp(b, c, t)
    const f = lerp(d, e, t)
    return { left: [pts[0], a, d, f], right: [f, e, c, pts[3]] }
  }
  const head = split(P, t1).left
  const [a, b, c, d] = split(head, t0 / t1).right
  const xy = (p: readonly number[]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`
  return `M${xy(a)} C${xy(b)} ${xy(c)} ${xy(d)}`
}

export function IooiSpan({ steps, className }: { steps: readonly Step[]; className?: string }) {
  const n = steps.length
  return (
    <div className={className}>
      <svg viewBox="0 0 800 130" fill="none" className="block h-auto w-full" aria-hidden="true">
        {steps.map((step, i) => (
          <path key={step.en} d={piece(i / n + (i ? SLICE / 2 : 0.004), (i + 1) / n - (i < n - 1 ? SLICE / 2 : 0))} stroke={COLORS[i % COLORS.length]} strokeWidth="24" />
        ))}
      </svg>
      <ol className="mt-2 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6">
        {steps.map((step, i) => (
          <li key={step.en} className={cn("border-t-[5px] pt-3", BORDERS[i % BORDERS.length])}>
            <p className="text-xl font-black text-ink sm:text-2xl">{step.zh}</p>
            {step.en !== step.zh && <p className="font-display text-sm font-bold text-muted-foreground">{step.en}</p>}
            <p className="mt-2 text-sm leading-[1.7] text-ink/75">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
