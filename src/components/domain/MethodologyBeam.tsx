"use client"

import React, { forwardRef, useRef } from "react"
import { motion } from "framer-motion"
import { Target, BookOpen, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-20 items-center justify-center rounded-2xl border-2 border-primary/20 bg-background p-4 shadow-sm transition-all duration-300 hover:border-primary/40 hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

interface MethodologyBeamProps {
  steps: ReadonlyArray<{
    number: string
    title: string
    description: string
  }>
}

export function MethodologyBeam({ steps }: MethodologyBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const icons = [
    <Target key="0" className="size-8 text-primary" />,
    <BookOpen key="1" className="size-8 text-primary" />,
    <Link2 key="2" className="size-8 text-primary" />,
  ]

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden py-12 md:py-20"
      ref={containerRef}
    >
      <div className="flex size-full max-w-4xl flex-col items-center gap-12 md:flex-row md:justify-between md:gap-0">
        {steps.map((step, i) => {
          const refs = [step1Ref, step2Ref, step3Ref]
          return (
            <div key={i} className="flex flex-col items-center text-center px-4 z-20">
              <Circle ref={refs[i]}>
                {icons[i]}
              </Circle>
              
              <div className="mt-6">
                <span className="text-xs font-mono font-bold text-primary mb-2 block tracking-widest opacity-60">
                  STEP {step.number}
                </span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-[240px]">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step1Ref}
        toRef={step2Ref}
        curvature={-20}
        duration={3}
        gradientStartColor="#10B981"
        gradientStopColor="#3B82F6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={step2Ref}
        toRef={step3Ref}
        curvature={20}
        duration={3}
        delay={1.5}
        gradientStartColor="#3B82F6"
        gradientStopColor="#8B5CF6"
      />
    </div>
  )
}
