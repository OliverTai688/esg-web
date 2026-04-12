"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { UserCheck, Users, Building2, Globe, ArrowUpRight } from "lucide-react"
import { ParticleNetwork } from "./ParticleNetwork"
import { AnimatedGradientBackground } from "@/components/core/AnimatedGradientBackground"
import { AvatarCircles } from "@/components/magicui/avatar-circles"

interface EcosystemRole {
  title: string
  description: string
}

interface EcosystemNetworkProps {
  roles: readonly EcosystemRole[]
  centerLabel: string
  className?: string
}

const AVATAR_DATA = [
  // Consultants
  [
    { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://github.com/dillionverma" },
    { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://github.com/tomonarifeehan" },
    { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "https://github.com/BankkRoll" },
  ],
  // Instructors
  [
    { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://github.com/safethecode" },
    { imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "https://github.com/sanjay-mali" },
    { imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "https://github.com/itsarghyadas" },
  ],
  // Companies
  [
    { imageUrl: "https://avatars.githubusercontent.com/u/124599", profileUrl: "https://github.com/google" },
    { imageUrl: "https://avatars.githubusercontent.com/u/6154722", profileUrl: "https://github.com/microsoft" },
    { imageUrl: "https://avatars.githubusercontent.com/u/10639145", profileUrl: "https://github.com/apple" },
  ],
  // Global Network
  [
    { imageUrl: "https://avatars.githubusercontent.com/u/7104764", profileUrl: "https://github.com/unicef" },
    { imageUrl: "https://avatars.githubusercontent.com/u/1024025", profileUrl: "https://github.com/un" },
    { imageUrl: "https://avatars.githubusercontent.com/u/14985020", profileUrl: "https://github.com/worldbank" },
  ],
]

export const EcosystemNetwork = ({ roles, centerLabel, className }: EcosystemNetworkProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [hubCoords, setHubCoords] = React.useState<{ x: number; y: number } | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const icons = [UserCheck, Users, Building2, Globe]

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredIndex(index)
    updateHubCoords(e.currentTarget)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setHubCoords(null)
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
        "relative w-full py-20 px-4 overflow-hidden rounded-3xl border border-border/40",
        className
      )}
    >
      {/* Layer 1: Background Gradient */}
      <AnimatedGradientBackground variant="light" intensity={0.6} className="opacity-40" />
      
      {/* Layer 2: Particle Mid-layer */}
      <ParticleNetwork 
        className="absolute inset-0 z-0" 
        hoveredHub={hubCoords}
      />

      {/* Layer 3: Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {roles.map((role, i) => {
            const Icon = icons[i] ?? Users
            const isHovered = hoveredIndex === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={(e) => handleMouseEnter(i, e)}
                onMouseLeave={handleMouseLeave}
                className="relative group h-full"
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
                    <AvatarCircles 
                      avatarUrls={AVATAR_DATA[i] || []} 
                      numPeople={i === 0 ? 12 : i === 1 ? 25 : i === 2 ? 40 : 15}
                      className="mb-2"
                    />
                    
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
        
        {/* Central Hub Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="group relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative px-10 py-4 rounded-full bg-primary text-primary-foreground text-sm font-black tracking-[0.25em] shadow-xl shadow-primary/25 flex items-center gap-4 border border-white/10">
              <div className="size-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
              {centerLabel}
              <div className="size-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
