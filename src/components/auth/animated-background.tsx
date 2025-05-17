"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle system for cricket field effect
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

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      type: string

      constructor(x: number, y: number, type: string) {
        this.x = x
        this.y = y
        this.type = type

        if (type === "field") {
          this.size = Math.random() * 3 + 1
          this.speedX = Math.random() * 0.5 - 0.25
          this.speedY = Math.random() * 0.5 - 0.25
          this.color = `rgba(16, 185, 129, ${Math.random() * 0.2 + 0.1})`
        } else if (type === "chart") {
          this.size = Math.random() * 2 + 1
          this.speedX = Math.random() * 1 - 0.5
          this.speedY = Math.random() * 1 - 0.5
          this.color = `rgba(147, 51, 234, ${Math.random() * 0.3 + 0.1})`
        } else {
          this.size = Math.random() * 2 + 1
          this.speedX = Math.random() * 0.3 - 0.15
          this.speedY = Math.random() * 0.3 - 0.15
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
        }
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1
      }

      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()

        if (this.type === "chart") {
          // Draw diamond shapes for chart particles
          ctx!.moveTo(this.x, this.y - this.size)
          ctx!.lineTo(this.x + this.size, this.y)
          ctx!.lineTo(this.x, this.y + this.size)
          ctx!.lineTo(this.x - this.size, this.y)
        } else {
          // Draw circles for field particles
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        }

        ctx!.closePath()
        ctx!.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const type = Math.random() < 0.6 ? "field" : Math.random() < 0.8 ? "chart" : "star"
      particlesArray.push(new Particle(x, y, type))
    }

    // Create cricket pitch lines
    const pitchLines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const pitchWidth = Math.min(canvas.width, canvas.height) * 0.4

    // Add pitch boundary lines
    pitchLines.push({
      x1: centerX - pitchWidth / 2,
      y1: centerY - pitchWidth / 4,
      x2: centerX + pitchWidth / 2,
      y2: centerY - pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.1)",
    })

    pitchLines.push({
      x1: centerX - pitchWidth / 2,
      y1: centerY + pitchWidth / 4,
      x2: centerX + pitchWidth / 2,
      y2: centerY + pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.1)",
    })

    pitchLines.push({
      x1: centerX - pitchWidth / 2,
      y1: centerY - pitchWidth / 4,
      x2: centerX - pitchWidth / 2,
      y2: centerY + pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.1)",
    })

    pitchLines.push({
      x1: centerX + pitchWidth / 2,
      y1: centerY - pitchWidth / 4,
      x2: centerX + pitchWidth / 2,
      y2: centerY + pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.1)",
    })

    // Add crease lines
    pitchLines.push({
      x1: centerX - pitchWidth / 3,
      y1: centerY - pitchWidth / 4,
      x2: centerX - pitchWidth / 3,
      y2: centerY + pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.15)",
    })

    pitchLines.push({
      x1: centerX + pitchWidth / 3,
      y1: centerY - pitchWidth / 4,
      x2: centerX + pitchWidth / 3,
      y2: centerY + pitchWidth / 4,
      color: "rgba(16, 185, 129, 0.15)",
    })

    // Stock chart lines
    const chartLines: { points: { x: number; y: number }[]; color: string }[] = []

    // Create multiple chart lines
    for (let c = 0; c < 3; c++) {
      const points: { x: number; y: number }[] = []
      let prevY = Math.random() * canvas.height * 0.5 + canvas.height * 0.25

      for (let i = 0; i <= canvas.width; i += canvas.width / 100) {
        // Random walk with slight upward bias
        const nextY = prevY + (Math.random() * 20 - 9)
        points.push({
          x: i,
          y: Math.max(canvas.height * 0.1, Math.min(canvas.height * 0.9, nextY)),
        })
        prevY = nextY
      }

      const colors = [
        "rgba(147, 51, 234, 0.2)", // Purple
        "rgba(16, 185, 129, 0.2)", // Green
        "rgba(239, 68, 68, 0.2)", // Red
      ]

      chartLines.push({ points, color: colors[c] })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw pitch lines
      pitchLines.forEach((line) => {
        ctx!.strokeStyle = line.color
        ctx!.lineWidth = 2
        ctx!.beginPath()
        ctx!.moveTo(line.x1, line.y1)
        ctx!.lineTo(line.x2, line.y2)
        ctx!.stroke()
      })

      // Draw chart lines
      chartLines.forEach((chart) => {
        ctx!.strokeStyle = chart.color
        ctx!.lineWidth = 2
        ctx!.beginPath()

        chart.points.forEach((point, index) => {
          if (index === 0) {
            ctx!.moveTo(point.x, point.y)
          } else {
            ctx!.lineTo(point.x, point.y)
          }
        })

        ctx!.stroke()

        // Animate chart points by shifting them
        chart.points.forEach((point) => {
          point.x -= 0.5
          if (point.x < 0) {
            point.x = canvas.width
            point.y = Math.max(
              canvas.height * 0.1,
              Math.min(canvas.height * 0.9, chart.points[chart.points.length - 2].y + (Math.random() * 20 - 9)),
            )
          }
        })
      })

      // Update and draw particles
      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-gray-900 opacity-80 pointer-events-none z-0"></div>
    </>
  )
}

// Add floating cricket elements
export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating cricket balls */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ball-${i}`}
          className="absolute w-8 h-8 rounded-full bg-red-600 border-2 border-white opacity-20"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            rotate: [0, 360, 720, 1080],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-0.5 bg-white transform rotate-45"></div>
            <div className="w-5 h-0.5 bg-white transform -rotate-45"></div>
          </div>
        </motion.div>
      ))}

      {/* Floating stock tickers */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-around opacity-20">
        <motion.div
          className="flex items-center space-x-4 text-xs text-white"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[
            "VK18 +12.5%",
            "RS45 -2.3%",
            "MS07 +8.2%",
            "KL01 +15.8%",
            "JB63 -1.2%",
            "SG77 +22.4%",
            "BK36 +5.7%",
            "AB17 -3.1%",
            "DW31 +9.4%",
            "JR75 +7.6%",
          ].map((ticker, i) => (
            <div key={i} className="mx-8 font-mono">
              {ticker}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating cricket bats */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bat-${i}`}
          className="absolute opacity-10"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.3 + 0.1,
            rotate: Math.random() * 360,
          }}
          animate={{
            rotate: [null, Math.random() * 360 + 360],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative">
            <div className="w-4 h-24 bg-amber-800 rounded-t-lg"></div>
            <div className="w-16 h-48 bg-amber-300 rounded-b-lg"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

