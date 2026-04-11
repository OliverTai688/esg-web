import * as React from "react"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Marquee from "@/components/magicui/marquee"

/* ─── Types ─── */

interface Testimonial {
  highlight: string
  quote: string
  name: string
  company: string
  title: string
  category: string
  tag: string
}

interface TrustSectionProps {
  label: string
  title: string
  description: string
  testimonials: readonly Testimonial[]
}

/* ─── Testimonial Card ─── */

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial
}) {
  return (
    <div
      className={cn(
        "relative w-[350px] cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:bg-white/20 hover:-translate-y-1"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="size-10 rounded-xl bg-primary flex items-center justify-center font-bold text-primary-foreground text-xs shadow-md shadow-primary/10">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold text-foreground">
            {testimonial.name}
          </figcaption>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-1">
            {testimonial.company}
          </p>
        </div>
        <Badge
          variant="outline"
          className="ml-auto text-[9px] font-black uppercase border-accent/30 text-accent bg-accent/5 px-2 py-0"
        >
          {testimonial.tag}
        </Badge>
      </div>
      <blockquote className="space-y-3">
        <p className="text-sm font-bold text-foreground leading-tight">
          &ldquo;{testimonial.highlight}&rdquo;
        </p>
        <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-3">
          {testimonial.quote}
        </p>
      </blockquote>
    </div>
  )
}

/* ─── Main Section ─── */

const TrustSection = ({
  label,
  title,
  description,
  testimonials,
}: TrustSectionProps) => {
  // Split testimonials into two rows for variety
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2))
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2))

  return (
    <Section background="muted" className="relative overflow-hidden py-24 md:py-32">
      <Container>
        <Heading
          level={2}
          label={label}
          title={title}
          description={description}
          align="center"
          className="mb-16 md:mb-20"
        />
      </Container>
      
      {/* Testimonial Marquees */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-6">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((t, idx) => (
            <TestimonialCard key={`r1-${idx}`} testimonial={t} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {secondRow.map((t, idx) => (
            <TestimonialCard key={`r2-${idx}`} testimonial={t} />
          ))}
        </Marquee>
        
        {/* Decorative mask to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </Section>
  )
}

export { TrustSection }
