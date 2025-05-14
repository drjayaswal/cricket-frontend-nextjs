"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function TradingBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-950" />
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-950">
      {/* Main chart grid */}
      <ChartGrid />

      {/* Candlestick charts */}
      <CandlestickCharts />

      {/* Moving averages and trend lines */}
      <TrendLines />

      {/* Trading indicators */}
      <TradingIndicators />

      {/* Buy/Sell signals */}
      {/* <TradingSignals /> */}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 to-gray-900/90"></div>
    </div>
  )
}

// Chart grid component
function ChartGrid() {
  return (
    <div className="absolute inset-0 opacity-10">
      {/* Horizontal grid lines */}
      {[...Array(10)].map((_, i) => (
        <div key={`h-line-${i}`} className="absolute w-full h-px bg-gray-500" style={{ top: `${(i + 1) * 10}%` }} />
      ))}

      {/* Vertical grid lines */}
      {[...Array(20)].map((_, i) => (
        <div key={`v-line-${i}`} className="absolute h-full w-px bg-gray-500" style={{ left: `${(i + 1) * 5}%` }} />
      ))}
    </div>
  )
}

// Candlestick chart component
function CandlestickCharts() {
  const [chartSets, setChartSets] = useState<Array<{
    candles: Array<{ open: number; close: number; high: number; low: number }>;
    x: string;
    y: string;
    width: string;
    height: string;
  }>>([])

  useEffect(() => {
    // Generate random candlestick data
    const generateCandlesticks = (count: number, startPrice: number, seed: number) => {
      const candles = []
      let currentPrice = startPrice

      for (let i = 0; i < count; i++) {
        const movement = (seededRandom(seed + i) - 0.48) * 10 // Slight upward bias
        const open = currentPrice
        const close = open + movement
        const high = Math.max(open, close) + seededRandom(seed + i + 1) * 5
        const low = Math.min(open, close) - seededRandom(seed + i + 2) * 5

        candles.push({ open, close, high, low })
        currentPrice = close
      }

      return candles
    }

    // Create multiple candlestick charts with seeded random values
    setChartSets([
      { candles: generateCandlesticks(20, 100, 1), x: "10%", y: "20%", width: "80%", height: "30%" },
      { candles: generateCandlesticks(15, 150, 2), x: "5%", y: "60%", width: "50%", height: "25%" },
      { candles: generateCandlesticks(10, 80, 3), x: "60%", y: "65%", width: "35%", height: "20%" },
    ])
  }, [])

  if (chartSets.length === 0) return null

  return (
    <>
      {chartSets.map((chart, chartIndex) => (
        <div
          key={`chart-${chartIndex}`}
          className="absolute"
          style={{
            left: chart.x,
            top: chart.y,
            width: chart.width,
            height: chart.height,
          }}
        >
          <div className="relative w-full h-full">
            {chart.candles.map((candle, i) => {
              const isUp = candle.close >= candle.open
              const candleWidth = 100 / chart.candles.length
              const candleLeft = i * candleWidth

              // Calculate position percentages
              const min = Math.min(...chart.candles.map((c) => c.low)) - 5
              const max = Math.max(...chart.candles.map((c) => c.high)) + 5
              const range = max - min

              const topPercent = ((max - candle.high) / range) * 100
              const bottomPercent = ((max - candle.low) / range) * 100
              const openPercent = ((max - candle.open) / range) * 100
              const closePercent = ((max - candle.close) / range) * 100

              return (
                <motion.div
                  key={`candle-${chartIndex}-${i}`}
                  className="absolute"
                  style={{
                    left: `${candleLeft}%`,
                    width: `${candleWidth * 0.6}%`,
                    marginLeft: `${candleWidth * 0.2}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, delay: i * 0.05 + chartIndex * 0.5 }}
                >
                  {/* Wick line */}
                  <div
                    className="absolute left-1/2 w-px bg-gray-400"
                    style={{
                      top: `${topPercent}%`,
                      bottom: `${100 - bottomPercent}%`,
                      transform: "translateX(-50%)",
                    }}
                  />

                  {/* Candle body */}
                  <div
                    className={`absolute left-0 right-0 ${isUp ? "bg-green-500" : "bg-red-500"}`}
                    style={{
                      top: `${Math.min(openPercent, closePercent)}%`,
                      bottom: `${100 - Math.max(openPercent, closePercent)}%`,
                      opacity: 0.5,
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

// Trend lines component
function TrendLines() {
  const [trendLines, setTrendLines] = useState<Array<{
    points: Array<{ x: number; y: number }>;
    color: string;
    width: number;
  }>>([])

  useEffect(() => {
    // Generate random points for trend lines
    const generatePoints = (count: number, smooth = false, seed: number) => {
      const points = []
      let y = 10

      for (let i = 0; i < count; i++) {
        // Random walk with slight upward bias
        const change = smooth
          ? (seededRandom(seed + i) - 0.45) * 3
          : (seededRandom(seed + i) - 0.45) * 8

        y += change
        y = Math.max(10, Math.min(90, y))
        points.push({ x: (i / (count - 1)) * 100, y })
      }

      return points
    }

    setTrendLines([
      { points: generatePoints(50, true, 1), color: "rgba(147, 51, 234, 0.2)", width: 0.2 }, // Purple (MA)
      { points: generatePoints(50, true, 2), color: "rgba(16, 185, 129, 0.2)", width: 0.2 }, // Green (MA)
      { points: generatePoints(100, false, 3), color: "rgba(255, 0, 0, 0.1)", width: 0.2 }, // Price
    ])
  }, [])

  if (trendLines.length === 0) return null

  return (
    <>
      {trendLines.map((line, lineIndex) => (
        <svg
          key={`trend-${lineIndex}`}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d={`M ${line.points.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
            fill="none"
            stroke={line.color}
            strokeWidth={line.width}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 2, delay: lineIndex * 0.5 },
              opacity: { duration: 1, delay: lineIndex * 0.5 },
            }}
          />
        </svg>
      ))}
    </>
  )
}

// Trading indicators component
function TradingIndicators() {
  const [volumeBars, setVolumeBars] = useState<Array<{ height: number; color: string }>>([])

  useEffect(() => {
    const colors = [
      "rgba(147, 51, 234, 0.5)", // purple-600 with opacity
      "rgba(16, 185, 129, 0.4)", // emerald-500 with opacity
      "rgba(255, 0, 0, 0.2)", // red with low opacity
    ]

    setVolumeBars(
      [...Array(50)].map((_, i) => ({
        height: seededRandom(i) * 200,
        color: colors[Math.floor(seededRandom(i + 1) * colors.length)],
      }))
    )
  }, [])

  if (volumeBars.length === 0) return null

  return (
    <>
      {/* Volume bars */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] opacity-20">
        {volumeBars.map((bar, i) => (
          <motion.div
            key={`volume-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 2}%`,
              width: "1%",
              height: `${bar.height}%`,
              backgroundColor: bar.color,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${bar.height}%` }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
          />
        ))}
      </div>

      {/* RSI indicator */}
      <div className="absolute top-[5%] left-[5%] opacity-30">
        <div className="text-xs text-white font-mono">RSI: 62.5</div>
        <div className="w-32 h-4 bg-gray-800 rounded-sm mt-1 overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: "62.5%" }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* MACD indicator */}
      <div className="absolute top-[5%] right-[5%] opacity-30">
        <div className="text-xs text-white font-mono">MACD: +1.25</div>
        <div className="w-32 h-4 bg-gray-800 rounded-sm mt-1 overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </>
  )
}

// Buy/Sell signals component
function TradingSignals() {
  // Generate random buy/sell signals
  const signals = []
  for (let i = 0; i < 8; i++) {
    const isBuy = Math.random() > 0.4 // More buys than sells for uptrend
    signals.push({
      type: isBuy ? "buy" : "sell",
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    })
  }

  return (
    <>
      {signals.map((signal, i) => (
        <motion.div
          key={`signal-${i}`}
          className={`absolute rounded-full flex items-center justify-center
            ${signal.type === "buy" ? "bg-green-500 text-green-900" : "bg-red-500 text-red-900"}`}
          style={{
            left: `${signal.x}%`,
            top: `${signal.y}%`,
            width: "24px",
            height: "24px",
            marginLeft: "-12px",
            marginTop: "-12px",
            opacity: 0.6,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.8, 0.6],
          }}
          transition={{
            duration: 1,
            delay: i * 0.3 + 1,
          }}
        >
          {signal.type === "buy" ? "↑" : "↓"}
        </motion.div>
      ))}
    </>
  )
}

// Animated price ticker component
export function PriceTicker() {
  // Cricket player stock tickers
  const tickers = [
    { symbol: "VK18", price: 1750, change: "+12.5%" },
    { symbol: "RS45", price: 1680, change: "-2.3%" },
    { symbol: "MS07", price: 1550, change: "+8.2%" },
    { symbol: "KL01", price: 1450, change: "+15.8%" },
    { symbol: "JB63", price: 1620, change: "-1.2%" },
    { symbol: "SG77", price: 1320, change: "+22.4%" },
    { symbol: "BK36", price: 1480, change: "+5.7%" },
    { symbol: "AB17", price: 1390, change: "-3.1%" },
    { symbol: "DW31", price: 1580, change: "+9.4%" },
    { symbol: "JR75", price: 1420, change: "+7.6%" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm py-1 z-10">
      <motion.div
        className="flex space-x-8"
        animate={{ x: [0, -1500] }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...tickers, ...tickers].map((ticker, i) => (
          <div key={i} className="flex items-center space-x-2 whitespace-nowrap">
            <span className="font-mono text-white">{ticker.symbol}</span>
            <span className="font-mono">₹{ticker.price}</span>
            <span className={ticker.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
              {ticker.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
