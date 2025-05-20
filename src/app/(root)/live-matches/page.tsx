"use client";
import { useMatchStore } from "@/store/match-store";
import { Button } from "@/components/ui/button";
import { useSocketStore } from "@/store/socket-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FeaturedBanner } from "./featured-banner";
import { Match } from "@/store/match-store";
// Removed StockTicker import

export default function LiveMatches() {
  const fetchMatchData = useMatchStore((s) => s.fetchMatches);
  const matchesData = useMatchStore((s) => s.matchData);
  const setSelectedMatch = useMatchStore.getState().setSelectedMatch

  useEffect(() => {
    fetchMatchData();
  }, []);

  const handleAddToPortfolio = (selectedMatch: Match) => {
    setSelectedMatch(selectedMatch)
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  function getDaySuffix(day: number) {
    if (day > 3 && day < 21) return "th"; // 4th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const today = new Date();
  const day = today.getDate();
  const suffix = getDaySuffix(day);
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();
  const formatHour = (timestamp: Number) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      hour12: true,
    });
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-background text-gray-100">
      {/* Featured Indian Matches */}
      {true && (
        <>
          <FeaturedBanner />
        </>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div {...{ className: "mb-8 mx-5 flex items-center justify-between" }}>
          <h1 className="text-4xl font-bold">Live Matches</h1>
          <div className="flex items-center gap-4 text-xl text-white">
            Today's Date : {day}
            {suffix} {month} {year}
          </div>
        </div>

        <div {...{ className: "grid gap-6 md:grid-cols-2 lg:grid-cols-1" }}>
          {matchesData.map((match) => (
            <div key={match.matchId}>
              <Card className="bg-gray-900 border-4 border-accent-light/70 hover:border- text-gray-100 overflow-hidden transition-all duration-300 group">
                {/* Header */}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base font-medium">
                    <span className="text-2xl font-semibold">
                      {match.seriesName}
                    </span>
                    <span className="flex items-center gap-1 text-lg">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      Today
                    </span>
                  </CardTitle>
                </CardHeader>

                <hr className="border-1 border-gray-800" />

                {/* Match Content */}
                <CardContent className="py-6">
                  <div className="relative flex items-center justify-between">
                    {/* Team 1 */}
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-md">
                        <Image
                          src="/teams/india.png"
                          alt={match.team1}
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-lg font-semibold">
                        {match.team1}
                      </span>
                    </div>

                    {/* VS Section */}
                    <div className="text-center pt-10 text-gray-100">
                      <div className="relative flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-gray-300">
                          VS
                        </span>
                        <div className="text-xl text-gray-400 mt-1">
                          <span>
                            {match.startDate
                              ? formatDate(match.startDate)
                              : "N/A"}
                          </span>
                          <br />
                          <span>{match.venue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Team 2 */}
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-md">
                        <Image
                          src="/teams/pakistan.png" // Replace with actual Bulgaria Women logo
                          alt={match.team2}
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-lg font-semibold">
                        {match.team2}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-gray-800 flex justify-center transition-opacity">
                  {Date.now() >= match.startDate! ? (
                    <Button
                      className="hover:bg-accent-dark bg-dark border-2 hover:border-accent-dark border-accent-light text-accent-light p-6 text-xl w-full hover:text-white transition-colors"
                      asChild
                      onClick={() => handleAddToPortfolio(match)}
                    >
                      <Link href={`/betting-interface?id=${match.matchId}`}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add to Portfolio
                      </Link>
                    </Button>
                  ) : (
                    (() => {
                      const timeDiff = match.startDate! - Date.now();
                      const totalSeconds = Math.max(
                        0,
                        Math.floor(timeDiff / 1000)
                      );
                      const hours = Math.floor(totalSeconds / 3600);
                      const minutes = Math.floor((totalSeconds % 3600) / 60);
                      const seconds = totalSeconds % 60;

                      let timeDisplay = "";

                      if (hours > 0) {
                        timeDisplay = `${hours}h ${minutes}m`;
                      } else if (minutes > 0) {
                        timeDisplay = `${minutes}m ${seconds}s`;
                      } else {
                        timeDisplay = `${seconds}s`;
                      }

                      return (
                        <div className="text-center text-xl text-gray-400 py-4">
                          Match starts in{" "}
                          <span className="font-semibold text-white">
                            {timeDisplay}
                          </span>
                        </div>
                      );
                    })()
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
