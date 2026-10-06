"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { UserCheck, Link2, Building2, Globe, ArrowUpRight } from "lucide-react"
import { ParticleNetwork } from "./ParticleNetwork"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"

interface EcosystemRole {
  title: string
  description: string
}

interface EcosystemNetworkProps {
  roles: readonly EcosystemRole[]
  className?: string
}

// One icon per role, index-aligned with `roles`. Real team photos and partner
// logos replace these once the client assets are prepared (task S06-B).
const ROLE_ICONS = [UserCheck, Link2, Building2, Globe]

export const EcosystemNetwork = ({ roles, className }: EcosystemNetworkProps) => {
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
              <div className="relative px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center gap-1">
                <span className="text-xs font-black tracking-[0.4em] text-primary/60 uppercase">Ecosystem</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black tracking-tighter text-primary">CO</span>
                  <div className="w-1.5 h-6 bg-accent rounded-full rotate-12" />
                  <span className="text-3xl font-black tracking-tighter text-foreground">ESG</span>
                </div>
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
                    <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <RoleIcon size={24} />
                    </div>
                    
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
           <div className="relative px-8 py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl flex items-center gap-3">
              <span className="text-lg font-black tracking-tight text-primary">CO</span>
              <div className="w-1 h-4 bg-accent rounded-full rotate-12" />
              <span className="text-lg font-black tracking-tight text-foreground">ESG</span>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
