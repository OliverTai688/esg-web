import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
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
import {
  GraduationCap,
  Wrench,
  CreditCard,
  ArrowRight,
  User,
  Clock,
  Calendar,
  Sparkles,
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

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <Section padding="lg" withPattern>
        <Container className="max-w-3xl">
          <Heading
            level={1}
            label={t.eventsPage.label}
            title={t.eventsPage.title}
            description={t.eventsPage.description}
            align="center"
          />
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{upcoming.length} 場招生中</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{services.length} 項服務</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Upcoming Events */}
      <Section background="muted">
        <Container>
          <Heading
            level={2}
            title="即將舉辦活動"
            description="目前正在招生中的課程與工作坊，立即報名參加。"
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((course) => (
              <Link
                key={course.slug}
                href={`/${locale}/events/${course.slug}`}
                className="group"
              >
                <Card className="flex h-full flex-col border-transparent bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge variant="default" className="text-xs">
                        {course.status}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {course.type === "training" ? "培訓課程" : "工作坊"}
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
                    <div className="space-y-2.5 border-t pt-4">
                      <div className="flex items-center gap-2.5 text-sm">
                        <CreditCard className="h-4 w-4 shrink-0 text-primary/70" />
                        <span className="font-semibold text-foreground">
                          {course.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <User className="h-4 w-4 shrink-0 text-primary/70" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-primary/5 py-2.5 text-sm font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      查看詳情
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Workshop Categories */}
      <Section>
        <Container>
          <Heading
            level={2}
            title="永續工作坊分類"
            description="探索不同類型的永續學習體驗。"
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            <Card className="text-center p-8 border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-2xl bg-primary/10 p-5">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">培訓課程</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  系統性的永續商創師培訓，從初階到進階，建立完整的ESG專業能力。
                </p>
              </div>
            </Card>
            <Card className="text-center p-8 border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-2xl bg-primary/10 p-5">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">工作坊</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  短時間互動式學習，快速掌握永續品牌與實務技巧。
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Consulting Services */}
      <Section background="muted">
        <Container>
          <Heading
            level={2}
            title="顧問服務"
            description="專業顧問諮詢與訂閱方案，為您的永續發展提供持續支援。"
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${locale}/events/${service.slug}`}
                className="group"
              >
                <Card className="flex h-full flex-col border-transparent bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-accent/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="accent" className="text-xs">
                        {service.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {service.type === "consulting" ? "顧問服務" : "訂閱方案"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2.5 text-sm">
                        <CreditCard className="h-4 w-4 shrink-0 text-accent" />
                        <span className="font-semibold text-foreground">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-accent/5 py-2.5 text-sm font-medium text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      了解更多
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Past Events */}
      {past.length > 0 && (
        <Section>
          <Container>
            <Heading
              level={2}
              title="過往活動回顧"
              description="已結束的活動紀錄。"
              align="center"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {past.map((course) => (
                <Link
                  key={course.slug}
                  href={`/${locale}/events/${course.slug}`}
                  className="group"
                >
                  <Card className="flex h-full flex-col border-dashed opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:border-solid group-hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          {course.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-base leading-snug">
                        {course.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="h-3.5 w-3.5" />
                          {course.price}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {course.instructor.split("（")[0]}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        查看紀錄
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back */}
      <Section padding="sm">
        <Container className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            asChild
          >
            <Link href={`/${locale}`}>{t.eventsPage.back}</Link>
          </Button>
        </Container>
      </Section>
    </main>
  )
}
