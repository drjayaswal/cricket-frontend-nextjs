"use client";
import { useMemo, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface Match {
  matchDesc: string;
  team1: { teamName: string };
  team2: { teamName: string };
  matchFormat: string;
  startDate: string;
  venueInfo: { ground: string; city: string; country: string };
}

const formatDate = (timestamp: string | number) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRandomTrend = () => {
  const trends = [
    "Trending Now",
    "Fan Favorite",
    "High Stakes Match",
    "Must Watch Game",
    "Clash",
    "Rivalry Reignited",
    "Opening Match",
    "Explosive Encounter",
    "Rematch Alert",
    "Last Over Thriller",
    "Defenders vs Challengers",
    "Rising Stars in Action",
    "Top Ranked Teams",
    "Record Breaker Incoming",
    "Prime Time Game",
    "Unexpected Twist",
  ];
  return trends[Math.floor(Math.random() * trends.length)];
};

export default function MatchCard({ match }: { match: Match }) {
  const trend = useMemo(() => getRandomTrend(), []);

  useEffect(() => {
    console.log(match);
  }, []);

  return (
    <div className="relative bg-gray-900 border-4 border-gray-800 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-bl-none rounded-tr-none mx-auto w-full">
      {/* Teams */}
      <div className="text-2xl font-extrabold text-white mb-2">
        {match.team1.teamName}{" "}
        <span className="text-gray-400 font-semibold text-2xl">vs</span>{" "}
        {match.team2.teamName}
      </div>

      {/* Match Details */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-indigo-800/30 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full text-sm font-semibold">
          {match.matchFormat}
        </span>
        <span className="text-base text-gray-300 font-medium">
          {match.matchDesc}
        </span>
      </div>

      {/* Start Date */}
      <div className="text-base font-semibold text-blue-400 mb-1">
        {formatDate(match.startDate)}
      </div>

      {/* Venue Info */}
      <div className="text-base text-gray-400 leading-snug">
        {match.venueInfo.ground}, {match.venueInfo.city},{" "}
        {match.venueInfo.country}
      </div>
    </div>
  );
}