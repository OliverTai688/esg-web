"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface FlipCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
}

export const FlipCard = ({
  title,
  description,
  icon,
  className,
  frontClassName,
  backClassName,
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  return (
    <div
      className={cn("group h-[280px] w-full [perspective:1000px]", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d] -webkit-transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Front Face */}
        <div 
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-6 bg-muted/50 rounded-3xl border border-border/50 shadow-sm [backface-visibility:hidden] -webkit-backface-visibility-hidden",
            frontClassName
          )}
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary/70 mb-6 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-center leading-tight">{title}</h3>
          
          <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <span>滑動查看更多</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className={cn(
            "absolute inset-0 h-full w-full rounded-3xl bg-primary p-8 text-primary-foreground [transform:rotateY(180deg)] [backface-visibility:hidden] -webkit-backface-visibility-hidden flex flex-col justify-center",
            backClassName
          )}
          style={{ 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)"
          }}
        >
          <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">詳細現況</h4>
          <p className="text-base leading-relaxed text-primary-foreground/90 font-medium">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
