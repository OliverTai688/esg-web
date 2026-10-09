import { cn } from "@/lib/utils"
import { learningSections, petalAngle, type LearningSectionId } from "@/lib/learning-sections"

// One petal pointing up from the centre: two quarter-circle arcs between (0,-8) and (0,-48).
const PETAL = "M0-8A28.3 28.3 0 0 1 0-48 28.3 28.3 0 0 1 0-8Z"

const TONES = {
  // rest petal, lit petal, centre
  light: { rest: "#FAB40A", restOpacity: 0.4, lit: "#F25232", centre: "#4D515B" },
  dark: { rest: "#FFFFFF", restOpacity: 0.22, lit: "#FAB40A", centre: "#FFFFFF" },
  yellow: { rest: "#FFFFFF", restOpacity: 0.75, lit: "#F25232", centre: "#1F2022" },
} as const

// The topic mark used across the knowledge pages: the six-petal topic flower
// with one petal lit. Each topic always sits on the same petal, so the mark
// reads the same on a list row, an article header and a topic page. With no
// topic (e.g. announcements) only the centre is lit. Decorative: always pair it
// with the topic name in text.
export function FlowerGlyph({
  topic,
  tone = "light",
  className,
}: {
  topic?: LearningSectionId
  tone?: keyof typeof TONES
  className?: string
}) {
  const t = TONES[tone]
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className={cn("shrink-0", className)}>
      {learningSections.map((s, i) => (
        <path
          key={s.id}
          d={PETAL}
          transform={`rotate(${petalAngle(i)})`}
          fill={s.id === topic ? t.lit : t.rest}
          fillOpacity={s.id === topic ? 1 : t.restOpacity}
        />
      ))}
      <circle r={topic ? 4 : 9} fill={topic ? t.centre : t.lit} />
    </svg>
  )
}
