import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { LucideIcon } from "lucide-react"

interface PainPoint {
  icon: LucideIcon
  label: string
  title: string
  description: string
}

interface ProblemSolutionSectionProps {
  label: string
  title: string
  description: string
  painPoints: readonly PainPoint[]
  solutionTitle: string
  solutionDescription: string
  solutionPillars: readonly string[]
  withPattern?: boolean
  withTopo?: boolean
  background?: "default" | "muted" | "primary" | "secondary"
  bigText?: string
}

const ProblemSolutionSection = ({
  label,
  title,
  description,
  painPoints,
  solutionTitle,
  solutionDescription,
  solutionPillars,
  withPattern,
  withTopo,
  background = "muted",
  bigText,
}: ProblemSolutionSectionProps) => {
  return (
    <Section background={background} className="py-24 md:py-32" withPattern={withPattern} withTopo={withTopo} bigText={bigText}>
      <Container>
        {/* Problem Header */}
        <Heading
          level={2}
          label={label}
          title={title}
          description={description}
          align="center"
          className="mb-16 md:mb-24"
        />

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 md:mb-32">
          {painPoints.map((point, idx) => {
            const Icon = point.icon
            return (
              <div
                key={idx}
                className="group bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:shadow-2xl hover:shadow-primary/5 hover:bg-white/30 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start"
              >
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <Icon size={28} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent/70 mb-3">{point.label}</span>
                <h4 className="text-xl font-bold text-foreground mb-4 tracking-tight">{point.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Solution - High Impact Block */}
        <div className="relative bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden shadow-2xl shadow-primary/30 group">
          {/* Decorative slashes */}
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white/[0.04] -skew-x-12 translate-x-1/4 group-hover:translate-x-1/3 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 h-full w-1/4 bg-accent/[0.06] skew-x-12 -translate-x-1/4 group-hover:-translate-x-1/3 transition-transform duration-1000" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 text-accent text-[11px] uppercase tracking-[0.25em] font-bold mb-8">
              <span className="size-2 rounded-full bg-accent animate-pulse shadow-[0_0_12px_var(--accent)]" />
              <span>CO-ESG SOLUTION</span>
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tight leading-[1.15]">
              {solutionTitle}
            </h3>

            <div className="w-20 h-1.5 bg-accent mb-10 rounded-full shadow-[0_0_20px_var(--accent)]" />

            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-medium">
              {solutionDescription}
            </p>

            <div className="mt-12 flex flex-wrap gap-6 pt-12 border-t border-white/10">
              {solutionPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-3">
                  <div className="size-2.5 rounded-full bg-accent" />
                  <span className="text-xs font-semibold text-white/90">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ProblemSolutionSection }
