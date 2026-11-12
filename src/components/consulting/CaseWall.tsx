"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog } from "radix-ui"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface WallTile {
  photo: string
  category: string
  org: string
  activity: string
  text: string
  alt: string
  /** Key of a non-profit case: the tile opens it in a dialog */
  caseKey?: string
}

export interface NpoCase {
  key: string
  title: string
  caption: string
  type: string
  headline: string
  points: readonly string[]
  quote: string
  quoteBy: string
}

const photoSrc = (photo: string) => `/cases/wall/${photo}.webp`

// 02 合作案例 (rev2 #46): the photo wall of recent work. Filter buttons show one
// client type at a time (default: all). Only the four non-profit tiles open,
// in a dialog with their case; the other tiles have no click affordance.
export function CaseWall({
  tiles,
  cases,
  filters,
  labels,
  locale,
}: {
  tiles: readonly WallTile[]
  cases: readonly NpoCase[]
  filters: readonly { key: string; label: string }[]
  labels: { filter: string; open: string; close: string; quote: string }
  locale: string
}) {
  const [filter, setFilter] = React.useState("all")
  const shown = filter === "all" ? tiles : tiles.filter((t) => t.category === filter)
  const quote = (text: string) => (locale === "en" ? `“${text}”` : `「${text}」`)

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "min-h-11 rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === f.key ? "bg-ink text-white" : "bg-card text-ink ring-1 ring-border hover:bg-sand",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((tile) => {
          const npo = tile.caseKey ? cases.find((c) => c.key === tile.caseKey) : undefined
          const body = (
            <>
              <Image
                src={photoSrc(tile.photo)}
                alt={tile.alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 92vw"
                className="aspect-[4/3] w-full rounded-2xl bg-sand object-cover"
              />
              <p className="mt-4 text-xs font-bold leading-snug text-muted-foreground">{tile.org}</p>
              <h3 className="mt-1.5 font-black leading-snug text-ink">{tile.activity}</h3>
              <p className="mt-2 text-sm leading-[1.8] text-ink/80">{tile.text}</p>
            </>
          )
          if (!npo) return <li key={tile.photo}>{body}</li>
          return (
            <li key={tile.photo} className="group relative">
              <Dialog.Root>
                {body}
                {/* The whole tile is the target (the button's ::after covers it); headings stay outside the button. */}
                <Dialog.Trigger className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-link outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring">
                  {labels.open}
                  <span className="sr-only">{`: ${npo.title}`}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" />
                  <Dialog.Content
                    aria-describedby={undefined}
                    className="fixed left-1/2 top-1/2 z-[61] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-card shadow-2xl focus:outline-none"
                  >
                    <header className="border-b border-border px-6 pb-5 pt-7 pr-16 sm:px-10">
                      <p className="text-[13px] font-bold text-primary">{npo.type}</p>
                      <Dialog.Title className="mt-2 text-xl font-black leading-[1.5] text-ink sm:text-2xl">{npo.title}</Dialog.Title>
                    </header>
                    <div className="space-y-5 overflow-y-auto px-6 py-6 text-[15px] leading-[1.9] text-ink/85 sm:px-10 sm:pb-10">
                      <figure>
                        <Image
                          src={photoSrc(tile.photo)}
                          alt={tile.alt}
                          width={1200}
                          height={900}
                          sizes="(min-width: 768px) 560px, 90vw"
                          className="aspect-[4/3] w-full rounded-2xl bg-sand object-cover"
                        />
                        <figcaption className="mt-2 text-xs text-muted-foreground">{npo.caption}</figcaption>
                      </figure>
                      <p className="text-lg font-black text-ink">{npo.headline}</p>
                      <ul className="space-y-2.5">
                        {npo.points.map((point) => (
                          <li key={point.slice(0, 16)} className="flex gap-3">
                            <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-orange" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <figure className="border-l-2 border-brand-orange pl-4">
                        <figcaption className="sr-only">{labels.quote}</figcaption>
                        <blockquote className="text-ink">{quote(npo.quote)}</blockquote>
                        <p className="mt-2 text-xs">— {npo.quoteBy}</p>
                      </figure>
                    </div>
                    <Dialog.Close
                      className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={labels.close}
                    >
                      <X className="size-5" />
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
