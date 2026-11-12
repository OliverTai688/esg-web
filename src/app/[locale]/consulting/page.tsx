import type { Metadata } from "next"
import { ArrowDown, Clock, Mail } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/site/SectionHeader"
import { ChapterNav } from "@/components/site/ChapterNav"
import { ContactForm } from "@/components/site/ContactForm"
import { SolutionsTable } from "@/components/consulting/SolutionsTable"
import { CaseWall } from "@/components/consulting/CaseWall"
import { FoldList } from "@/components/ux/Fold"
import { getMessages } from "@/i18n/messages"
import type { Locale } from "@/i18n/config"
import { site } from "@/lib/site"
import { ChannelButton } from "@/components/site/ChannelButton"
import { pageChapters } from "@/lib/chapters"
import { alternatesFor } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  return { title: t.consulting.meta.title, description: t.consulting.meta.description, alternates: alternatesFor(locale, "/consulting") }
}

// /consulting (rev2 #44–#47): 01 方案總表 → 02 合作案例 → 03 常見問題 → 04 聯絡表單.
// The 方案總表 is where every "see the plans and prices" link on the site lands
// (#solutions, and #solutions-self-learn for 自己學、自己寫).
export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getMessages(locale as Locale)
  const c = t.consulting
  const chapters = pageChapters(c.chapters)

  return (
    <div className="overflow-x-clip">
      {/* S1 ── Hero. Text only: the petal + block = quarter equation was removed (2026-11-12). */}
      <section>
        <Container className="pb-16 pt-14 md:pt-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="kicker-rule text-[13px] font-bold tracking-[0.12em] text-primary">{c.hero.kicker}</p>
            <h1 className="mt-5 text-[2.25rem] font-black leading-[1.25] text-ink sm:text-5xl">{c.hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-muted-foreground sm:text-lg">{c.hero.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#contact" data-contact-topic={0}>
                  {c.hero.primaryCta}
                  <ArrowDown />
                </a>
              </Button>
              <ChannelButton locale={locale} purpose="ask" variant="outline" externalLabel={t.common.externalParen}>
                {c.hero.lineCta}
              </ChannelButton>
            </div>
          </div>
        </Container>
      </section>

      <ChapterNav chapters={chapters} label={c.label} />

      {/* S2 ── 方案總表 / Services & Pricing (#44) */}
      <section id="solutions" className="bg-card py-20 md:py-24">
        <Container>
          <SectionHeader kicker={c.solutions.label} title={c.solutions.title} description={c.solutions.description} />
          <div className="mt-12">
            <SolutionsTable locale={locale} popularLabel={c.solutions.popular} externalLabel={t.common.externalParen} />
          </div>
        </Container>
      </section>

      {/* S3 ── 合作案例 photo wall (#46) */}
      <section id="cases" className="py-20 md:py-24">
        <Container>
          <SectionHeader kicker={c.cases.label} title={c.cases.title} />
          <div className="mt-10">
            <CaseWall
              locale={locale}
              tiles={c.cases.tiles}
              cases={c.cases.npo}
              filters={c.cases.filters}
              labels={{ filter: c.cases.filterLabel, open: c.cases.openCase, close: c.cases.close, quote: c.cases.quoteLabel }}
            />
          </div>
        </Container>
      </section>

      {/* S4 ── FAQ */}
      <section id="faq" className="bg-card py-20 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeader kicker={c.faq.label} title={c.faq.title} />
            <p className="mt-4 text-sm text-muted-foreground">
              {c.faq.more}
              <a href={`mailto:${site.supportEmail}`} className="ml-2 inline-flex min-h-11 items-center gap-1.5 font-bold text-link">
                <Mail className="size-4" aria-hidden="true" />
                {c.faq.moreCta}
              </a>
            </p>
          </div>
          <FoldList name="consulting-faq" items={c.faq.items.map((f) => ({ title: f.question, content: f.answer }))} />
        </Container>
      </section>

      {/* S5 ── Contact. The page's one dark moment is a block on paper, not a
          band, so it does not merge with the dark footer. */}
      <section id="contact" className="py-16 md:py-24">
        <Container className="px-3 md:px-8">
          <div className="grid gap-10 rounded-[2rem] bg-surface-dark px-5 pb-5 pt-9 text-white sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:p-14">
            <div>
              <SectionHeader kicker={c.contact.label} title={c.contact.title} description={c.contact.description} tone="dark" size="md" />
              <ul className="mt-8 text-sm text-white/80">
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
                <ChannelButton locale={locale} purpose="follow" size="default" variant={locale === "en" ? "outlineInverse" : "line"} externalLabel={t.common.externalParen}>
                  {t.footer.lineCta}
                </ChannelButton>
              </div>
            </div>
            <div className="rounded-3xl bg-card p-6 text-ink sm:p-8">
              <ContactForm labels={t.contactForm} locale={locale} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
