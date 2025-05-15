"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface PlayerStats {
  runs: number
  dots: number
  sixes: number
  fours: number
}

interface Player {
  id: number
  name: string
  image: string
  team: string
  status: string
  price: number
  currentPrice: number
  stats: PlayerStats
}

interface PlayerCardProps {
  player: Player
  onCreatePortfolio: () => void
}

export function PlayerCard({ player, onCreatePortfolio }: PlayerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "batting":
        return "bg-green-500 hover:bg-green-600"
      case "out":
        return "bg-red-500 hover:bg-red-600"
      case "next":
        return "bg-amber-500 hover:bg-amber-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <Card className="border-gray-800 bg-gray-800/50 p-3 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-700">
            <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{player.name}</h3>
              <Badge className={getStatusColor(player.status)}>{player.status}</Badge>
            </div>
            <p className="text-sm text-gray-400">{player.team}</p>
          </div>
          <div className="text-right">
            <div className="text-red-500 font-bold text-xl">₹{player.price.toFixed(2)}</div>
            <div className="text-sm text-gray-400">Price</div>
          </div>
        </div>

        {/* Price Slider */}
        <div className="mt-4 mb-2">
          <div className="relative h-2 bg-gray-700 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full"
              style={{ width: "60%" }}
            ></div>
            <div
              className="absolute h-4 w-4 bg-white rounded-full -top-1 border-2 border-gray-800"
              style={{ left: "60%", transform: "translateX(-50%)" }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹{player.currentPrice}</span>
            <span>₹{(player.currentPrice + 1).toFixed(1)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <div className="bg-gray-800 p-2 rounded">
            <div className="text-blue-400 text-xs">Dots</div>
            <div className="text-white font-bold">{player.stats.dots}</div>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <div className="text-purple-400 text-xs">Sixes</div>
            <div className="text-white font-bold">{player.stats.sixes}</div>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <div className="text-yellow-400 text-xs">Fours</div>
            <div className="text-white font-bold">{player.stats.fours}</div>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <div className="text-green-400 text-xs">Runs</div>
            <div className="text-white font-bold">{player.stats.runs}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
