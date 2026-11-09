import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChannelButton } from "@/components/site/ChannelButton"
import { solutionCategories, type Solution, type SolutionAction } from "@/data/solutions"
import { cn } from "@/lib/utils"

// 方案總表 / Services & Pricing (rev2 #44): five groups in order, each item as
// 說明｜價格｜按鈕. Talking about needs → this page's form; courses and notices →
// LINE (English: email); buying → the purchase page. The non-profit group is
// one line at the bottom (#46④).
export function SolutionsTable({
  locale,
  popularLabel,
  externalLabel,
}: {
  locale: string
  popularLabel: string
  /** Screen-reader note for links that open a new window */
  externalLabel: string
}) {
  const en = locale === "en"
  const pick = (text: { zh: string; en: string }) => (en ? text.en : text.zh)

  const action = (item: Solution, compact = false) => {
    const a: SolutionAction = en ? item.button.en : item.button.zh
    const label = pick(item.button.label)
    const variant = compact ? "outline" : "default"
    if (a.type === "channel") {
      return (
        <ChannelButton locale={locale} purpose={a.purpose} size="default" variant={en ? "default" : "line"} externalLabel={externalLabel}>
          {label}
        </ChannelButton>
      )
    }
    if (a.type === "contact") {
      return (
        <Button variant={variant} asChild>
          <a href="#contact" data-contact-topic={a.topic}>
            {label}
            <ArrowRight />
          </a>
        </Button>
      )
    }
    if (a.type === "page") {
      return (
        <Button variant={variant} asChild>
          <Link href={`/${locale}${a.path}`}>
            {label}
            <ArrowRight />
          </Link>
        </Button>
      )
    }
    return (
      <Button variant={variant} asChild>
        <a href={a.href} target="_blank" rel="noopener noreferrer">
          {label}
          <ArrowUpRight />
          <span className="sr-only">{externalLabel}</span>
        </a>
      </Button>
    )
  }

  return (
    <div className="space-y-12">
      {solutionCategories.map((category, ci) => {
        if (category.compact) {
          return (
            <div key={category.id} className="flex flex-col gap-4 rounded-3xl bg-paper p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-bold text-muted-foreground">{pick(category.name)}</h3>
                {category.items.map((item) => (
                  <p key={item.id} className="mt-2 text-[15px] leading-[1.85] text-ink">
                    {pick(item.description)}
                  </p>
                ))}
              </div>
              <div className="shrink-0">{category.items[0] && action(category.items[0], true)}</div>
            </div>
          )
        }
        return (
          <div key={category.id} id={category.anchor} className={cn(category.anchor && "scroll-mt-[8.5rem]")}>
            <h3 className="flex items-baseline gap-3 text-xl font-black text-ink">
              <span aria-hidden="true" className="font-display text-sm text-primary tabular-nums">
                {String(ci + 1).padStart(2, "0")}
              </span>
              {pick(category.name)}
            </h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {category.items.map((item) => {
                const name = pick(item.name)
                const subtitle = item.subtitle && pick(item.subtitle)
                return (
                  <li key={item.id} className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[minmax(0,1fr)_12rem] lg:grid-cols-[minmax(0,1fr)_13rem_auto] lg:items-center">
                    <div>
                      <p className="flex flex-wrap items-center gap-2">
                        <span className={cn("text-lg font-black text-ink", en && item.italicEn && "italic")}>
                          {item.detailSlug ? (
                            <Link href={`/${locale}/events/${item.detailSlug}`} className="underline decoration-primary/60 underline-offset-4 hover:decoration-primary">
                              {name}
                            </Link>
                          ) : (
                            name
                          )}
                        </span>
                        {item.popular && <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">{popularLabel}</span>}
                      </p>
                      {subtitle && <p className="mt-1 text-sm font-bold text-ink/80">{subtitle}</p>}
                      <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{pick(item.description)}</p>
                    </div>
                    <p className="font-display text-base font-bold leading-snug text-ink tabular-nums md:text-right lg:text-left">{item.price && pick(item.price)}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:col-span-2 lg:col-span-1 lg:justify-end">
                      {action(item)}
                      {item.note && <span className="text-xs font-bold text-muted-foreground">{pick(item.note)}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
