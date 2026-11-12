import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getConsultant } from "@/data/team"

/** Sets the *…* parts of a string in italics (English book titles, R10). */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split("*")
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}
    </>
  )
}

// A small instructor card on the inner pages (rev2 #52): the consultant team's
// photo, two or three lines of background, and a link to the team on
// /sustainability. No page of its own.
export function InstructorCard({
  id,
  locale,
  bio,
  moreLabel,
}: {
  /** Consultant id in src/data/team.ts */
  id: string
  locale: string
  /** The client's text for this person; otherwise their organisation and expertise */
  bio?: string
  moreLabel: string
}) {
  const person = getConsultant(id)
  if (!person) return null
  const en = locale === "en"
  const name = en ? person.name.en : person.name.zh
  return (
    <article className="flex gap-5 rounded-3xl bg-paper p-5 sm:p-6">
      <Image
        src={person.photo}
        alt={name}
        width={160}
        height={200}
        sizes="96px"
        className="aspect-[4/5] w-20 shrink-0 self-start rounded-2xl object-cover sm:w-24"
      />
      <div className="min-w-0">
        <h3 className="text-lg font-black text-ink">{name}</h3>
        {bio ? (
          <p className="mt-2 text-sm leading-[1.8] text-ink/80">
            <Emphasis text={bio} />
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm font-bold leading-[1.7] text-ink/80">{en ? person.org.en : person.org.zh}</p>
            <p className="mt-1 text-sm leading-[1.7] text-muted-foreground">{en ? person.expertise.en : person.expertise.zh}</p>
          </>
        )}
        {/* The consultant team on /sustainability (#team, see the WP-B report) */}
        <Link href={`/${locale}/sustainability#team`} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-link">
          {moreLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
