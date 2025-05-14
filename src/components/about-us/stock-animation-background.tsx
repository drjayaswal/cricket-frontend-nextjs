"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

interface StockLine {
  points: Point[]
  color: string
  speed: number
  amplitude: number
  phase: number
}

export function StockAnimationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Create multiple stock lines with different properties
    const createStockLines = (): StockLine[] => {
      const colors = ["rgba(147, 51, 234, 0.5)", "rgba(79, 70, 229, 0.5)", "rgba(59, 130, 246, 0.5)"]
      const lines: StockLine[] = []

      for (let i = 0; i < 5; i++) {
        lines.push({
          points: [],
          color: colors[i % colors.length],
          speed: 0.5 + Math.random() * 1.5,
          amplitude: 50 + Math.random() * 100,
          phase: Math.random() * Math.PI * 2,
        })
      }

      return lines
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stockLines = createStockLines()
    let time = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each stock line
      stockLines.forEach((line) => {
        // Generate points based on time
        line.points = []
        for (let x = 0; x < canvas.width + 100; x += 5) {
          // Create a wavy line with some randomness
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time * line.speed + line.phase) * line.amplitude +
            Math.sin(x * 0.02 + time * line.speed * 0.7) * (line.amplitude * 0.5) +
            (Math.random() * 5 - 2.5) // Small random jitter

          line.points.push({ x, y })
        }

        // Draw the line
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y)
        }

        ctx.strokeStyle = line.color
        ctx.lineWidth = 3
        ctx.stroke()

        // Draw a gradient fill below the line
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, line.color.replace("0.5", "0.2"))
        gradient.addColorStop(1, line.color.replace("0.5", "0"))

        ctx.lineTo(line.points[line.points.length - 1].x, canvas.height)
        ctx.lineTo(line.points[0].x, canvas.height)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Update time
      time += 0.01

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
