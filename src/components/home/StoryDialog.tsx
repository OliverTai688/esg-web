"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { BookOpen, X } from "lucide-react"

// S3 · Brand story: the full founder story opens in a dialog so the section
// keeps its height. The paragraphs are rendered on the server and passed in.
export function StoryDialog({
  triggerLabel,
  kicker,
  title,
  closeLabel,
  children,
}: {
  triggerLabel: string
  kicker: string
  title: string
  closeLabel: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="mt-8 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 px-5 py-4 text-left font-bold transition-colors hover:border-white/35 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow">
        {triggerLabel}
        <BookOpen className="size-5" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[61] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-card shadow-2xl focus:outline-none"
        >
          <header className="border-b border-border px-8 pb-5 pt-8 pr-16 sm:px-10 sm:pr-16">
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{kicker}</p>
            <Dialog.Title className="mt-3 text-xl font-black leading-[1.5] text-ink sm:text-2xl">{title}</Dialog.Title>
          </header>
          <div className="space-y-5 overflow-y-auto px-8 py-6 text-base leading-[1.95] text-ink/80 sm:px-10 sm:pb-10">{children}</div>
          <Dialog.Close
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={closeLabel}
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
