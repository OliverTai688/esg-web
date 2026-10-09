// S5 · Evidence: the bridge's arch shrinks into a dial of three arcs, one per
// headline number (home-v2 decision S5-B). It straddles the seam with the dark
// story section and turns into place as it scrolls in (transition 4).
const COLORS = ["#F25232", "#FAB40A", "#8A8E97"]

export function EvidenceRing({ caption }: { caption: string }) {
  return (
    <div className="relative mx-auto size-44 sm:size-56" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="scroll-turn-in size-full">
        <circle cx="100" cy="100" r="88" fill="#FFFFFF" />
        {COLORS.map((c, k) => (
          <circle
            key={c}
            cx="100"
            cy="100"
            r="74"
            fill="none"
            stroke={c}
            strokeWidth="24"
            pathLength={360}
            strokeDasharray="112 248"
            strokeDashoffset={-k * 120}
            transform="rotate(-86 100 100)"
          />
        ))}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center whitespace-pre-line text-center text-xs font-bold leading-relaxed text-ink sm:text-sm">
        {caption}
      </span>
    </div>
  )
}
