// Canonical and hreflang for one page (EN rules R36, A4): each page points at
// its own Chinese and English versions, not at the home page; x-default is the
// Chinese page, the site's default language.
export function alternatesFor(locale: string, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: { "zh-TW": `/zh${path}`, en: `/en${path}`, "x-default": `/zh${path}` },
  }
}
