import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, MessageCircle, Newspaper, CalendarCheck, Handshake, Gift } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { LineQr } from "@/components/site/LineQr"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.join.meta.title, description: t.join.meta.description }
}

const BENEFIT_ICONS = [Newspaper, CalendarCheck, Handshake, Gift]

// Single goal: add the official LINE account in under a minute.
export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const j = t.join

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_65%_at_80%_20%,#FDEDE8_0%,transparent_70%)]" />
        <Container className="relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{j.hero.kicker}</p>
            <h1 className="mt-5 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl lg:text-6xl">{j.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{j.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" variant="line" asChild>
                <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {j.hero.lineBtn}
                </a>
              </Button>
              <span className="text-sm font-bold text-muted-foreground">{j.hero.seconds}</span>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-4">
              {t.impact.track.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-paper p-4">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-xl font-bold text-ink tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-muted-foreground">{t.impact.trackNote}</p>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-surface-dark p-8 text-center text-white shadow-[0_32px_80px_-40px_rgba(31,32,34,0.7)]">
            <p className="text-sm font-bold text-white/80">{j.hero.qrLabel}</p>
            <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-4">
              <LineQr label={`${j.hero.lineId} ${site.line.id}`} className="size-48 [&>svg]:size-full" />
            </div>
            <p className="mt-5 text-xs text-white/60">{j.hero.lineId}</p>
            <p className="font-display text-2xl font-bold tracking-wide text-brand-yellow">{site.line.id}</p>
          </div>
        </Container>
      </section>

      <section className="bg-card py-20 md:py-24">
        <Container>
          <SectionHeader kicker={j.benefits.label} title={j.benefits.title} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {j.benefits.items.map((b, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <li key={b.title} className="rounded-2xl border border-border bg-paper p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-black text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{b.description}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={j.steps.label} title={j.steps.title} />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {j.steps.items.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl bg-card p-6">
                <span className="font-display text-4xl font-bold text-brand-orange">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-black text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-sand p-7 sm:p-9 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-black text-ink">{j.alt.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{j.alt.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/${locale}/consulting#contact`}>
                  {j.alt.primary}
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${locale}/sustainability`}>{j.alt.secondary}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
