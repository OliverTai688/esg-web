// S1 · Hero: flame petals fanned along a semicircle form the bridge, with the
// full flame mark as its keystone (home-v2 decision S1-B, light version).
// The two ends are labelled with who stands on each side of the bridge.

const CX = 300
const CY = 300
const R = 228
const COUNT = 12 // petals; the top position is left free for the flame
// Teardrop pointing "up" (−y) in local coordinates, like one flame stroke.
const PETAL = "M0 0 C 15 -11, 19 -36, 0 -60 C -19 -36, -15 -11, 0 0 Z"

const petals = Array.from({ length: COUNT }, (_, i) => {
  // Spread over 180°→0°, skipping a gap around 90° for the keystone.
  const t = i / (COUNT - 1)
  const deg = 180 - t * 180
  const skew = deg > 90 ? -9 : 9
  const theta = ((deg + (Math.abs(deg - 90) < 12 ? skew : 0)) * Math.PI) / 180
  const x = CX + R * Math.cos(theta)
  const y = CY - R * Math.sin(theta)
  const rotate = 90 - (theta * 180) / Math.PI
  // Yellow toward the partners' end, orange toward the enterprise end.
  const fill = i < COUNT / 2 ? (i % 2 ? "#F25232" : "#FAB40A") : i % 2 ? "#FAB40A" : "#F25232"
  return { x, y, rotate, fill, i }
})

export function HeroPetalArc({ left, right, center }: { left: string; right: string; center: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="40 40 520 290" className="h-auto w-full" aria-hidden="true">
        {/* Bridge deck */}
        <line x1="62" x2="538" y1={CY + 8} y2={CY + 8} stroke="#1F2022" strokeOpacity=".18" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        {petals.map((p) => (
          <g key={p.i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rotate.toFixed(1)})`}>
            <path d={PETAL} fill={p.fill} className="petal-pop" style={{ ["--i" as string]: p.i }} />
          </g>
        ))}
        {/* Keystone: the full flame mark */}
        <image href="/brand/gungho-mark.svg" x={CX - 34} y={CY - R - 52} width="68" height="88" className="petal-pop" style={{ ["--i" as string]: COUNT }} />
        {/* Piers */}
        <circle cx="72" cy={CY + 8} r="9" fill="#FAB40A" />
        <circle cx="528" cy={CY + 8} r="9" fill="#F25232" />
      </svg>
      <figcaption className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-3 text-xs font-bold text-ink/80 sm:text-sm">
        <span>{left}</span>
        <span className="rounded-full bg-ink px-3 py-1 text-white">{center}</span>
        <span className="text-right">{right}</span>
      </figcaption>
    </figure>
  )
}
