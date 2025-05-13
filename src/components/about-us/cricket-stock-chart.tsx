"use client"

import { useEffect, useRef } from "react"

interface PlayerStock {
  name: string
  color: string
  data: number[]
  currentValue: number
  trend: "up" | "down" | "stable"
}

export function CricketStockChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Sample player stock data
    const playerStocks: PlayerStock[] = [
      {
        name: "V. Kohli",
        color: "rgba(147, 51, 234, 0.8)",
        data: generateStockData(10, 0.10),
        currentValue: 0,
        trend: "down",
      },
      {
        name: "R. Sharma",
        color: "rgba(79, 70, 229, 0.8)",
        data: generateStockData(30, 0.04),
        currentValue: 0,
        trend: "down",
      },
      {
        name: "J. Bumrah",
        color: "rgba(59, 130, 246, 0.8)",
        data: generateStockData(50, 0.06),
        currentValue: 0,
        trend: "up",
      },
      {
        name: "R. Jadeja",
        color: "rgba(16, 185, 129, 0.8)",
        data: generateStockData(25, 0.02),
        currentValue: 0,
        trend: "up",
      },
    ]

    // Generate random stock data with trends
    function generateStockData(baseValue: number, volatility: number): number[] {
      const data: number[] = []
      let value = baseValue

      for (let i = 0; i < 100; i++) {
        // Add some randomness with a slight upward trend
        const change = (Math.random() - 0.48) * volatility * baseValue
        value += change
        // Ensure value doesn't go below a minimum
        value = Math.max(value, baseValue * 0.7)
        data.push(value)
      }

      return data
    }

    // Animation variables
    let currentIndex = 0
    const maxIndex = playerStocks[0].data.length
    const chartWidth = canvas.clientWidth - 100
    const chartHeight = canvas.clientHeight - 80
    const chartTop = 40
    const chartLeft = 60

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

      // Draw title
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.textAlign = "center"
      ctx.fillText("", canvas.clientWidth / 2, 25)

      // Draw axes
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1

      // // Y-axis
      // ctx.moveTo(chartLeft, chartTop)
      // ctx.lineTo(chartLeft, chartTop + chartHeight)

      // // X-axis
      // ctx.moveTo(chartLeft, chartTop + chartHeight)
      // ctx.lineTo(chartLeft + chartWidth, chartTop + chartHeight)
      // ctx.stroke()

      // Draw grid lines
      ctx.beginPath()
      ctx.setLineDash([5, 5])

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = chartTop + (chartHeight / 5) * i
        ctx.moveTo(chartLeft, y)
        ctx.lineTo(chartLeft + chartWidth, y)
      }

      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        const x = chartLeft + (chartWidth / 5) * i
        ctx.moveTo(x, chartTop)
        ctx.lineTo(x, chartTop + chartHeight)
      }

      ctx.stroke()
      ctx.setLineDash([])

      // Find max value for scaling
      let maxValue = 0
      playerStocks.forEach((stock) => {
        const stockMax = Math.max(...stock.data.slice(0, currentIndex + 1))
        maxValue = Math.max(maxValue, stockMax)
      })

      // Draw each player's stock line
      playerStocks.forEach((stock, stockIndex) => {
        // Update current value
        stock.currentValue = stock.data[currentIndex]

        // Determine trend
        if (currentIndex > 0) {
          const prevValue = stock.data[currentIndex - 1]
          stock.trend = stock.currentValue > prevValue ? "up" : stock.currentValue < prevValue ? "down" : "stable"
        }

        // Draw line
        ctx.beginPath()
        ctx.strokeStyle = stock.color
        ctx.lineWidth = 2

        for (let i = 0; i <= currentIndex; i++) {
          const x = chartLeft + (i / maxIndex) * chartWidth
          const y = chartTop + chartHeight - (stock.data[i] / maxValue) * chartHeight

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
     })

      // Increment index for animation
      currentIndex = (currentIndex + 0.5) % maxIndex

      // Continue animation
      animationRef.current = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
}
