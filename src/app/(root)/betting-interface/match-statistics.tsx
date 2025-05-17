"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, MapPin, ThermometerSun, Users, Award, Droplets, TrendingUp, Zap, Target } from "lucide-react"
import { useSocketStore } from "@/store/socket-store"
import { useEffect } from "react"

interface TeamStats {
  runs: number
  wickets: number
  overs: number
  runRate: number
  extras: number
  boundaries: {
    fours: number
    sixes: number
  }
  partnerships: {
    players: string
    runs: number
  }[]
  powerplay: number
}

interface Team {
  name: string
  score: string
  color: string
  stats: TeamStats
}

interface MatchStatsData {
  venue: string
  toss: string
  umpires: string
  referee: string
  weather: string
  pitch: string
  requiredRunRate: number
  projectedScore: number
}

interface MatchStatisticsProps {
  team1: Team
  team2: Team
  matchStats: MatchStatsData
  className?: string
}

export function MatchStatistics({ team1, team2, matchStats, className = "" }: MatchStatisticsProps) {
  // Calculate max values for proper scaling
  const maxRuns = Math.max(team1.stats.runs, team2.stats.runs)
  const maxBoundaries = Math.max(
    team1.stats.boundaries.fours + team1.stats.boundaries.sixes,
    team2.stats.boundaries.fours + team2.stats.boundaries.sixes,
  )
  const maxWickets = Math.max(team1.stats.wickets, team2.stats.wickets)
  const maxRunRate = Math.max(team1.stats.runRate, team2.stats.runRate)

  return (
    <div className={className}>
      <Card className="border-none bg-gradient-to-br from-gray-800/80 to-gray-900/90 shadow-xl overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-indigo-400" />
              Match Statistics
            </h2>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="bg-gray-800/70 p-1 h-9 mb-6">
              <TabsTrigger
                value="overview"
                className="text-xs px-3 py-1.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="batting"
                className="text-xs px-3 py-1.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md"
              >
                Batting
              </TabsTrigger>
              <TabsTrigger
                value="bowling"
                className="text-xs px-3 py-1.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md"
              >
                Bowling
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="text-xs px-3 py-1.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md"
              >
                Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0 space-y-6">
              {/* Team Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-8 rounded-full ${team1.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                      ></div>
                      <h3 className="text-lg font-medium text-white">{team1.name}</h3>
                    </div>
                    <Badge
                      className={`${team1.color === "red" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"} border-none`}
                    >
                      {team1.stats.runs}/{team1.stats.wickets}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Run Rate</span>
                        <span
                          className={`text-sm font-medium ${team1.color === "red" ? "text-red-400" : "text-green-400"}`}
                        >
                          {team1.stats.runRate.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={(team1.stats.runRate / maxRunRate) * 100}
                        className="h-1.5 bg-gray-700"
                        style={{ backgroundColor: team1.color === "red" ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)" }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Boundaries</span>
                        <span
                          className={`text-sm font-medium ${team1.color === "red" ? "text-red-400" : "text-green-400"}`}
                        >
                          {team1.stats.boundaries.fours + team1.stats.boundaries.sixes}
                        </span>
                      </div>
                      <Progress
                        value={((team1.stats.boundaries.fours + team1.stats.boundaries.sixes) / maxBoundaries) * 100}
                        className={`h-1.5 bg-gray-700 ${team1.color === "red" ? "bg-red-500" : "bg-green-500"}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Fours</div>
                      <div className="text-lg font-bold text-white">{team1.stats.boundaries.fours}</div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Sixes</div>
                      <div className="text-lg font-bold text-white">{team1.stats.boundaries.sixes}</div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Extras</div>
                      <div className="text-lg font-bold text-white">{team1.stats.extras}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-8 rounded-full ${team2.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                      ></div>
                      <h3 className="text-lg font-medium text-white">{team2.name}</h3>
                    </div>
                    <Badge
                      className={`${team2.color === "red" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"} border-none`}
                    >
                      {team2.stats.runs}/{team2.stats.wickets}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Run Rate</span>
                        <span
                          className={`text-sm font-medium ${team2.color === "red" ? "text-red-400" : "text-green-400"}`}
                        >
                          {team2.stats.runRate.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={(team2.stats.runRate / maxRunRate) * 100}
                        className="h-1.5 bg-gray-700"
                        style={{ backgroundColor: team2.color === "red" ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)" }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Boundaries</span>
                        <span
                          className={`text-sm font-medium ${team2.color === "red" ? "text-red-400" : "text-green-400"}`}
                        >
                          {team2.stats.boundaries.fours + team2.stats.boundaries.sixes}
                        </span>
                      </div>
                      <Progress
                        value={((team2.stats.boundaries.fours + team2.stats.boundaries.sixes) / maxBoundaries) * 100}
                        className="h-1.5 bg-gray-700"
                        style={{ backgroundColor: team2.color === "red" ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)" }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Fours</div>
                      <div className="text-lg font-bold text-white">{team2.stats.boundaries.fours}</div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Sixes</div>
                      <div className="text-lg font-bold text-white">{team2.stats.boundaries.sixes}</div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-400 mb-1">Extras</div>
                      <div className="text-lg font-bold text-white">{team2.stats.extras}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Head to Head Comparison */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <h3 className="text-lg font-medium text-white mb-4">Head to Head</h3>

                <div className="space-y-4">
                  {/* Runs Comparison */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-indigo-400 mr-2" />
                        <span className="text-gray-300">Total Runs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-red-400 font-medium">{team1.stats.runs}</span>
                        <span className="text-xs text-gray-500">vs</span>
                        <span className="text-green-400 font-medium">{team2.stats.runs}</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${(team1.stats.runs / (team1.stats.runs + team2.stats.runs)) * 100}%` }}
                        ></div>
                        <div
                          className="bg-green-500 h-full"
                          style={{ width: `${(team2.stats.runs / (team1.stats.runs + team2.stats.runs)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Wickets Comparison */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-amber-400 mr-2" />
                        <span className="text-gray-300">Wickets Lost</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-red-400 font-medium">{team1.stats.wickets}</span>
                        <span className="text-xs text-gray-500">vs</span>
                        <span className="text-green-400 font-medium">{team2.stats.wickets}</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div
                          className="bg-red-500 h-full"
                          style={{
                            width: `${(team1.stats.wickets / (team1.stats.wickets + team2.stats.wickets)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${(team2.stats.wickets / (team1.stats.wickets + team2.stats.wickets)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Powerplay Comparison */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-gray-300">Powerplay Score</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-red-400 font-medium">{team1.stats.powerplay}</span>
                        <span className="text-xs text-gray-500">vs</span>
                        <span className="text-green-400 font-medium">{team2.stats.powerplay}</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div
                          className="bg-red-500 h-full"
                          style={{
                            width: `${(team1.stats.powerplay / (team1.stats.powerplay + team2.stats.powerplay)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${(team2.stats.powerplay / (team1.stats.powerplay + team2.stats.powerplay)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batting" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Team 1 Batting */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-2 h-8 rounded-full ${team1.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                    ></div>
                    <h3 className="text-lg font-medium text-white">{team1.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Partnerships */}
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Key Partnerships</h4>
                      <div className="space-y-3">
                        {team1.stats.partnerships.map((partnership, index) => (
                          <div key={index} className="relative">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-white">{partnership.players}</span>
                              <span className="text-sm font-medium text-red-400">{partnership.runs}</span>
                            </div>
                            <Progress
                              value={(partnership.runs / 50) * 100}
                              className="h-1.5 bg-gray-700"
                              style={{ backgroundColor: "rgb(239, 68, 68)" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Batting Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/80 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Boundary %</span>
                          <span className="text-sm font-medium text-red-400">
                            {Math.round(
                              ((team1.stats.boundaries.fours + team1.stats.boundaries.sixes) /
                                (team1.stats.overs * 6)) *
                              100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-1">4s:</span>
                            <span className="text-sm text-white">{team1.stats.boundaries.fours}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-1">6s:</span>
                            <span className="text-sm text-white">{team1.stats.boundaries.sixes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/80 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Dot Ball %</span>
                          <span className="text-sm font-medium text-red-400">
                            {Math.round((team1.stats.extras / (team1.stats.overs * 6)) * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Extras:</span>
                          <span className="text-sm text-white">{team1.stats.extras}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team 2 Batting */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-2 h-8 rounded-full ${team2.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                    ></div>
                    <h3 className="text-lg font-medium text-white">{team2.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Partnerships */}
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Key Partnerships</h4>
                      <div className="space-y-3">
                        {team2.stats.partnerships.map((partnership, index) => (
                          <div key={index} className="relative">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-white">{partnership.players}</span>
                              <span className="text-sm font-medium text-green-400">{partnership.runs}</span>
                            </div>
                            <Progress
                              value={(partnership.runs / 50) * 100}
                              className="h-1.5 bg-gray-700"
                              style={{ backgroundColor: "rgb(34, 197, 94)" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Batting Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/80 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Boundary %</span>
                          <span className="text-sm font-medium text-green-400">
                            {Math.round(
                              ((team2.stats.boundaries.fours + team2.stats.boundaries.sixes) /
                                (team2.stats.overs * 6)) *
                              100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-1">4s:</span>
                            <span className="text-sm text-white">{team2.stats.boundaries.fours}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-1">6s:</span>
                            <span className="text-sm text-white">{team2.stats.boundaries.sixes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/80 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Dot Ball %</span>
                          <span className="text-sm font-medium text-green-400">
                            {Math.round((team2.stats.extras / (team2.stats.overs * 6)) * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Extras:</span>
                          <span className="text-sm text-white">{team2.stats.extras}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bowling" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Team 1 Bowling */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-2 h-8 rounded-full ${team1.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                    ></div>
                    <h3 className="text-lg font-medium text-white">{team1.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/80 rounded-lg p-3 flex flex-col justify-between">
                      <span className="text-xs text-gray-400">Economy Rate</span>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-white">{team2.stats.runRate.toFixed(2)}</span>
                        <span className="text-xs text-gray-400 ml-1">runs/over</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-3 flex flex-col justify-between">
                      <span className="text-xs text-gray-400">Wickets Taken</span>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-white">{team2.stats.wickets}</span>
                        <span className="text-xs text-gray-400 ml-1">wickets</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Extras Given</span>
                        <span className="text-sm font-medium text-white">{team2.stats.extras}</span>
                      </div>
                      <Progress
                        value={(team2.stats.extras / 20) * 100}
                        className="h-1.5bg-amber-500"
                      />
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Dot Balls</span>
                        <span className="text-sm font-medium text-white">{Math.round(team2.stats.extras)}</span>
                      </div>
                      <Progress
                        value={(Math.round(team2.stats.extras) / (team2.stats.overs * 6)) * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Team 2 Bowling */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-2 h-8 rounded-full ${team2.color === "red" ? "bg-red-500" : "bg-green-500"} mr-3`}
                    ></div>
                    <h3 className="text-lg font-medium text-white">{team2.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/80 rounded-lg p-3 flex flex-col justify-between">
                      <span className="text-xs text-gray-400">Economy Rate</span>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-white">{team1.stats.runRate.toFixed(2)}</span>
                        <span className="text-xs text-gray-400 ml-1">runs/over</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-3 flex flex-col justify-between">
                      <span className="text-xs text-gray-400">Wickets Taken</span>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-white">{team1.stats.wickets}</span>
                        <span className="text-xs text-gray-400 ml-1">wickets</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Extras Given</span>
                        <span className="text-sm font-medium text-white">{team1.stats.extras}</span>
                      </div>
                      <Progress
                        value={(team1.stats.extras / 20) * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Dot Balls</span>
                        <span className="text-sm font-medium text-white">{Math.round(team1.stats.extras)}</span>
                      </div>
                      <Progress
                        value={(Math.round(team1.stats.extras) / (team1.stats.overs * 6)) * 100}
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="mt-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-500/20 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Venue</div>
                        <div className="text-white font-medium">{matchStats.venue}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-amber-500/20 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Toss</div>
                        <div className="text-white font-medium">{matchStats.toss}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <ThermometerSun className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Weather</div>
                        <div className="text-white font-medium">{matchStats.weather}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Umpires</div>
                        <div className="text-white font-medium">{matchStats.umpires}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Match Referee</div>
                        <div className="text-white font-medium">{matchStats.referee}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <Droplets className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Pitch Condition</div>
                        <div className="text-white font-medium">{matchStats.pitch}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}
