import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n, type Locale } from "@/i18n/config"

// Remembers the visitor's language (EN rule R34). Set whenever a locale-prefixed
// page is visited, so switching language with the switcher is remembered too.
const LOCALE_COOKIE = "NEXT_LOCALE"
const ONE_YEAR = 60 * 60 * 24 * 365

function isLocale(value: string | undefined): value is Locale {
  return !!value && i18n.locales.includes(value as Locale)
}

// No redirect by IP or browser language (EN rule R35): a remembered choice wins,
// otherwise the default locale.
function getLocale(request: NextRequest): Locale {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value
  return isLocale(remembered) ? remembered : i18n.defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathLocale) {
    if (request.cookies.get(LOCALE_COOKIE)?.value === pathLocale) return
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, pathLocale, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" })
    return response
  }

  // Skip internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request)
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  )
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\..*).*)"],
}
