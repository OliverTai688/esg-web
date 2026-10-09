import Image from "next/image"
import { clientLogo, clientName, type Client } from "@/data/clients"
import { cn } from "@/lib/utils"

// One client logo on a white tile (dark for logos with white lettering). The
// logos come in every shape and background, so each is fitted inside the same
// box: size the tile with `h-*` / `size-*` on className.
export function ClientLogo({ client, english = false, className }: { client: Client; english?: boolean; className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden rounded-xl ring-1 ring-border", client.dark ? "bg-ink" : "bg-white", className)}>
      <Image src={clientLogo(client.id)} alt={clientName(client, english)} fill sizes="160px" className="object-contain p-2" />
    </span>
  )
}
