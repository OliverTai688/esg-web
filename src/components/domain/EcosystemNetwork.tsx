"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { UserCheck, Link2, Building2, Globe, ArrowUpRight } from "lucide-react"
import { ParticleNetwork } from "./ParticleNetwork"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"
import type { Consultant } from "@/data/team"

interface EcosystemRole {
  title: string
  description: string
}

interface EcosystemNetworkProps {
  roles: readonly EcosystemRole[]
  /** Shown as avatars on the first role, the consultant team. */
  consultants?: readonly Consultant[]
  className?: string
}

// One icon per role, index-aligned with `roles`. The first role (the consultant
// team) shows the consultants' photos instead when they are provided.
const ROLE_ICONS = [UserCheck, Link2, Building2, Globe]

// Registered ESG共學坊 logo (CLASS). Keep clear space of at least a tenth of its width around it.
const HubLogo = ({ width }: { width: number }) => (
  <Image
    src="/brand/coesg-class.svg"
    alt="ESG共學坊"
    width={width}
    height={Math.round(width * (94.5 / 312))}
  />
)

export const EcosystemNetwork = ({ roles, consultants, className }: EcosystemNetworkProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [hubCoords, setHubCoords] = React.useState<{ x: number; y: number } | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Initialize or update the center hub coordinates
  React.useEffect(() => {
    const updateCenterHub = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // Only set to center if nothing is hovered, or handle it in the rendering logic
      if (hoveredIndex === null) {
        setHubCoords({ x: rect.width / 2, y: rect.height / 2 })
      }
    }

    updateCenterHub()
    window.addEventListener("resize", updateCenterHub)
    return () => window.removeEventListener("resize", updateCenterHub)
  }, [hoveredIndex])

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredIndex(index)
    updateHubCoords(e.currentTarget)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    // Default back to center hub is handled by the useEffect above
  }

  const updateHubCoords = (element: Element) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const cardRect = element.getBoundingClientRect()
    
    setHubCoords({
      x: cardRect.left - containerRect.left + cardRect.width / 2,
      y: cardRect.top - containerRect.top + cardRect.height / 2,
    })
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full py-24 px-4 overflow-hidden rounded-3xl border border-border/40",
        className
      )}
    >
      {/* Layer 1: Background Gradient */}
      <AnimatedGradientBackground variant="light" intensity={0.6} className="opacity-40" />
      
      {/* Layer 2: Particle Mid-layer */}
      <ParticleNetwork 
        className="absolute inset-0 z-0" 
        hoveredHub={hubCoords}
        particleCount={50}
      />

      {/* Layer 3: Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Central Logo Hub */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-150" />
              <div className="relative px-8 py-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl">
                <HubLogo width={200} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {roles.map((role, i) => {
            const isHovered = hoveredIndex === i
            const RoleIcon = ROLE_ICONS[i] ?? Globe

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={(e) => handleMouseEnter(i, e)}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "relative group h-full",
                  // Add margin to make space for the central logo on desktop
                  i % 2 === 0 ? "lg:mr-12" : "lg:ml-12",
                  i < 2 ? "lg:mb-12" : "lg:mt-12"
                )}
              >
                <div 
                  className={cn(
                    "h-full p-8 rounded-2xl transition-all duration-500",
                    "bg-white/40 backdrop-blur-md border border-white/20",
                    "hover:bg-white/60 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]",
                    "flex flex-col gap-6"
                  )}
                >
                  <div className="flex justify-between items-end">
                    {i === 0 && consultants && consultants.length > 0 ? (
                      <ul className="mb-2 flex -space-x-2.5">
                        {consultants.map((person) => (
                          <li key={person.photo} className="group/avatar relative hover:z-10" title={`${person.name}｜${person.organization} ${person.role}`}>
                            <Image
                              src={person.photo}
                              alt={person.name}
                              width={44}
                              height={44}
                              className="size-11 rounded-full border-2 border-white bg-muted object-cover object-top shadow-sm outline-none transition-transform duration-200 group-hover/avatar:scale-110"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md group-hover/avatar:block"
                            >
                              {person.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <RoleIcon size={24} />
                      </div>
                    )}
                    
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                      className="text-primary"
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3 text-foreground tracking-tight">{role.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 blur-xl"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Mobile Logo Hub — visible when not on desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center lg:hidden"
        >
          <div className="relative px-7 py-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl">
            <HubLogo width={168} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
