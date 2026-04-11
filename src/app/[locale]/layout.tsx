import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import type { Metadata } from "next"
import { i18n, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/getDictionary"
import { Navbar } from "@/components/domain/Navbar"
import { Footer } from "@/components/domain/Footer"
import "../globals.css";

const localeMap: Record<string, string> = { zh: "zh_TW", en: "en_US" }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getDictionary(typedLocale)

  const defaultTitle =
    typedLocale === "zh"
      ? "共好玟化 CO-ESG | 永續品牌的專業橋樑"
      : "CO-ESG | Professional Bridge for Sustainable Brands"

  return {
    metadataBase: new URL("https://coesg.tw"),
    title: {
      template: "%s | 共好玟化 CO-ESG",
      default: defaultTitle,
    },
    description: dict.hero.description,
    openGraph: {
      siteName: "共好玟化 CO-ESG",
      locale: localeMap[typedLocale] ?? "zh_TW",
      type: "website",
    },
    alternates: {
      languages: { zh: "/zh", en: "/en" },
    },
    robots: { index: true, follow: true },
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: "--font-heading-family",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

import { DotPattern } from "@/components/core/BackgroundPattern"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getDictionary(typedLocale)

  return (
    <html
      lang={typedLocale}
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} h-full antialiased selection:bg-primary/10 selection:text-primary scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "共好玟化 CO-ESG",
              url: "https://coesg.tw",
              description: "永續品牌的專業橋樑",
              contactPoint: {
                "@type": "ContactPoint",
                email: "90223501gungho@gmail.com",
                contactType: "customer service",
              },
            }),
          }}
        />
        {/* Global Structural Pattern */}
        <DotPattern className="fixed inset-0 -z-30 opacity-[0.03]" />
        
        {/* Global Texture Layer */}
        <div className="bg-grain fixed inset-0 -z-20 pointer-events-none" />

        <Navbar locale={typedLocale} labels={dict.nav} />
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  )
}
