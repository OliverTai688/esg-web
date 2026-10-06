import { permanentRedirect } from "next/navigation"
import { i18n } from "@/i18n/config"
import { getAllPosts, getCategories } from "@/lib/posts"

// Topic listings live under /learning/category; keep old URLs working.
export async function generateStaticParams() {
  const cats = getCategories(await getAllPosts())
  return i18n.locales.flatMap((locale) => cats.map((c) => ({ locale, category: c.slug })))
}

export default async function InsightCategoryRedirect({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params
  permanentRedirect(`/${locale}/learning/category/${category}`)
}
