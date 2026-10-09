import type { Metadata } from "next"
import Image from "next/image"
import { ArrowDown, ArrowRight, Check, Clock, Mail, MessageCircle } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { ContactForm } from "@/components/site/ContactForm"
import { Equation } from "@/components/consulting/Equation"
import { OfferCard, OfferMarkShape, type OfferMark } from "@/components/consulting/OfferCard"
import { ArchSeam, Disc, Half, Petal, Quarter } from "@/components/geo/shapes"
import { Tabs } from "@/components/ux/Tabs"
import { FoldList, ReadMore } from "@/components/ux/Fold"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { pageChapters } from "@/lib/chapters"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.consulting.meta.title, description: t.consulting.meta.description }
}

// Starting point → the services its panel shows (keys of solutions.items),
// and the shape that marks which end of the bridge it stands on.
const STARTS: Record<string, { offers: readonly string[]; mark: OfferMark }> = {
  brand: { offers: ["consulting"], mark: "petal" },
  paper: { offers: ["whitepaper"], mark: "petal" },
  team: { offers: ["training", "workshop"], mark: "block" },
  npo: { offers: [], mark: "petal" },
  small: { offers: [], mark: "quarter" },
}

// /consulting: the bridge closes here (docs/redesign/pages-v2/consulting/).
// One equation runs through the page — petal + block = quarter-disc — open in
// the hero, answered at the form: choose a starting point → remove doubts → send.
export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const c = t.consulting

  const chapters = pageChapters(c.chapters)
  const quote = (text: string) => (locale === "en" ? `“${text}”` : `「${text}」`)
  // The chooser options are in the same order as the form's topics, so a
  // "book" button can hand its starting point over to the form.
  const topicOf = (key: string) => c.chooser.options.findIndex((o) => o.key === key)

  const starts = c.chooser.options.map((o, i) => {
    const start = STARTS[o.key] ?? STARTS.brand
    const offers = start.offers.map((k) => c.solutions.items.find((s) => s.key === k)).filter((s) => s !== undefined)
    return {
      id: o.key,
      label: (
        <>
          <OfferMarkShape mark={start.mark} className="size-3.5" />
          {o.tab}
        </>
      ),
      content: (
        <>
          <p className="text-[15px] font-bold text-muted-foreground">{quote(o.label)}</p>
          <div className="mt-4 space-y-3">
            {offers.map((s) => (
              <OfferCard key={s.key} mark={start.mark} unit={s.unit} badge={s.highlight || undefined} title={s.title} description={s.description} price={s.price} />
            ))}
            {o.key === "npo" && <OfferCard mark={start.mark} unit={c.ngo.models[0].features[0]} title={c.ngo.label} description={c.ngo.summary} />}
            {o.key === "small" && (
              <OfferCard mark={start.mark} unit={c.membership.tiers.map((tier) => tier.price).join("・")} title={c.membership.label} description={c.membership.description} />
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            {o.key === "small" ? (
              <Button variant="outline" asChild>
                <a href="#membership">
                  {c.membership.jump}
                  <ArrowDown />
                </a>
              </Button>
            ) : (
              <Button asChild>
                <a href="#contact" data-contact-topic={i}>
                  {c.solutions.cta}
                  <ArrowRight />
                </a>
              </Button>
            )}
            {o.key === "npo" && (
              <a href="#ngo" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
                {c.ngo.jump}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </>
      ),
    }
  })

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero: the equation, not solved yet */}
      <section>
        <Container className="grid items-center gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{c.hero.kicker}</p>
            <h1 className="mt-5 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl">{c.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{c.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#contact">
                  {c.hero.primaryCta}
                  <ArrowDown />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {c.hero.lineCta}
                </a>
              </Button>
            </div>
          </div>
          <Equation labels={c.hero.equation} />
        </Container>
      </section>

      <ChapterNav chapters={chapters} label={c.label} />

      {/* S2 ── Services: pick a starting point, see only its offer.
          Seam 1 · shape relay: the hero's petal comes back as the tab mark and the card's corner. */}
      <section id="solutions" className="bg-card py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeader kicker={c.solutions.label} title={c.chooser.title} description={c.solutions.description} />
          <div className="min-w-0">
            <Tabs items={starts} label={c.chooser.title} />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{c.solutions.priceNote}</p>
          </div>
        </Container>
      </section>

      {/* Seam 2 · quiet */}

      {/* S3 ── Non-profits: petals only. Two models as two facing petals. */}
      <section id="ngo" className="pb-28 pt-20 md:pb-36 md:pt-24">
        <Container>
          <SectionHeader kicker={c.ngo.label} title={c.ngo.title} description={c.ngo.description} />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {c.ngo.models.map((m, i) => (
              <li
                key={m.title}
                className={cn("px-7 pb-3 pt-8 sm:px-9", i === 0 ? "rounded-tr-[4rem] rounded-bl-[4rem] bg-card" : "rounded-tl-[4rem] rounded-br-[4rem] bg-yellow-soft")}
              >
                <h3 className="text-xl font-black text-ink">{m.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.features.map((f) => (
                    <li key={f} className={cn("rounded-full px-3 py-1 text-xs font-bold text-ink", i === 0 ? "bg-sand" : "bg-card")}>
                      {f}
                    </li>
                  ))}
                </ul>
                <ReadMore label={c.ngo.more} className="mt-2">
                  <p className="pb-4">{m.description}</p>
                </ReadMore>
              </li>
            ))}
          </ul>
          {/* Real cases from the client's files: photo and one line up front,
              the detail and the quote behind each card's toggle. */}
          <h3 className="mt-14 text-sm font-bold text-muted-foreground">{c.ngo.casesTitle}</h3>
          <ul className="mt-5 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.ngo.cases.map((n, i) => (
              <li key={n.key}>
                <Image
                  src={`/cases/npo/${n.key}.jpg`}
                  alt={n.alt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
                  className={cn("aspect-[3/2] w-full object-cover", i % 2 === 0 ? "rounded-tr-[3rem] rounded-bl-[3rem]" : "rounded-tl-[3rem] rounded-br-[3rem]")}
                />
                <h4 className="mt-4 font-black text-ink">{n.name}</h4>
                <p className="mt-2 text-sm leading-[1.8] text-ink/85">{n.headline}</p>
                <ReadMore label={c.ngo.caseMore} className="mt-1">
                  <p className="text-xs font-bold text-ink/80">{n.type}</p>
                  <ul className="space-y-2">
                    {n.points.map((point) => (
                      <li key={point.slice(0, 12)} className="flex gap-2.5">
                        <Petal className="mt-2 size-2.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <figure className="border-l-2 border-brand-orange pl-4">
                    <figcaption className="sr-only">{c.ngo.quoteLabel}</figcaption>
                    <blockquote className="text-ink">{quote(n.quote)}</blockquote>
                    <p className="mt-2 text-xs">— {n.quoteBy}</p>
                  </figure>
                </ReadMore>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-end">
            <Button asChild>
              <a href="#contact" data-contact-topic={topicOf("npo")}>
                {c.solutions.cta}
                <ArrowRight />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* S4 ── Membership: the quarter grows (quarter → half → disc).
          Seam 3 is the sand section's arched top. */}
      <section id="membership" className="relative bg-sand">
        <ArchSeam className="bg-sand" />
        <Container className="relative pt-4">
          <SectionHeader kicker={c.membership.label} title={c.membership.title} align="center" />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {c.membership.tiers.map((tier, i) => (
              <li key={tier.title} className={cn("flex flex-col rounded-3xl bg-card px-7 pb-2 pt-7", tier.recommended && "ring-2 ring-primary")}>
                <div className="flex h-11 items-center justify-between">
                  {i === 0 ? <Quarter className="size-11" /> : i === 1 ? <Half className="h-[1.375rem] w-11" /> : <Disc className="size-11" />}
                  {tier.recommended && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{c.membership.recommended}</span>}
                </div>
                <h3 className="mt-5 text-lg font-black text-ink">{tier.title}</h3>
                <p className="mt-1 font-display text-3xl font-bold text-ink">{tier.price}</p>
                <p className="mt-2 text-sm font-bold text-primary">{tier.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-bold text-ink">{c.membership.audienceLabel}｜</span>
                  {tier.audience}
                </p>
                <ReadMore label={c.membership.includes.replace("{count}", String(tier.features.length))} className="mt-4 border-t border-border pt-1">
                  <ul className="space-y-2 pb-4">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-ink/85">
                        <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </ReadMore>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button size="lg" variant="line" asChild>
              <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {c.membership.tierCta}
              </a>
            </Button>
          </div>

          {/* Seam 4 · overlap: the plan that is not finished yet sits across the
              boundary, its ring still open (turns into place as it scrolls in). */}
          <div className="relative z-10 mx-auto -mb-12 mt-12 grid max-w-5xl gap-6 rounded-3xl border border-border bg-card p-7 sm:p-9 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
            <span aria-hidden="true" className="scroll-turn-in block size-16 rounded-full border-[6px] border-dashed border-brand-orange" />
            <div>
              <h3 className="flex flex-wrap items-center gap-2 text-lg font-black text-ink">
                <span className="rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-bold text-ink">{c.membership.comingSoon.badge}</span>
                {c.membership.comingSoon.title}
              </h3>
              {c.membership.comingSoon.body.map((p) => (
                <p key={p.slice(0, 10)} className="mt-2 text-sm leading-[1.85] text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <Button variant="outline" asChild>
              <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                {c.membership.comingSoon.cta}
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* S5 ── FAQ: no shapes, the quietest stretch before the bridge closes */}
      <section id="faq" className="pb-20 pt-28 md:pb-24 md:pt-32">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeader kicker={c.faq.label} title={c.faq.title} />
            <p className="mt-4 text-sm text-muted-foreground">
              {c.faq.more}
              <a href={`mailto:${site.supportEmail}`} className="ml-2 inline-flex min-h-11 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline">
                <Mail className="size-4" aria-hidden="true" />
                {c.faq.moreCta}
              </a>
            </p>
          </div>
          <FoldList name="consulting-faq" items={c.faq.items.map((f) => ({ title: f.question, content: f.answer }))} />
        </Container>
      </section>

      {/* S6 ── Contact: the equation is solved. The page's one dark moment is a
          block on paper, not a band, so it does not merge with the dark footer.
          Seam 5 · recombine: petal and block slide together as it scrolls in. */}
      <section id="contact" className="pb-16 md:pb-24">
        <Container className="px-3 md:px-8">
          <div className="grid gap-10 rounded-[2rem] bg-surface-dark px-5 pb-5 pt-9 text-white sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-14">
            <div>
              <SectionHeader kicker={c.contact.label} title={c.contact.title} description={c.contact.description} tone="dark" size="md" />
              <Equation solved animate tone="dark" className="mt-8 justify-start" />
              <ul className="mt-6 text-sm text-white/80">
                <li>
                  <a href={`mailto:${site.supportEmail}`} className="inline-flex min-h-11 items-center gap-3 underline-offset-4 hover:underline">
                    <Mail className="size-4 text-brand-yellow" aria-hidden="true" />
                    {site.supportEmail}
                  </a>
                </li>
                <li className="flex min-h-9 items-center gap-3">
                  <Clock className="size-4 shrink-0 text-brand-yellow" aria-hidden="true" />
                  {c.contact.hours}
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-6">
                <p className="font-bold">{c.contact.altTitle}</p>
                <Button variant="line" asChild>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle />
                    {t.footer.lineCta}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl bg-card p-6 text-ink sm:p-8">
              <ContactForm labels={t.contactForm} to={site.supportEmail} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
