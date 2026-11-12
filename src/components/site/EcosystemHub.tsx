import Image from "next/image"
import type { Consultant } from "@/data/team"
import type { Client } from "@/data/clients"
import { Quarter } from "@/components/geo/shapes"
import { ClientLogo } from "@/components/site/ClientLogo"
import { cn } from "@/lib/utils"

interface Role {
  title: string
  description: string
}

// One arc of the ring per role, clockwise from the top-left quarter. `turn`
// rotates the role's quarter marker to the same corner of the ring.
const ARCS = [
  { color: "#E8532A", offset: -184, bg: "bg-brand-orange", turn: "" },
  { color: "#F9A500", offset: -274, bg: "bg-brand-yellow", turn: "rotate-90" },
  { color: "#595959", offset: -94, bg: "bg-brand-grey", turn: "-rotate-90" },
  { color: "#8A8E97", offset: -4, bg: "bg-[#8A8E97]", turn: "rotate-180" },
]

// The arch closed into a ring: four arcs around the registered ESG共學坊 logo,
// one role at each corner (stacked under the ring on phones). Under it, in order:
// the ESG共學坊 partner logos (rev2 #32), the partner-network paragraph (#33) and
// the advisory team (#34), all ten people as cards with name, organisation and
// title, and expertise. The team block is #team (linked from other pages).
export function EcosystemHub({
  roles,
  centerLabel,
  partners,
  partnersTitle,
  network,
  consultants,
  consultantsTitle,
  expertiseLabel,
  english = false,
}: {
  roles: readonly Role[]
  centerLabel: string
  partners: readonly Client[]
  partnersTitle: string
  network: { title: string; body: string }
  consultants: readonly Consultant[]
  consultantsTitle: string
  expertiseLabel: string
  /** Show the English names, organisations and expertise. */
  english?: boolean
}) {
  const lang = english ? "en" : "zh"
  return (
    <div>
      <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-12 lg:gap-y-14">
        <div className="relative mx-auto size-52 sm:size-60 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <svg viewBox="0 0 200 200" fill="none" className="size-full" aria-hidden="true">
            {ARCS.map((arc) => (
              <circle key={arc.offset} cx="100" cy="100" r="91" stroke={arc.color} strokeWidth="16" pathLength={360} strokeDasharray="82 278" strokeDashoffset={arc.offset} />
            ))}
          </svg>
          <Image src="/brand/coesg-class.svg" alt={centerLabel} width={180} height={55} className="absolute inset-0 m-auto h-auto w-[58%]" />
        </div>
        {roles.map((role, i) => {
          const arc = ARCS[i % ARCS.length]
          const left = i % 2 === 0
          return (
            <div
              key={role.title}
              className={cn(
                "grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1",
                left ? "lg:col-start-1 lg:grid-cols-[1fr_auto] lg:text-right" : "lg:col-start-3",
                i < 2 ? "lg:row-start-1" : "lg:row-start-2",
              )}
            >
              <Quarter className={cn("size-[18px]", arc.bg, arc.turn, left && "lg:col-start-2 lg:row-start-1")} />
              <h3 className="text-lg font-black text-ink">{role.title}</h3>
              <p className={cn("col-start-2 text-sm leading-[1.75] text-muted-foreground", left && "lg:col-start-1")}>{role.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h3 className="text-sm font-bold tracking-[0.12em] text-muted-foreground">{partnersTitle}</h3>
        <ul className="mt-4 grid grid-flow-dense grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {partners.map((c) => (
            <li key={c.id} className={cn(c.wide && "col-span-2")}>
              <ClientLogo client={c} english={english} className="h-16" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h3 className="text-xl font-black leading-[1.5] text-ink sm:text-2xl">{network.title}</h3>
        <p className="mt-3 max-w-[68ch] text-base leading-[1.9] text-ink/80">{network.body}</p>
      </div>

      <div id="team" className="mx-auto mt-12 max-w-5xl">
        <h3 className="text-sm font-bold tracking-[0.12em] text-muted-foreground">{consultantsTitle}</h3>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {consultants.map((c) => (
            <li key={c.id}>
              <Image
                src={c.photo}
                alt={c.name[lang]}
                width={320}
                height={400}
                sizes="(min-width: 1024px) 190px, (min-width: 640px) 30vw, 45vw"
                className="aspect-[4/5] w-full rounded-t-[50%_30%] rounded-b-lg bg-sand object-cover"
              />
              <h4 className="mt-3 text-base font-black text-ink">{c.name[lang]}</h4>
              <p className="mt-0.5 text-xs leading-[1.6] text-muted-foreground sm:text-sm">{c.org[lang]}</p>
              <p className="mt-2 text-xs leading-[1.6] text-ink/80 sm:text-sm">
                <span className="sr-only">{expertiseLabel}{english ? ": " : "："}</span>
                {c.expertise[lang]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
