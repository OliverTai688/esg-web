import type { Locale } from "./config"
import type { Dictionary } from "./dictionaries/zh"

const dictionaries = {
  zh: () => import("./dictionaries/zh").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}
