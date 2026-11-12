import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { SectionHeader } from "@/components/site/SectionHeader"
import { LineQr } from "@/components/site/LineQr"
import { ChannelButton } from "@/components/site/ChannelButton"
import { FoldList } from "@/components/ux/Fold"
import { EmailSubscribe } from "@/components/forms/EmailSubscribe"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { alternatesFor } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.join.meta.title, description: t.join.meta.description, alternates: alternatesFor(locale, "/join") }
}

// How far the ring has closed at a given step.
function RingStep({ step, total }: { step: number; total: number }) {
  return (
    <svg viewBox="0 0 36 36" className="size-7 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="18" cy="18" r="13" fill="none" stroke="#E9E3DA" strokeWidth="6" />
      <circle cx="18" cy="18" r="13" fill="none" stroke="#E8532A" strokeWidth="6" pathLength={total} strokeDasharray={`${step} ${total}`} />
    </svg>
  )
}

// /join: one action — add the official LINE account (docs/redesign/pages-v2/join/).
// The English page has no LINE (EN rule R17, #49): its one action is following
// us on LinkedIn, with no QR code, LINE ID or "how to join" steps.
// Both languages also offer an email subscription in the closing card (#50).
export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const j = t.join
  const english = locale === "en"

  const lineButton = (
    <ChannelButton locale={locale} purpose="follow" externalLabel={t.common.externalParen}>
      {j.hero.lineBtn}
    </ChannelButton>
  )

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: the one action, with the QR code on the Chinese page */}
      <section>
        <Container className={cn("grid items-center gap-12 pb-20 pt-14 md:pt-20 lg:pb-24", !english && "lg:grid-cols-[1.1fr_0.9fr]")}>
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{j.hero.kicker}</p>
            <h1 className="mt-5 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl lg:text-6xl">{j.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{j.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              {lineButton}
              {!english && <span className="text-sm font-bold text-muted-foreground">{j.hero.seconds}</span>}
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
          {!english && (
            <div className="text-center">
              <div className="mx-auto aspect-square w-full max-w-[220px] rounded-2xl border border-border bg-white p-3 sm:max-w-[260px]">
                <LineQr label={j.hero.qrLabel} className="size-full [&>svg]:size-full" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{j.hero.lineId}</p>
              <p className="font-display text-2xl font-bold tracking-wide text-ink">{site.line.id}</p>
            </div>
          )}
        </Container>
      </section>

      {/* S2 ── Benefits */}
      <section className="bg-card py-20 md:py-24">
        <Container>
          <SectionHeader kicker={j.benefits.label} title={j.benefits.title} />
          <ul className="mt-10 grid overflow-hidden rounded-3xl border border-border bg-paper md:grid-cols-2">
            {j.benefits.items.map((b, i) => (
              <li
                key={b.title}
                className={cn("border-border p-7 sm:p-9", i > 0 && "border-t", i === 1 && "md:border-t-0", i % 2 === 0 && "md:border-r")}
              >
                <h3 className="text-lg font-black text-ink">{b.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-[1.85] text-muted-foreground">{b.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* S3 ── How to join: the ring closes step by step, then the closing card */}
      <section className="py-20 md:py-24">
        <Container>
          {!english && (
            <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-14">
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
          )}

          {/* The page ends on one card with the page's one action */}
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] bg-sand px-6 py-10 text-center sm:px-10 sm:py-12">
            <div>{lineButton}</div>
            {!english && (
              <p className="mt-3 text-sm font-bold text-muted-foreground">
                {j.hero.lineId} <span className="font-display tracking-wide text-ink">{site.line.id}</span>
              </p>
            )}
            {/* rev2 #50: the second way to join, by email */}
            <div className="mt-8 flex w-full justify-center border-t border-ink/10 pt-8">
              <EmailSubscribe locale={locale} labels={j.subscribe} />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {j.alt.title}
              <Link href={`/${locale}/events`} className="ml-2 inline-flex min-h-11 items-center gap-1.5 font-bold text-link">
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
