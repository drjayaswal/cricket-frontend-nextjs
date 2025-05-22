"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from "next/navigation"
import { TeamStats } from "@/components/betting/team-stats"
import { LoaderCircle, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import data from "./data.json"
import { PlayerModal } from "./player-modal"
import { useMatchStore } from "@/store/match-store"
import { usePortfolioStore } from "@/store/portfolio-store"

// Type definitions for team stats props
interface TeamStatsProps {
  teamName: string
  teamPrice: number
  color: string
}

export default function BettingInterface() {
  // Get match ID from URL parameters
  const searchParams = useSearchParams()
  const matchId = searchParams.get("id")

  // const handleGetScore = useSelectedMatchStore.getState().handleGetScore
  // const smatchData = useSocketStore.getState().scoreData
  // console.log("smatchData :", smatchData)
  //
  // useEffect(() => {
  //   // handleGetScore()
  //   useSocketStore.getState().connectSocket()
  //   return () => {
  //     useSocketStore.getState().disconnectSocket();
  //   }
  // }, [])

  // const matchLiveScore = useSocketStore((state) => state.scoreData)
  const matchLiveScore = data
  const selectedMatch = useMatchStore.getState().selectedMatch
  console.log("match score data from sockets:", matchLiveScore)

  if (!matchLiveScore) {
    return (
      <div className="space-y-3 mt-20 flex flex-col items-center justify-center">
        <LoaderCircle className="size-10 inline-block animate-spin" />
        <span className="text-3xl font-medium text-gray-800">
          Please Wait
        </span>
      </div>
    );
  }
  // State management for UI interactions
  const [activeTab, setActiveTab] = useState<string>("innings1") // Track active innings tab
  const [activeSection, setActiveSection] = useState<string>("batsmen") // Track active data section
  const [expandedPlayers, setExpandedPlayers] = useState<number[]>([]) // Track expanded player cards
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null) // Store selected player for modal
  const [isModalOpen, setIsModalOpen] = useState(false) // Control modal visibility
  const [selectedBattingPosition, setSelectedBattingPosition] = useState<number>(0) // Store batting position

  const selectedPlayerPortfolio = usePortfolioStore((state) => state.selectedPlayerPortfolio)
  /**
   * Toggle player card expansion state
   * @param playerId - ID of the player to toggle
   */
  const togglePlayerExpansion = (playerId: number) => {
    setExpandedPlayers((prev) => (prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]))
  }

  /**
   * Open player details modal if player is not out
   * @param player - Player data object
   */
  const openModal = (player: any) => {
    // Only open modal for players who are still batting
    if (player.outDesc === "not out") {
      setSelectedPlayer(player)
      setIsModalOpen(true)
    } else {
      // Player is out, don't open the modal
      console.log(`Player ${player.name} is out, not opening modal`)
    }
  }

  /**
   * Close player details modal
   */
  const closeModal = () => {
    setSelectedPlayer(null)
    setIsModalOpen(false)
  }

  /**
   * Create portfolio for a player (placeholder function)
   * @param playerId - ID of the player to add to portfolio
   */
  const createPortfolio = (playerId: number) => {
    console.log(`Creating portfolio for player ID: ${playerId}`)
    // Implementation for creating portfolio would go here
  }

  // Show loading state if match data is not available
  if (!matchLiveScore) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 space-y-3">
        <LoaderCircle className="inline-block size-10 animate-spin" />
        <span className="text-3xl font-medium text-gray-800">Please Wait</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="container mx-auto px-4 py-6">
        {/* Live Badge - Shows match status */}
        <div className="mb-4 flex items-center gap-2">
          {matchLiveScore.isMatchComplete ? (
            <div className="flex items-center">
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">Match Finished</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="animate-pulse rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">LIVE</span>
            </div>
          )}
        </div>

        {/* Match Title - Shows competing teams */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">
            {matchLiveScore.innings[0].batTeamName} <span className="text-cyan-500">VS</span>{" "}
            {matchLiveScore.innings[1].batTeamName}
          </h1>
        </div>

        {/* Match Summary - Shows score and status for each innings */}
        <div className="mb-6 grid grid-cols-1 gap-2 text-gray-400">
          {matchLiveScore.innings.map((inning, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xl font-medium text-white md:text-2xl">
                {inning.batTeamSName} - {inning.score}/{inning.wickets.length} in {inning.overs} Overs (RR:{" "}
                {inning.runRate})
              </span>
            </div>
          ))}
          <div className="mt-2">
            <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
              {matchLiveScore.status}
            </span>
          </div>
        </div>

        {/* Team Stats - Shows comparative team statistics */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TeamStats
            teamName={matchLiveScore.innings[0].batTeamName}
            teamPrice={matchLiveScore.innings[0].runRate}
            color="green"
          />
          <TeamStats
            teamName={matchLiveScore.innings[1].batTeamName}
            teamPrice={matchLiveScore.innings[1].runRate}
            color="red"
          />
        </div>

        {/* Innings Tabs - Switch between teams */}
        <div className="mb-4">
          <div className="mb-6 flex border-b border-gray-800">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "innings1"
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveTab("innings1")}
              aria-label={`View ${matchLiveScore.innings[0].batTeamName} innings`}
            >
              {matchLiveScore.innings[0].batTeamName}
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "innings2" ? "border-b-2 border-cyan-500 text-cyan-500" : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveTab("innings2")}
              aria-label={`View ${matchLiveScore.innings[1].batTeamName} innings`}
            >
              {matchLiveScore.innings[1].batTeamName}
            </button>
          </div>
        </div>

        {/* Section Tabs - Switch between batting, bowling, and wickets data */}
        <div className="mb-6">
          <div className="mb-6 flex border-b border-gray-800">
            <button
              className={`px-4 py-2 font-medium ${activeSection === "batsmen"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveSection("batsmen")}
              aria-label="View batting statistics"
            >
              Batting
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeSection === "bowlers"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveSection("bowlers")}
              aria-label="View bowling statistics"
            >
              Bowling
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeSection === "wickets"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveSection("wickets")}
              aria-label="View wickets information"
            >
              Wickets
            </button>
          </div>
        </div>

        {/* Content based on active tab and section */}
        <div className="mb-8 rounded-xl bg-gray-900 p-4 sm:p-6">
          {/* Batting Section */}
          {activeSection === "batsmen" && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                {activeTab === "innings1"
                  ? `${matchLiveScore.innings[0].batTeamName} Batting`
                  : `${matchLiveScore.innings[1].batTeamName} Batting`}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-2 py-3 text-gray-400 sm:px-4">Batter</th>
                      <th className="px-2 py-3 text-gray-400 sm:px-4">Dismissal</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">R</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">B</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">4s</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">6s</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through batsmen data for the active innings */}
                    {(activeTab === "innings1"
                      ? matchLiveScore.innings[0].batsmen
                      : matchLiveScore.innings[1].batsmen
                    ).map((batsman, index) => (
                      <tr
                        key={index}
                        onClick={() => openModal(batsman)}
                        className={`${index % 2 === 0 ? "bg-gray-800/30 " : ""} rounded-4xl ${batsman.outDesc === "not out"
                          ? "cursor-pointer hover:bg-white/10"
                          : "cursor-default opacity-70"
                          }`}
                      >
                        <td className="px-2 py-3 font-medium text-white sm:px-4">
                          {batsman.name} {batsman.isCaptain && "(C)"} {batsman.isKeeper && "(WK)"}
                        </td>
                        <td className="px-2 py-3 text-gray-400 sm:px-4">{batsman.outDesc}</td>
                        <td className="px-2 py-3 text-right text-white sm:px-4">{batsman.runs}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{batsman.balls}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{batsman.fours}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{batsman.sixes}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{batsman.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    {/* Extras row */}
                    <tr className="border-t border-gray-800">
                      <td colSpan={2} className="px-2 py-3 font-medium text-white sm:px-4">
                        Extras
                      </td>
                      <td className="px-2 py-3 text-right text-white sm:px-4">
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].extras.total
                          : matchLiveScore.innings[1].extras.total}
                      </td>
                      <td colSpan={5} className="px-2 py-3 text-gray-400 sm:px-4">
                        (b{" "}
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].extras.byes
                          : matchLiveScore.innings[1].extras.byes}
                        , lb{" "}
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].extras.legByes
                          : matchLiveScore.innings[1].extras.legByes}
                        , w{" "}
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].extras.wides
                          : matchLiveScore.innings[1].extras.wides}
                        , nb{" "}
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].extras.noBalls
                          : matchLiveScore.innings[1].extras.noBalls}
                        )
                      </td>
                    </tr>
                    {/* Total row */}
                    <tr>
                      <td colSpan={2} className="px-2 py-3 font-bold text-white sm:px-4">
                        Total
                      </td>
                      <td className="px-2 py-3 text-right font-bold text-white sm:px-4">
                        {activeTab === "innings1"
                          ? `${matchLiveScore.innings[0].score}/${matchLiveScore.innings[0].wickets.length}`
                          : `${matchLiveScore.innings[1].score}/${matchLiveScore.innings[1].wickets.length}`}
                      </td>
                      <td colSpan={5} className="px-2 py-3 text-gray-400 sm:px-4">
                        ({activeTab === "innings1" ? matchLiveScore.innings[0].overs : matchLiveScore.innings[1].overs}{" "}
                        Overs, RR:{" "}
                        {activeTab === "innings1"
                          ? matchLiveScore.innings[0].runRate
                          : matchLiveScore.innings[1].runRate}
                        )
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Bowling Section */}
          {activeSection === "bowlers" && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                {activeTab === "innings1"
                  ? `${matchLiveScore.innings[0].bowlTeamName} Bowling`
                  : `${matchLiveScore.innings[1].bowlTeamName} Bowling`}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-2 py-3 text-gray-400 sm:px-4">Bowler</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">O</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">M</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">R</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">W</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">ECON</th>
                      <th className="hidden px-2 py-3 text-right text-gray-400 sm:table-cell sm:px-4">WD</th>
                      <th className="hidden px-2 py-3 text-right text-gray-400 sm:table-cell sm:px-4">NB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through bowlers data for the active innings */}
                    {(activeTab === "innings1"
                      ? matchLiveScore.innings[0].bowlers
                      : matchLiveScore.innings[1].bowlers
                    ).map((bowler, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-800/30" : ""}>
                        <td className="px-2 py-3 font-medium text-white sm:px-4">
                          {bowler.name} {bowler.isCaptain && "(C)"}
                        </td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{bowler.overs}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{bowler.maidens}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{bowler.runs}</td>
                        <td className="px-2 py-3 text-right font-medium text-white sm:px-4">{bowler.wickets}</td>
                        <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{bowler.economy}</td>
                        <td className="hidden px-2 py-3 text-right text-gray-400 sm:table-cell sm:px-4">
                          {bowler.wides}
                        </td>
                        <td className="hidden px-2 py-3 text-right text-gray-400 sm:table-cell sm:px-4">
                          {bowler.noBalls}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Wickets Section */}
          {activeSection === "wickets" && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                {activeTab === "innings1"
                  ? `${matchLiveScore.innings[0].batTeamName} Wickets`
                  : `${matchLiveScore.innings[1].batTeamName} Wickets`}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-2 py-3 text-gray-400 sm:px-4">Batsman</th>
                      <th className="px-2 py-3 text-gray-400 sm:px-4">Dismissal</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">Runs</th>
                      <th className="px-2 py-3 text-right text-gray-400 sm:px-4">Over</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through wickets data for the active innings */}
                    {(activeTab === "innings1"
                      ? matchLiveScore.innings[0].wickets
                      : matchLiveScore.innings[1].wickets
                    ).map((wicket, index) => {
                      // Find the batsman details for this wicket
                      const batsman = (
                        activeTab === "innings1" ? matchLiveScore.innings[0].batsmen : matchLiveScore.innings[1].batsmen
                      ).find((b) => b.id === wicket.batsmanId)

                      return (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-800/30" : ""}>
                          <td className="px-2 py-3 font-medium text-white sm:px-4">{wicket.batsmanName}</td>
                          <td className="px-2 py-3 text-gray-400 sm:px-4">{batsman?.outDesc || "Dismissed"}</td>
                          <td className="px-2 py-3 text-right text-white sm:px-4">{wicket.runs}</td>
                          <td className="px-2 py-3 text-right text-gray-400 sm:px-4">{wicket.overNumber}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Player Cards Section - Responsive grid layout */}
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">
            {activeTab === "innings1"
              ? `${matchLiveScore.innings[0].batTeamName} Players`
              : `${matchLiveScore.innings[1].batTeamName} Players`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {/* Map through players for the active innings */}
            {(activeTab === "innings1" ? matchLiveScore.innings[0].batsmen : matchLiveScore.innings[1].batsmen).map(
              (player) => (
                <div
                  key={player.id}
                  className={`relative overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl ${activeTab === "innings1"
                    ? "border border-purple-800/30 bg-gradient-to-br from-purple-900/80 to-purple-950"
                    : "border border-cyan-800/30 bg-gradient-to-br from-cyan-900/80 to-cyan-950"
                    }`}
                >
                  {/* Player header with avatar */}
                  <div className="relative p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`relative h-12 w-12 rounded-full border-2 sm:h-14 sm:w-14 ${activeTab === "innings1" ? "border-purple-500" : "border-cyan-500"
                          }`}
                      >
                        <Image
                          src={`/teams/india.png`}
                          alt={player.name}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="flex flex-wrap items-center gap-1 text-lg font-bold text-white sm:text-xl">
                          {player.name}
                          {/* Player role badges */}
                          <div className="flex flex-wrap gap-1">
                            {player.isKeeper && (
                              <span
                                className={`rounded-full px-1.5 py-0.5 text-xs ${activeTab === "innings1"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-cyan-500/20 text-cyan-300"
                                  }`}
                              >
                                Keeper
                              </span>
                            )}
                            {player.isCaptain && (
                              <span
                                className={`rounded-full px-1.5 py-0.5 text-xs ${activeTab === "innings1"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-cyan-500/20 text-cyan-300"
                                  }`}
                              >
                                Captain
                              </span>
                            )}
                          </div>
                        </h3>
                        <p className={`text-sm ${activeTab === "innings1" ? "text-purple-300" : "text-cyan-300"}`}>
                          {player.outDesc ? player.outDesc : "Not Out"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Player stats */}
                  <div
                    className={`p-4 ${activeTab === "innings1" ? "border-purple-800/30" : "border-cyan-800/30"} border-t ${activeTab === "innings1" ? "bg-purple-950/50" : "bg-cyan-950/50"
                      }`}
                  >
                    {/* Primary stats - runs, balls, strike rate */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div
                        className={`rounded-lg p-2 text-center ${activeTab === "innings1" ? "bg-purple-900/50" : "bg-cyan-900/50"
                          }`}
                      >
                        <p className="text-xl font-bold text-white sm:text-2xl">{player.runs}</p>
                        <p className="text-xs text-gray-400">Runs</p>
                      </div>
                      <div
                        className={`rounded-lg p-2 text-center ${activeTab === "innings1" ? "bg-purple-900/50" : "bg-cyan-900/50"
                          }`}
                      >
                        <p className="text-xl font-bold text-white sm:text-2xl">{player.balls}</p>
                        <p className="text-xs text-gray-400">Balls</p>
                      </div>
                      <div
                        className={`rounded-lg p-2 text-center ${activeTab === "innings1" ? "bg-purple-900/50" : "bg-cyan-900/50"
                          }`}
                      >
                        <p className="text-xl font-bold text-white sm:text-2xl">{player.strikeRate}</p>
                        <p className="text-xs text-gray-400">SR</p>
                      </div>
                    </div>

                    {/* Secondary stats - fours and sixes */}
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                      <div
                        className={`rounded-lg p-2 text-center ${activeTab === "innings1" ? "bg-purple-900/50" : "bg-cyan-900/50"
                          }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-base font-bold text-white sm:text-lg">{player.fours}</span>
                          <span className="text-xs text-gray-400">Fours</span>
                        </div>
                      </div>
                      <div
                        className={`rounded-lg p-2 text-center ${activeTab === "innings1" ? "bg-purple-900/50" : "bg-cyan-900/50"
                          }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-base font-bold text-white sm:text-lg">{player.sixes}</span>
                          <span className="text-xs text-gray-400">Sixes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Player Modal - Using the new component */}
        {selectedPlayerPortfolio &&
          <PlayerModal
            player={selectedPlayer}
            battingPosition={selectedBattingPosition}
          />
        }
      </main>
    </div>
  )
}
