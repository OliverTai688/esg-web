import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { LineQr } from "@/components/site/LineQr"
import { PetalRing } from "@/components/join/PetalRing"
import { Petal } from "@/components/geo/shapes"
import { FoldList } from "@/components/ux/Fold"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.join.meta.title, description: t.join.meta.description }
}

// Each benefit holds one quarter of the ring; from `md` up the four quarters
// meet in the middle of the 2×2 grid.
const ARCS = ["border-brand-orange", "border-brand-yellow", "border-brand-yellow", "border-brand-grey"]

// How far the ring has closed at a given step.
function RingStep({ step, total }: { step: number; total: number }) {
  return (
    <svg viewBox="0 0 36 36" className="size-7 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="18" cy="18" r="13" fill="none" stroke="#E9E3DA" strokeWidth="6" />
      <circle cx="18" cy="18" r="13" fill="none" stroke="#F25232" strokeWidth="6" pathLength={total} strokeDasharray={`${step} ${total}`} />
    </svg>
  )
}

// /join: one ring, one action — add the official LINE account
// (docs/redesign/pages-v2/join/). The ring appears in three states: a circle of
// petals around the QR code, four quarters (the benefits), and closing step by step.
export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const j = t.join

  const lineButton = (
    <Button size="lg" variant="line" asChild>
      <a href={site.line.url} target="_blank" rel="noopener noreferrer">
        <MessageCircle />
        {j.hero.lineBtn}
      </a>
    </Button>
  )

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: the petals close into a ring; the centre is the way in */}
      <section>
        <Container className="grid items-center gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{j.hero.kicker}</p>
            <h1 className="mt-5 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl lg:text-6xl">{j.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{j.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              {lineButton}
              <span className="text-sm font-bold text-muted-foreground">{j.hero.seconds}</span>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
              {t.impact.track.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-ink tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">{t.impact.trackNote}</p>
          </div>
          <div className="text-center">
            <PetalRing className="max-w-[300px] sm:max-w-[400px]">
              <div className="size-full rounded-2xl bg-white p-2.5 sm:p-3">
                <LineQr label={j.hero.qrLabel} className="size-full [&>svg]:size-full" />
              </div>
            </PetalRing>
            <p className="mt-3 text-xs text-muted-foreground">{j.hero.lineId}</p>
            <p className="font-display text-2xl font-bold tracking-wide text-ink">{site.line.id}</p>
          </div>
        </Container>
      </section>

      {/* Seam 1 · shape relay: one petal of the ring lands on the boundary */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
        <Petal className="absolute left-1/2 top-0 size-10 -translate-x-1/2 -translate-y-1/2 rotate-45 sm:size-12 lg:left-[74%]" />
      </div>

      {/* S2 ── Benefits: the ring cut in four, one quarter per benefit */}
      <section className="bg-card py-20 md:py-24">
        <Container>
          <SectionHeader kicker={j.benefits.label} title={j.benefits.title} />
          <div className="relative mt-10">
            <ul className="grid overflow-hidden rounded-3xl border border-border bg-paper md:grid-cols-2">
              {j.benefits.items.map((b, i) => (
                <li
                  key={b.title}
                  className={cn(
                    "relative overflow-hidden border-border p-7 pr-16 sm:p-9 sm:pr-20",
                    i > 0 && "border-t md:border-t-0",
                    i === 0 && "md:border-b md:border-r md:pb-16 md:pr-28",
                    i === 1 && "md:border-b md:pb-16 md:pl-28 md:pr-9",
                    i === 2 && "md:border-r md:pr-28 md:pt-16",
                    i === 3 && "md:pl-28 md:pr-9 md:pt-16",
                  )}
                >
                  <span aria-hidden="true" className={cn("absolute -right-9 -top-9 size-[4.5rem] rounded-full border-[14px] md:hidden", ARCS[i])} />
                  <h3 className="text-lg font-black text-ink">{b.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-[1.85] text-muted-foreground">{b.description}</p>
                </li>
              ))}
            </ul>
            {/* Turned 45° so each border colour fills exactly one cell's quarter */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden size-36 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full border-[24px] border-b-brand-yellow border-l-brand-orange border-r-brand-grey border-t-brand-yellow bg-card md:block"
            />
          </div>
        </Container>
      </section>

      {/* S3 ── How to join: the ring closes step by step, then the LINE card.
          Seam 2 · scale handoff: the big ring becomes the three small ones. */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <SectionHeader kicker={j.steps.label} title={j.steps.title} />
            <FoldList
              name="join-steps"
              items={j.steps.items.map((s, i) => ({
                title: (
                  <span className="flex items-center gap-3">
                    <RingStep step={i + 1} total={j.steps.items.length} />
                    {s.title}
                  </span>
                ),
                content: s.description,
              }))}
            />
          </div>

          {/* The page ends on the LINE card: the ring, closed (draws itself in) */}
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center rounded-[2rem] bg-sand px-6 py-10 text-center sm:px-10 sm:py-12">
            <svg viewBox="0 0 120 120" className="size-24 -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#F25232" strokeWidth="18" pathLength={1} className="scroll-draw" />
            </svg>
            <div className="mt-7">{lineButton}</div>
            <p className="mt-3 text-sm font-bold text-muted-foreground">
              {j.hero.lineId} <span className="font-display tracking-wide text-ink">{site.line.id}</span>
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              {j.alt.title}
              <Link href={`/${locale}/events`} className="ml-2 inline-flex min-h-11 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline">
                {j.alt.link}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
