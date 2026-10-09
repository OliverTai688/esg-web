import { Geist_Mono, DM_Sans, Noto_Sans_TC } from "next/font/google";
import type { Metadata } from "next"
import { i18n, type Locale } from "@/i18n/config"
import { getMessages } from "@/i18n/messages"
import { Navbar } from "@/components/domain/Navbar"
import { Footer } from "@/components/domain/Footer"
import { getNavData } from "@/lib/nav"
import { site } from "@/lib/site"
import "../globals.css";

const localeMap: Record<string, string> = { zh: "zh_TW", en: "en_US" }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getMessages(typedLocale)

  const defaultTitle = dict.home.meta.title

  return {
    metadataBase: new URL(site.url),
    title: {
      template: "%s | 共好玟化 CO-ESG",
      default: defaultTitle,
    },
    description: dict.home.hero.subTitle,
    openGraph: {
      siteName: "共好玟化 CO-ESG",
      locale: localeMap[typedLocale] ?? "zh_TW",
      type: "website",
      images: [site.ogImage],
    },
    twitter: { card: "summary_large_image", images: [site.ogImage.url] },
    alternates: {
      languages: { zh: "/zh", en: "/en" },
    },
    robots: { index: true, follow: true },
  }
}

// Body and headings: Noto Sans TC covers Traditional Chinese and Latin in one family.
// next/font splits it by unicode-range, so pages only download the glyphs they use.
const notoSansTC = Noto_Sans_TC({
  variable: "--font-body-family",
  weight: ["400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Display numerals and Latin kickers
const dmSans = DM_Sans({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const typedLocale = locale as Locale
  const dict = await getMessages(typedLocale)

  return (
    <html
      lang={typedLocale}
      data-scroll-behavior="smooth"
      className={`${notoSansTC.variable} ${geistMono.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
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
              legalName: site.legalName.zh,
              alternateName: site.legalName.en,
              url: site.url,
              description: "永續品牌的專業橋樑",
              taxID: site.taxId,
              foundingDate: String(site.foundingYear),
              founder: { "@type": "Person", name: site.founder.zh },
              email: site.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "南京東路4段50號11樓",
                addressLocality: "松山區",
                addressRegion: "臺北市",
                addressCountry: "TW",
              },
              sameAs: [site.line.url],
              contactPoint: {
                "@type": "ContactPoint",
                email: site.supportEmail,
                contactType: "customer service",
              },
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>
        <Navbar locale={typedLocale} nav={getNavData(dict)} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  )
}
