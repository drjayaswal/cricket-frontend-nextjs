"use client"

import { TeamStats } from "@/components/betting/team-stats"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { PlayerModal } from "./player-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Clock, Target, TrendingUp, Users, Zap } from "lucide-react"

export interface MatchData {
  live_score: {
    runs: string
    overs: string
    wickets: string
    target: string
    runrate: string
    required_runrate: string
  }
  batsmen: Array<{
    id: string
    name: string
    runs: string
    balls_faced: string
    fours: string
    sixes: string
    strike_rate: string
  }>
  bowlers: Array<{
    id: string
    name: string
    overs: string
    runs_conceded: string
    wickets: string
    maidens: string
    econ: string
  }>
  live_inning: {
    last_wicket: {
      name: string
      runs: string
      balls: string
      how_out: string
      score_at_dismissal: string
      overs_at_dismissal: string
    }
    current_partnership: {
      runs: string
      balls: string
      overs: string
      batsmen: Array<{
        name: string
        runs: string
        balls: string
      }>
    }
    recent_scores: string
  }
  teams: Array<{
    id: string
    name: string
    short_name: string
    score: string
    logo_url: string
  }>
  status: string
  status_note: string
  team_batting: string
  team_bowling: string
  players: Array<{
    id: number
    first_name: string
    last_name: string
    short_name: string
    playing_role: string
    country: string
    batting_style?: string
    bowling_style?: string
    birthplace?: string
  }>
}

