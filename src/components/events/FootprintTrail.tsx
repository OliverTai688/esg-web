// Hero visual for /events: footprints on the bridge deck. Each disc is a step,
// growing as the path climbs; the flame stands on the latest one and a dashed
// disc marks the step not taken yet (picked up by the "next cohort" section).
// Discs sit on the cubic M40 300 C 40 160, 220 70, 500 60 at t = 0, .25, .5, .75, 1.
const DECK = "M40 300 C 40 160, 220 70, 500 60"
const STEPS = [
  { x: 40, y: 300, r: 10, fill: "#FAB40A" },
  { x: 72.5, y: 205, r: 16, fill: "#F25232" },
  { x: 165, y: 131, r: 24, fill: "#FAB40A" },
  { x: 310, y: 82, r: 34, fill: "#F25232" },
]

export function FootprintTrail({ start, next }: { start: string; next: string }) {
  return (
    <figure className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 330" className="h-auto w-full" aria-hidden="true">
        <path d={DECK} fill="none" stroke="#1F2022" strokeOpacity=".22" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" />
        {STEPS.map((s, i) => (
          <circle key={s.x} cx={s.x} cy={s.y} r={s.r} fill={s.fill} className="petal-pop" style={{ ["--i" as string]: i * 2 }} />
        ))}
        {/* The walker: the full flame mark on the latest step */}
        <image href="/brand/gungho-mark.svg" x="287" y="-8" width="46" height="59" className="petal-pop" style={{ ["--i" as string]: 8 }} />
        {/* The next step, not landed yet */}
        <circle cx="500" cy="60" r="27" fill="#FBF8F4" stroke="#1F2022" strokeOpacity=".45" strokeWidth="2.5" strokeDasharray="7 7" className="petal-pop" style={{ ["--i" as string]: 10 }} />
      </svg>
      <figcaption className="-mt-3 flex items-start justify-between pl-[4%] pr-[5%] text-xs font-bold text-ink/80 sm:text-sm">
        <span>{start}</span>
        <span>{next}</span>
      </figcaption>
    </figure>
  )
}
