import { cn } from "@/lib/utils"

interface PainPoint {
  label: string
  title: string
  description: string
}

// S3 · Problem: three problems and one answer sit in a 2×2 grid. Each cell
// carries a quarter-disc in its inner corner; together the four quarters close
// into one disc — the gap is filled by the answer (home-v2 decision S3-A).
// On phones the grid stacks and each quarter stays as a corner accent.
const QUARTERS = [
  // position of the quarter inside the cell + which corner is rounded
  { box: "md:bottom-0 md:right-0 md:top-auto md:left-auto", radius: "rounded-tl-full", fill: "bg-brand-orange" },
  { box: "md:bottom-0 md:left-0 md:top-auto md:right-auto", radius: "rounded-tr-full", fill: "bg-brand-yellow" },
  { box: "md:top-0 md:right-0 md:bottom-auto md:left-auto", radius: "rounded-bl-full", fill: "bg-brand-grey" },
]

export function ProblemMosaic({
  painPoints,
  solution,
}: {
  painPoints: readonly PainPoint[]
  solution: { label: string; title: string; description: string; pillars: readonly string[] }
}) {
  return (
    <div className="relative">
      <ol className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2 md:[grid-template-rows:1fr_1fr]">
        {painPoints.slice(0, 3).map((p, i) => (
          <li
            key={p.title}
            className={cn(
              "relative min-h-[15rem] border-border p-7 sm:p-9",
              i === 0 && "md:border-r md:border-b md:pr-28 md:pb-24",
              i === 1 && "border-t md:border-t-0 md:border-b md:pl-28 md:pb-24",
              i === 2 && "border-t md:border-t-0 md:border-r md:pr-28 md:pt-24",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("absolute right-0 top-0 size-14 md:size-24", QUARTERS[i].box, QUARTERS[i].radius, QUARTERS[i].fill)}
            />
            <p className="font-display text-sm font-bold text-primary">0{i + 1}</p>
            <p className="mt-3 text-xs font-bold text-muted-foreground">{p.label}</p>
            <h3 className="mt-1.5 text-xl font-black leading-snug text-ink">{p.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-[1.9] text-muted-foreground">{p.description}</p>
          </li>
        ))}
        {/* The answer completes the disc */}
        <li className="relative bg-surface-dark p-7 text-white sm:p-9 md:pl-28 md:pt-24">
          <span aria-hidden="true" className="absolute right-0 top-0 size-14 rounded-br-full bg-brand-orange md:left-0 md:right-auto md:size-24" />
          <p className="text-xs font-bold tracking-[0.12em] text-brand-yellow">{solution.label}</p>
          <h3 className="mt-2 text-2xl font-black leading-snug">{solution.title}</h3>
          <p className="mt-3 text-sm leading-[1.9] text-white/75">{solution.description}</p>
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {solution.pillars.map((pillar) => (
              <li key={pillar} className="rounded-xl border border-white/15 px-3 py-2.5 text-center text-sm font-bold">
                {pillar}
              </li>
            ))}
          </ul>
        </li>
      </ol>
      {/* Centre of the assembled disc */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-paper md:block"
      />
    </div>
  )
}
