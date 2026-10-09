"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Chapter {
  id: string
  label: string
}

// Sticky in-page navigation for long pages. Highlights the chapter in view and
// scrolls the active pill into view on narrow screens.
export function ChapterNav({
  chapters,
  label,
  listClassName,
}: {
  chapters: readonly Chapter[]
  label: string
  /** Overrides the pill row's width, e.g. `max-w-3xl` to line up with an article column. */
  listClassName?: string
}) {
  const [active, setActive] = React.useState(chapters[0]?.id)
  const listRef = React.useRef<HTMLUListElement>(null)

  // The active chapter is the last one whose top has passed the line just below
  // the sticky header + pills — the same line anchor links land on, so the pill
  // that was clicked is always the one that lights up.
  React.useEffect(() => {
    const update = () => {
      const line = (listRef.current?.parentElement?.getBoundingClientRect().bottom ?? 120) + 24
      let current = chapters[0]?.id
      for (const c of chapters) {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= line) current = c.id
      }
      // At the very bottom the last chapter may be too short to reach the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const last = chapters.filter((c) => document.getElementById(c.id)).at(-1)
        const el = last && document.getElementById(last.id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.6) current = last.id
      }
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    window.addEventListener("hashchange", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      window.removeEventListener("hashchange", update)
    }
  }, [chapters])

  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    const list = listRef.current
    if (el && list) list.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" })
  }, [active])

  return (
    <nav aria-label={label} data-chapter-nav className="sticky top-[68px] z-40 border-b border-border/70 bg-background/90 backdrop-blur-lg">
      <ul ref={listRef} className={cn("mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-4 py-1 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", listClassName)}>
        {chapters.map((c, i) => (
          <li key={c.id} data-id={c.id} className="shrink-0">
            {/* 44px touch target around a smaller visual pill */}
            <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined} className="group flex min-h-11 items-center outline-none">
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors group-focus-visible:ring-2 group-focus-visible:ring-ring",
                  active === c.id ? "bg-ink text-white" : "text-muted-foreground group-hover:bg-ink/[0.05] group-hover:text-ink",
                )}
              >
                <span className={cn("font-display text-[11px] tabular-nums", active === c.id ? "text-brand-yellow" : "text-muted-foreground")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
