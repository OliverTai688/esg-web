import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Progressive disclosure built on native <details>: works without JavaScript,
// the folded copy stays in the HTML, and browser find-in-page opens it.

export interface FoldItem {
  title: React.ReactNode
  /** Short text before the title, e.g. "01" or a year. */
  meta?: React.ReactNode
  content: React.ReactNode
  open?: boolean
}

// A list of rows that open one at a time (accordion). Use for FAQs, timelines,
// step-by-step detail: the titles are the scannable layer, the content is on demand.
export function FoldList({
  items,
  name,
  tone = "light",
  className,
}: {
  items: readonly FoldItem[]
  /** Rows sharing a name close each other. Leave out to allow several open. */
  name?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <div className={cn("divide-y border-y", dark ? "divide-white/15 border-white/15" : "divide-border border-border", className)}>
      {items.map((item, i) => (
        <details key={i} name={name} open={item.open} className="group">
          <summary
            className={cn(
              "flex min-h-14 cursor-pointer list-none items-center gap-4 py-4 text-base font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
              dark ? "text-white" : "text-ink",
            )}
          >
            {item.meta && <span className={cn("font-display text-sm tabular-nums", dark ? "text-brand-yellow" : "text-primary")}>{item.meta}</span>}
            <span className="flex-1">{item.title}</span>
            <ChevronDown className={cn("size-5 shrink-0 transition-transform group-open:rotate-180", dark ? "text-white/60" : "text-muted-foreground")} aria-hidden="true" />
          </summary>
          <div className={cn("pb-6 text-sm leading-[1.9]", dark ? "text-white/80" : "text-muted-foreground")}>{item.content}</div>
        </details>
      ))}
    </div>
  )
}

// One "read the rest" toggle under a short lead. Use when a section has a long
// client-supplied passage: show the first line, fold the remainder.
export function ReadMore({
  label,
  children,
  tone = "light",
  defaultOpen = false,
  className,
  contentClassName,
}: {
  label: React.ReactNode
  children: React.ReactNode
  tone?: "light" | "dark"
  defaultOpen?: boolean
  className?: string
  contentClassName?: string
}) {
  const dark = tone === "dark"
  return (
    <details open={defaultOpen} className={cn("group", className)}>
      <summary
        className={cn(
          "inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-bold underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
          dark ? "text-brand-yellow" : "text-primary",
        )}
      >
        {label}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className={cn("mt-3 space-y-4 text-sm leading-[1.9]", dark ? "text-white/80" : "text-muted-foreground", contentClassName)}>{children}</div>
    </details>
  )
}
