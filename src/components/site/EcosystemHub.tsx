import type { ReactNode } from "react"
import Image from "next/image"
import { UserCheck, Link2, Building2, Globe } from "lucide-react"
import type { Consultant } from "@/data/team"

interface Role {
  title: string
  description: string
}

const ROLE_ICONS = [UserCheck, Link2, Building2, Globe]

// Hub-and-spoke diagram: the ESG共學坊 logo in the centre, four roles around it.
// Desktop places roles on the four sides with dashed connectors; mobile stacks them.
export function EcosystemHub({
  roles,
  centerLabel,
  consultants,
  consultantsTitle,
}: {
  roles: readonly Role[]
  centerLabel: string
  consultants: readonly Consultant[]
  consultantsTitle: string
}) {
  const [team, supply, business, global] = roles
  const card = (role: Role, i: number, extra?: ReactNode) => {
    const Icon = ROLE_ICONS[i]
    return (
      <div className="relative z-10 rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_rgba(31,32,34,0.04)]">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-orange-soft text-primary">
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
          <h3 className="font-bold text-ink">{role.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{role.description}</p>
        {extra}
      </div>
    )
  }

  const avatars = (
    <div className="mt-4">
      <p className="mb-2 text-xs font-bold text-muted-foreground">{consultantsTitle}</p>
      <ul className="flex flex-wrap gap-2">
        {consultants.map((c) => (
          <li key={c.name} className="group relative">
            <Image
              src={c.photo}
              alt={`${c.name}｜${c.organization} ${c.role}`}
              title={`${c.name}｜${c.organization} ${c.role}`}
              width={44}
              height={44}
              className="size-11 rounded-full border-2 border-card object-cover ring-1 ring-border"
            />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{consultants.map((c) => c.name).join("・")}</p>
    </div>
  )

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Connectors (desktop only) */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="50" y1="50" x2="18" y2="22" stroke="#F25232" strokeOpacity=".35" strokeWidth=".25" strokeDasharray="1 1.2" vectorEffect="non-scaling-stroke" />
        <line x1="50" y1="50" x2="82" y2="22" stroke="#F25232" strokeOpacity=".35" strokeWidth=".25" strokeDasharray="1 1.2" vectorEffect="non-scaling-stroke" />
        <line x1="50" y1="50" x2="18" y2="80" stroke="#F25232" strokeOpacity=".35" strokeWidth=".25" strokeDasharray="1 1.2" vectorEffect="non-scaling-stroke" />
        <line x1="50" y1="50" x2="82" y2="80" stroke="#F25232" strokeOpacity=".35" strokeWidth=".25" strokeDasharray="1 1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-10 lg:gap-y-14">
        <div className="lg:col-start-1 lg:row-start-1">{card(team, 0, avatars)}</div>
        <div className="lg:col-start-3 lg:row-start-1">{card(supply, 1)}</div>
        <div className="order-first flex justify-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative flex size-56 flex-col items-center justify-center rounded-full border-[3px] border-coesg bg-card text-center shadow-[0_12px_40px_-12px_rgba(35,172,57,0.35)] sm:size-64">
            <span aria-hidden="true" className="absolute inset-3 rounded-full border border-dashed border-coesg/40" />
            <Image src="/brand/coesg-class.svg" alt={centerLabel} width={180} height={55} className="h-auto w-40 sm:w-44" />
          </div>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">{card(business, 2)}</div>
        <div className="lg:col-start-3 lg:row-start-2">{card(global, 3)}</div>
      </div>
    </div>
  )
}
