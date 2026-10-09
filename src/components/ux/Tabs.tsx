"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TabItem {
  id: string
  label: React.ReactNode
  /** Small text after the label, e.g. a count or a year. */
  meta?: React.ReactNode
  content: React.ReactNode
}

// A fragment sent from a server component arrives here as a keyless array;
// toArray gives its items stable keys.
const node = (value: React.ReactNode) => (Array.isArray(value) ? React.Children.toArray(value) : value)

// Tabs that show one panel at a time. Every panel is in the HTML (inactive ones
// carry `hidden`), so the copy stays indexable and in-page search can find it.
// Keyboard: ←/→ move between tabs, Home/End jump to the ends.
export function Tabs({
  items,
  label,
  tone = "light",
  variant = "pill",
  defaultId,
  className,
  panelClassName,
}: {
  items: readonly TabItem[]
  /** Accessible name of the tab list. */
  label: string
  tone?: "light" | "dark"
  variant?: "pill" | "underline"
  defaultId?: string
  className?: string
  panelClassName?: string
}) {
  const uid = React.useId()
  const [active, setActive] = React.useState(defaultId ?? items[0]?.id)
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({})
  const dark = tone === "dark"

  const onKeyDown = (event: React.KeyboardEvent) => {
    const i = items.findIndex((t) => t.id === active)
    const next =
      event.key === "ArrowRight" ? (i + 1) % items.length
      : event.key === "ArrowLeft" ? (i - 1 + items.length) % items.length
      : event.key === "Home" ? 0
      : event.key === "End" ? items.length - 1
      : -1
    if (next < 0) return
    event.preventDefault()
    setActive(items[next].id)
    refs.current[items[next].id]?.focus()
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn(
          "-mx-6 flex gap-1.5 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden",
          variant === "underline" && cn("gap-0 border-b", dark ? "border-white/15" : "border-border"),
        )}
      >
        {items.map((t) => {
          const selected = t.id === active
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                variant === "pill"
                  ? cn(
                      "rounded-full px-4",
                      selected
                        ? dark ? "bg-brand-yellow text-ink" : "bg-ink text-white"
                        : dark ? "bg-white/[0.08] text-white/80 hover:bg-white/[0.14]" : "bg-ink/[0.05] text-ink/75 hover:bg-ink/[0.09]",
                    )
                  : cn(
                      "-mb-px border-b-2 px-4",
                      selected
                        ? dark ? "border-brand-yellow text-white" : "border-primary text-ink"
                        : dark ? "border-transparent text-white/65 hover:text-white" : "border-transparent text-muted-foreground hover:text-ink",
                    ),
              )}
            >
              {node(t.label)}
              {t.meta && <span className="font-display text-xs font-bold opacity-70">{node(t.meta)}</span>}
            </button>
          )
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className={cn("mt-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4", panelClassName)}
        >
          {node(t.content)}
        </div>
      ))}
    </div>
  )
}
