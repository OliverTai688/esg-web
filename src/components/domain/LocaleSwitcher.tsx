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
          className={cn(
            "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all",
            l === locale
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l === "zh" ? "中" : "EN"}
        </Link>
      ))}
    </div>
  )
}
