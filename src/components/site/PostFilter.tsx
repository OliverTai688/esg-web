"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PostCard, type PostSummary } from "@/components/site/PostCard"

// Rows shown before "show all": four on phones, six from `md` up.
const FIRST_PHONE = 4
const FIRST_DESKTOP = 6

// The full article list with topic filters. Every row is in the HTML: rows past
// the first screenful carry `hidden` until the visitor asks for the rest.
export function PostFilter({
  posts,
  categories,
  labels,
  locale,
}: {
  posts: PostSummary[]
  categories: { slug: string; name: string; count: number }[]
  /** `showAll` contains "{n}" for the number of articles in the current filter. */
  labels: { all: string; filter: string; showAll: string; minRead: string }
  locale: string
}) {
  const [active, setActive] = React.useState("all")
  const [expanded, setExpanded] = React.useState(false)
  const shown = active === "all" ? posts : posts.filter((p) => p.categorySlug === active)

  const pill = (slug: string, label: string, count: number) => (
    <button
      key={slug}
      type="button"
      aria-pressed={active === slug}
      onClick={() => {
        setActive(slug)
        setExpanded(false)
      }}
      className={cn(
        "flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        active === slug ? "bg-ink text-white" : "bg-card text-ink/80 hover:text-ink",
      )}
    >
      {label}
      <span className={cn("font-display text-xs", active === slug ? "text-brand-yellow" : "text-muted-foreground")}>{count}</span>
    </button>
  )

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
        {pill("all", labels.all, posts.length)}
        {categories.map((c) => pill(c.slug, c.name, c.count))}
      </div>
      <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            hidden={!expanded && i >= FIRST_DESKTOP}
            className={cn(!expanded && i >= FIRST_PHONE && i < FIRST_DESKTOP && "max-md:hidden")}
          >
            <PostCard post={p} href={`/${locale}/learning/${p.slug}`} minRead={labels.minRead} />
          </li>
        ))}
      </ul>
      {!expanded && shown.length > FIRST_PHONE && (
        <div className={cn("mt-6 flex justify-center", shown.length <= FIRST_DESKTOP && "md:hidden")}>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-7 text-sm font-bold text-ink outline-none transition-colors hover:border-ink/40 hover:bg-ink/[0.04] focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
          >
            {labels.showAll.replace("{n}", String(shown.length))}
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
