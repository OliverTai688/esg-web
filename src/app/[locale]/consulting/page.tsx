import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Coffee, BookOpen, FileText, GraduationCap, Users, Handshake, Mail, Clock, ArrowRight, ChevronDown, MessageCircle, Crown, Check } from "lucide-react"
import type { Metadata } from "next"
import { getDictionary } from "@/i18n/getDictionary"
import type { Locale } from "@/i18n/config"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const typedLocale = locale as Locale
  const t = await getDictionary(typedLocale)
  return {
    title: `${t.consultingPage.label} | 共好玟化 CO-ESG`,
    description: t.consultingPage.description,
  }
}

// TODO: move hardcoded strings to dictionary
const services = [
  {
    icon: Users,
    title: "永續品牌顧問輔導",
    price: "NT$6,000 / 次",
    description:
      "一對一顧問服務，協助品牌釐清永續定位、整理 ESG 敘事架構，找到與企業對話的切入點。",
    highlight: "最受歡迎",
  },
  {
    icon: FileText,
    title: "永續白皮書精華版",
    price: "NT$100,000",
    description:
      "為品牌量身打造的永續白皮書，整合 ESG 數據與故事，成為對外溝通、爭取資源的有力文件。",
    highlight: null,
  },
  {
    icon: GraduationCap,
    title: "永續商創師培訓",
    price: "NT$22,000 - 25,000",
    description:
      "系統化培訓課程，從永續概念到商業實踐，培養具備 ESG 思維的永續商業人才。",
    highlight: null,
  },
  {
    icon: BookOpen,
    title: "永續品牌初階工作坊",
    price: "NT$6,000",
    description:
      "半日工作坊，帶領品牌主快速理解永續框架，找到自身品牌與 ESG 的連結點。",
    highlight: null,
  },
]

