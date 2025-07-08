"use client";

import { useMatchStore } from "@/store/match-store";
import { useEffect, useState } from "react";
import { FeaturedBanner } from "./featured-banner";
import { useRouter } from "next/navigation";
import { Match } from "@/types/match-schedule";

export default function LiveMatches() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cricket/live`);
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        setMatches(data.data);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    setDate(`${day}${suffix} ${month} ${year}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <FeaturedBanner />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0 text-white tracking-tight">
            Live Matches
          </h1>
          <div className="text-lg font-bold text-gray-400">{date}</div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {matches.map((match, index) => (
            <div
              key={index}
              className="flex flex-col rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/90 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {match.competition.abbr}
                </h3>
                <p className="text-sm text-gray-400">
                  {match.competition.title} — {match.subtitle}
                </p>
                <p className="text-xs text-gray-500">
                  {match.format_str} | Day {match.day} | Session{" "}
                  {match.session}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-white text-xs rounded-full font-semibold uppercase">
                  {match.status_note}
                </span>
              </div>

              {/* Teams */}
              <div className="flex justify-between items-center px-6 py-6">
                {/* Team A */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-16 h-16 rounded-full bg-white p-1 overflow-hidden ring-2 ring-gray-300">
                    <img
                      src={match.teama.logo_url}
                      alt={match.teama.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-white">
                    {match.teama.name}
                  </span>
                  <span className="text-xs text-sky-600 font-bold">
                    {match.teama.scores_full}
                  </span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center text-center w-1/3">
                  <span className="inline-block text-base font-bold text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full mb-2">
                    VS
                  </span>
                  <p className="text-xs text-gray-400 mb-1">
                    {match.venue.name}, {match.venue.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    Starts: {match.date_start_ist}
                  </p>
                </div>

                {/* Team B */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-16 h-16 rounded-full bg-white p-1 overflow-hidden ring-2 ring-gray-300">
                    <img
                      src={match.teamb.logo_url}
                      alt={match.teamb.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-white">
                    {match.teamb.name}
                  </span>
                  <span className="text-xs text-sky-600 font-bold">
                    {match.teamb.scores_full}
                  </span>
                </div>
              </div>

              {/* Pitch & Weather */}
              <div className="px-6 pb-5 text-[13px] text-gray-300 space-y-2">
                <p>
                  <span className="font-semibold text-gray-400">Pitch:</span>{" "}
                  {match.pitch.pitch_condition} | Batting:{" "}
                  {match.pitch.batting_condition} | Pace:{" "}
                  {match.pitch.pace_bowling_condition} | Spin:{" "}
                  {match.pitch.spine_bowling_condition}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">
                    Weather:
                  </span>{" "}
                  {match.weather.weather_desc}, {match.weather.temp}°C, Humidity:{" "}
                  {match.weather.humidity}%, Wind: {match.weather.wind_speed} km/h
                </p>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 mt-auto">
                <button
                  onClick={() =>
                    router.push(`/betting-interface?id=${match.match_id}`)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600/50 hover:bg-sky-600 text-white font-semibold py-2.5 transition-colors cursor-pointer"
                >
                  Create Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}