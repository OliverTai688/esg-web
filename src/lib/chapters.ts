// One chapter = one section of a page. Each page's message file owns its list
// (`chapters`), and that single list feeds both the navbar dropdown and the
// in-page ChapterNav, in page order — so the two can never drift apart.
export interface ChapterDef {
  /** The section's DOM id (the anchor target). Must exist on the page. */
  id: string
  /** Short name shown in the dropdown and the chapter pills (≤ 6 中文字 / ≤ 3 words). */
  label: string
  /** One line for the dropdown: what the visitor gets there (≤ 18 中文字). */
  desc: string
  /** Key into NAV_ICONS in src/lib/nav.ts. */
  icon: string
  /** Set for a dropdown entry that leaves the page (path after the locale, e.g. "/insights").
      Route entries are not sections: they are left out of the ChapterNav. */
  route?: string
}

// The chapters that are real sections of the page, for <ChapterNav>.
export function pageChapters(chapters: readonly ChapterDef[]) {
  return chapters.filter((c) => !c.route).map((c) => ({ id: c.id, label: c.label }))
}
