import { notFound } from "next/navigation"

// Any address under a locale that no route handles: hand over to the localised
// not-found page (../not-found.tsx) so it renders inside the site layout
// instead of the framework's bare 404.
export default function UnmatchedPage() {
  notFound()
}
