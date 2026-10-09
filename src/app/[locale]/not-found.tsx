import zh from "@/i18n/messages/zh/common"
import en from "@/i18n/messages/en/common"
import { NotFoundView } from "@/components/site/NotFoundView"

// not-found receives no params, so both languages are passed down and the view
// picks one from the address.
export default function NotFound() {
  return (
    <NotFoundView
      messages={{
        zh: { ...zh.notFound, links: [zh.nav.sustainability.label, zh.nav.events.label, zh.nav.learning.label, zh.nav.consulting.label] },
        en: { ...en.notFound, links: [en.nav.sustainability.label, en.nav.events.label, en.nav.learning.label, en.nav.consulting.label] },
      }}
    />
  )
}
