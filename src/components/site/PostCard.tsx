import Link from "next/link"
import { cn } from "@/lib/utils"

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

// Article card shared by /learning, category pages and related posts.
export function PostCard({
  post,
  href,
  minRead,
  featured = false,
  className,
}: {
  post: PostSummary
  href: string
  minRead: string
  featured?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_40px_-24px_rgba(31,32,34,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        featured && "bg-surface-dark text-white sm:p-9",
        className,
      )}
    >
      <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs font-bold", featured ? "bg-brand-yellow text-ink" : "bg-sand text-ink")}>{post.category}</span>
      <h3 className={cn("mt-4 font-black leading-[1.5] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4", featured ? "text-2xl sm:text-3xl" : "text-lg text-ink")}>
        {post.title}
      </h3>
      <p className={cn("mt-3 flex-1 text-sm leading-[1.85]", featured ? "text-white/75 sm:text-base" : "line-clamp-3 text-muted-foreground")}>{post.excerpt}</p>
      <p className={cn("mt-5 flex flex-wrap gap-x-2 text-xs", featured ? "text-white/60" : "text-muted-foreground")}>
        <time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time>
        <span aria-hidden="true">·</span>
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>
          {post.readingMinutes} {minRead}
        </span>
      </p>
    </Link>
  )
}
