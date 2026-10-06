"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PostCard, type PostSummary } from "@/components/site/PostCard"

// One article list with topic filters. Without JS every article is listed.
export function PostFilter({
  posts,
  categories,
  allLabel,
  minRead,
  locale,
}: {
  posts: PostSummary[]
  categories: { slug: string; name: string; count: number }[]
  allLabel: string
  minRead: string
  locale: string
}) {
  const [active, setActive] = React.useState("all")
  const shown = active === "all" ? posts : posts.filter((p) => p.categorySlug === active)
  const pill = (slug: string, label: string, count: number) => (
    <button
      key={slug}
      type="button"
      aria-pressed={active === slug}
      onClick={() => setActive(slug)}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active === slug ? "border-ink bg-ink text-white" : "border-border bg-card text-ink/75 hover:border-ink/40",
      )}
    >
      {label} <span className={cn("font-display text-xs", active === slug ? "text-brand-yellow" : "text-muted-foreground")}>{count}</span>
    </button>
  )

  return (
    <div>
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
        {pill("all", allLabel, posts.length)}
        {categories.map((c) => pill(c.slug, c.name, c.count))}
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} href={`/${locale}/learning/${p.slug}`} minRead={minRead} />
          </li>
        ))}
      </ul>
    </div>
  )
}
