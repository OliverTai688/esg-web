import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/core/Container"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import type { Messages } from "@/i18n/messages"

// The ESG共學坊 sub-brand's own block at the bottom of /learning. Client rule: store
// and ESG共學坊 content follow the ESG共學坊 identity, not 共好玟化's, so this block
// switches to the sub-brand scope (`data-brand="coesg"` turns the primary colour to
// CLASS green). Three ways in (rev2 #41–#43): the store (CLASS logo only; STORE and
// TALKS are not public yet), the subscription (bought in the store) and the online
// tools. It is ESG共學坊's entrance, so it carries no LINE button (#41③).
export function CoesgBand({ labels, externalLabel }: { labels: Messages["learning"]["academy"]; externalLabel: string }) {
  const external = <span className="sr-only">{externalLabel}</span>
  return (
    <section data-brand="coesg" aria-labelledby="coesg-heading" className="bg-card py-14 md:py-20">
      <Container>
        <p className="text-[13px] font-bold tracking-[0.12em] text-primary">{labels.kicker}</p>
        <h2 id="coesg-heading" className="mt-3 text-2xl font-black leading-[1.35] text-ink sm:text-3xl">
          {labels.title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-[1.85] text-muted-foreground">{labels.intro}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* The store: courses (CLASS) */}
          <div className="flex flex-col rounded-3xl border-t-4 border-coesg bg-paper p-7 sm:p-8">
            <Image src="/brand/coesg-class.svg" alt={labels.store.logo} width={180} height={55} className="h-11 w-auto self-start sm:h-12" />
            <h3 className="mt-5 text-lg font-black text-ink">{labels.store.title}</h3>
            <p className="mt-2 flex-1 text-base leading-[1.85] text-muted-foreground">{labels.store.body}</p>
            <Button size="lg" asChild className="mt-6 self-start hover:bg-[#14661F]">
              <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">
                {labels.store.cta}
                <ArrowUpRight />
                {external}
              </a>
            </Button>
          </div>

          {/* The subscription: introduced here, no price; bought in the store */}
          <div className="flex flex-col rounded-3xl bg-paper p-7 sm:p-8">
            <h3 className="text-lg font-black text-ink">{labels.subscription.title}</h3>
            <p className="mt-2 flex-1 text-base leading-[1.85] text-muted-foreground">{labels.subscription.body}</p>
            <Button size="lg" variant="outline" asChild className="mt-6 self-start">
              <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">
                {labels.subscription.cta}
                <ArrowUpRight />
                {external}
              </a>
            </Button>
          </div>

          {/* The online tools (#43) */}
          <div className="flex flex-col rounded-3xl bg-paper p-7 sm:p-8">
            <h3 className="text-lg font-black text-ink">{labels.tools.title}</h3>
            <p className="mt-2 flex-1 text-base leading-[1.85] text-muted-foreground">{labels.tools.body}</p>
            <Button size="lg" variant="outline" asChild className="mt-6 self-start">
              <a href={site.toolsUrl} target="_blank" rel="noopener noreferrer">
                {labels.tools.cta}
                <ArrowUpRight />
                {external}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
