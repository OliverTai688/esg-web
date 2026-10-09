"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog } from "radix-ui"
import { Quote, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  highlight: string
  quote: string
  name: string
  title: string
  tag: string
}

interface Logo {
  src: string
  alt: string
}

// S7 · Client feedback: four partners are four petals around one centre
// (home-v2 decision S7-A). Each petal carries the partner's logo on a white
// disc (client request: logos open the feedback); partners whose logo file has
// not arrived show their first character instead. Hover or focus previews the highlight on the left;
// clicking a petal opens the full feedback. Petals gather from the outside as
// the section scrolls in (transition 6); at rest the flower is complete.
// Each petal's pointed corners face the centre and the outside.
const PETALS = [
  { radius: "rounded-tr-[100%] rounded-bl-[100%] rounded-tl-none rounded-br-none", tone: "bg-brand-orange text-ink", gather: { "--gx": "-10%", "--gy": "-10%", "--gr": "-15deg" } },
  { radius: "rounded-tl-[100%] rounded-br-[100%] rounded-tr-none rounded-bl-none", tone: "bg-brand-yellow text-ink", gather: { "--gx": "10%", "--gy": "-10%", "--gr": "15deg" } },
  { radius: "rounded-tl-[100%] rounded-br-[100%] rounded-tr-none rounded-bl-none", tone: "bg-ink text-white", gather: { "--gx": "-10%", "--gy": "10%", "--gr": "15deg" } },
  { radius: "rounded-tr-[100%] rounded-bl-[100%] rounded-tl-none rounded-br-none", tone: "bg-brand-grey text-white", gather: { "--gx": "10%", "--gy": "10%", "--gr": "-15deg" } },
]

export function TestimonialFlower({
  items,
  logos,
  openLabel,
  closeLabel,
}: {
  items: readonly Testimonial[]
  /** Same order as `items`; null where there is no logo yet. */
  logos?: readonly (Logo | null)[]
  openLabel: string
  closeLabel: string
}) {
  const [active, setActive] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const current = items[active]
  const currentLogo = logos?.[active]

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,460px)]">
      {/* Preview of the highlighted partner */}
      <div aria-live="polite" className="order-2 lg:order-1">
        <Quote className="size-8 text-brand-orange" aria-hidden="true" />
        <p className="mt-4 text-2xl font-black leading-[1.55] text-ink sm:text-[1.75rem]">{current.highlight}</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-bold text-ink">{current.name}</span>
          <span className="text-muted-foreground">{current.title}</span>
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink/80">{current.tag}</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {openLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* The flower */}
      <ul className="relative order-1 mx-auto grid w-full max-w-[460px] grid-cols-2 gap-2 lg:order-2">
        {items.slice(0, 4).map((item, i) => {
          const petal = PETALS[i]
          return (
            <li key={item.name} className="scroll-gather" style={petal.gather as React.CSSProperties}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setActive(i)
                  setOpen(true)
                }}
                aria-label={`${openLabel}：${item.name}`}
                aria-pressed={active === i}
                className={cn(
                  "flex aspect-square w-full flex-col items-center justify-center gap-1.5 p-4 text-center transition-transform duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60",
                  petal.radius,
                  petal.tone,
                  active === i ? "scale-100" : "scale-[0.94] hover:scale-100",
                )}
              >
                {logos?.[i] ? (
                  <span className="relative block size-16 overflow-hidden rounded-full bg-white sm:size-20">
                    <Image src={logos[i].src} alt="" fill sizes="80px" className="object-contain p-2.5" />
                  </span>
                ) : (
                  <span aria-hidden="true" className="text-4xl font-black sm:text-5xl">
                    {item.name.slice(0, 1)}
                  </span>
                )}
                <span className="max-w-[9em] text-xs font-bold leading-snug sm:text-sm">{item.name}</span>
              </button>
            </li>
          )
        })}
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-brand-orange" />
      </ul>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-card p-8 shadow-2xl focus:outline-none sm:p-10">
            <Quote className="size-8 text-brand-orange" aria-hidden="true" />
            <Dialog.Title className="mt-4 text-xl font-black leading-[1.5] text-ink sm:text-2xl">{current.highlight}</Dialog.Title>
            <Dialog.Description className="mt-4 text-base leading-[1.9] text-ink/80">{current.quote}</Dialog.Description>
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              {currentLogo ? (
                <span className="relative block h-12 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-border">
                  <Image src={currentLogo.src} alt={currentLogo.alt} fill sizes="80px" className="object-contain p-1.5" />
                </span>
              ) : (
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-tr-full rounded-bl-full bg-orange-soft text-xl font-black text-[#A8321A]">
                  {current.name.slice(0, 1)}
                </span>
              )}
              <div>
                <p className="font-bold text-ink">{current.name}</p>
                <p className="text-sm text-muted-foreground">{current.title}</p>
              </div>
            </div>
            <Dialog.Close
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={closeLabel}
            >
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
