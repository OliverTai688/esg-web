import type { Metadata } from "next"
import { ArrowRight, ArrowDown, Check, ChevronDown, Clock, Coffee, Mail, MessageCircle, Sparkles, HeartHandshake, Users } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { ContactForm } from "@/components/site/ContactForm"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.consulting.meta.title, description: t.consulting.meta.description }
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const c = t.consulting
  const nav = t.nav.consulting

  const chapters = [
    { id: "solutions", label: nav.solutions },
    { id: "ngo", label: nav.ngo },
    { id: "membership", label: nav.membership },
    { id: "faq", label: nav.faq },
    { id: "contact", label: nav.contact },
  ]

  return (
    <>
      {/* ── Hero: the Coffee Chat promise + "where do I start?" chooser ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_10%,#FEF5DC_0%,transparent_70%)]" />
        <Container className="relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{c.hero.kicker}</p>
            <h1 className="mt-5 flex flex-wrap items-center gap-3 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-soft text-primary sm:size-14">
                <Coffee className="size-6 sm:size-7" aria-hidden="true" />
              </span>
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{c.hero.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.hero.promise.map((p) => (
                <li key={p} className="flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1.5 text-sm font-bold text-ink shadow-[0_1px_0_rgba(31,32,34,0.06)]">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#contact">
                  {c.hero.primaryCta}
                  <ArrowDown />
                </a>
              </Button>
              <Button size="lg" variant="line" asChild>
                <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  {c.hero.lineCta}
                </a>
              </Button>
            </div>
          </div>
          <nav aria-label={c.chooser.title} className="rounded-3xl bg-surface-dark p-6 text-white sm:p-8">
            <p className="text-lg font-black">{c.chooser.title}</p>
            <ul className="mt-5 space-y-2">
              {c.chooser.options.map((o) => (
                <li key={o.label}>
                  <a href={`#${o.target}`} className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3.5 transition-colors hover:border-brand-yellow/60 hover:bg-white/[0.04]">
                    <span>
                      <span className="block text-[15px] font-bold">{o.label}</span>
                      <span className="text-xs text-white/60">→ {o.hint}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-brand-yellow transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <ChapterNav chapters={chapters} label={c.label} />

      {/* ── Solutions: one (highest) price per service ── */}
      <section id="solutions" className="bg-card py-20 md:py-24">
        <Container>
          <SectionHeader kicker={c.solutions.label} title={c.solutions.title} description={c.solutions.description} />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {c.solutions.items.map((s) => (
              <li key={s.key} className={cn("relative flex min-w-0 flex-col rounded-2xl p-6 sm:p-7", s.highlight ? "bg-surface-dark text-white" : "border border-border bg-paper")}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={cn("text-xs font-bold", s.highlight ? "text-white/60" : "text-muted-foreground")}>{s.unit}</span>
                    <h3 className="mt-1 text-xl font-black">{s.title}</h3>
                  </div>
                  {s.highlight && <span className="shrink-0 rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-bold text-ink">{s.highlight}</span>}
                </div>
                <p className={cn("mt-3 flex-1 text-sm leading-[1.9]", s.highlight ? "text-white/75" : "text-muted-foreground")}>{s.description}</p>
                <div className={cn("mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5", s.highlight ? "border-white/15" : "border-border")}>
                  <span className={cn("font-display text-2xl font-bold", s.highlight ? "text-brand-yellow" : "text-ink")}>{s.price}</span>
                  <Button size="sm" variant={s.highlight ? "inverse" : "outline"} asChild>
                    <a href="#contact">
                      {c.solutions.cta}
                      <ArrowRight />
                    </a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{c.solutions.priceNote}</p>
        </Container>
      </section>

      {/* ── NPO cooperation ── */}
      <section id="ngo" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={c.ngo.label} title={c.ngo.title} description={c.ngo.description} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {c.ngo.models.map((m, i) => {
              const Icon = i === 0 ? HeartHandshake : Sparkles
              return (
                <div key={m.title} className="rounded-2xl border border-border bg-card p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-ink">{m.title}</h3>
                  <p className="mt-3 text-sm leading-[1.9] text-muted-foreground">{m.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                    {m.features.map((f) => (
                      <li key={f} className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ink">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-bold text-muted-foreground">{c.ngo.casesTitle}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {c.ngo.cases.map((n) => (
                <li key={n.name} className="flex items-center gap-4 rounded-2xl bg-sand p-5">
                  <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-lg font-black text-[#A8321A]">
                    {n.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{n.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {n.type}・{n.focus}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{c.ngo.casesNote}</p>
          </div>
        </Container>
      </section>

      {/* ── Membership tiers + coming-soon waitlist ── */}
      <section id="membership" className="bg-sand py-20 md:py-24">
        <Container>
          <SectionHeader kicker={c.membership.label} title={c.membership.title} description={c.membership.description} align="center" />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3 md:items-stretch">
            {c.membership.tiers.map((tier) => (
              <li
                key={tier.title}
                className={cn(
                  "relative flex flex-col rounded-3xl bg-card p-7",
                  tier.recommended ? "shadow-[0_24px_60px_-28px_rgba(192,57,26,0.55)] ring-2 ring-primary md:-my-3 md:py-10" : "border border-border",
                )}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{c.membership.recommended}</span>
                )}
                <h3 className="text-lg font-black text-ink">{tier.title}</h3>
                <p className="mt-2 font-display text-3xl font-bold text-ink">{tier.price}</p>
                <p className="mt-2 text-sm font-bold text-primary">{tier.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex gap-2 rounded-xl bg-paper px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
                  <Users className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="font-bold text-ink">{c.membership.audienceLabel}｜</span>
                    {tier.audience}
                  </span>
                </p>
                <Button className="mt-5" variant={tier.recommended ? "default" : "outline"} asChild>
                  <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                    {c.membership.tierCta}
                  </a>
                </Button>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 rounded-3xl border-2 border-dashed border-ink/20 bg-card p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-primary">
                <span className="rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs text-ink">{c.membership.comingSoon.badge}</span>
                {c.membership.comingSoon.title}
              </p>
              {c.membership.comingSoon.body.map((p, i) => (
                <p key={p.slice(0, 10)} className={cn("mt-3 leading-[1.85]", i === 0 ? "text-lg font-bold text-ink" : "text-sm text-muted-foreground")}>
                  {p}
                </p>
              ))}
            </div>
            <Button size="lg" variant="line" asChild>
              <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {c.membership.comingSoon.cta}
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader kicker={c.faq.label} title={c.faq.title} />
            <p className="mt-6 text-sm text-muted-foreground">{c.faq.more}</p>
            <a href={`mailto:${site.supportEmail}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline">
              <Mail className="size-4" aria-hidden="true" />
              {c.faq.moreCta}（{site.supportEmail}）
            </a>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {c.faq.items.map((f, i) => (
              <details key={f.question} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-6 pr-10 text-sm leading-[1.9] text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Contact: form + LINE alternative ── */}
      <section id="contact" className="bg-surface-dark py-20 text-white md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-brand-yellow">{c.contact.label}</p>
            <h2 className="mt-4 text-3xl font-black leading-[1.3] sm:text-4xl">{c.contact.title}</h2>
            <p className="mt-4 leading-[1.9] text-white/75">{c.contact.description}</p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-brand-yellow" aria-hidden="true" />
                <a href={`mailto:${site.supportEmail}`} className="underline-offset-4 hover:underline">
                  {site.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-brand-yellow" aria-hidden="true" />
                {c.contact.hours}
              </li>
            </ul>
            <div className="mt-10 rounded-2xl border border-white/15 p-6">
              <p className="font-bold">{c.contact.altTitle}</p>
              <p className="mt-1 text-sm text-white/70">{c.contact.altBody}</p>
              <Button className="mt-4" variant="line" asChild>
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
        </Container>
      </section>

    </>
  )
}
