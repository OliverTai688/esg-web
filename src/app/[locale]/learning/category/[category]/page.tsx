import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/core/Container"
import { SectionHeader } from "@/components/site/SectionHeader"
import { PostCard, toSummary } from "@/components/site/PostCard"
import { getMessages } from "@/i18n/messages"
import { i18n, type Locale } from "@/i18n/config"
import { getAllPosts, getCategories, getPostsByCategory } from "@/lib/posts"
import { learningBackHref, categoryLabel, learningSections } from "@/lib/learning-sections"

export async function generateStaticParams() {
  const cats = getCategories(await getAllPosts())
  return i18n.locales.flatMap((locale) => cats.map((cat) => ({ locale, category: cat.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getMessages(locale as Locale)
  const cat = getCategories(await getAllPosts()).find((c) => c.slug === category)
  if (!cat) return {}
  return { title: `${categoryLabel(cat.slug, cat.name, t.learning)}｜${t.learning.label}`, description: t.learning.description }
}

export default async function LearningCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params
  const t = await getMessages(locale as Locale)
  const l = t.learning
  const posts = await getAllPosts()
  const cat = getCategories(posts).find((c) => c.slug === category)
  if (!cat) notFound()
  const name = categoryLabel(cat.slug, cat.name, l)
  const section = learningSections.find((s) => s.slug === category)
  const list = getPostsByCategory(posts, category)

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-14 md:py-20">
          <Link href={learningBackHref(locale, category)} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {l.back}
          </Link>
          <SectionHeader
            as="h1"
            className="mt-8"
            kicker={`${l.label}・${list.length} ${l.articlesCount}`}
            title={name}
            description={section ? l.sections[section.id].description : undefined}
          />
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <PostCard post={{ ...toSummary(p), category: name }} href={`/${locale}/learning/${p.slug}`} minRead={l.article.readingTime} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
