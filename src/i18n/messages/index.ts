import type { Locale } from "@/i18n/config"
import type { Messages } from "./zh"

export type { Messages }

const loaders: Record<Locale, () => Promise<Messages>> = {
  zh: () => import("./zh").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
}

export async function getMessages(locale: Locale): Promise<Messages> {
  return (loaders[locale] ?? loaders.zh)()
}
