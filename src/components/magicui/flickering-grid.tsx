"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  maxOpacity?: number
  className?: string
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => {
    const tempElement = document.createElement("div")
    tempElement.style.color = color
    document.body.appendChild(tempElement)
    const computedColor = getComputedStyle(tempElement).color
    document.body.removeChild(tempElement)
    const match = computedColor.match(/\d+/g)
    return match ? `${match[0]}, ${match[1]}, ${match[2]}` : "0, 0, 0"
  }, [color])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
      return { ctx, cols: Math.floor(width / (squareSize + gridGap)), rows: Math.floor(height / (squareSize + gridGap)) }
    },
    [squareSize, gridGap]
  )

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setCanvasSize({ width, height })
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || canvasSize.width === 0 || canvasSize.height === 0 || !isInView) return

    const { ctx, cols, rows } = setupCanvas(canvas, canvasSize.width, canvasSize.height)
    if (!ctx) return

    let animationFrameId: number
    const gridParams = new Float32Array(cols * rows)

    // Initialize grid params
    for (let i = 0; i < gridParams.length; i++) {
      gridParams[i] = Math.random() * maxOpacity
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j
          if (Math.random() < flickerChance * 0.1) {
            gridParams[index] = Math.random() * maxOpacity
          }

          ctx.fillStyle = `rgba(${memoizedColor}, ${gridParams[index]})`
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize
          )
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [canvasSize, isInView, memoizedColor, squareSize, gridGap, flickerChance, maxOpacity, setupCanvas])

  return (
    <div ref={containerRef} className={cn("size-full", className)} {...props}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}

export { FlickeringGrid }
