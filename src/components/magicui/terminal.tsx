"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalProps {
  children: React.ReactNode
  className?: string
  title?: string
  variant?: "dark" | "light"
}

const Terminal = ({ children, className, title = "zsh", variant = "dark" }: TerminalProps) => {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border shadow-2xl",
        variant === "dark" ? "bg-black" : "bg-white",
        className
      )}
    >
      {/* Terminal Header */}
      <div className={cn(
        "flex items-center gap-2 border-b px-4 py-3",
        variant === "dark" ? "border-white/10 bg-white/5" : "border-black/5 bg-black/[0.02]"
      )}>
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-[#ff5f56]" />
          <div className="size-3 rounded-full bg-[#ffbd2e]" />
          <div className="size-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className={cn(
          "flex-1 text-center text-[11px] font-medium",
          variant === "dark" ? "text-white/40" : "text-black/30"
        )}>
          {title}
        </div>
      </div>

      {/* Terminal Body */}
      <div className={cn(
        "flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed",
        variant === "dark" ? "text-white/90" : "text-black/80"
      )}>
        {children}
      </div>
    </div>
  )
}

interface AnimatedSpanProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const AnimatedSpan = ({ children, delay = 0, className }: AnimatedSpanProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn("block", className)}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps {
  children: string
  delay?: number
  duration?: number
  className?: string
}

const TypingAnimation = ({
  children,
  delay = 0,
  duration = 50,
  className,
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = React.useState("")
  const [started, setStarted] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  React.useEffect(() => {
    if (!started) return

    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(children.slice(0, i + 1))
      i++
      if (i >= children.length) {
        clearInterval(interval)
      }
    }, duration)

    return () => clearInterval(interval)
  }, [started, children, duration])

  return (
    <div className={cn("inline-block", className)}>
      {displayedText}
      {started && displayedText.length < children.length && (
        <span className="ml-0.5 inline-block w-2 animate-pulse bg-current h-4 align-middle">|</span>
      )}
    </div>
  )
}

export { Terminal, AnimatedSpan, TypingAnimation }
