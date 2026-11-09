import type { Metadata } from "next"
import "../globals.css"

// The admin area has its own root layout: it is not part of the zh/en site,
// has no site navigation, and is never indexed.
export const metadata: Metadata = {
  title: "共好玟化官網｜後台",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body className="min-h-screen bg-paper text-ink antialiased" style={{ fontFamily: 'system-ui, -apple-system, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
