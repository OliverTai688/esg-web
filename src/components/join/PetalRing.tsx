import { cn } from "@/lib/utils"

// /join hero: the home hero's petal arch (HeroPetalArc), closed into a full
// ring. The centre is left free for the QR code — the way in.
const CENTER = 220
const RADIUS = 150
const COUNT = 16
// Teardrop pointing "up" (−y) in local coordinates, like one flame stroke.
const PETAL = "M0 0 C 15 -11, 19 -36, 0 -60 C -19 -36, -15 -11, 0 0 Z"
// Partners (yellow), 共好玟化 (orange) and enterprises (grey) in one circle.
const FILLS = ["#FAB40A", "#F25232", "#FAB40A", "#4D515B"]

const petals = Array.from({ length: COUNT }, (_, i) => {
  const deg = (i * 360) / COUNT
  const theta = (deg * Math.PI) / 180
  return {
    i,
    x: (CENTER + RADIUS * Math.sin(theta)).toFixed(1),
    y: (CENTER - RADIUS * Math.cos(theta)).toFixed(1),
    deg,
    fill: FILLS[i % FILLS.length],
  }
})

export function PetalRing({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[400px]", className)}>
      {/* Petal tips reach RADIUS + 60 from the centre: 10…430 inside a 440 box. */}
      <svg viewBox="0 0 440 440" className="size-full" aria-hidden="true">
        {petals.map((p) => (
          <g key={p.i} transform={`translate(${p.x} ${p.y}) rotate(${p.deg})`}>
            <path d={PETAL} fill={p.fill} className="petal-pop" style={{ ["--i" as string]: p.i }} />
          </g>
        ))}
      </svg>
      {/* A square that fits inside the ring's inner circle */}
      <div className="absolute inset-0 m-auto size-[46%]">{children}</div>
    </div>
  )
}
