"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "@/components/betting/player-card";
import { MatchHeader } from "@/components/betting/match-header";
import { TeamStats } from "@/components/betting/team-stats";
import { Clock, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSocketStore } from "@/store/socket-store";
import { Match, useMatchStore } from "@/store/match-store";

export default function MatchPage() {
  const matchId = useSearchParams().get("id");
  // map match id and avoid tresspassers
  const [activeTab, setActiveTab] = useState("bhutan");
  // const [matchScore, setMatchData] = useState()

  // const handleGetScore = useSelectedMatchStore.getState().handleGetScore
  // const smatchData = useSocketStore.getState().scoreData
  // console.log("smatchData :", smatchData)
  //
  useEffect(() => {
    // handleGetScore()
    useSocketStore.getState().connectSocket()
    return () => {
      useSocketStore.getState().disconnectSocket();
    }
  }, [])

  const matchLiveScore = useSocketStore((state) => state.scoreData)
  const selectedMatch = useMatchStore.getState().selectedMatch
  console.log("match score data from sockets:", matchLiveScore)

  const createPortfolio = (playerId: number) => {
    console.log(`Creating portfolio for player ID: ${playerId}`);
    // Implementation for creating portfolio
  };

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

  if (!selectedMatch) {
    return (
      <div className="space-y-3 mt-20 flex flex-col items-center justify-center">
        <span className="text-3xl font-medium text-gray-800">
          No Match Selected
        </span>
        <div>
          <Link href="/live-matches">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
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
              {selectedMatch?.team1} vs {selectedMatch?.team2}
            </h1>
            <div className="ml-auto">
              <span className="bg-red-600 py-1 px-3 rounded-full text-sm font-bold text-white">
                {matchLiveScore.status}
              </span>
            </div>
          </div>

          {/* Match Summary */}
          <div className="grid grid-cols-1 gap-2 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-medium text-2xl text-white">
                {matchLiveScore.innings[0].batTeamName} - {matchLiveScore.innings[0].score}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-2xl text-white">
                {matchLiveScore.innings[1].batTeamName} - {matchLiveScore.innings[0].score}
              </span>
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TeamStats
              teamName={matchLiveScore.innings[0].batTeamName}
              teamPrice={matchLiveScore.innings[0].runRate}
              color="green"
            />
            <TeamStats
              teamName={matchLiveScore.innings[1].batTeamName}
              teamPrice="N/A"
              color="red"
            />
          </div>

          {/* Statistics */}
          {/* <div className="min-h-screen bg-gray-900 text-white p-4"> */}
          {/*   <h1 className="text-4xl font-bold mb-6 text-center">Scoreboard</h1> */}
          {/*   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> */}
          {/*     <div className="grid grid-cols-1 gap-4"> */}
          {/*       {fow1 != undefined ? Array(fow1).map((player, index) => ( */}
          {/*         <div */}
          {/*           key={index} */}
          {/*           className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-700 transition duration-300" */}
          {/*         > */}
          {/*           <h2 className="text-2xl font-semibold">{player.batName}</h2> */}
          {/*           <p className="text-lg">Wicket Number: {player.wktNbr}</p> */}
          {/*           <p className="text-lg">Over: {player.wktOver}</p> */}
          {/*           <p className="text-lg">Runs: {player.wktRuns}</p> */}
          {/*           <p className="text-lg">Ball Number: {player.ballNbr}</p> */}
          {/*         </div> */}
          {/*       )) : <> */}
          {/*         no data</>} */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}


          {/* Players Section - Tabs */}
          <div className="mb-8">
            <div className="flex border-b border-gray-800 mb-6">
              <button
                className={`py-2 px-4 font-medium ${activeTab === "bhutan"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("bhutan")}
              >
                {matchLiveScore.innings[1].batTeamName}
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === "kuwait"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("kuwait")}
              >
                {matchLiveScore.innings[0].batTeamName}
              </button>
            </div>

            {/* {activeTab === "bhutan" && ( */}
            {/*   <div className="space-y-4"> */}
            {/*     {matchScore.team2.players.map((player) => ( */}
            {/*       <PlayerCard */}
            {/*         key={player.id} */}
            {/*         player={player || {}} */}
            {/*         onCreatePortfolio={() => createPortfolio(player.id)} */}
            {/*       /> */}
            {/*     ))} */}
            {/*   </div> */}
            {/* )} */}

            {/* {activeTab === "kuwait" && ( */}
            {/*   <div className="space-y-4"> */}
            {/*     {matchScore.team1.players.map((player) => ( */}
            {/*       <PlayerCard */}
            {/*         key={player.id} */}
            {/*         player={player || {}} */}
            {/*         onCreatePortfolio={() => createPortfolio(player.id)} */}
            {/*       /> */}
            {/*     ))} */}
            {/*   </div> */}
            {/* )} */}
          </div>
        </main>
      </div>
    </>
  );
}
