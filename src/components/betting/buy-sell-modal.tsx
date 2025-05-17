"use client"

import { useState } from "react"
import Image from "next/image"
import { X, TrendingUp, TrendingDown, Info, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface BuySellModalProps {
  player: {
    id: string
    name: string
    team: string
    status: "Playing" | "Out" | "Yet to Bat"
    price: number
    image: string
    stats: {
      dots: number
      sixes: number
      fours: number
      runs: number
    }
    priceChange: {
      value: number
      percentage: number
      isPositive: boolean
    }
  }
  onClose: () => void
}

export function BuySellModal({ player, onClose }: BuySellModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("buy")

  const totalCost = player.price * quantity
  const maxQuantity = 10 // This could be dynamic based on available balance/shares

  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0])
  }

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 text-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={player.image || "/placeholder.svg"}
                alt={player.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{player.name}</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{player.team}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${player.status === "Playing"
                      ? "bg-green-500/20 text-green-400"
                      : player.status === "Out"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                >
                  {player.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold">₹{player.price.toFixed(2)}</span>
                <div
                  className={`flex items-center text-sm ${player.priceChange.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {player.priceChange.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{player.priceChange.percentage}%</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Info className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-800/50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Dots</div>
                <div className="font-bold text-yellow-500">{player.stats.dots}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Sixes</div>
                <div className="font-bold text-green-500">{player.stats.sixes}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Fours</div>
                <div className="font-bold text-blue-500">{player.stats.fours}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Runs</div>
                <div className="font-bold text-purple-500">{player.stats.runs}</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="buy" className="w-full" onValueChange={setActiveTab}>
            <div className="px-4 pt-4">
              <TabsList className="w-full bg-gray-800 p-1">
                <TabsTrigger
                  value="buy"
                  className="w-1/2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="w-1/2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Sell
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-400">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-gray-700"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-gray-700"
                      onClick={incrementQuantity}
                      disabled={quantity >= maxQuantity}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[quantity]}
                  min={1}
                  max={maxQuantity}
                  step={1}
                  onValueChange={handleQuantityChange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>1</span>
                  <span>{maxQuantity}</span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Price per share</span>
                  <span>₹{player.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className={`w-full py-6 text-lg font-bold ${activeTab === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {activeTab === "buy" ? "Buy Now" : "Sell Now"}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
