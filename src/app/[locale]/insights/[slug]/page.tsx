import { permanentRedirect } from "next/navigation"
import { i18n } from "@/i18n/config"
import { getAllSlugs } from "@/lib/posts"

// Articles live at /learning/[slug]; the old /insights/[slug] URLs redirect
// there so each article has one canonical address (T01 item 2).
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return i18n.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export default async function InsightRedirect({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  permanentRedirect(`/${locale}/learning/${slug}`)
}
