import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { ChapterNav } from "@/components/site/ChapterNav"
import { CtaBand } from "@/components/site/CtaBand"
import { Petal } from "@/components/geo/shapes"
import { FlowerGlyph } from "@/components/learning/FlowerGlyph"
import type { Post } from "@/lib/posts"
import type { Messages } from "@/i18n/messages"
import { learningBackHref, categoryLabel, topicOf } from "@/lib/learning-sections"
import { site } from "@/lib/site"

// A table of contents only earns its place from this many headings up.
const TOC_MIN_HEADINGS = 3

// Long-form article template (docs/redesign/pages-v2/learning/, article A):
// a header that says which petal of the topic flower this article is, sticky
// pills for the article's own headings on longer posts, a single reading
// column, one "read next" petal, and the shared closing band that splits
// "still exploring" (LINE) from "have a question" (Coffee Chat). Reading
// progress is the line the site header already draws on every page.
export function ArticleView({
  post,
  next,
  locale,
  l,
}: {
  post: Post
  next?: { post: Post; sameTopic: boolean }
  locale: string
  l: Messages["learning"]
}) {
  const label = (slug: string, fallback: string) => categoryLabel(slug, fallback, l)
  const a = l.article

  return (
    <div className="overflow-x-clip">
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              author: { "@type": "Person", name: post.author },
              publisher: { "@type": "Organization", name: "共好玟化 CO-ESG", url: site.url },
              mainEntityOfPage: `${site.url}/${locale}/learning/${post.slug}`,
              inLanguage: "zh-TW",
            }),
          }}
        />
        <header className="bg-card">
          <Container className="max-w-3xl pb-10 pt-8 md:pb-14 md:pt-12">
            <Link href={learningBackHref(locale, post.categorySlug)} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {l.back}
            </Link>
            <Link
              href={`/${locale}/learning/category/${post.categorySlug}`}
              className="mt-4 flex min-h-11 w-fit items-center gap-2.5 text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              <FlowerGlyph topic={topicOf(post.categorySlug)} className="size-9" />
              {label(post.categorySlug, post.category)}
            </Link>
            <h1 className="mt-2 text-[1.75rem] font-black leading-[1.45] text-ink sm:text-4xl sm:leading-[1.4]">{post.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground">
              <span>
                <span className="sr-only">{a.by}：</span>
                <span className="font-bold text-ink">{post.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <span className="sr-only">{a.published}：</span>
                <time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {post.readingMinutes} {a.readingTime}
              </span>
            </p>
          </Container>
        </header>

        {/* The article's headings as sticky pills: the table of contents, and where the reader is */}
        {post.headings.length >= TOC_MIN_HEADINGS && (
          <ChapterNav chapters={post.headings.map((h) => ({ id: h.id, label: h.text }))} label={a.toc} listClassName="max-w-3xl" />
        )}

        {/* The body is its own section so its length is measured apart from the page chrome */}
        <section id="article-body" data-reading-target>
          <Container className="max-w-3xl pb-10 pt-10 md:pt-14">
            <p className="mb-8 text-lg font-bold leading-[1.85] text-ink sm:text-xl sm:leading-[1.8]">{post.excerpt}</p>
            {/* Headings land with some air below the sticky pills */}
            <div className="prose [&_h2]:scroll-mt-36" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Container>
        </section>

        {post.tags.length > 0 && (
          <Container className="max-w-3xl pb-16 md:pb-20">
            <h2 className="sr-only">{a.tags}</h2>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink/80">
                  #{tag}
                </li>
              ))}
            </ul>
          </Container>
        )}
      </article>

      {next && (
        <>
          {/* Seam · shape relay: a petal lands on the boundary and grows into the next article's card */}
          <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
            <Petal className="absolute right-[10%] top-0 size-9 -translate-y-1/2 bg-brand-orange sm:size-12 lg:right-[24%]" />
          </div>
          <section aria-labelledby="next-heading" className="bg-sand py-14 md:py-20">
            <Container className="max-w-3xl">
              <Link
                href={`/${locale}/learning/${next.post.slug}`}
                className="group flex items-center gap-5 rounded-tr-[4.5rem] rounded-bl-[4.5rem] bg-brand-yellow px-7 py-8 text-ink outline-none focus-visible:ring-4 focus-visible:ring-ring/60 sm:gap-7 sm:px-10 sm:py-10"
              >
                <FlowerGlyph topic={topicOf(next.post.categorySlug)} tone="yellow" className="size-14 sm:size-20" />
                <span className="min-w-0 flex-1">
                  <span id="next-heading" className="block text-[13px] font-bold tracking-[0.08em]">
                    {next.sameTopic ? a.next : `${a.nextOther} · ${label(next.post.categorySlug, next.post.category)}`}
                  </span>
                  <span className="mt-2 block text-xl font-black leading-[1.5] underline-offset-4 group-hover:underline sm:text-2xl">{next.post.title}</span>
                  <span className="mt-2 block text-[13px] text-ink/80">
                    {next.post.readingMinutes} {a.readingTime}
                  </span>
                </span>
                <ArrowRight className="size-6 shrink-0 max-sm:hidden" aria-hidden="true" />
              </Link>
            </Container>
          </section>
        </>
      )}

      <CtaBand
        title={a.endTitle}
        description={a.endBody}
        primary={{ label: a.endPrimary, href: `/${locale}/consulting#contact` }}
        secondary={{ label: a.endSecondary, href: site.line.url, external: true, line: true }}
      />
    </div>
  )
}
