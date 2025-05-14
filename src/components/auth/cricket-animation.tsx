"use client"

import { motion } from "framer-motion"

export function CricketAnimation() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Stadium lights */}
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full">
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-70"></div>
        <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50 scale-[15]"></div>
      </div>
      <div className="absolute top-0 right-1/4 w-1 h-1 bg-white rounded-full">
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-70"></div>
        <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50 scale-[15]"></div>
      </div>

      {/* Cricket field */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900/10 to-transparent"></div>

      {/* Pitch */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-96 bg-gradient-to-t from-amber-800/10 to-amber-700/5"></div>

      {/* Animated cricket balls */}
      <BallAnimation />

      {/* Stock chart lines */}
      <StockChartLines />

      {/* Floating cricket elements */}
      <FloatingCricketElements />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/50 to-gray-900/95"></div>
    </div>
  )
}

function BallAnimation() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ball-${i}`}
          className="absolute w-6 h-6 rounded-full bg-red-600 border border-white shadow-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0.7,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -100,
            x: `calc(${Math.random() * 100}vw)`,
            rotate: Math.random() > 0.5 ? [0, 720] : [0, -720],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-white transform rotate-45"></div>
            <div className="w-4 h-0.5 bg-white transform -rotate-45"></div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

function StockChartLines() {
  const generatePoints = (count: number) => {
    const points = []
    let y = 50

    for (let i = 0; i < count; i++) {
      y += Math.random() * 10 - 5
      y = Math.max(10, Math.min(90, y))
      points.push({ x: (i / count) * 100, y })
    }

    return points
  }

  const chartLines = [
    { points: generatePoints(20), color: "rgba(168, 85, 247, 0.4)" }, // Purple
    { points: generatePoints(20), color: "rgba(16, 185, 129, 0.3)" }, // Green
    { points: generatePoints(20), color: "rgba(239, 68, 68, 0.3)" }, // Red
  ]

  return (
    <>
      {chartLines.map((line, lineIndex) => (
        <svg
          key={`chart-${lineIndex}`}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d={`M ${line.points.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
            fill="none"
            stroke={line.color}
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              pathLength: { duration: 2, delay: lineIndex * 0.5 },
              opacity: { duration: 1, delay: lineIndex * 0.5 },
              y: { duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            }}
          />
        </svg>
      ))}
    </>
  )
}

function FloatingCricketElements() {
  return (
    <>
      {/* Floating bats */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bat-${i}`}
          className="absolute opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.3 + 0.2,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            rotate: [null, Math.random() * 360 + 180, Math.random() * 360 + 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="relative">
            <div className="w-4 h-20 bg-amber-800 rounded-t-lg"></div>
            <div className="w-16 h-40 bg-amber-300 rounded-b-lg"></div>
          </div>
        </motion.div>
      ))}

      {/* Floating stock tickers */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex space-x-8 opacity-30"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {["VK18 +12.5%", "RS45 -2.3%", "MS07 +8.2%", "KL01 +15.8%", "JB63 -1.2%", "SG77 +22.4%"].map((ticker, i) => (
          <div key={i} className="text-sm font-mono whitespace-nowrap">
            {ticker}
          </div>
        ))}
      </motion.div>

      {/* Floating cricket stumps */}
      <motion.div
        className="absolute opacity-10"
        initial={{ x: "40%", y: "60%", scale: 0.5 }}
        animate={{
          y: ["60%", "58%", "60%", "62%", "60%"],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="flex space-x-1 h-32">
          <div className="w-1 h-full bg-white rounded-t-lg"></div>
          <div className="w-1 h-full bg-white rounded-t-lg"></div>
          <div className="w-1 h-full bg-white rounded-t-lg"></div>
        </div>
        <div className="w-12 h-1 bg-white -mt-1"></div>
      </motion.div>
    </>
  )
}

