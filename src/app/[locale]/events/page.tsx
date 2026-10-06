import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"
import { CTASection } from "@/components/domain/CTASection"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { workshops, services } from "@/data/courses"
import type { Course } from "@/data/courses"
import {
  GraduationCap,
  CreditCard,
  ArrowRight,
  User,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  Users,
  Star,
  Check,
  TrendingUp,
  Globe,
  Handshake,
  ChevronRight,
  Zap,
  BookOpen,
  Repeat,
} from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.eventsPage.label} | 共好玟化 CO-ESG`,
    description: t.eventsPage.description,
  }
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  const upcoming = workshops.filter((w) => w.status === "招生中")
  const past = workshops.filter((w) => w.status === "已結束")
  const [featured, ...restUpcoming] = upcoming

  const caseIcons = [Globe, TrendingUp, Handshake]

  return (
    <main className="flex min-h-screen flex-col">
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — Immersive dark section with animated background
       ═══════════════════════════════════════════════════════════════ */}
      <Section
        background="primary"
        padding="lg"
        bigText="EVENTS"
        backgroundSlot={<AnimatedGradientBackground variant="dark" interactive intensity={0.8} />}
      >
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary-foreground leading-[1.1] mb-6">
              {t.eventsPage.title}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-2xl leading-relaxed">
              {t.eventsPage.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12">
              {t.eventsPage.hero.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-accent tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-primary-foreground/50 uppercase tracking-[0.2em] font-semibold mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="rounded-full text-base px-8 gap-2 shadow-lg" asChild>
                <a href="#upcoming">
                  {t.eventsPage.hero.primaryCta}
                  <ArrowRight size={18} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base px-8 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white transition-all duration-300"
                asChild
              >
                <a href="#workshops">
                  {t.eventsPage.hero.secondaryCta}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          2. UPCOMING — Featured event + smaller cards
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="upcoming" background="muted" withTopo>
        <Container>
          <Heading
            level={2}
            label={t.eventsPage.upcoming.label}
            title={t.eventsPage.upcoming.title}
            description={t.eventsPage.upcoming.description}
            align="center"
          />

          {/* Featured event — large horizontal card */}
          {featured && (
            <Link
              href={`/${locale}/events/${featured.slug}`}
              className="group block mb-10"
            >
              <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left visual */}
                  <div className="md:col-span-2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                          {featured.status}
                        </Badge>
                        <Badge className="bg-accent/90 text-white border-accent text-xs">
                          <Star size={10} className="mr-1" />
                          {t.eventsPage.upcoming.spotsLeft}
                        </Badge>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                        {featured.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-white group-hover:text-primary">
                        {t.eventsPage.upcoming.enrollNow}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right info */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                            {locale === "zh" ? "日期" : "Date"}
                          </p>
                          <p className="text-sm font-semibold text-foreground">{featured.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                            {locale === "zh" ? "時數" : "Duration"}
                          </p>
                          <p className="text-sm font-semibold text-foreground">{featured.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                            {locale === "zh" ? "地點" : "Location"}
                          </p>
                          <p className="text-sm font-semibold text-foreground">{featured.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                            {locale === "zh" ? "名額" : "Capacity"}
                          </p>
                          <p className="text-sm font-semibold text-foreground">{featured.capacity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    {featured.highlights && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featured.highlights.map((h, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                            <Check size={12} />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price + instructor */}
                    <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-accent" />
                        <span className="text-lg font-black text-foreground">{featured.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>{featured.instructor.split("（")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of upcoming events */}
          {restUpcoming.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {restUpcoming.map((course) => (
                <EventCard key={course.slug} course={course} locale={locale} t={t} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          3. WORKSHOPS — Two paths with visual differentiation
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="workshops" withPattern bigText="LEARN">
        <Container>
          <Heading
            level={2}
            label={t.eventsPage.workshopsSection.label}
            title={t.eventsPage.workshopsSection.title}
            description={t.eventsPage.workshopsSection.description}
            align="center"
          />

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Training path */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  <GraduationCap size={32} />
                </div>
                <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest">
                  {t.eventsPage.workshopsSection.training.subtitle}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{t.eventsPage.workshopsSection.training.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.eventsPage.workshopsSection.training.description}
                </p>
                <div className="space-y-2.5">
                  {t.eventsPage.workshopsSection.training.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm">
                      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workshop path */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                  <Zap size={32} />
                </div>
                <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest border-accent/30 text-accent">
                  {t.eventsPage.workshopsSection.workshop.subtitle}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{t.eventsPage.workshopsSection.workshop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.eventsPage.workshopsSection.workshop.description}
                </p>
                <div className="space-y-2.5">
                  {t.eventsPage.workshopsSection.workshop.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm">
                      <div className="size-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check size={12} className="text-accent" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          4. SERVICES — Consulting & subscription with horizontal layout
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="services" background="muted">
        <Container>
          <Heading
            level={2}
            label={t.eventsPage.servicesSection.label}
            title={t.eventsPage.servicesSection.title}
            description={t.eventsPage.servicesSection.description}
            align="center"
          />

          <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service) => {
              const isSubscription = service.type === "subscription"
              const ServiceIcon = isSubscription ? Repeat : service.type === "consulting" ? BookOpen : Sparkles
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/events/${service.slug}`}
                  className="group block"
                >
                  <Card className="relative h-full overflow-hidden border-border/60 transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20 group-hover:-translate-y-1">
                    {/* Top accent stripe */}
                    <div className={`h-1.5 ${isSubscription ? "bg-gradient-to-r from-accent via-accent/80 to-accent/50" : "bg-gradient-to-r from-primary via-primary/80 to-primary/50"}`} />

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`size-12 rounded-xl ${isSubscription ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                          <ServiceIcon size={22} />
                        </div>
                        <Badge variant={isSubscription ? "accent" : "default"} className="text-xs">
                          {service.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      {service.highlights && (
                        <div className="space-y-2 mb-6">
                          {service.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check size={12} className={isSubscription ? "text-accent" : "text-primary"} />
                              {h}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-2 flex items-center justify-between border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className={isSubscription ? "text-accent" : "text-primary"} />
                        <span className="text-base font-black text-foreground">{service.price}</span>
                      </div>
                      <span className={`text-xs font-semibold ${isSubscription ? "text-accent" : "text-primary"} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {t.eventsPage.servicesSection.viewMore}
                        <ChevronRight size={14} />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          5. HISTORY — Visual timeline
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="history" withPattern bigText="TIMELINE">
        <Container>
          <Heading
            level={2}
            label={t.eventsPage.historySection.label}
            title={t.eventsPage.historySection.title}
            description={t.eventsPage.historySection.description}
            align="center"
          />

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:-translate-x-px" />

            <div className="space-y-12 md:space-y-16">
              {t.eventsPage.historySection.timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div key={idx} className="relative flex items-start gap-6 md:gap-0">
                    {/* Year dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div className="size-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-xs font-black text-primary">{item.year}</span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}`}>
                      <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Past event cards */}
            {past.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border/30">
                <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                  {locale === "zh" ? "已結束活動" : "Past Events"}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {past.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/${locale}/events/${course.slug}`}
                      className="group"
                    >
                      <div className="flex items-start gap-4 rounded-xl border border-dashed border-border/60 p-5 transition-all duration-200 group-hover:border-solid group-hover:border-primary/20 group-hover:bg-muted/30">
                        <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                          <Clock size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors truncate">
                            {course.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {course.date}
                            </span>
                            <span>{course.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          6. CASES — Success stories with metrics
       ═══════════════════════════════════════════════════════════════ */}
      <Section id="cases" background="primary" withPattern bigText="IMPACT">
        <Container>
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <span className="text-accent text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
              {t.eventsPage.casesSection.label}
            </span>
            <h2 className="text-heading-2 !text-primary-foreground">{t.eventsPage.casesSection.title}</h2>
            <p className="text-base md:text-lg text-primary-foreground/70 mt-4 max-w-[700px] leading-relaxed">
              {t.eventsPage.casesSection.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {t.eventsPage.casesSection.cases.map((c, i) => {
              const Icon = caseIcons[i] ?? Star
              return (
                <div
                  key={i}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
                >
                  {/* Metric */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center text-accent transition-all duration-300 group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                      {c.tag}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-black text-primary-foreground tracking-tight">
                      {c.metric}
                    </span>
                    <span className="block text-xs text-primary-foreground/50 uppercase tracking-[0.2em] font-semibold mt-1">
                      {c.metricLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-foreground mb-3 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          7. CTA — Final conversion
       ═══════════════════════════════════════════════════════════════ */}
      <CTASection
        title={t.eventsPage.cta.title}
        description={t.eventsPage.cta.description}
        primaryLabel={t.eventsPage.cta.primaryLabel}
        primaryHref={`/${locale}/consulting#contact`}
        secondaryLabel={t.eventsPage.cta.secondaryLabel}
        secondaryHref={`/${locale}/events#upcoming`}
      />
    </main>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Event Card — reusable card for upcoming events
   ═══════════════════════════════════════════════════════════════ */

function EventCard({
  course,
  locale,
  t,
}: {
  course: Course
  locale: string
  t: Awaited<ReturnType<typeof getDictionary>>
}) {
  return (
    <Link
      href={`/${locale}/events/${course.slug}`}
      className="group"
    >
      <Card className="relative h-full overflow-hidden border-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary/20">
        {/* Type stripe */}
        <div className={`h-1.5 ${course.type === "training" ? "bg-gradient-to-r from-primary to-primary/50" : "bg-gradient-to-r from-accent to-accent/50"}`} />

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <Badge variant="default" className="text-xs gap-1">
              <Sparkles size={10} />
              {course.status}
            </Badge>
            <Badge variant={course.type === "training" ? "secondary" : "outline"} className="text-xs">
              {course.type === "training"
                ? (locale === "zh" ? "培訓課程" : "Training")
                : (locale === "zh" ? "工作坊" : "Workshop")}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {course.description}
          </p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {course.date && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={12} className="text-primary/70" />
                {course.date}
              </div>
            )}
            {course.duration && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} className="text-primary/70" />
                {course.duration}
              </div>
            )}
            {course.location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary/70" />
                {course.location}
              </div>
            )}
            {course.capacity && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users size={12} className="text-primary/70" />
                {course.capacity}
              </div>
            )}
          </div>

          {/* Highlights */}
          {course.highlights && (
            <div className="flex flex-wrap gap-1.5">
              {course.highlights.slice(0, 3).map((h, i) => (
                <span key={i} className="text-[10px] font-medium text-primary/80 bg-primary/5 rounded-full px-2.5 py-1">
                  {h}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2 flex items-center justify-between border-t border-border/50">
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-primary" />
            <span className="text-base font-bold text-foreground">{course.price}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {t.eventsPage.upcoming.viewDetails}
            <ArrowRight size={12} />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
