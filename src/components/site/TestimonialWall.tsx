"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { Quote, X } from "lucide-react"

interface Testimonial {
  highlight: string
  quote: string
  name: string
  title: string
  tag: string
}

// Client feedback as a wall of brand marks (H04). Hover or focus previews the
// highlight; click or Enter opens the full feedback in an accessible dialog.
// Marks are monograms until the client's logo files and display permission arrive.
export function TestimonialWall({
  items,
  openLabel,
  closeLabel,
}: {
  items: readonly Testimonial[]
  openLabel: string
  closeLabel: string
}) {
  const [open, setOpen] = React.useState<number | null>(null)
  const current = open === null ? null : items[open]

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.name} className="group relative">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${openLabel}：${item.name}`}
              className="flex h-full w-full flex-col items-center gap-4 rounded-2xl border border-border bg-card px-4 py-8 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_rgba(31,32,34,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="flex size-20 items-center justify-center rounded-full bg-orange-soft text-3xl font-black text-[#A8321A] ring-4 ring-paper transition-colors group-hover:bg-brand-orange group-hover:text-white"
              >
                {item.name.slice(0, 1)}
              </span>
              <span className="font-bold text-ink">{item.name}</span>
              <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{item.tag}</span>
            </button>
            {/* Hover / focus preview (pointer devices) */}
            <div
              role="presentation"
              className="pointer-events-none absolute inset-x-2 bottom-[calc(100%+8px)] z-20 hidden translate-y-1 rounded-xl bg-ink p-4 text-sm font-medium leading-relaxed text-white opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block"
            >
              「{item.highlight}」
            </div>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-card p-8 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-10">
            {current && (
              <>
                <Quote className="size-8 text-brand-orange" aria-hidden="true" />
                <Dialog.Title className="mt-4 text-xl font-black leading-[1.5] text-ink sm:text-2xl">{current.highlight}</Dialog.Title>
                <Dialog.Description className="mt-4 text-base leading-[1.9] text-ink/80">{current.quote}</Dialog.Description>
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-orange-soft text-xl font-black text-[#A8321A]">
                    {current.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.title}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-sand px-3 py-1 text-xs font-medium text-muted-foreground">{current.tag}</span>
                </div>
              </>
            )}
            <Dialog.Close
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={closeLabel}
            >
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
