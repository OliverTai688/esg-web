"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { petalAngle } from "@/lib/learning-sections"

export interface TopicPetal {
  id: string
  /** Name on the petal. */
  short: string
  count: number
  /** The topic's own page: where the petal goes without JavaScript. */
  href: string
  /** Server-rendered panel for this topic. */
  panel: React.ReactNode
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

// /learning · 六大主題: the six topics are six petals around one centre, and the
// petals are the tab list (learning decision S2-A). Picking a petal shows that
// topic's panel; every panel is in the HTML, inactive ones carry `hidden`.
// A topic id in the URL hash (`/learning#market`, used by back links and old
// bookmarks) opens that topic. Petals unfold from the centre as the section
// scrolls in; at rest the flower is complete.
export function TopicExplorer({
  header,
  topics,
  label,
  countLabel,
}: {
  /** Section heading, placed above the panel on wide screens and above the flower on phones. */
  header: React.ReactNode
  topics: readonly TopicPetal[]
  /** Accessible name of the petal tab list. */
  label: string
  /** Unit read out after a petal's article count. */
  countLabel: string
}) {
  const hash = React.useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => "",
  )
  // A pick only holds for the hash it was made under, so a later deep link wins.
  const [picked, setPicked] = React.useState<{ id: string; hash: string }>()
  const fromHash = topics.find((t) => t.id === hash)?.id
  const active = picked && picked.hash === hash ? picked.id : (fromHash ?? picked?.id ?? topics[0]?.id)
  const refs = React.useRef<Record<string, HTMLAnchorElement | null>>({})

  const select = (id: string) => setPicked({ id, hash })

  const onKeyDown = (event: React.KeyboardEvent) => {
    const i = topics.findIndex((t) => t.id === active)
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (i + 1) % topics.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (i - 1 + topics.length) % topics.length
      : event.key === "Home" ? 0
      : event.key === "End" ? topics.length - 1
      : -1
    if (next < 0) return
    event.preventDefault()
    select(topics[next].id)
    refs.current[topics[next].id]?.focus()
  }

  return (
    <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:grid-rows-[auto_1fr]">
      <div className="lg:col-start-1 lg:row-start-1">{header}</div>

      {/* The flower: petal boxes are 32% of the flower, pushed out from the centre and turned */}
      <ul
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative mx-auto aspect-square w-full max-w-[440px] [container-type:inline-size] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
      >
        {topics.map((t, i) => {
          const angle = petalAngle(i)
          const selected = t.id === active
          // The two horizontal petals have room for a longer line of text
          const wide = angle % 180 === 90
          return (
            <li key={t.id} role="presentation" className="absolute left-[34%] top-[34%] size-[32%]" style={{ transform: `rotate(${angle}deg) translateY(-85%)` }}>
              <div className="scroll-gather size-full" style={{ "--gy": "55%", "--gr": "-25deg" } as React.CSSProperties}>
                <Link
                  ref={(el) => {
                    refs.current[t.id] = el
                  }}
                  href={t.href}
                  prefetch={false}
                  role="tab"
                  id={`topic-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`topic-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={(event) => {
                    // Let modified clicks open the topic page in a new tab
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                    event.preventDefault()
                    select(t.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === " " || event.key === "Enter") {
                      event.preventDefault()
                      select(t.id)
                    }
                  }}
                  className={cn(
                    "flex size-full rotate-45 items-center justify-center rounded-tr-full rounded-bl-full text-ink outline-none transition-[scale,background-color] duration-500 focus-visible:ring-4 focus-visible:ring-ring/60",
                    selected ? "scale-100 bg-brand-orange" : "scale-[0.92] bg-brand-yellow hover:scale-100",
                  )}
                >
                  <span
                    className={cn("flex shrink-0 flex-col items-center text-center text-[clamp(11px,3.6cqw,14px)] font-bold leading-tight", wide ? "w-[30cqw]" : "w-[21cqw]")}
                    style={{ rotate: `${-(45 + angle)}deg` }}
                  >
                    {t.short}
                    <span className="mt-0.5 font-display text-[0.85em] tabular-nums">
                      {t.count}
                      <span className="sr-only"> {countLabel}</span>
                    </span>
                  </span>
                </Link>
              </div>
            </li>
          )
        })}
        <li role="presentation" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-grey" />
      </ul>

      <div className="lg:col-start-1 lg:row-start-2">
        {topics.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`topic-panel-${t.id}`}
            aria-labelledby={`topic-tab-${t.id}`}
            hidden={t.id !== active}
            tabIndex={0}
            className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            {t.panel}
          </div>
        ))}
      </div>
    </div>
  )
}
