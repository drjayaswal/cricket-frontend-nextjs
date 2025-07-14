"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, PlusCircle, BarChart3 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function FeaturedBanner() {
  const [chartPath1, setChartPath1] = useState("");
  const [chartPath2, setChartPath2] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // === Fix: Only generate inside useEffect ===
    const chartHeight = 60;

    const generateChartPoints = (count: number, height: number) => {
      const points = [];
      let y = height / 2;

      for (let i = 0; i < count; i++) {
        const change = (Math.random() - 0.5) * 10;
        y = Math.max(5, Math.min(height - 5, y + change));
        points.push({ x: (i / (count - 1)) * 100, y });
      }

      return points;
    };

    const createPath = (points: Array<{ x: number; y: number }>, height: number) => {
      if (points.length === 0) return "";

      let path = `M 0,${height} L ${points[0].x},${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x},${points[i].y}`;
      }

      path += ` L 100,${height} Z`;
      return path;
    };

    const points1 = generateChartPoints(20, chartHeight);
    const points2 = generateChartPoints(20, chartHeight);

    setChartPath1(createPath(points1, chartHeight));
    setChartPath2(createPath(points2, chartHeight));
  }, []);

  return (
    <div className="relative overflow-hidden bg-backgorund py-12 mb-8">
      {/* Canvas background animation - stock charts only */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
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
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
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
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
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
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gradient-to-r from-[#19317b] via-[#2c256c] to-[#4b1577] animate-pulse px-4 text-xl font-extrabold py-2 rounded-md flex items-center">
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
                  className="bg-white/50 hover:text-gray-500 hover:bg-white text-lg font-bold "
                >
                  <PlusCircle className="h-7 stroke-3 w-7" />
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
