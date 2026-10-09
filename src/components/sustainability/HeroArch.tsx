// Hero: the bridge taken apart. Six voussoirs and a flame keystone stand on two
// piers; the four labels underneath are the page's through-line
// (docs/redesign/pages-v2/sustainability/01-page-plan.md §4).

const CX = 260
const CY = 270
const OUTER = 242
const INNER = 198
const SLOTS = 7 // the middle slot is left open for the keystone
const GAP = 2.2 // degrees between stones

const point = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY - r * Math.sin(a)).toFixed(1)}`
}

// Annular sectors from the left springing (180°) to the right one (0°).
const stones = Array.from({ length: SLOTS }, (_, i) => {
  const step = 180 / SLOTS
  const from = 180 - i * step - GAP / 2
  const to = 180 - (i + 1) * step + GAP / 2
  return {
    i,
    d: `M${point(OUTER, from)} A${OUTER} ${OUTER} 0 0 1 ${point(OUTER, to)} L${point(INNER, to)} A${INNER} ${INNER} 0 0 0 ${point(INNER, from)} Z`,
  }
}).filter((s) => s.i !== (SLOTS - 1) / 2)

export function HeroArch({ labels }: { labels: readonly string[] }) {
  return (
    <figure className="mx-auto w-full max-w-[520px]">
      <svg viewBox="0 0 520 296" className="h-auto w-full" aria-hidden="true">
        {/* Bridge deck */}
        <line x1="8" x2="512" y1="294" y2="294" stroke="#1F2022" strokeOpacity=".18" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        {/* Piers */}
        <rect x="10" y={CY + 3} width="60" height="20" fill="#4D515B" />
        <rect x="450" y={CY + 3} width="60" height="20" fill="#4D515B" />
        {stones.map((s) => (
          <path key={s.i} d={s.d} fill="#F25232" className="petal-pop" style={{ ["--i" as string]: s.i }} />
        ))}
        {/* Keystone: the full flame mark */}
        <image href="/brand/gungho-mark.svg" x={CX - 31} y="14" width="62" height="80" className="petal-pop" style={{ ["--i" as string]: SLOTS }} />
      </svg>
      <figcaption>
        <ol className="mt-3 flex justify-between text-xs font-bold text-ink/80 sm:text-sm">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
