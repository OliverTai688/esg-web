"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { i18n, type Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  function getRedirectedPathname(newLocale: Locale) {
    if (!pathname) return `/${newLocale}`
    const segments = pathname.split("/")
    segments[1] = newLocale
    return segments.join("/")
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/50 p-0.5">
      {i18n.locales.map((l) => (
        <Link
          key={l}
          href={getRedirectedPathname(l)}
          lang={l === "zh" ? "zh-Hant" : "en"}
          hrefLang={l === "zh" ? "zh-Hant" : "en"}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "px-3 py-1 text-xs font-bold rounded-full transition-all",
            l === locale
              ? "bg-brand-grey text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {/* Language names in their own language, no flags (EN rule R33) */}
          {l === "zh" ? "中文" : "English"}
        </Link>
      ))}
    </div>
  )
}
