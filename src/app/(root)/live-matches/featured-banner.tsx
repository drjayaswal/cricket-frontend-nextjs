"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, PlusCircle, BarChart3 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function FeaturedBanner() {
  const [showPortfolioAnimation, setShowPortfolioAnimation] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const triggerPortfolioAnimation = () => {
    setShowPortfolioAnimation(true)
    setTimeout(() => setShowPortfolioAnimation(false), 3000)
  }

  // Stock chart animation only (no cricket balls or bats)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Stock chart class
    class StockChart {
      points: { x: number; y: number }[]
      color: string
      width: number
      height: number
      speed: number
      position: number

      constructor(width: number, height: number, color: string) {
        this.width = width
        this.height = height
        this.color = color
        this.speed = Math.random() * 0.5 + 0.2
        this.position = canvas ? Math.random() * canvas.width : 0

        // Generate random points for the chart
        this.points = []
        let y = this.height / 2

        for (let i = 0; i < 20; i++) {
          const change = (Math.random() - 0.5) * 20
          y = Math.max(10, Math.min(this.height - 10, y + change))
          this.points.push({ x: (i / 19) * this.width, y })
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.position, 0)
        ctx.globalAlpha = 0.1

        // Draw the line
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y)
        }

        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw area under the line
        ctx.lineTo(this.width, this.height)
        ctx.lineTo(0, this.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, this.height)
        gradient.addColorStop(0, `${this.color}`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      }

      update() {
        this.position -= this.speed

        if (this.position + this.width < 0) {
          if (canvas) {
            this.position = canvas.width
          }

          // Generate new points when chart reappears
          let y = this.height / 2
          for (let i = 0; i < this.points.length; i++) {
            const change = (Math.random() - 0.5) * 20
            y = Math.max(10, Math.min(this.height - 10, y + change))
            this.points[i].y = y
          }
        }
      }
    }

    // Create charts
    const charts: StockChart[] = []

    for (let i = 0; i < 5; i++) {
      charts.push(new StockChart(canvas.width / 2, canvas.height, i % 2 === 0 ? "#10B981" : "#EF4444"))
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.globalAlpha = 0.05

      // Vertical lines
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.strokeStyle = "#ffffff"
        ctx.stroke()
      }

      // Horizontal lines
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.strokeStyle = "#ffffff"
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      // Update and draw charts
      charts.forEach((chart) => {
        chart.update()
        chart.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Generate random stock chart data points
  const generateChartPoints = (count: number, height: number) => {
    const points = []
    let y = height / 2

    for (let i = 0; i < count; i++) {
      // Random movement with some trend
      const change = (Math.random() - 0.5) * 10
      y = Math.max(5, Math.min(height - 5, y + change))
      points.push({ x: (i / (count - 1)) * 100, y })
    }

    return points
  }

  // Create SVG path from points
  const createPath = (points: Array<{ x: number; y: number }>, height: number) => {
    if (points.length === 0) return ""

    let path = `M 0,${height} L ${points[0].x},${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x},${points[i].y}`
    }

    path += ` L 100,${height} Z`
    return path
  }

  const chartHeight = 60
  const chartPoints1 = generateChartPoints(20, chartHeight)
  const chartPoints2 = generateChartPoints(20, chartHeight)
  const chartPath1 = createPath(chartPoints1, chartHeight)
  const chartPath2 = createPath(chartPoints2, chartHeight)

  return (
    <div className="relative overflow-hidden bg-backgorund py-12 mb-8">
      {/* Canvas background animation - stock charts only */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Stock chart animation behind title */}
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <motion.path
            d={chartPath1}
            fill="url(#gradient1)"
            initial={{ y: 10 }}
            animate={{
              y: [10, 0, 10],
              x: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        >
          <motion.path
            d={chartPath2}
            fill="url(#gradient2)"
            initial={{ y: -5 }}
            animate={{
              y: [-5, 5, -5],
              x: [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="border-2 border-green-800 bg-transparent text-green-600 animate-pulse text-xs font-bold px-3 py-1.5 rounded-md flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> FEATURED MATCH
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 relative">
                <span className="relative z-10">ICC Women's T20 World Cup Asia Qualifier</span>
                <motion.span
                  style={{ position: "absolute", inset: "0", background: "linear-gradient(to right, rgba(16, 185, 129, 0.2), transparent)", borderRadius: "0.5rem" }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Don't miss the exciting match between Nepal and Hong Kong Women! Add this match to your portfolio now.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-green-900 hover:bg-green-700 text-base"
                  onClick={triggerPortfolioAnimation}
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
