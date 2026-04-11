import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import NumberTicker from "@/components/magicui/NumberTicker"

interface EvidenceCardProps {
  title: string
  metric: string
  description: string
  unit?: string
  icon?: LucideIcon
  trend?: {
    value: string
    positive?: boolean
  }
  tag?: string
  className?: string
}

const EvidenceCard = ({
  title,
  metric,
  description,
  unit,
  icon: Icon,
  tag,
  className,
}: EvidenceCardProps) => {
  const numericMatch = metric.match(/(\d+)/)
  const numericValue = numericMatch ? parseInt(numericMatch[0], 10) : 0
  const suffix = metric.replace(numericMatch ? numericMatch[0] : "", "")

  return (
    <Card className={cn("group h-full border border-border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          {Icon && (
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Icon size={20} />
            </div>
          )}
          {/* Tag badge — accent orange for decorative pop (#12) */}
          {tag && <Badge variant="outline" className="text-[11px] tracking-wider font-bold border-accent/30 text-accent">{tag}</Badge>}
        </div>
        {/* Card label — sentence case, readable size (#7 #10) */}
        <CardDescription className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1 mb-3">
          {/* Metric in foreground instead of primary to reduce green (#2) */}
          <CardTitle className="text-4xl font-black text-foreground tracking-tighter">
            {numericMatch ? (
              <>
                <NumberTicker value={numericValue} />
                <span className="text-2xl font-bold ml-1">{suffix}</span>
              </>
            ) : (
              metric
            )}
          </CardTitle>
          {unit && <span className="text-muted-foreground text-xs font-semibold ml-1">{unit}</span>}
        </div>

        <p className="text-body text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export { EvidenceCard }
