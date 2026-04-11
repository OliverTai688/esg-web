"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const DotPattern = ({ 
  className, 
  opacity = 0.05 
}: { 
  className?: string
  opacity?: number 
}) => (
  <svg
    className={cn(
      "pointer-events-none absolute inset-0 h-full w-full fill-current",
      className
    )}
    style={{ opacity }}
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="dot-pattern"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <circle id="pattern-circle" cx="1" cy="1" r="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#dot-pattern)" />
  </svg>
)

export const GridPattern = ({ 
  className, 
  opacity = 0.03 
}: { 
  className?: string
  opacity?: number 
}) => (
  <svg
    className={cn(
      "pointer-events-none absolute inset-0 h-full w-full stroke-current",
      className
    )}
    style={{ opacity }}
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="-1"
        y="-1"
      >
        <path d="M.5 40V.5H40" fill="none" strokeDasharray="0" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
  </svg>
)

export const MeshGradient = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none h-full w-full">
    {/* Floating Blobs using Framer Motion (Institutional Green Blobs) */}
    <motion.div
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -50, 50, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-[-10%] left-[-10%] size-96 rounded-full bg-primary/10 blur-[120px] mix-blend-multiply"
    />
    <motion.div
      animate={{
        x: [0, -100, 50, 0],
        y: [0, 50, -50, 0],
        scale: [1, 1.1, 0.8, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute bottom-[10%] right-[0%] size-96 rounded-full bg-accent/10 blur-[120px] mix-blend-multiply"
    />
    <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[10%] size-64 rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply"
      />
  </div>
)

export const TopoPattern = ({ className, opacity = 0.05 }: { className?: string; opacity?: number }) => (
  <div 
    className={cn("absolute inset-0 bg-topo pointer-events-none select-none", className)}
    style={{ opacity }}
  />
)

export const BigText = ({ text, className }: { text: string; className?: string }) => (
  <div 
    className={cn(
      "absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none",
      className
    )}
  >
    <span className="text-[20vw] font-black leading-none text-foreground/5 text-outline-faint whitespace-nowrap opacity-50">
      {text}
    </span>
  </div>
)
