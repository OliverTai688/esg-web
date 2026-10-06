import Link from "next/link"
import { ArrowLeft, ArrowRight, MessageCircle, Coffee } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { PostCard, toSummary } from "@/components/site/PostCard"
import type { Post } from "@/lib/posts"
import type { Messages } from "@/i18n/messages"
import { learningBackHref, categoryLabel } from "@/lib/learning-sections"
import { site } from "@/lib/site"

// Long-form article template: header, readable body, two-path ending, related posts.
export function ArticleView({ post, related, locale, l }: { post: Post; related: Post[]; locale: string; l: Messages["learning"] }) {
  const label = (slug: string, fallback: string) => categoryLabel(slug, fallback, l)
  const a = l.article

  return (
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
      <header className="border-b border-border bg-card">
        <Container className="max-w-3xl py-12 md:py-16">
          <Link href={learningBackHref(locale, post.categorySlug)} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {l.back}
          </Link>
          <Link
            href={`/${locale}/learning/category/${post.categorySlug}`}
            className="mt-8 block w-fit rounded-full bg-orange-soft px-3 py-1 text-xs font-bold text-[#A8321A] hover:bg-primary hover:text-white"
          >
            {label(post.categorySlug, post.category)}
          </Link>
          <h1 className="mt-4 text-[1.75rem] font-black leading-[1.45] text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-5 text-base leading-[1.9] text-muted-foreground sm:text-lg">{post.excerpt}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">{a.by}</dt>
              <dd className="font-bold text-ink">{post.author}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{a.published}</dt>
              <dd className="font-bold text-ink">
                <time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{a.readingTime}</dt>
              <dd className="font-bold text-ink">{post.readingMinutes}</dd>
            </div>
          </dl>
        </Container>
      </header>

      <Container className="max-w-3xl py-12 md:py-16">
        <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.tags.length > 0 && (
          <div className="mt-12">
            <h2 className="sr-only">{a.tags}</h2>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink/80">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Two paths: still exploring → LINE, has a question → Coffee Chat */}
        <aside className="mt-14 rounded-3xl bg-surface-dark p-7 text-white sm:p-9">
          <p className="text-xl font-black">{a.endTitle}</p>
          <p className="mt-3 text-sm leading-[1.9] text-white/75">{a.endBody}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button variant="line" asChild>
              <a href={site.line.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {a.endSecondary}
              </a>
            </Button>
            <Button variant="inverse" asChild>
              <Link href={`/${locale}/events#workshops`}>
                {a.endPrimary}
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <Link href={`/${locale}/consulting#contact`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-yellow underline-offset-4 hover:underline">
            <Coffee className="size-4" aria-hidden="true" />
            {a.coffee}
          </Link>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-card py-14 md:py-16">
          <Container>
            <h2 id="related-heading" className="text-2xl font-black text-ink">
              {a.related}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={{ ...toSummary(p), category: label(p.categorySlug, p.category) }} href={`/${locale}/learning/${p.slug}`} minRead={a.readingTime} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  )
}

