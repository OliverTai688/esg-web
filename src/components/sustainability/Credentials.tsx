"use client"

import * as React from "react"
import Image from "next/image"
import { Expand, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Credential {
  name: string
  /** File name in /certificates, without the extension. */
  image: string
  alt: string
}

const src = (image: string) => `/certificates/${image}.webp`

// The founder's credentials (rev2 #27): each item shows its certificate as a
// thumbnail; pressing the item opens the certificate full size in a modal
// <dialog>. showModal() makes the rest of the page inert, so focus stays in the
// dialog; Esc closes it (native cancel), as do the close button and a click on
// the backdrop. Focus returns to the item that opened it.
export function Credentials({
  items,
  openLabel,
  closeLabel,
  className,
}: {
  items: readonly Credential[]
  /** Prefix of each item's accessible name, e.g. "Enlarge certificate: ". */
  openLabel: string
  closeLabel: string
  className?: string
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const openerRef = React.useRef<HTMLButtonElement | null>(null)
  const [current, setCurrent] = React.useState<Credential | null>(null)
  const titleId = React.useId()

  const open = (item: Credential, opener: HTMLButtonElement) => {
    openerRef.current = opener
    setCurrent(item)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  return (
    <>
      <ul className={cn("grid gap-[3px] sm:grid-cols-2", className)}>
        {items.map((c, i) => (
          <li key={c.image}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${openLabel}${c.name}`}
              onClick={(event) => open(c, event.currentTarget)}
              className={cn(
                "group flex h-full min-h-16 w-full items-center gap-3 px-3 py-2 text-left text-sm font-bold leading-snug text-brand-grey outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring",
                i % 3 === 0 ? "bg-[#FBE0D8]" : "bg-orange-soft",
              )}
            >
              <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-white ring-1 ring-ink/10">
                <Image src={src(c.image)} alt="" fill sizes="64px" className="object-contain" />
              </span>
              <span className="flex-1">{c.name}</span>
              <Expand className="size-4 shrink-0 text-primary opacity-70 group-hover:opacity-100" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setCurrent(null)
          openerRef.current?.focus()
        }}
        // A click on the backdrop lands on the <dialog> element itself
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        className="m-auto max-h-[92vh] w-[min(92vw,960px)] overflow-visible bg-transparent p-0 backdrop:bg-ink/80"
      >
        {current && (
          <figure className="rounded-2xl bg-white p-3 sm:p-4">
            <div className="flex items-start justify-between gap-4 px-1 pb-3">
              <figcaption id={titleId} className="pt-2 text-sm font-bold text-ink sm:text-base">
                {current.name}
              </figcaption>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink outline-none hover:bg-ink/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">{closeLabel}</span>
              </button>
            </div>
            <div className="relative h-[min(75vh,1100px)] w-full">
              <Image src={src(current.image)} alt={current.alt} fill loading="eager" sizes="(min-width: 1024px) 960px, 92vw" className="object-contain" />
            </div>
          </figure>
        )}
      </dialog>
    </>
  )
}
