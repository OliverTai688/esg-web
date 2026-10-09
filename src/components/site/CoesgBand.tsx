import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import type { Messages } from "@/i18n/messages"

const LOGOS = ["class", "store", "talks"] as const

// The ESG共學坊 sub-brand's own band: its registered logos (CLASS / STORE / TALKS)
// and the way to its store. Client rule: store and ESG共學坊 content follow the
// ESG共學坊 identity, not 共好玟化's, so this block switches to the sub-brand
// scope (`data-brand="coesg"` turns the primary colour to CLASS green).
export function CoesgBand({ labels, externalLabel }: { labels: Messages["coesg"]; externalLabel: string }) {
  return (
    <section data-brand="coesg" aria-labelledby="coesg-heading" className="bg-card py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-x-12 gap-y-8 rounded-3xl border-t-4 border-coesg bg-paper p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[13px] font-bold tracking-[0.12em] text-primary">{labels.kicker}</p>
            <h2 id="coesg-heading" className="mt-3 text-2xl font-black leading-[1.35] text-ink sm:text-3xl">
              {labels.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-[1.85] text-muted-foreground">{labels.body}</p>
            <Button size="lg" asChild className="mt-6 hover:bg-[#14661F]">
              <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">
                {labels.storeCta}
                <ArrowUpRight />
                <span className="sr-only">{externalLabel}</span>
              </a>
            </Button>
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:flex-col lg:items-start">
            {LOGOS.map((key) => (
              <li key={key}>
                <Image src={`/brand/coesg-${key}.svg`} alt={labels.logos[key]} width={180} height={55} className="h-11 w-auto sm:h-12" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
