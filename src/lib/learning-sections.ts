// Topic sections on /learning, in page order. `id` is the section anchor and the
// key under `learningPage.sections`; `slug` is the post `categorySlug` it lists.
export const learningSections = [
  { id: "innovation", slug: "innovation-strategy" },
  { id: "market", slug: "data-market-competition" },
  { id: "responsibility", slug: "sustainability-esg" },
  { id: "collaboration", slug: "corporate-nonprofit-collaboration" },
  { id: "communication", slug: "communication-empathy" },
  { id: "interviews", slug: "interviews" },
] as const

export type LearningSectionId = (typeof learningSections)[number]["id"]

// Where "back to learning" should land for a post or category: its topic section
// when one exists, otherwise the top of /learning (e.g. announcements).
export function learningBackHref(locale: string, categorySlug?: string) {
  const section = learningSections.find((s) => s.slug === categorySlug)
  return section ? `/${locale}/learning#${section.id}` : `/${locale}/learning`
}

// Display name for a post category in the current language. Topic sections use
// the dictionary title; anything else (e.g. announcements) falls back to the
// Chinese name stored in the post's front matter.
export function categoryLabel(
  categorySlug: string,
  fallback: string,
  labels: { sections: Record<LearningSectionId, { title: string }>; announcementsTitle: string },
) {
  if (categorySlug === "announcements") return labels.announcementsTitle
  const section = learningSections.find((s) => s.slug === categorySlug)
  return section ? labels.sections[section.id].title : fallback
}
