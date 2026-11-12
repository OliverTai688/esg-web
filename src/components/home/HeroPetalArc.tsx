// S1 · Hero: flame petals fanned along a semicircle form the bridge; the
// flame mark sits inside the arch with clear space all round (rev2 #11: the
// mark must not touch the petals, on desktop or mobile). The two ends are
// labelled with who stands on each side of the bridge.

const CX = 300
const CY = 300
const R = 228
const COUNT = 12 // petals, evenly spread over the half circle
// Teardrop pointing "up" (−y) in local coordinates, like one flame stroke.
const PETAL = "M0 0 C 15 -11, 19 -36, 0 -60 C -19 -36, -15 -11, 0 0 Z"
// The mark (74.13 × 95.22) inside the arch. Its farthest corner is about 185
// from the arch centre, so there are 40+ units of space to the petal bases at R.
const MARK_W = 96
const MARK_H = 123
const MARK_Y = 122

const petals = Array.from({ length: COUNT }, (_, i) => {
  const theta = (Math.PI * (COUNT - 1 - i)) / (COUNT - 1) // 180° → 0°
  const x = CX + R * Math.cos(theta)
  const y = CY - R * Math.sin(theta)
  const rotate = 90 - (theta * 180) / Math.PI
  // Alternating yellow and orange, mirrored so both ends match.
  const fill = Math.min(i, COUNT - 1 - i) % 2 ? "#E8532A" : "#F9A500"
  return { x, y, rotate, fill, i }
})

export function HeroPetalArc({ left, right, center }: { left: string; right: string; center: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      {/* Petal tips reach R + 60 from the centre, so the box spans 12…588 plus a margin. */}
      <svg viewBox="4 4 592 320" className="h-auto w-full" aria-hidden="true">
        {/* Bridge deck */}
        <line x1="62" x2="538" y1={CY + 8} y2={CY + 8} stroke="#1F2022" strokeOpacity=".18" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        {petals.map((p) => (
          <g key={p.i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rotate.toFixed(1)})`}>
            <path d={PETAL} fill={p.fill} className="petal-pop" style={{ ["--i" as string]: p.i }} />
          </g>
        ))}
        {/* The flame mark, centred in the arch */}
        <image href="/brand/gungho-mark.svg" x={CX - MARK_W / 2} y={MARK_Y} width={MARK_W} height={MARK_H} className="petal-pop" style={{ ["--i" as string]: COUNT }} />
        {/* Piers */}
        <circle cx="72" cy={CY + 8} r="9" fill="#F9A500" />
        <circle cx="528" cy={CY + 8} r="9" fill="#E8532A" />
      </svg>
      <figcaption className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-3 text-xs font-bold text-ink/80 sm:text-sm">
        <span>{left}</span>
        <span className="rounded-full bg-ink px-3 py-1 text-white">{center}</span>
        <span className="text-right">{right}</span>
      </figcaption>
    </figure>
  )
}
