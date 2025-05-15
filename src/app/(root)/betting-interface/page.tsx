"use client";
import { useState } from "react";
import { PlayerCard } from "@/components/betting/player-card";
import { MatchHeader } from "@/components/betting/match-header";
import { TeamStats } from "@/components/betting/team-stats";
import { Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function MatchPage() {
  const matchId = useSearchParams().get("id");
  // map match id and avoid tresspassers
  const [activeTab, setActiveTab] = useState("bhutan");

  const matchData = {
    team1: {
      name: "Kuwait Women",
      score: "85/3(13 ov, RR: 6.54)",
      price: "N/A",
      winStatus: "won by 35 runs",
      color: "red",
      players: [
        {
          id: 2,
          name: "Amna Tariq",
          image: "/placeholder.svg?key=w2kdv",
          team: "Kuwait Women",
          status: "Batting",
          price: 28.5,
          currentPrice: 28.5,
          stats: { runs: 42, dots: 12, sixes: 1, fours: 5 },
        },
        {
          id: 3,
          name: "Maryam Omar",
          image: "/placeholder.svg?key=cqxqk",
          team: "Kuwait Women",
          status: "Next",
          price: 24.75,
          currentPrice: 24.8,
          stats: { runs: 0, dots: 0, sixes: 0, fours: 0 },
        },
      ],
    },
    team2: {
      name: "Bhutan Women",
      score: "50/6 (13 ov, RR: 3.85)",
      price: 21.89,
      color: "green",
      players: [
        {
          id: 1,
          name: "Tshering Zangmo",
          image: "/placeholder.svg?key=w9ca4",
          team: "Bhutan Women",
          status: "Out",
          price: 32.75,
          currentPrice: 32.8,
          stats: { runs: 3, dots: 9, sixes: 0, fours: 0 },
        },
        {
          id: 4,
          name: "Dechen Wangmo",
          image: "/placeholder.svg?key=ez5g4",
          team: "Bhutan Women",
          status: "Batting",
          price: 18.25,
          currentPrice: 18.3,
          stats: { runs: 15, dots: 7, sixes: 0, fours: 2 },
        },
      ],
    },
    tournament: "Women's T20 International",
  };

  const createPortfolio = (playerId: number) => {
    console.log(`Creating portfolio for player ID: ${playerId}`);
    // Implementation for creating portfolio
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="container mx-auto px-4 py-6">
        {/* Live Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="ml-2 text-sm text-red-600 font-extrabold">LIVE</span>
          </div>
        </div>

        {/* Match Title */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">
            {matchData.team1.name} vs {matchData.team2.name}
          </h1>
          <div className="ml-auto">
            <span className="bg-red-600 py-1 px-3 rounded-full text-sm font-bold text-white">
              {matchData.team1.name} {matchData.team1.winStatus}
            </span>
          </div>
        </div>

        {/* Match Summary */}
        <div className="grid grid-cols-1 gap-2 mb-6 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-2xl text-white">
              {matchData.team2.name} - {matchData.team2.score}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-2xl text-white">
              {matchData.team1.name} - {matchData.team1.score}
            </span>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TeamStats
            teamName={matchData.team2.name}
            teamPrice={matchData.team2.price}
            color="green"
          />
          <TeamStats
            teamName={matchData.team1.name}
            teamPrice="N/A"
            color="red"
          />
        </div>

        {/* Players Section - Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-800 mb-6">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "bhutan"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("bhutan")}
            >
              {matchData.team2.name}
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === "kuwait"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("kuwait")}
                >
                {matchData.team1.name}
            </button>
          </div>

          {activeTab === "bhutan" && (
            <div className="space-y-4">
              {matchData.team2.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCreatePortfolio={() => createPortfolio(player.id)}
                />
              ))}
            </div>
          )}

          {activeTab === "kuwait" && (
            <div className="space-y-4">
              {matchData.team1.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCreatePortfolio={() => createPortfolio(player.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
