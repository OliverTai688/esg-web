import Image from "next/image"
import type { Consultant } from "@/data/team"
import { Quarter } from "@/components/geo/shapes"
import { Tabs } from "@/components/ux/Tabs"
import { cn } from "@/lib/utils"

interface Role {
  title: string
  description: string
}

// One arc of the ring per role, clockwise from the top-left quarter. `turn`
// rotates the role's quarter marker to the same corner of the ring.
const ARCS = [
  { color: "#F25232", offset: -184, bg: "bg-brand-orange", turn: "" },
  { color: "#FAB40A", offset: -274, bg: "bg-brand-yellow", turn: "rotate-90" },
  { color: "#4D515B", offset: -94, bg: "bg-brand-grey", turn: "-rotate-90" },
  { color: "#8A8E97", offset: -4, bg: "bg-[#8A8E97]", turn: "rotate-180" },
]

// The arch closed into a ring: four arcs around the registered ESG共學坊 logo,
// one role at each corner (stacked under the ring on phones). The consultants
// are a row of avatar tabs: pick a face to read that person's title and organisation.
export function EcosystemHub({
  roles,
  centerLabel,
  consultants,
  consultantsTitle,
  english = false,
}: {
  roles: readonly Role[]
  centerLabel: string
  consultants: readonly Consultant[]
  consultantsTitle: string
  /** Show the translated job titles. */
  english?: boolean
}) {
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

      <div className="mx-auto mt-14 max-w-4xl">
        <h3 className="text-sm font-bold tracking-[0.12em] text-muted-foreground">{consultantsTitle}</h3>
        <Tabs
          className="mt-3"
          panelClassName="mt-4"
          label={consultantsTitle}
          items={consultants.map((c, i) => ({
            id: `c${i}`,
            label: (
              <>
                <Image src={c.photo} alt="" width={32} height={32} className="-ml-2.5 size-8 rounded-full object-cover" />
                {c.name}
              </>
            ),
            content: (
              <p className="text-sm leading-[1.75] text-muted-foreground sm:text-base">
                <strong className="mr-2 font-bold text-ink">{english ? c.roleEn : c.role}</strong>
                {c.organization}
              </p>
            ),
          }))}
        />
      </div>
    </div>
  )
}
