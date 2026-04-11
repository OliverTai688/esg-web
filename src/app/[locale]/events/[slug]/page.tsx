import type { Metadata } from "next"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"
import { getCourseBySlug } from "@/data/courses"
import {
  ArrowLeft,
  CreditCard,
  User,
  CheckCircle,
} from "lucide-react"

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return { title: "找不到此活動 | 共好玟化 CO-ESG" }
  }

  return {
    title: `${course.title} | 共好玟化 CO-ESG`,
    description: course.description,
  }
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { locale, slug } = await params
  const typedLocale = locale as Locale
  const t = await getDictionary(typedLocale)

  const course = getCourseBySlug(slug)

  if (!course) {
    return (
      <main className="flex min-h-screen flex-col">
        <Section padding="lg">
          <Container className="text-center">
            <Heading
              level={1}
              title="找不到此活動"
              description="您所查詢的活動不存在或已被移除。"
              align="center"
            />
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href={`/${locale}/events`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.eventsPage.back}
              </Link>
            </Button>
          </Container>
        </Section>
      </main>
    )
  }

  const typeLabel: Record<string, string> = {
    training: "培訓課程",
    workshop: "工作坊",
    consulting: "顧問服務",
    subscription: "訂閱方案",
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case "招生中":
        return "default" as const
      case "可預約":
      case "開放中":
        return "accent" as const
      case "已結束":
        return "secondary" as const
      default:
        return "outline" as const
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Back link */}
      <Section padding="sm">
        <Container>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link href={`/${locale}/events`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.eventsPage.back}
            </Link>
          </Button>
        </Container>
      </Section>

      {/* Course Detail */}
      <Section padding="sm">
        <Container className="max-w-3xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant={statusVariant(course.status)} className="text-xs">
              {course.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {typeLabel[course.type]}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-[1.1] mb-4">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground/80 mb-10 leading-relaxed max-w-2xl">
            {course.description}
          </p>

          {/* Info grid */}
          <div className="grid gap-5 sm:grid-cols-2 mb-12">
            <div className="flex items-start gap-4 rounded-xl border border-primary/10 bg-muted/20 p-5">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">費用</p>
                <p className="text-xl font-bold text-foreground">{course.price}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-primary/10 bg-muted/20 p-5">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">講師</p>
                <p className="text-lg font-semibold text-foreground">{course.instructor}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          {course.status !== "已結束" ? (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-primary/10 bg-muted/20 p-10 text-center">
              <CheckCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">目前狀態</p>
                <p className="text-xl font-bold text-foreground">
                  {course.status}
                </p>
              </div>
              <Button size="lg" className="rounded-full px-10 text-base">
                立即報名
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed p-10 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                此活動已結束
              </p>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10"
                asChild
              >
                <Link href={`/${locale}/events`}>瀏覽其他活動</Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
