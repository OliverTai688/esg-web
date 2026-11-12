import { getAllSlugs, getPostBySlug } from "@/lib/posts"

// Markdown version of an article for AI readers (launch checklist 10), at the same
// address as the current platform: /api/md/posts/<slug>. Unlike the old platform,
// the H2 headings are kept as "## " so the structure survives.
export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return new Response("Not found", { status: 404 })
  const header = [`# ${post.title}`, "", `- 作者：${post.author}`, `- 日期：${post.date}`, `- 分類：${post.category}`, `- 網址：https://coesg.tw/zh/learning/${post.slug}`, "", post.excerpt ? `> ${post.excerpt}` : "", ""]
  return new Response([...header, post.markdown, ""].join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
