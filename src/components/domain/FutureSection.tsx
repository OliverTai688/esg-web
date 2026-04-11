"use client"

import { useRef } from "react"
import { Container } from "@/components/core/Container"
import { Section } from "@/components/core/Section"
import { Heading } from "@/components/core/Heading"
import { LucideIcon, BookOpen, Network, MapPin } from "lucide-react"

const ICONS = {
  BookOpen,
  Network,
  MapPin,
} as const

type IconName = keyof typeof ICONS
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  index: number
}

const TimelineItem = ({ year, title, description, index }: TimelineItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={cn(
        "relative md:grid md:grid-cols-2 md:gap-20 md:py-16 transition-all duration-700",
        isInView ? "opacity-100" : "opacity-30 blur-[1px]"
      )}
    >
      <motion.div
        initial={{ x: isLeft ? -40 : 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          "relative z-10",
          isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
        )}
      >
        <div className={cn(
          "group relative bg-white/10 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl transition-all duration-700 overflow-hidden",
          isInView 
            ? "shadow-primary/10 ring-1 ring-white/40 scale-[1.02] bg-white/20" 
            : "shadow-none scale-100",
          isLeft ? "text-right" : "text-left"
        )}>
          {/* Glass Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          
          {/* Top Light Catch (Shimmer) */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          {/* Brand Spine Accent */}
          <div className={cn(
            "absolute top-0 bottom-0 w-1 transition-all duration-700",
            isInView ? "bg-accent opacity-100 h-full" : "bg-primary/20 opacity-30 h-1/2",
            isLeft ? "right-0" : "left-0"
          )} />

          <div className="relative z-10">
            {/* Chronicle Year Tag */}
            <span className={cn(
              "text-[10px] font-black tracking-[0.3em] uppercase py-1 px-3 rounded-full mb-4 inline-block transition-all duration-500",
              isInView 
                ? "bg-accent/10 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]" 
                : "bg-muted text-muted-foreground"
            )}>
              {year}
            </span>

            <h4 className="text-2xl font-black text-foreground mt-2 mb-4 tracking-tight leading-tight">
              {title}
            </h4>
            
            <p className={cn(
              "text-muted-foreground/90 text-sm md:text-base leading-relaxed max-w-md antialiased",
              isLeft ? "ml-auto" : "mr-auto"
            )}>
              {description}
            </p>
          </div>

          {/* Inner Glow Pulse */}
          {isInView && (
            <motion.div
              layoutId="glow"
              className="absolute inset-0 bg-primary/2 dark:bg-primary/5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      </motion.div>

      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: isInView ? 1.4 : 1,
            backgroundColor: isInView ? "var(--accent)" : "oklch(90% 0.005 160)",
            boxShadow: isInView ? "0 0 25px var(--accent)" : "0 0 0px var(--accent)",
          }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="size-5 rounded-full border-4 border-background transition-colors"
        />
      </div>
    </div>
  )
}

interface ServiceItem {
  iconName: IconName
  title: string
  description: string
}

interface TimelineData {
  year: string
  title: string
  description: string
}

interface FutureSectionProps {
  label: string
  title: string
  description: string
  services: readonly ServiceItem[]
  timeline: readonly TimelineData[]
  withPattern?: boolean
  withTopo?: boolean
  background?: "default" | "muted" | "primary" | "secondary"
  bigText?: string
}

import { FlickeringGrid } from "@/components/magicui/flickering-grid"

const FutureSection = ({
  label,
  title,
  description,
  services,
  timeline,
  withPattern,
  withTopo,
  background,
  bigText,
}: FutureSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Section withPattern={false} withTopo={false} background={background} bigText={bigText} className="overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.2}
          color="rgb(43, 110, 80)" // ESG Emerald (#2B6E50)
          maxOpacity={0.15}
          className="size-full"
        />
      </div>

      <Container className="relative z-10">
        <Heading
          level={2}
          label={label}
          title={title}
          description={description}
          align="center"
          className="mb-20"
        />

        {/* Services Grid with entrance animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {services.map((service, idx) => {
            const Icon = ICONS[service.iconName] || BookOpen
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center group bg-white rounded-3xl p-10 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <Icon size={30} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4 tracking-tight">{service.title}</h4>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline / Vision Section */}
        <div className="relative mt-24" ref={containerRef}>
          {/* Static background path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border/40 hidden md:block -translate-x-1/2 rounded-full" />
          
          {/* Animated progress path */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-accent/20 hidden md:block -translate-x-1/2 rounded-full origin-top z-10"
            style={{ scaleY }}
          />

          <div className="space-y-12 md:space-y-0 relative">
            {timeline.map((item, idx) => (
              <TimelineItem
                key={idx}
                index={idx}
                year={item.year}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { FutureSection }
