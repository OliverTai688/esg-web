"use client"

import React, { useEffect, useRef, useMemo } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleNetworkProps {
  className?: string
  particleColor?: string
  lineColor?: string
  particleCount?: number
  hoveredHub?: { x: number; y: number } | null
}

export const ParticleNetwork = ({
  className,
  particleColor = "rgba(34, 197, 94, 0.4)", // green-500 equivalent
  lineColor = "rgba(34, 197, 94, 0.15)",
  particleCount = 40,
  hoveredHub,
}: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0, active: false })
  const rafId = useRef<number>(0)

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const p: Particle[] = []
    const count = window.innerWidth < 768 ? particleCount / 2 : particleCount
    for (let i = 0; i < count; i++) {
      p.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }
    particles.current = p
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
      mouse.current.active = true
    }

    const handleMouseLeave = () => {
      mouse.current.active = false
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    handleResize()

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pArr = particles.current
      const m = mouse.current

      // Update and draw particles
      pArr.forEach((p, i) => {
        // Subtle drift
        p.x += p.vx
        p.y += p.vy

        // Mouse interaction
        if (m.active) {
          const dx = m.x - p.x
          const dy = m.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const force = (150 - dist) / 1500
            p.vx -= dx * force
            p.vy -= dy * force
          }
        }

        // Hub interaction (when a card is hovered)
        if (hoveredHub) {
          const dx = hoveredHub.x - p.x
          const dy = hoveredHub.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const force = (200 - dist) / 5000
            p.vx += dx * force
            p.vy += dy * force
          }
        }

        // friction/damping to keep speeds sane
        p.vx *= 0.99
        p.vy *= 0.99

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw lines
        for (let j = i + 1; j < pArr.length; j++) {
          const p2 = pArr[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = (1 - dist / 150) * 0.15
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw connection to hub if hovered
        if (hoveredHub) {
          const dx = p.x - hoveredHub.x
          const dy = p.y - hoveredHub.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 250) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(hoveredHub.x, hoveredHub.y)
            const opacity = (1 - dist / 250) * 0.1
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
            ctx.stroke()
          }
        }
      })

      rafId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [particleColor, lineColor, particleCount, hoveredHub])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: "auto" }}
    />
  )
}
