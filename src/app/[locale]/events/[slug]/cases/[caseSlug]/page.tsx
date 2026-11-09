import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { ClientLogo } from "@/components/site/ClientLogo"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { getClient } from "@/data/clients"
import { getWhitepaperCase, whitepaperCases } from "@/data/whitepapers"
import { alternatesFor } from "@/lib/seo"

// One white paper case (rev2 #53①, decision D3a): /events/impact-whitepaper/cases/<slug>.
// Only the white paper page has cases; any other parent slug is a 404.
const PARENT = "impact-whitepaper"

interface CasePageProps {
  params: Promise<{ locale: string; slug: string; caseSlug: string }>
}

export function generateStaticParams({ params }: { params: { locale: string; slug: string } }) {
  if (params.slug !== PARENT) return []
  return whitepaperCases.map((c) => ({ caseSlug: c.slug }))
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { locale, slug, caseSlug } = await params
  const c = slug === PARENT ? getWhitepaperCase(caseSlug) : undefined
  if (!c) return {}
  const t = await getMessages(locale as Locale)
  const en = locale === "en"
  const name = en ? c.name.en : c.name.zh
  return {
    title: `${name}${en ? " | " : "｜"}${t.events.detail.cases.metaSuffix}`,
    // Each case has its own description: the card sentence plus the industry
    description: en ? `${c.summary.en} ${c.industry.en}.` : `${c.summary.zh}${c.industry.zh}。`,
    alternates: alternatesFor(locale, `/events/${PARENT}/cases/${c.slug}`),
  }
}

export default async function WhitepaperCasePage({ params }: CasePageProps) {
  const { locale, slug, caseSlug } = await params
  const c = slug === PARENT ? getWhitepaperCase(caseSlug) : undefined
  if (!c) notFound()
  const t = await getMessages(locale as Locale)
  const d = t.events.detail
  const en = locale === "en"
  const pick = (text: { zh: string; en: string }) => (en ? text.en : text.zh)
  const client = getClient(c.clientId)
  const results = en ? c.results.en : c.results.zh
  const others = whitepaperCases.filter((o) => o.slug !== c.slug)
  const base = `/${locale}/events/${PARENT}`

  const block = (title: string, children: React.ReactNode) => (
    <section className="border-t border-border pt-8">
      <h2 className="text-xl font-black text-ink">{title}</h2>
      <div className="mt-4 text-base leading-[1.95] text-ink/85">{children}</div>
    </section>
  )

  return (
    <div className="overflow-x-clip">
      <Container className="pb-12 pt-6 md:pb-16 md:pt-10">
        <Link
          href={`${base}#cases`}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>
            {d.backTo} <span className="text-ink">{d.cases.backToCases}</span>
          </span>
        </Link>

        <header className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-4">
              {client && <ClientLogo client={client} english={en} className="h-14 w-24 shrink-0" />}
              <p className="text-sm font-bold text-muted-foreground">{pick(c.name)}</p>
            </div>
            <h1 className="mt-5 text-3xl font-black leading-[1.35] text-ink sm:text-4xl">{pick(c.summary)}</h1>
            <dl className="mt-6">
              <dt className="text-xs text-muted-foreground">{d.cases.industry}</dt>
              <dd className="mt-1 font-bold text-ink">{pick(c.industry)}</dd>
            </dl>
          </div>
          <Image
            src={c.cover}
            alt={en ? `Cover of ${c.name.en}’s Sustainability White Paper` : `${c.name.zh}永續白皮書封面`}
            width={1000}
            height={700}
            priority
            sizes="(min-width: 1024px) 460px, 92vw"
            className="w-full rounded-3xl bg-paper object-contain"
          />
        </header>

        <div className="mt-14 max-w-3xl space-y-10">
          {block(d.cases.challenge, <p>{pick(c.challenge)}</p>)}
          {block(
            d.cases.approach,
            <>
              <p>{pick(c.approach)}</p>
              {c.figure && (
                <Image
                  src={c.figure.src}
                  alt={pick(c.figure.alt)}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 720px, 92vw"
                  className="mt-6 w-full rounded-2xl bg-paper object-contain"
                />
              )}
            </>,
          )}
          {block(
            d.cases.results,
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={r.slice(0, 16)} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-orange" />
                  {r}
                </li>
              ))}
            </ul>,
          )}
          {c.furtherReading &&
            block(
              d.cases.furtherReading,
              <a href={c.furtherReading.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-link">
                {pick(c.furtherReading.label)}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">{t.common.externalParen}</span>
              </a>,
            )}
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={`${base}#download`}>
              {d.download.cta}
              <ArrowRight />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${locale}/consulting#contact`}>
              {d.consult}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>

      <section className="bg-card py-12 md:py-16">
        <Container>
          <h2 className="text-xl font-black text-ink">{d.cases.others}</h2>
          <ul className="mt-2 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`${base}/cases/${o.slug}`} className="inline-flex min-h-11 items-center gap-1.5 font-bold text-link">
                  {pick(o.name)}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  )
}
