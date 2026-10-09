import Link from "next/link"
import { cn } from "@/lib/utils"
import { FlowerGlyph } from "@/components/learning/FlowerGlyph"
import { topicOf } from "@/lib/learning-sections"

export interface PostSummary {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  categorySlug: string
  readingMinutes: number
}

export function toSummary<T extends PostSummary>(p: T): PostSummary {
  const { slug, title, excerpt, date, author, category, categorySlug, readingMinutes } = p
  return { slug, title, excerpt, date, author, category, categorySlug, readingMinutes }
}

// One article as a compact row: its topic mark, the title and one line of meta.
// Lists stay scannable because the excerpt lives on the article page, not here.
export function PostCard({
  post,
  href,
  minRead,
  className,
}: {
  post: PostSummary
  href: string
  /** Unit after the reading time, e.g. "分鐘". */
  minRead: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full min-h-[76px] items-center gap-4 rounded-2xl bg-card px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <FlowerGlyph topic={topicOf(post.categorySlug)} className="size-8" />
      <span className="min-w-0">
        <span className="block font-bold leading-[1.5] text-ink underline-offset-4 group-hover:underline">{post.title}</span>
        <span className="mt-0.5 block text-[13px] text-muted-foreground">
          {post.category} · {post.readingMinutes} {minRead}
        </span>
      </span>
    </Link>
  )
}
