import { cn } from "@/lib/utils"

// The "Sayun = bridge" motif: a single arc spanning two piers.
// Used in heroes and as the connector between home-page chapters.
export function BridgeArc({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const pier = tone === "dark" ? "rgba(255,255,255,0.35)" : "rgba(31,32,34,0.18)"
  return (
    <svg
      viewBox="0 0 600 220"
      fill="none"
      aria-hidden="true"
      className={cn("w-full h-auto", className)}
    >
      <defs>
        <linearGradient id="bridge-arc" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F25232" />
          <stop offset="0.7" stopColor="#F25232" />
          <stop offset="1" stopColor="#FAB40A" />
        </linearGradient>
      </defs>
      <path d="M20 200 C 140 20, 460 20, 580 200" stroke="url(#bridge-arc)" strokeWidth="10" strokeLinecap="round" />
      <path d="M20 200 H580" stroke={pier} strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
      {[0.18, 0.34, 0.5, 0.66, 0.82].map((t) => {
        // Point on the cubic Bézier above, so each hanger meets the arc exactly
        const u = 1 - t
        const x = 20 * u ** 3 + 3 * 140 * u * u * t + 3 * 460 * u * t * t + 580 * t ** 3
        const y = 200 * u ** 3 + 3 * 20 * u * u * t + 3 * 20 * u * t * t + 200 * t ** 3
        return <line key={t} x1={x} x2={x} y1={y + 6} y2={200} stroke={pier} strokeWidth="2" />
      })}
      <circle cx="20" cy="200" r="9" fill="#F25232" />
      <circle cx="580" cy="200" r="9" fill="#FAB40A" />
    </svg>
  )
}
