"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  className?: string
  /** Enable cursor-reactive blob (adds a subtle glow that follows the mouse) */
  interactive?: boolean
  /** Control overall intensity — lower = more subtle (default 1) */
  intensity?: number
  /** "dark" for dark backgrounds (screen blend), "light" for light backgrounds (multiply blend) */
  variant?: "dark" | "light"
}

/**
 * AnimatedGradientBackground
 *
 * Aurora-inspired animated gradient with layered blobs on dark backgrounds.
 *
 * Architecture:
 *   Layer 0 — Base radial glow (static, sets the mood)
 *   Layer 1 — Large emerald-to-teal blob (30s, upper-left drift)
 *   Layer 2 — Lime/chartreuse blob (25s, center-right counter-drift)
 *   Layer 3 — Warm yellow blob (20s, lower-center pulse)
 *   Layer 4 — White highlight glow (35s, top-center shimmer)
 *   Layer 5 — (optional) Cursor-reactive lime glow
 *
 * Supports two variants:
 *   "dark"  — for bg-primary (dark green); uses screen blend + bright colors
 *   "light" — for bg-background (white/light); uses multiply blend + soft pastels
 */
export function AnimatedGradientBackground({
  className,
  interactive = false,
  intensity = 1,
  variant = "dark",
}: AnimatedGradientBackgroundProps) {
  const opacity = Math.min(Math.max(intensity, 0.3), 1)
  const blend = variant === "dark" ? "screen" : "multiply"

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none -z-0",
        className
      )}
      aria-hidden="true"
    >
      {variant === "dark" ? (
        /* ═══════════ DARK variant (for bg-primary) ═══════════ */
        <>
          {/* Base radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(74,222,128,0.18) 0%, rgba(34,197,94,0.06) 40%, transparent 70%)",
              opacity,
            }}
          />

          {/* Emerald blob — 30s drift, upper-left */}
          <div
            className="absolute -top-[15%] -left-[10%] w-[70%] h-[70%] rounded-full animate-aurora-1"
            style={{
              background: "radial-gradient(circle, rgba(74,222,128,0.55) 0%, rgba(52,211,153,0.15) 40%, transparent 70%)",
              filter: "blur(80px)",
              mixBlendMode: blend,
              opacity,
            }}
          />

          {/* Lime blob — 25s counter-drift, center-right */}
          <div
            className="absolute top-[5%] -right-[10%] w-[65%] h-[65%] rounded-full animate-aurora-2"
            style={{
              background: "radial-gradient(circle, rgba(163,230,53,0.5) 0%, rgba(132,204,22,0.12) 40%, transparent 70%)",
              filter: "blur(90px)",
              mixBlendMode: blend,
              opacity: opacity * 0.9,
            }}
          />

          {/* Yellow blob — 20s pulse, lower-center */}
          <div
            className="absolute -bottom-[5%] left-[15%] w-[55%] h-[55%] rounded-full animate-aurora-3"
            style={{
              background: "radial-gradient(circle, rgba(253,224,71,0.4) 0%, rgba(250,204,21,0.1) 40%, transparent 70%)",
              filter: "blur(100px)",
              mixBlendMode: blend,
              opacity: opacity * 0.85,
            }}
          />

          {/* White shimmer — 35s, top-center */}
          <div
            className="absolute -top-[10%] left-[25%] w-[50%] h-[50%] rounded-full animate-aurora-4"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)",
              filter: "blur(60px)",
              mixBlendMode: blend,
              opacity: opacity * 0.7,
            }}
          />
        </>
      ) : (
        /* ═══════════ LIGHT variant (for bg-background / white) ═══════════
           Pastel tones with multiply blend — creates soft colored shadows
           on light surfaces. Higher blur for a dreamy, premium feel. */
        <>
          {/* Base radial tint */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(34,197,94,0.07) 0%, transparent 70%)",
              opacity,
            }}
          />

          {/* Soft emerald — 30s, upper-left */}
          <div
            className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] rounded-full animate-aurora-1"
            style={{
              background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, rgba(52,211,153,0.04) 45%, transparent 70%)",
              filter: "blur(100px)",
              mixBlendMode: blend,
              opacity,
            }}
          />

          {/* Soft lime — 25s, center-right */}
          <div
            className="absolute top-[0%] -right-[15%] w-[65%] h-[65%] rounded-full animate-aurora-2"
            style={{
              background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, rgba(132,204,22,0.03) 45%, transparent 70%)",
              filter: "blur(110px)",
              mixBlendMode: blend,
              opacity: opacity * 0.9,
            }}
          />

          {/* Soft yellow — 20s, lower-center */}
          <div
            className="absolute -bottom-[10%] left-[10%] w-[60%] h-[60%] rounded-full animate-aurora-3"
            style={{
              background: "radial-gradient(circle, rgba(253,224,71,0.12) 0%, rgba(250,204,21,0.02) 45%, transparent 70%)",
              filter: "blur(120px)",
              mixBlendMode: blend,
              opacity: opacity * 0.85,
            }}
          />

          {/* White highlight — 35s, top-center (adds depth on light bg) */}
          <div
            className="absolute -top-[15%] left-[20%] w-[55%] h-[55%] rounded-full animate-aurora-4"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 65%)",
              filter: "blur(80px)",
              opacity: opacity * 0.5,
            }}
          />
        </>
      )}

      {/* Cursor-reactive glow (optional) */}
      {interactive && <CursorBlob opacity={opacity} variant={variant} />}
    </div>
  )
}

/**
 * CursorBlob — a glow that follows the cursor with spring physics.
 * Uses useTransform to convert 0–1 normalized position → CSS percentage.
 */
function CursorBlob({ opacity, variant = "dark" }: { opacity: number; variant?: "dark" | "light" }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)

  const springX = useSpring(rawX, { stiffness: 30, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 30, damping: 20 })

  const left = useTransform(springX, [0, 1], ["0%", "100%"])
  const top = useTransform(springY, [0, 1], ["0%", "100%"])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current?.parentElement
      if (!container) return
      const rect = container.getBoundingClientRect()
      rawX.set((e.clientX - rect.left) / rect.width)
      rawY.set((e.clientY - rect.top) / rect.height)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={containerRef}
      className="absolute w-[35%] h-[35%] rounded-full -translate-x-1/2 -translate-y-1/2"
      style={{
        left,
        top,
        background: variant === "dark"
          ? "radial-gradient(circle, rgba(163,230,53,0.3) 0%, rgba(132,204,22,0.06) 40%, transparent 65%)"
          : "radial-gradient(circle, rgba(74,222,128,0.12) 0%, rgba(52,211,153,0.02) 40%, transparent 65%)",
        filter: "blur(70px)",
        mixBlendMode: (variant === "dark" ? "screen" : "multiply") as React.CSSProperties["mixBlendMode"],
        opacity: opacity * (variant === "dark" ? 0.6 : 0.5),
      }}
    />
  )
}