export default function BettingInterface(match: MatchData) {
  const [isLoading, setIsLoading] = useState(true)
  const [matchData, setMatchData] = useState<MatchData | null>(null)
  const [activeTab, setActiveTab] = useState<string>("live")
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const matchId = searchParams.get("id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cricket/live/${matchId}`)
        if (!res.ok) throw new Error("API Error")
        const data = await res.json()
        setMatchData(data.data)
      } catch (e) {
        console.error("Fetch error:", e)
      } finally {
        setIsLoading(false)
      }
    }

    if (matchId) {
      fetchData()
    }
  }, [matchId])

  const getRunsRequired = () => {
    if (!matchData?.live_score) return 0
    const target = Number.parseInt(matchData.live_score.target)
    const runs = Number.parseInt(matchData.live_score.runs)
    return target - runs
  }

  const getProgressPercentage = () => {
    if (!matchData?.live_score) return 0
    const target = Number.parseInt(matchData.live_score.target)
    const runs = Number.parseInt(matchData.live_score.runs)
    return (runs / target) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading match data...</p>
        </div>
      </div>
    )
  }

  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">No match data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-transparent to-transparent">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            {matchData.status === "Live" ? (
              <Badge variant="destructive" className="animate-pulse px-4 py-2 text-sm font-bold">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-red-500">LIVE</span>
              </Badge>
            ) : (
              <Badge variant="secondary" className="px-4 py-2 text-sm font-bold">
                {matchData.status}
              </Badge>
            )}
            <span className="text-gray-300 text-sm">{matchData.status_note}</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-3">
              <img
                src={matchData.teams[1]?.logo_url || "/placeholder.svg"}
                alt={matchData.teams[1]?.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-2xl font-bold">{matchData.teams[1]?.short_name}</span>
            </div>
            <span className="text-3xl font-bold text-cyan-400 mx-6">VS</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">{matchData.teams[0]?.short_name}</span>
              <img
                src={matchData.teams[0]?.logo_url || "/placeholder.svg"}
                alt={matchData.teams[0]?.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Live Score Card */}
        <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              {matchData.team_batting} - {matchData.live_score.runs}/{matchData.live_score.wickets}
            </CardTitle>
            <div className="text-center text-gray-300">
              <span className="text-lg">Overs: {matchData.live_score.overs}</span>
              <span className="mx-4">•</span>
              <span className="text-lg">Run Rate: {matchData.live_score.runrate}</span>
              {matchData.live_score.required_runrate && (
                <>
                  <span className="mx-4">•</span>
                  <span className="text-lg">Required RR: {matchData.live_score.required_runrate}</span>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {matchData.live_score.target && (
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>Target: {matchData.live_score.target}</span>
                  <span>Need: {getRunsRequired()} runs</span>
                </div>
                <Progress value={getProgressPercentage()} className="h-3" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamStats team={matchData.teams[1]} teamPrice={25} color="green" />
          <TeamStats team={matchData.teams[0]} teamPrice={25} color="red" />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live" className="data-[state=active]:bg-blue-600/60">
              <Zap className="w-4 h-4 mr-2" />
              Live
            </TabsTrigger>
            <TabsTrigger value="batting" className="data-[state=active]:bg-green-600/60">
              <Users className="w-4 h-4 mr-2" />
              Batting
            </TabsTrigger>
            <TabsTrigger value="bowling" className="data-[state=active]:bg-red-600/60">
              <Target className="w-4 h-4 mr-2" />
              Bowling
            </TabsTrigger>
            <TabsTrigger value="partnership" className="data-[state=active]:bg-purple-600/60">
              <TrendingUp className="w-4 h-4 mr-2" />
              Partnership
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-cyan-600/60">
              <Users className="w-4 h-4 mr-2" />
              Players
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Batsmen */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Current Batsmen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {matchData.batsmen?.map((batsman, index) => (
                    <div key={batsman.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{batsman.name}</h3>
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "On Strike" : "Non-Striker"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-300">
                          <span className="block">
                            Runs: <span className="text-white font-semibold">{batsman.runs}</span>
                          </span>
                          <span className="block">
                            Balls: <span className="text-white font-semibold">{batsman.balls_faced}</span>
                          </span>
                        </div>
                        <div className="text-gray-300">
                          <span className="block">
                            4s: <span className="text-white font-semibold">{batsman.fours || 0}</span>
                          </span>
                          <span className="block">
                            6s: <span className="text-white font-semibold">{batsman.sixes || 0}</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <span className="text-gray-300 text-sm">
                          Strike Rate: <span className="text-white font-semibold">{batsman.strike_rate}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Current Bowlers */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Current Bowlers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {matchData.bowlers?.map((bowler, index) => (
                    <div key={bowler.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{bowler.name}</h3>
                        <Badge variant={index === 0 ? "destructive" : "secondary"}>
                          {index === 0 ? "Bowling" : "Previous"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-300">
                          <span className="block">
                            Overs: <span className="text-white font-semibold">{bowler.overs}</span>
                          </span>
                          <span className="block">
                            Runs: <span className="text-white font-semibold">{bowler.runs_conceded}</span>
                          </span>
                        </div>
                        <div className="text-gray-300">
                          <span className="block">
                            Wickets: <span className="text-white font-semibold">{bowler.wickets}</span>
                          </span>
                          <span className="block">
                            Maidens: <span className="text-white font-semibold">{bowler.maidens}</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <span className="text-gray-300 text-sm">
                          Economy: <span className="text-white font-semibold">{bowler.econ}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Scores */}
            {matchData.live_inning?.recent_scores && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Balls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {matchData.live_inning.recent_scores
                      .split(",")
                      .reverse()
                      .map((score, index) => (
                        <Badge
                          key={index}
                          variant={
                            score.trim() === "w"
                              ? "destructive"
                              : score.trim() === "4" || score.trim() === "6"
                                ? "default"
                                : "secondary"
                          }
                          className="text-sm px-3 py-1"
                        >
                          {score.trim() === "w" ? "W" : score.trim()}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="batting">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Batting Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchData.batsmen?.map((batsman) => (
                    <div key={batsman.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="text-white font-semibold">{batsman.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {batsman.runs} runs ({batsman.balls_faced} balls)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">SR: {batsman.strike_rate}</p>
                        <p className="text-gray-400 text-sm">
                          {batsman.fours || 0} × 4s, {batsman.sixes || 0} × 6s
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bowling">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bowling Figures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchData.bowlers?.map((bowler) => (
                    <div key={bowler.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="text-white font-semibold">{bowler.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {bowler.overs} overs, {bowler.maidens} maidens
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          {bowler.wickets}/{bowler.runs_conceded}
                        </p>
                        <p className="text-gray-400 text-sm">Econ: {bowler.econ}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partnership">
            <div className="space-y-6">
              {/* Current Partnership */}
              {matchData.live_inning?.current_partnership && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Current Partnership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {matchData.live_inning.current_partnership.runs}
                        </p>
                        <p className="text-gray-400 text-sm">Runs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {matchData.live_inning.current_partnership.balls}
                        </p>
                        <p className="text-gray-400 text-sm">Balls</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {matchData.live_inning.current_partnership.overs}
                        </p>
                        <p className="text-gray-400 text-sm">Overs</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      {matchData.live_inning.current_partnership.batsmen?.map((batsman, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white">{batsman.name}</span>
                          <span className="text-gray-400">
                            {batsman.runs} ({batsman.balls})
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Last Wicket */}
              {matchData.live_inning?.last_wicket && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Last Wicket</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold text-lg">{matchData.live_inning.last_wicket.name}</h3>
                      <p className="text-gray-400">{matchData.live_inning.last_wicket.how_out}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Score:{" "}
                          <span className="text-white">
                            {matchData.live_inning.last_wicket.runs} ({matchData.live_inning.last_wicket.balls})
                          </span>
                        </span>
                        <span className="text-gray-400">
                          At:{" "}
                          <span className="text-white">
                            {matchData.live_inning.last_wicket.score_at_dismissal}/
                            {matchData.live_inning.last_wicket.overs_at_dismissal}
                          </span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="players">
            <div className="space-y-6">
              {/* Australia Team */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <img
                      src={matchData.teams[0]?.logo_url || "/placeholder.svg"}
                      alt="Australia"
                      className="w-8 h-8 rounded-full"
                    />
                    Australia Squad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchData.players
                      ?.filter((player) => player.country === "au")
                      .map((player) => (
                        <div
                          key={player.id}
                          className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedPlayer(player)
                            setIsModalOpen(true)
                          }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="text-white font-semibold text-sm">
                                {player.first_name} {player.last_name || ""}
                              </h3>
                              <Badge
                                variant={
                                  player.playing_role === "bat"
                                    ? "default"
                                    : player.playing_role === "bowl"
                                      ? "destructive"
                                      : player.playing_role === "wk"
                                        ? "secondary"
                                        : "outline"
                                }
                                className="text-xs"
                              >
                                {player.playing_role === "bat"
                                  ? "BAT"
                                  : player.playing_role === "bowl"
                                    ? "BOWL"
                                    : player.playing_role === "wk"
                                      ? "WK"
                                      : "ALL"}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-xs">{player.short_name}</p>
                            <div className="space-y-1 text-xs">
                              {player.batting_style && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Bat:</span> {player.batting_style}
                                </p>
                              )}
                              {player.bowling_style && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Bowl:</span> {player.bowling_style}
                                </p>
                              )}
                              {player.birthplace && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Born:</span> {player.birthplace}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* West Indies Team */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <img
                      src={matchData.teams[1]?.logo_url || "/placeholder.svg"}
                      alt="West Indies"
                      className="w-8 h-8 rounded-full"
                    />
                    West Indies Squad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchData.players
                      ?.filter((player) => player.country === "wi")
                      .map((player) => (
                        <div
                          key={player.id}
                          className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedPlayer(player)
                            setIsModalOpen(true)
                          }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="text-white font-semibold text-sm">
                                {player.first_name} {player.last_name || ""}
                              </h3>
                              <Badge
                                variant={
                                  player.playing_role === "bat"
                                    ? "default"
                                    : player.playing_role === "bowl"
                                      ? "destructive"
                                      : player.playing_role === "wk"
                                        ? "secondary"
                                        : "outline"
                                }
                                className="text-xs"
                              >
                                {player.playing_role === "bat"
                                  ? "BAT"
                                  : player.playing_role === "bowl"
                                    ? "BOWL"
                                    : player.playing_role === "wk"
                                      ? "WK"
                                      : "ALL"}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-xs">{player.short_name}</p>
                            <div className="space-y-1 text-xs">
                              {player.batting_style && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Bat:</span> {player.batting_style}
                                </p>
                              )}
                              {player.bowling_style && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Bowl:</span> {player.bowling_style}
                                </p>
                              )}
                              {player.birthplace && (
                                <p className="text-gray-300">
                                  <span className="text-gray-400">Born:</span> {player.birthplace}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Player Modal */}
        {selectedPlayer && (
          <PlayerModal
            player={selectedPlayer}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedPlayer(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
