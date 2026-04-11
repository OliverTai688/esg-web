import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MessageCircle, Newspaper, CalendarCheck, Handshake, QrCode } from "lucide-react"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: `${t.joinPage.label} | 共好玟化 CO-ESG`,
    description: t.joinPage.description,
  }
}

// TODO: move hardcoded strings to dictionary
const benefits = [
  {
    icon: Newspaper,
    title: "最新永續資訊",
    description: "第一手掌握國內外永續趨勢、ESG 政策更新與產業動態，讓你的永續知識不落後。",
  },
  {
    icon: CalendarCheck,
    title: "活動優先通知",
    description: "共學坊工作坊、國際論壇、媒合活動等最新消息優先收到，把握每一次學習與合作機會。",
  },
  {
    icon: Handshake,
    title: "跨產業合作機會",
    description: "加入共好玟化的夥伴網絡，與來自不同領域的永續實踐者交流，創造跨界合作的可能。",
  },
]

export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <Section padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
              <MessageCircle size={36} />
            </div>
            <Heading
              level={1}
              label={t.joinPage.label}
              title={t.joinPage.title}
              description={t.joinPage.description}
              align="center"
              spacing="sm"
            />
          </div>
        </Container>
      </Section>

      {/* LINE Info & QR Code */}
      <Section background="muted">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <Heading
              level={2}
              title={t.joinPage.qrCodeLabel}
              description={t.joinPage.lineInstructions}
              align="center"
              spacing="sm"
            />
            {/* QR Code placeholder */}
            <div className="mx-auto mt-8 flex size-56 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-card">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <QrCode size={48} />
                <span className="text-sm font-medium">LINE QR Code</span>
              </div>
            </div>
            {/* TODO: move to dictionary */}
            <p className="mt-4 text-sm text-muted-foreground">
              LINE ID: <span className="font-mono font-semibold text-foreground">@381iutjm</span>
            </p>
            <div className="mt-6">
              <Button variant="default" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <a
                  href="https://line.me/R/ti/p/@381iutjm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.joinPage.lineBtn}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section>
        <Container>
          {/* TODO: move title/description to dictionary */}
          <Heading
            level={2}
            label="加入好處"
            title="成為共好夥伴的三大好處"
            description="加入 LINE 官方帳號，即時獲得永續圈的第一手資訊與合作資源。"
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    <benefit.icon size={28} />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="muted" padding="sm">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            {/* TODO: move to dictionary */}
            <Heading
              level={2}
              title="準備好加入共好夥伴了嗎？"
              description="一鍵加入 LINE 官方帳號，與我們一起推動永續行動。"
              align="center"
              spacing="sm"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="default" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <a
                  href="https://line.me/R/ti/p/@381iutjm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.joinPage.lineBtn}
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <Link href={`/${locale}`}>{t.joinPage.back}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
