import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Situation {
  title: string
  description: string
  cta: string
  href: string
}

interface Solution {
  label: string
  title: string
  /** rev2 #15: sized between body text and the heading. */
  claim: string
  description: string
  tagline: string
  services: readonly { label: string; href: string }[]
}

// S3 · Problem (rev2 #14–#16): three situation cards, each titled in the
// visitor's own words with a button to the matching service, then the answer:
// the claim, the four services as links to their tabs on /sustainability.
export function ProblemMosaic({
  situations,
  solution,
  english = false,
}: {
  situations: readonly Situation[]
  solution: Solution
  english?: boolean
}) {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3">
        {situations.map((s, i) => (
          <li key={s.href} className="flex flex-col rounded-3xl border border-border bg-card p-7 sm:p-8">
            <p className="font-display text-sm font-bold text-primary">0{i + 1}</p>
            <h3 className="mt-3 text-xl font-black leading-snug text-ink">{s.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-[1.9] text-muted-foreground">{s.description}</p>
            <Button variant="outline" asChild className="mt-6 h-auto min-h-11 self-start whitespace-normal py-2.5 text-left">
              <Link href={s.href}>
                {s.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-3xl bg-surface-dark p-7 text-white sm:p-10 md:p-12">
        <p className="text-xs font-bold tracking-[0.12em] text-brand-yellow">{solution.label}</p>
        <h3 className="mt-2 text-2xl font-black leading-snug sm:text-3xl">{solution.title}</h3>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-[1.7] sm:text-xl">{solution.claim}</p>
        <p className="mt-4 max-w-3xl text-sm leading-[1.9] text-white/75 sm:text-base">
          {solution.description}
          {english ? " " : ""}
          <strong className="font-bold text-white">{solution.tagline}</strong>
        </p>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {solution.services.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full min-h-12 items-center justify-between gap-3 rounded-xl border border-white/20 px-4 py-3 text-sm font-bold transition-colors hover:border-brand-yellow hover:bg-white/[0.06] hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              >
                {service.label}
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
