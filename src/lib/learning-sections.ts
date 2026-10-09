// The six learning topics, in the order they sit on the topic flower (clockwise
// from the upper right). `id` is the key under `learning.sections` and the deep
// link into /learning (`/learning#innovation` opens that topic); `slug` is the
// post `categorySlug` the topic lists.
export const learningSections = [
  { id: "innovation", slug: "innovation-strategy" },
  { id: "market", slug: "data-market-competition" },
  { id: "responsibility", slug: "sustainability-esg" },
  { id: "collaboration", slug: "corporate-nonprofit-collaboration" },
  { id: "communication", slug: "communication-empathy" },
  { id: "interviews", slug: "interviews" },
] as const

export type LearningSectionId = (typeof learningSections)[number]["id"]

// A petal's angle on the flower, clockwise from 12 o'clock. The 30° offset puts
// two petals on the horizontal axis, where a petal has the most room for text.
export function petalAngle(index: number) {
  return 30 + index * 60
}

// The topic a post category belongs to; undefined for categories that are not
// on the flower (e.g. announcements).
export function topicOf(categorySlug?: string): LearningSectionId | undefined {
  return learningSections.find((s) => s.slug === categorySlug)?.id
}

// Where "back to learning" should land for a post or category: the topic flower
// with its topic already selected, otherwise the full article list.
export function learningBackHref(locale: string, categorySlug?: string) {
  return `/${locale}/learning#${topicOf(categorySlug) ?? "articles"}`
}

// Display name for a post category in the current language. Topics use the
// dictionary title; anything else (e.g. announcements) falls back to the
// Chinese name stored in the post's front matter.
export function categoryLabel(
  categorySlug: string,
  fallback: string,
  labels: { sections: Record<LearningSectionId, { title: string }>; announcementsTitle: string },
) {
  if (categorySlug === "announcements") return labels.announcementsTitle
  const topic = topicOf(categorySlug)
  return topic ? labels.sections[topic].title : fallback
}