// TODO: move hardcoded strings to dictionary
const faqs = [
  {
    question: "什麼是 Coffee Chat？",
    answer:
      "Coffee Chat 是共好玟化提供的 15 分鐘免費線上諮詢，讓我們快速了解你的需求與現況，並提供初步建議方向。沒有壓力、沒有推銷，就像喝杯咖啡聊聊天。",
  },
  {
    question: "誰適合使用共好玟化的服務？",
    answer:
      "我們的客戶涵蓋農業品牌、設計公司、社會企業、非營利組織，以及想尋找永續供應鏈的大型企業。只要你正在做有意義的事，希望被更多人看見，我們都歡迎你來聊聊。",
  },
  {
    question: "永續白皮書需要多長時間完成？",
    answer:
      "依品牌規模與資料完整度，通常需要 4 至 8 週。過程中我們會進行深度訪談、資料整理與內容撰寫，確保白皮書真實反映品牌的永續實踐。",
  },
  {
    question: "如何開始合作？",
    answer:
      "最簡單的方式是預約一場 Coffee Chat，讓我們了解你的需求。之後我們會提供客製化的合作建議與報價，確認後即可啟動專案。",
  },
  {
    question: "ESG共學坊訂閱包含什麼？",
    answer:
      "ESG共學坊是跨產業的永續學習與交流平台，訂閱會員可參加定期舉辦的工作坊、講座與產業交流活動，並獲得會員專屬的永續資源與人脈網絡。",
  },
]

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const typedLocale = locale as Locale
  const t = await getDictionary(typedLocale)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Section padding="lg" withPattern>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
              <Coffee size={36} />
            </div>
            <Heading
              level={1}
              label={t.consultingPage.label}
              title={t.consultingPage.title}
              description={t.consultingPage.description}
              align="center"
              spacing="sm"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button variant="default" size="lg" className="rounded-full w-full sm:w-auto gap-2">
                <MessageCircle size={18} />
                {t.consultingPage.bookBtn}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <Link href={`/${locale}`}>{t.consultingPage.back}</Link>
              </Button>
            </div>
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                15 分鐘免費諮詢
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                無壓力、無推銷
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                線上即可進行
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 企業 ESG 解決方案 */}
      <Section id="solutions" background="muted" withTopo>
        <Container>
          {/* TODO: move title/description to dictionary */}
          <Heading
            level={2}
            label="服務項目"
            title="企業 ESG 解決方案"
            description="從一對一顧問到永續白皮書撰寫，從培訓課程到工作坊，選擇最適合你的永續起步方式。"
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="relative flex flex-row overflow-hidden">
                {service.highlight && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="text-xs">{service.highlight}</Badge>
                  </div>
                )}
                <div className="flex shrink-0 items-center justify-center w-20 sm:w-24 bg-primary/5 border-r border-border/50">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <service.icon size={24} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0 font-mono text-xs">{service.price}</Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed mb-4">{service.description}</CardDescription>
                  <div className="mt-auto">
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-xs">
                      {t.consultingPage.bookBtn}
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 非營利組織合作模式 */}
      <Section id="ngo">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Heading
              level={2}
              label="NPO 合作"
              title="非營利組織合作模式"
              description="共好玟化與非營利組織攜手，透過專業顧問輔導與資源連結，讓社會影響力被更多企業看見。"
              align="center"
              spacing="sm"
            />
            {/* TODO: move hardcoded content to dictionary */}
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary/15">
                  <Handshake size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">公益夥伴方案</h3>
                <p className="text-muted-foreground leading-relaxed">
                  針對非營利組織提供優惠合作方案，協助整理永續影響力數據，建立與企業 CSR / ESG 部門對接的溝通架構。
                </p>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      優惠合作方案
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      永續影響力數據整理
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      企業 ESG 部門對接
                    </li>
                  </ul>
                </div>
              </div>
              <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary/15">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">跨界溝通</h3>
                <p className="text-muted-foreground leading-relaxed">
                  透過ESG共學坊平台與產業網絡，將非營利組織的社會價值轉譯為企業端可理解的永續語言，促成長期合作關係。
                </p>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      ESG共學坊平台資源
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      永續語言轉譯
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      長期合作關係促成
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 會員機制 */}
      <Section id="membership" withPattern>
        <Container>
          <Heading
            level={2}
            label={t.consultingPage.membershipSection.label}
            title={t.consultingPage.membershipSection.title}
            description={t.consultingPage.membershipSection.description}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {t.consultingPage.membershipSection.tiers.map((tier, idx) => (
              <Card key={idx} className={`relative flex flex-col text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${idx === 1 ? "border-primary/30 shadow-md" : "border-transparent"}`}>
                {idx === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent" className="text-[10px] px-3 py-0.5 shadow-sm">
                      <Crown size={12} className="mr-1" />
                      {locale === "zh" ? "推薦" : "Recommended"}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{tier.title}</CardTitle>
                  <p className="text-2xl font-black text-primary mt-2">{tier.price}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm text-left">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 常見問題 FAQ */}
      <Section id="faq" background="muted">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* TODO: move title to dictionary */}
            <Heading
              level={2}
              label="FAQ"
              title="常見問題"
              align="center"
            />
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card transition-all hover:shadow-md open:shadow-md open:border-primary/20"
                >
                  <summary className="flex cursor-pointer items-center gap-4 p-5 sm:p-6 font-semibold text-foreground list-none select-none">
                    <span className="size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronDown size={16} className="transition-transform duration-200 group-open:rotate-180" />
                    </span>
                    <span className="flex-1">{faq.question}</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem] sm:pl-[4.75rem]">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 聯絡表單區 */}
      <Section id="contact" withPattern>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Heading
              level={2}
              label={t.consultingPage.label}
              title="預約合作諮詢"
              description="填寫以下表單，我們將盡快與您聯繫安排 Coffee Chat。"
              align="center"
            />
            {/* TODO: wire up form submission */}
            <Card className="p-6 sm:p-8">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                      {t.contactForm.name}
                    </label>
                    <Input id="name" placeholder={t.contactForm.namePlaceholder} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      {t.contactForm.email}
                    </label>
                    <Input id="email" type="email" placeholder={t.contactForm.emailPlaceholder} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="org">
                    {t.contactForm.org}
                  </label>
                  <Input id="org" placeholder={t.contactForm.orgPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="message">
                    {t.contactForm.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t.contactForm.messagePlaceholder}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-full">
                  {t.contactForm.submit}
                </Button>
              </form>
            </Card>

            {/* Contact info */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                  <Mail size={14} />
                </div>
                <span>90223501gungho@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                  <Clock size={14} />
                </div>
                {/* TODO: move to dictionary */}
                <span>週一至週五 09:00-18:00</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
