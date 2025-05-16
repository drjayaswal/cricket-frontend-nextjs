"use client";
import { useEffect, useState } from "react";
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
  const [matchData,setMatchData] = useState()

  const fetchScores = async () => {
    if (!matchId) {
      console.error("Match ID is missing.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/matches/get-score/${matchId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching scores: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setMatchData(data)
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchScores()
  }, [])
  // const matchData = {
  //   team1: {
  //     name: "Kuwait Women",
  //     score: "85/3(13 ov, RR: 6.54)",
  //     price: "N/A",
  //     winStatus: "won by 35 runs",
  //     color: "red",
  //     players: [
  //       {
  //         id: 2,
  //         name: "Amna Tariq",
  //         team: "Kuwait Women",
  //         status: "Batting",
  //         price: 28.5,
  //         currentPrice: 28.5,
  //         stats: { runs: 42, dots: 12, sixes: 1, fours: 5 },
  //       },
  //       {
  //         id: 3,
  //         name: "Maryam Omar",
  //         team: "Kuwait Women",
  //         status: "Next",
  //         price: 24.75,
  //         currentPrice: 24.8,
  //         stats: { runs: 0, dots: 0, sixes: 0, fours: 0 },
  //       },
  //     ],
  //   },
  //   team2: {
  //     name: "Bhutan Women",
  //     score: "50/6 (13 ov, RR: 3.85)",
  //     price: 21.89,
  //     color: "green",
  //     players: [
  //       {
  //         id: 1,
  //         name: "Tshering Zangmo",
  //         team: "Bhutan Women",
  //         status: "Out",
  //         price: 32.75,
  //         currentPrice: 32.8,
  //         stats: { runs: 3, dots: 9, sixes: 0, fours: 0 },
  //       },
  //       {
  //         id: 4,
  //         name: "Dechen Wangmo",
  //         team: "Bhutan Women",
  //         status: "Batting",
  //         price: 18.25,
  //         currentPrice: 18.3,
  //         stats: { runs: 15, dots: 7, sixes: 0, fours: 2 },
  //       },
  //     ],
  //   },
  //   tournament: "Women's T20 International",
  // };

  const createPortfolio = (playerId: number) => {
    console.log(`Creating portfolio for player ID: ${playerId}`);
    // Implementation for creating portfolio
  };

  return (
    <></>
//     <div className="min-h-screen bg-gray-950">
//       <main className="container mx-auto px-4 py-6">
//         {/* Live Badge */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex items-center">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//             </span>
//             <span className="ml-2 text-sm text-red-600 font-extrabold">LIVE</span>
//           </div>
//         </div>

//         {/* Match Title */}
//         <div className="mb-6">
//           <h1 className="text-5xl font-bold text-white mb-2">
//             {matchData.matchHeader.team1.name} vs {matchData.matchHeader.team2.name}
//           </h1>
//           <div className="ml-auto">
//             <span className="bg-red-600 py-1 px-3 rounded-full text-sm font-bold text-white">
//                  {matchData.status}
//             </span>
//           </div>
//         </div>

//         {/* Match Summary */}
//         <div className="grid grid-cols-1 gap-2 mb-6 text-gray-400">
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-2xl text-white">
//               {matchData.matchHeader.team1.name} - {matchData.team2.score}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-2xl text-white">
//               {matchData.team1.name} - {matchData.team1.score}
//             </span>
//           </div>
//         </div>

//         {/* Team Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <TeamStats
//             teamName={matchData.team2.name}
//             teamPrice={matchData.team2.price}
//             color="green"
//           />
//           <TeamStats
//             teamName={matchData.team1.name}
//             teamPrice="N/A"
//             color="red"
//           />
//         </div>

// {/* Statistics */}
// <div className="min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-4xl font-bold mb-6 text-center">Scoreboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//     <div className="grid grid-cols-1 gap-4">
//     {fow1 != undefined ?  Array(fow1).map((player, index) => (
//       <div
//         key={index}
//         className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-700 transition duration-300"
//       >
//         <h2 className="text-2xl font-semibold">{player.batName}</h2>
//         <p className="text-lg">Wicket Number: {player.wktNbr}</p>
//         <p className="text-lg">Over: {player.wktOver}</p>
//         <p className="text-lg">Runs: {player.wktRuns}</p>
//         <p className="text-lg">Ball Number: {player.ballNbr}</p>
//       </div>
//     )) : <>
//     no data</>}
//   </div>
//       </div>
//     </div>


//         {/* Players Section - Tabs */}
//         <div className="mb-8">
//           <div className="flex border-b border-gray-800 mb-6">
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === "bhutan"
//                   ? "text-green-500 border-b-2 border-green-500"
//                   : "text-gray-400 hover:text-white"
//                 }`}
//               onClick={() => setActiveTab("bhutan")}
//             >
//               {matchData.team2.name}
//             </button>
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === "kuwait"
//                   ? "text-red-500 border-b-2 border-red-500"
//                   : "text-gray-400 hover:text-white"
//                 }`}
//               onClick={() => setActiveTab("kuwait")}
//             >
//               {matchData.team1.name}
//             </button>
//           </div>

//           {activeTab === "bhutan" && (
//             <div className="space-y-4">
//               {matchData.team2.players.map((player) => (
//                 <PlayerCard
//                   key={player.id}
//                   player={player || {}}
//                   onCreatePortfolio={() => createPortfolio(player.id)}
//                 />
//               ))}
//             </div>
//           )}

//           {activeTab === "kuwait" && (
//             <div className="space-y-4">
//               {matchData.team1.players.map((player) => (
//                 <PlayerCard
//                   key={player.id}
//                   player={player || {}}
//                   onCreatePortfolio={() => createPortfolio(player.id)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
  );
}
