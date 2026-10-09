"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Value {
  title: string
  description: string
}

// The core values as the stones of one arch: each stone is a tab, the chosen
// value's name sits under the arch and its sentence below it. Every sentence is
// in the HTML (inactive ones carry `hidden`). Keyboard: ←/→, Home/End.
export function ValuesArch({ items, label, className }: { items: readonly Value[]; label: string; className?: string }) {
  const uid = React.useId()
  const [active, setActive] = React.useState(0)
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: React.KeyboardEvent) => {
    const next =
      event.key === "ArrowRight" ? (active + 1) % items.length
      : event.key === "ArrowLeft" ? (active - 1 + items.length) % items.length
      : event.key === "Home" ? 0
      : event.key === "End" ? items.length - 1
      : -1
    if (next < 0) return
    event.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="relative mx-auto aspect-[1/0.6] w-full max-w-[620px]">
        {items.map((item, i) => {
          // Stones spread over a semicircle, left springing → right landing.
          const angle = ((162 - (i * 144) / (items.length - 1)) * Math.PI) / 180
          const selected = i === active
          return (
            <button
              key={item.title}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              style={{ left: `${(50 + 39.5 * Math.cos(angle)).toFixed(2)}%`, top: `${(94 - 78 * Math.sin(angle)).toFixed(2)}%` }}
              className={cn(
                "absolute flex size-[clamp(3.5rem,17vw,5.5rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl px-1 text-center text-[13px] font-black leading-tight text-ink outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base",
                selected ? "bg-brand-orange" : "bg-card shadow-[inset_0_0_0_2px_#F25232] hover:bg-orange-soft",
              )}
            >
              {item.title}
            </button>
          )
        })}
        {/* The chosen value, named under the arch (the tab already announces it) */}
        <p aria-hidden="true" className="absolute inset-x-[24%] bottom-0 text-center text-[1.75rem] font-black leading-tight text-ink sm:text-5xl">
          {items[active]?.title}
        </p>
      </div>
      {items.map((item, i) => (
        <p
          key={item.title}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
          className="mx-auto mt-4 min-h-14 max-w-xl text-center text-base leading-[1.8] text-ink/80 sm:text-lg"
        >
          {item.description}
        </p>
      ))}
    </div>
  )
}
