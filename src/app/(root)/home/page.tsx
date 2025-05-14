"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Zap } from "lucide-react";
import {
  ChevronDown,
  ChevronRight,
  Trophy,
  TrendingUp,
  BarChart2,
  Activity,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Stock chart data
    const stockData = {
      labels: Array.from({ length: 20 }, (_, i) => i),
      datasets: [
        {
          label: "IPL Stock",
          data: Array.from({ length: 20 }, () => Math.random() * 100 + 150),
          color: "#10B981",
        },
        {
          label: "T20 Index",
          data: Array.from({ length: 20 }, () => Math.random() * 80 + 100),
          color: "#3B82F6",
        },
      ],
    };

    // Particles for dynamic effect
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: i % 5 === 0 ? "#10B981" : i % 3 === 0 ? "#3B82F6" : "#FFFFFF",
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Cricket balls
    const balls: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    for (let i = 0; i < 5; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Draw stock chart
    const drawStockChart = () => {
      const chartHeight = canvas.height * 0.6;
      const chartTop = canvas.height * 0.2;
      const chartWidth = canvas.width * 0.8;
      const chartLeft = canvas.width * 0.1;

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = chartTop + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartLeft + chartWidth, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = chartLeft + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, chartTop);
        ctx.lineTo(x, chartTop + chartHeight);
        ctx.stroke();
      }

      // Update data with some movement
      stockData.datasets.forEach((dataset) => {
        dataset.data = dataset.data.map((value) => {
          return value + (Math.random() - 0.5) * 5;
        });
      });

      // Draw datasets
      stockData.datasets.forEach((dataset, datasetIndex) => {
        ctx.strokeStyle = dataset.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Create gradient
        const gradient = ctx.createLinearGradient(
          0,
          chartTop,
          0,
          chartTop + chartHeight
        );
        gradient.addColorStop(0, dataset.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        // Draw line
        dataset.data.forEach((value, index) => {
          const x =
            chartLeft + (chartWidth / (dataset.data.length - 1)) * index;
          const normalizedValue =
            (value - Math.min(...dataset.data)) /
            (Math.max(...dataset.data) - Math.min(...dataset.data));
          const y = chartTop + chartHeight - normalizedValue * chartHeight;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        // Add shadow for glow effect
        ctx.shadowColor = dataset.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw area under the line
        ctx.lineTo(chartLeft + chartWidth, chartTop + chartHeight);
        ctx.lineTo(chartLeft, chartTop + chartHeight);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw data points
        dataset.data.forEach((value, index) => {
          const x =
            chartLeft + (chartWidth / (dataset.data.length - 1)) * index;
          const normalizedValue =
            (value - Math.min(...dataset.data)) /
            (Math.max(...dataset.data) - Math.min(...dataset.data));
          const y = chartTop + chartHeight - normalizedValue * chartHeight;

          // Pulse effect on points
          const pulseSize = 4 + Math.sin(time * 0.1 + index * 0.5) * 2;

          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = dataset.color;
          ctx.shadowColor = dataset.color;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Draw label
        ctx.font = "12px Arial";
        ctx.fillStyle = dataset.color;
        ctx.fillText(
          dataset.label,
          chartLeft + 10,
          chartTop + 20 + datasetIndex * 20
        );
      });

      // Draw price indicators
      stockData.datasets.forEach((dataset, idx) => {
        const latestValue = dataset.data[dataset.data.length - 1];
        const prevValue = dataset.data[dataset.data.length - 2];
        const change = latestValue - prevValue;
        const changePercent = (change / prevValue) * 100;

        const x = chartLeft + chartWidth + 10;
        const normalizedValue =
          (latestValue - Math.min(...dataset.data)) /
          (Math.max(...dataset.data) - Math.min(...dataset.data));
        const y = chartTop + chartHeight - normalizedValue * chartHeight;

        ctx.font = "bold 14px Arial";
        ctx.fillStyle = dataset.color;
        ctx.fillText(`${latestValue.toFixed(2)}`, x, y);

        ctx.font = "12px Arial";
        ctx.fillStyle = change >= 0 ? "#10B981" : "#EF4444";
        ctx.fillText(
          `${change >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
          x,
          y + 15
        );
      });
    };

    // Animation loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update time
      time += 0.05;

      // Draw stock chart
      drawStockChart();

      // Draw particles
      // particles.forEach((particle) => {
      //   ctx.beginPath()
      //   ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      //   ctx.fillStyle = particle.color
      //   ctx.globalAlpha = particle.opacity
      //   ctx.fill()
      //   ctx.globalAlpha = 1

      //   // Move particles
      //   particle.x += particle.speedX
      //   particle.y += particle.speedY

      //   // Bounce off edges
      //   if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
      //   if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      // })

      // Draw cricket balls (without using Image)
      // balls.forEach((ball) => {
      //   ctx.save()
      //   ctx.translate(ball.x, ball.y)
      //   ctx.rotate(ball.rotation)

      //   // Draw a cricket ball (red circle)
      //   ctx.beginPath()
      //   ctx.arc(0, 0, ball.size / 2, 0, Math.PI * 2)
      //   ctx.fillStyle = "#d33434"
      //   ctx.fill()

      //   // Add seam detail
      //   ctx.beginPath()
      //   ctx.arc(0, 0, ball.size / 3, 0, Math.PI * 2)
      //   ctx.strokeStyle = "#ffffff"
      //   ctx.lineWidth = 1
      //   ctx.stroke()

      //   ctx.restore()

      //   // Move and rotate balls
      //   ball.x += ball.speedX
      //   ball.y += ball.speedY
      //   ball.rotation += ball.rotationSpeed

      //   // Bounce off edges
      //   if (ball.x < ball.size / 2 || ball.x > canvas.width - ball.size / 2) {
      //     ball.speedX *= -1
      //     // Add trail effect on bounce
      //     for (let i = 0; i < 5; i++) {
      //       particles.push({
      //         x: ball.x,
      //         y: ball.y,
      //         size: Math.random() * 2 + 1,
      //         speedX: (Math.random() - 0.5) * 3,
      //         speedY: (Math.random() - 0.5) * 3,
      //         color: "#d33434",
      //         opacity: Math.random() * 0.7 + 0.3,
      //       })
      //     }
      //   }
      //   if (ball.y < ball.size / 2 || ball.y > canvas.height - ball.size / 2) {
      //     ball.speedY *= -1
      //     // Add trail effect on bounce
      //     for (let i = 0; i < 5; i++) {
      //       particles.push({
      //         x: ball.x,
      //         y: ball.y,
      //         size: Math.random() * 2 + 1,
      //         speedX: (Math.random() - 0.5) * 3,
      //         speedY: (Math.random() - 0.5) * 3,
      //         color: "#d33434",
      //         opacity: Math.random() * 0.7 + 0.3,
      //       })
      //     }
      //   }
      // })

      // Draw animated wave at bottom
      const waveHeight = 20;
      const waveLength = canvas.width / 2;
      const waveY = canvas.height - 30;

      ctx.beginPath();
      ctx.moveTo(0, waveY + waveHeight);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          waveY + Math.sin((x / waveLength) * Math.PI * 2 + time) * waveHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(
        0,
        waveY - waveHeight,
        0,
        canvas.height
      );
      waveGradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
      waveGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

      ctx.fillStyle = waveGradient;
      ctx.fill();

      // Continue animation
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section with Stock Chart and Gradient Overlay */}
      <section className="relative h-[500px] overflow-hidden bg-gray-950">
        {/* Canvas background */}
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full opacity-100" />
        </div>

        {/* Blended background image */}
        <Image
          src="/placeholder.svg?key=kc7u0"
          alt="Cricket Stock Image"
          width={1200}
          height={600}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/10 z-10" />

        {/* Main Content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Subheading with icon */}
            <div className="flex items-center gap-2 text-green-400 mb-3 animate-fade-in">
              <TrendingUp className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Cricket Leagues & Market Trends
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Don’t Miss The Action
            </h1>

            {/* Subtext */}
            <p className="text-gray-300 mb-6 flex items-center gap-2 text-base">
              <BarChart2 className="h-4 w-4 text-green-400" />
              Track live matches and performance stats in real-time
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              {["Live Commentary", "Real-time Updates", "Expert Analysis"].map(
                (item) => (
                  <div key={item} className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-blue-400" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
          <Link href="/live-matches" className="mt-10">
            <Button
              size="lg"
              className="bg-green-500 text-white hover:bg-green-600 font-bold shadow-lg transition-all duration-300 hover:scale-105 border-2 border-green-500 hover:border-green-400"
            >
              Watch Live Matches
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Upcoming Leagues Section */}
      <section className="py-6 container mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-400" />
          Upcoming Leagues & Tournaments
        </h2>

        <div className="space-y-4">
          <LeagueAccordion
            title="ICC Womens T20 World Cup Asia Qualifier 2025"
            matches={[
              {
                team1: "India",
                team2: "Pakistan",
                date: "May 15, 2025",
                time: "14:30 GMT",
                trend: "stable",
              },
              {
                team1: "Sri Lanka",
                team2: "Bangladesh",
                date: "May 16, 2025",
                time: "10:00 GMT",
                trend: "up",
              },
              {
                team1: "Nepal",
                team2: "UAE",
                date: "May 17, 2025",
                time: "12:30 GMT",
                trend: "down",
              },
            ]}
          />

          <LeagueAccordion
            title="Cook Islands tour of Japan, 2025"
            matches={[
              {
                team1: "Japan",
                team2: "Cook Islands",
                date: "June 3, 2025",
                time: "09:00 GMT",
                trend: "up",
              },
              {
                team1: "Japan",
                team2: "Cook Islands",
                date: "June 5, 2025",
                time: "09:00 GMT",
                trend: "stable",
              },
              {
                team1: "Japan",
                team2: "Cook Islands",
                date: "June 8, 2025",
                time: "08:30 GMT",
                trend: "up",
              },
            ]}
          />

          <LeagueAccordion
            title="Indian Premier League 2025"
            matches={[
              {
                team1: "Mumbai Indians",
                team2: "Chennai Super Kings",
                date: "April 10, 2025",
                time: "15:30 IST",
                trend: "up",
              },
              {
                team1: "Royal Challengers Bangalore",
                team2: "Delhi Capitals",
                date: "April 11, 2025",
                time: "19:30 IST",
                trend: "down",
              },
              {
                team1: "Rajasthan Royals",
                team2: "Kolkata Knight Riders",
                date: "April 12, 2025",
                time: "15:30 IST",
                trend: "up",
              },
              {
                team1: "Punjab Kings",
                team2: "Sunrisers Hyderabad",
                date: "April 13, 2025",
                time: "19:30 IST",
                trend: "stable",
              },
            ]}
            isPopular={true}
          />

          <LeagueAccordion
            title="Bulgaria Women tour of Estonia, 2025"
            matches={[
              {
                team1: "Estonia Women",
                team2: "Bulgaria Women",
                date: "July 12, 2025",
                time: "11:00 EEST",
                trend: "down",
              },
              {
                team1: "Estonia Women",
                team2: "Bulgaria Women",
                date: "July 14, 2025",
                time: "11:00 EEST",
                trend: "up",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

// Component for Live Match Card
interface LiveMatchCardProps {
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  overs: string;
  league: string;
  status: string;
  trend: "up" | "down" | "stable";
}

function LiveMatchCard({
  team1,
  team2,
  score1,
  score2,
  overs,
  league,
  status,
  trend,
}: LiveMatchCardProps) {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-800/70 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-red-400 flex items-center gap-1">
          <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>{" "}
          LIVE
        </span>
        <span className="text-xs text-gray-400">{league}</span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-white">
          <p className="font-bold">{team1}</p>
          <p className="text-lg font-bold text-white">{score1}</p>
        </div>

        <div className="text-gray-400 text-sm">vs</div>

        <div className="text-white text-right">
          <p className="font-bold">{team2}</p>
          <p className="text-lg font-bold text-white">{score2}</p>
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-2">Overs: {overs}</div>
      <div className="text-sm text-green-400 font-medium flex items-center gap-1">
        {trend === "up" && <TrendingUp className="h-3 w-3" />}
        {trend === "down" && <ChevronDown className="h-3 w-3 text-red-400" />}
        {status}
      </div>

      <Link
        href={`/match/${team1.toLowerCase()}-vs-${team2.toLowerCase()}`}
        className="mt-3 text-center block w-full bg-gray-700 hover:bg-gray-600 text-white rounded py-1.5 text-sm transition"
      >
        Watch Live
      </Link>
    </div>
  );
}

// Component for League Accordion
interface LeagueAccordionProps {
  title: string;
  matches: {
    team1: string;
    team2: string;
    date: string;
    time: string;
    trend: "up" | "down" | "stable";
  }[];
  isPopular?: boolean;
}

function LeagueAccordion({
  title,
  matches,
  isPopular = false,
}: LeagueAccordionProps) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div
        className={`flex items-center justify-between p-4 ${isPopular
            ? "bg-gradient-to-r from-gray-800 to-gray-700"
            : "bg-gray-800"
          }`}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-white">{title}</h3>
          {isPopular && (
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
        </div>
        <button className="text-gray-400 hover:text-white transition">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-gray-900 divide-y divide-gray-800">
        {matches.map((match, index) => (
          <div key={index} className="p-4 hover:bg-gray-800/50 transition">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-medium flex items-center gap-1">
                  {match.team1} vs {match.team2}
                  {match.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-green-400" />
                  )}
                  {match.trend === "down" && (
                    <ChevronDown className="h-3 w-3 text-red-400" />
                  )}
                  {match.trend === "stable" && (
                    <Activity className="h-3 w-3 text-yellow-400" />
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {match.date} • {match.time}
                </div>
              </div>
              <Link
                href={`/match/${match.team1.toLowerCase()}-vs-${match.team2.toLowerCase()}`}
                className="text-green-400 hover:text-green-300 text-sm flex items-center"
              >
                Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
