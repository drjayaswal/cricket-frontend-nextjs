"use client"

import { useEffect, useRef } from "react"

interface CricketElement {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  type: "ball" | "bat" | "wicket" | "coin"
  color: string
}

export function CricketVisionAnimation() {
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

    // Create cricket elements
    const elements: CricketElement[] = []
    const elementCount = 30
    const types = ["ball", "bat", "wicket", "coin"]
    const colors = [
      "rgba(147, 51, 234, 0.4)", // Purple
      "rgba(79, 70, 229, 0.4)", // Indigo
      "rgba(59, 130, 246, 0.4)", // Blue
      "rgba(16, 185, 129, 0.4)", // Green
    ]

    for (let i = 0; i < elementCount; i++) {
      elements.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        size: 10 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.1 + Math.random() * 0.3,
        type: types[Math.floor(Math.random() * types.length)] as "ball" | "bat" | "wicket" | "coin",
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Draw cricket ball
    const drawBall = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Cricket ball
      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      // Seam
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = size / 10
      ctx.stroke()

      ctx.restore()
    }

    // Draw cricket bat
    const drawBat = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Handle
      ctx.beginPath()
      ctx.rect(-size / 8, -size * 1.5, size / 4, size)
      ctx.fillStyle = color
      ctx.fill()

      // Bat face
      ctx.beginPath()
      ctx.ellipse(0, -size / 2, size / 2, size, 0, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.restore()
    }

    // Draw wicket
    const drawWicket = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Stumps
      const stumpsWidth = size / 5
      const stumpsHeight = size * 1.5
      const spacing = size / 2

      for (let i = -1; i <= 1; i++) {
        ctx.beginPath()
        ctx.rect(i * spacing - stumpsWidth / 2, -stumpsHeight / 2, stumpsWidth, stumpsHeight)
        ctx.fillStyle = color
        ctx.fill()
      }

      // Bails
      ctx.beginPath()
      ctx.rect(-spacing - stumpsWidth / 2, -stumpsHeight / 2 - stumpsWidth, spacing * 2 + stumpsWidth, stumpsWidth / 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.restore()
    }

    // Draw coin/token
    const drawCoin = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Coin circle
      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = size / 10
      ctx.stroke()

      // $ symbol or similar
      ctx.font = `bold ${size}px Arial`
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("$", 0, 0)

      ctx.restore()
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

      // Update and draw elements
      elements.forEach((element) => {
        // Update rotation
        element.rotation += element.rotationSpeed

        // Draw based on type
        ctx.globalAlpha = element.opacity

        switch (element.type) {
          case "ball":
            drawBall(element.x, element.y, element.size, element.rotation, element.color)
            break
          case "bat":
            drawBat(element.x, element.y, element.size, element.rotation, element.color)
            break
          case "wicket":
            drawWicket(element.x, element.y, element.size, element.rotation, element.color)
            break
          case "coin":
            drawCoin(element.x, element.y, element.size, element.rotation, element.color)
            break
        }
      })

      ctx.globalAlpha = 1

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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
