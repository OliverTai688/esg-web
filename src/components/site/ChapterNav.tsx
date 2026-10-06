"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Chapter {
  id: string
  label: string
}

// Sticky in-page navigation for long pages. Highlights the chapter in view and
// scrolls the active pill into view on narrow screens.
export function ChapterNav({ chapters, label }: { chapters: readonly Chapter[]; label: string }) {
  const [active, setActive] = React.useState(chapters[0]?.id)
  const listRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-120px 0px -60% 0px" },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [chapters])

  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    const list = listRef.current
    if (el && list) list.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" })
  }, [active])

  return (
    <nav aria-label={label} className="sticky top-[68px] z-40 border-b border-border/70 bg-background/90 backdrop-blur-lg">
      <ul ref={listRef} className="mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-4 py-2.5 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chapters.map((c, i) => (
          <li key={c.id} data-id={c.id} className="shrink-0">
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                active === c.id ? "bg-ink text-white" : "text-muted-foreground hover:bg-ink/[0.05] hover:text-ink",
              )}
            >
              <span className={cn("font-display text-[11px] tabular-nums", active === c.id ? "text-brand-yellow" : "text-muted-foreground")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
