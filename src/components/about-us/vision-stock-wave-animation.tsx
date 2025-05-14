"use client"

import { useEffect, useRef } from "react"

interface WaveLine {
  points: { x: number; y: number }[]
  color: string
  speed: number
  amplitude: number
  frequency: number
  phase: number
  lineWidth: number
}

export function VisionStockWaveAnimation() {
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

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create wave lines with different properties
    const createWaveLines = (): WaveLine[] => {
      const colors = [
        "rgba(147, 51, 234, 0.4)", // Purple
        "rgba(79, 70, 229, 0.4)", // Indigo
        "rgba(59, 130, 246, 0.4)", // Blue
        "rgba(16, 185, 129, 0.4)", // Green
      ]

      const lines: WaveLine[] = []

      // Create multiple wave lines with different properties
      for (let i = 0; i < 6; i++) {
        lines.push({
          points: [],
          color: colors[i % colors.length],
          speed: 0.2 + Math.random() * 0.4, // Slower than hero animation
          amplitude: 30 + Math.random() * 80,
          frequency: 0.002 + Math.random() * 0.006,
          phase: Math.random() * Math.PI * 2,
          lineWidth: 2 + Math.random() * 3,
        })
      }

      return lines
    }

    const waveLines = createWaveLines()
    let time = 0

    // Draw cricket ball icon at specific points on the waves
    const drawCricketBall = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
      ctx.fill()

      // Draw seam
      ctx.beginPath()
      ctx.arc(x, y, size * 0.7, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(220, 38, 38, 0.7)"
      ctx.lineWidth = size / 4
      ctx.stroke()
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each wave line
      waveLines.forEach((line, lineIndex) => {
        // Generate points based on time
        line.points = []
        for (let x = 0; x < canvas.width + 100; x += 5) {
          // Create a wave pattern with multiple sine waves
          const y =
            canvas.height / 2 +
            Math.sin(x * line.frequency + time * line.speed + line.phase) * line.amplitude +
            Math.sin(x * line.frequency * 2 + time * line.speed * 0.8) * (line.amplitude * 0.3) +
            Math.sin(x * line.frequency * 4 + time * line.speed * 1.2) * (line.amplitude * 0.1)

          line.points.push({ x, y })
        }

        // Draw the line
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)

        for (let i = 1; i < line.points.length; i++) {
          const prev = line.points[i - 1]
          const curr = line.points[i]

          // Use quadratic curves for smoother lines
          const cpx = (prev.x + curr.x) / 2
          const cpy = (prev.y + curr.y) / 2

          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy)
        }

        ctx.strokeStyle = line.color
        ctx.lineWidth = line.lineWidth
        ctx.stroke()

        // Draw a gradient fill below the line
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, line.color.replace("0.4", "0.2"))
        gradient.addColorStop(1, line.color.replace("0.4", "0"))

        ctx.lineTo(line.points[line.points.length - 1].x, canvas.height)
        ctx.lineTo(line.points[0].x, canvas.height)
        ctx.fillStyle = gradient
        ctx.fill()

        // Add cricket balls at peaks and troughs for some lines
        if (lineIndex % 3 === 0) {
          for (let i = 20; i < line.points.length; i += 100) {
            const point = line.points[i]
            drawCricketBall(point.x, point.y, 4 + lineIndex)
          }
        }
      })

      // Add some vertical grid lines like a stock chart
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += 100) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }

      // Add some horizontal grid lines
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }

      ctx.stroke()

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
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
