export const i18n = {
  defaultLocale: "zh" as const,
  locales: ["zh", "en"] as const,
}

export type Locale = (typeof i18n)["locales"][number]
