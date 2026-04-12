"use client"

import * as React from "react"
import { useId, useRef } from "react"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { cn } from "@/lib/utils"
import { UserCheck, Users, Building2, Globe } from "lucide-react"

interface EcosystemRole {
  title: string
  description: string
}

interface EcosystemBeamProps {
  roles: readonly EcosystemRole[]
  centerLabel: string
  className?: string
}

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export const EcosystemBeam = ({ roles, centerLabel, className }: EcosystemBeamProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  const icons = [UserCheck, Users, Building2, Globe]

  // We assume exactly 4 roles for this layout
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background p-10 md:shadow-none",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          {/* Top Row */}
          <div className="flex flex-col gap-2 items-center max-w-[140px] text-center">
            <Circle ref={div1Ref} className="size-16 border-primary/20 bg-primary/5 text-primary">
              <UserCheck size={28} />
            </Circle>
            <div className="mt-2">
              <h4 className="text-sm font-bold">{roles[0]?.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1">{roles[0]?.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center max-w-[140px] text-center">
            <Circle ref={div2Ref} className="size-16 border-primary/20 bg-primary/5 text-primary">
              <Users size={28} />
            </Circle>
            <div className="mt-2">
              <h4 className="text-sm font-bold">{roles[1]?.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1">{roles[1]?.description}</p>
            </div>
          </div>
        </div>

        {/* Center Hub */}
        <div className="flex flex-row items-center justify-center">
          <Circle ref={centerRef} className="size-24 border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20">
            <span className="text-xs font-black tracking-widest">{centerLabel}</span>
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          {/* Bottom Row */}
          <div className="flex flex-col gap-2 items-center max-w-[140px] text-center">
            <Circle ref={div3Ref} className="size-16 border-primary/20 bg-primary/5 text-primary">
              <Building2 size={28} />
            </Circle>
            <div className="mt-2">
              <h4 className="text-sm font-bold">{roles[2]?.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1">{roles[2]?.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center max-w-[140px] text-center">
            <Circle ref={div4Ref} className="size-16 border-primary/20 bg-primary/5 text-primary">
              <Globe size={28} />
            </Circle>
            <div className="mt-2">
              <h4 className="text-sm font-bold">{roles[3]?.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight mt-1">{roles[3]?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={centerRef}
        duration={5}
        curvature={-20}
        gradientStartColor="#006241"
        gradientStopColor="#ff6b00"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={centerRef}
        duration={5}
        curvature={20}
        gradientStartColor="#006241"
        gradientStopColor="#ff6b00"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={centerRef}
        duration={5}
        curvature={-20}
        reverse
        gradientStartColor="#006241"
        gradientStopColor="#ff6b00"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={centerRef}
        duration={5}
        curvature={20}
        reverse
        gradientStartColor="#006241"
        gradientStopColor="#ff6b00"
      />
    </div>
  )
}
