import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, BarChart3, Activity } from "lucide-react";
import Image from "next/image";
// import { string } from "zod";
// import { cookies } from "next/headers";


// Helper function to determine base price based on batting position
const getBasePrice = (battingPosition: number) => {
  if (battingPosition <= 4) return 35;
  if (battingPosition <= 7) return 30;
  return 25;
};

// Helper function to calculate player price
const calculatePlayerPrice = (player: any, battingPosition: number) => {
  const basePrice = getBasePrice(battingPosition);
  const runsBonus = player.runs * 0.75;
  const dotsPenalty = player.dots * 0.5;
  const rawPrice = basePrice + runsBonus - dotsPenalty;

  // Apply out multiplier if player is out
  const finalPrice = player.outDesc === "not out" ? rawPrice : rawPrice * 0.7;

  // Cap at 300 rupees
  return Math.min(300, finalPrice);
};

// Helper function to get percentage for progress bar (max 300 rupees)
const getPricePercentage = (price: number) => {
  return (price / 300) * 100;
};

interface PlayerPortfolio {
  matchId: number,
  playerId: number,
  playerName: string,
  team: string,
  initialPrice: number,
  price: number,
  quantity: number,
}


const buyPortfolio = async (player: PlayerPortfolio) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio/store-player-portfolio`;
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  const token = tokenCookie?.replace("token=", "")
  // const data = {
  //     matchId: ,
  //     playerId: player.id,
  //     playerName,
  //     team,
  //     initialPrice,
  //     price,
  //     quantity,
  //   } 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export function PlayerModal({
  isOpen,
  onClose,
  player,
  battingPosition,
}: {
  isOpen: boolean;
  onClose: () => void;
  player: any;
  battingPosition: number;
}) {
  if (!player) return null;

  const basePrice = getBasePrice(battingPosition);
  const currentPrice = calculatePlayerPrice(player, battingPosition);
  const pricePercentage = getPricePercentage(currentPrice);
  const basePricePercentage = getPricePercentage(basePrice);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl rounded-xl border-gray-800 bg-gray-900 p-4 text-white sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
            <span>{player.name}</span>
            {player.isCaptain && (
              <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-gray-400">Captain</span>
            )}
            {player.isKeeper && (
              <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-gray-400">Keeper</span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 sm:mt-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Row 1: Player Photo and Current Innings */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Player Image */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-gray-800 sm:h-30 sm:w-30">
                  <Image
                    src={`/teams/pakistan.png`}
                    alt={player.name}
                    height={150}
                    width={150}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Current Innings */}
              <div className="flex-1 rounded-xl border-4 border-gray-800 bg-gray-900 px-4 py-3 shadow-md text-center sm:px-6 sm:py-4">
                <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                  <Activity className="h-5 w-5 text-white" />
                  <span className="text-sm text-white">Current Innings</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 md:grid-cols-5 md:gap-4">
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{player.runs}</p>
                    <p className="text-sm text-gray-400 sm:text-md">Runs</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{player.balls}</p>
                    <p className="text-sm text-gray-400 sm:text-md">Balls</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{player.fours}</p>
                    <p className="text-sm text-gray-400 sm:text-md">Fours</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{player.sixes}</p>
                    <p className="text-sm text-gray-400 sm:text-md">Sixes</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">
                      {Number(player.strikeRate).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-400 sm:text-md">SR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="rounded-xl bg-gray-900/10 border border-gray-800/20 p-4 shadow-md sm:p-6">
              <h4 className="mb-3 flex items-center gap-2 text-base font-medium sm:mb-4 sm:text-lg">
                <Award className="h-5 w-5 text-white" />
                <span>Performance Metrics</span>
              </h4>
              <div className="space-y-6 sm:space-y-8">
                {/* Current Price with enhanced progress bar */}
                <div>
                  <div className="my-2 flex justify-between">
                    {/* <span className="text-xs text-gray-300/80 sm:text-sm">Current Price</span> */}
                    {/* <span className="text-xs font-medium text-white sm:text-sm">₹{currentPrice.toFixed(2)}</span> */}
                  </div>

                  {/* Progress bar container with relative positioning */}
                  <div className="relative mt-1 mb-8">
                    {/* Base progress bar (0-300 range) */}
                    <Progress value={100} className="h-2 bg-blue-400" />

                    {/* Base price marker */}
                    <div
                      className="absolute top-0 h-4 w-0.5 bg-accent-dark z-10"
                      style={{ left: `${basePricePercentage}%` }}
                    ></div>
                    <div
                      className="absolute top-5 text-xs text-blue-400"
                      style={{ left: `calc(${basePricePercentage}% - 10px)` }}
                    >
                      ₹{basePrice}
                    </div>

                    {/* Current price progress */}
                    <Progress
                      value={pricePercentage}
                      className={`absolute top-0 h-2 ${player.outDesc === "not out"
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700"
                        : "bg-gradient-to-r from-amber-600 to-amber-400"
                        }`}
                    />

                    {/* Current price marker */}
                    <div
                      className={`absolute top-0 h-4 w-0.5 z-20 ${player.outDesc === "not out" ? "bg-emerald-600" : "bg-amber-400"
                        }`}
                      style={{ left: `${pricePercentage}%` }}
                    ></div>

                    {/* Current price label */}
                    <div
                      className={`absolute -top-5 text-xs ${player.outDesc === "not out" ? "text-emerald-500" : "text-emerald-400"
                        }`}
                      style={{ left: `calc(${pricePercentage}% - 10px)` }}
                    >
                      ₹{currentPrice.toFixed(1)}
                    </div>
                  </div>

                  {/* Price calculation explanation */}
                  <div className="mt-2 rounded-lg bg-gray-900/10 p-3 text-xs text-gray-100/70 border border-gray-800/20">
                    <p className="mb-1 font-medium text-gray-300">Price calculation:</p>
                    <p>
                      Base price: ₹{basePrice} (Position {battingPosition} batsman)
                    </p>
                    <p>
                      + Runs bonus: ₹{(player.runs * 0.75).toFixed(2)} (0.75 × {player.runs} runs)
                    </p>
                    <p>
                      - Dots penalty: ₹{(player.dots * 0.5).toFixed(2)} (0.5 × {player.dots} dots)
                    </p>
                    {player.outDesc !== "not out" && <p>× Out multiplier: 0.7 (30% reduction)</p>}
                    {currentPrice >= 300 && <p className="text-red-400">* Price capped at ₹300</p>}
                  </div>
                </div>

                {/* Performance indicators */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-900/10 p-3 border border-gray-800/20">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-md text-gray-300/80">
                        <TrendingUp className="h-5 w-5 text-white" />
                        <span className="text-white">Run Rate</span>
                      </span>
                      <span
                        className={`text-sm font-medium ${player.runs / player.balls > 1.5 ? "text-gray-400" : "text-amber-500"
                          }`}
                      >
                        {(player.runs / player.balls).toFixed(2)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (player.runs / player.balls) * 50)}
                      className={`mt-2 h-1 ${player.runs / player.balls > 1.5 ? "bg-gray-500" : "bg-amber-600"}`}
                    />
                  </div>

                  <div className="rounded-lg bg-gray-900/10 p-3 border border-gray-800/20">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-md text-gray-300/80">
                        <BarChart3 className="h-5 w-5 text-white" />
                        <span className="text-white">Boundary %</span>
                      </span>
                      <span
                        className={`text-sm font-medium ${(player.fours + player.sixes) / player.balls > 0.15 ? "text-emerald-500" : "text-amber-500"
                          }`}
                      >
                        {(((player.fours + player.sixes) / player.balls) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, ((player.fours + player.sixes) / player.balls) * 100 * 3)}
                      className={`mt-2 h-1 ${(player.fours + player.sixes) / player.balls > 0.15 ? "bg-emerald-600" : "bg-amber-600"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                className="flex-1 rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-700 sm:p-3"
                onClick={() => {
                  buyPortfolio(player)
                }}
              >
                Add to Portfolio
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-lg bg-gray-900 p-2 border-2 border-gray-700 hover:border-gray-800 text-white hover:bg-gray-800 sm:p-3"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
