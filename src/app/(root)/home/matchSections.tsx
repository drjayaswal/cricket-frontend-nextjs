"use client";
import { Sparkles } from "lucide-react";
import { MatchesSectionProps } from "@/types/match-schedule";
import { formatDate } from "@/lib/helper";
import { trends } from "@/lib/constants";

const MatchesSection: React.FC<MatchesSectionProps> = ({
  matches,
  isLoading,
}) => {
  return (
    <section className="relative z-10 py-16 px-4 md:px-8">
      <div className="max-w-[1000px] mx-auto relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white text-center">
          Upcoming Competitions Timeline
        </h2>

        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full border-l-4 border-purple-950"></div>

        {isLoading ? (
          <p className="text-gray-400 text-center">Loading Competitions...</p>
        ) : (
          matches
            .slice()
            .reverse()
            .map((match, index) => (
              <div
                key={index}
                className={`relative mb-8 flex flex-col md:flex-row ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-purple-500 shadow-lg z-20"></div>

                {/* Card */}
                <div
                  className={`relative bg-gray-900  rounded-4xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-[45%] ${index % 2 === 0 ? "md:ml-7" : "md:mr-7"
                    }`}
                >
                  {/* Trend */}
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                    <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider">
                      {trends[Math.floor(Math.random() * trends.length)]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                    {match.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                      {match.match_format.toUpperCase()}
                    </span>
                    <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                      {match.category}
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase">
                      Season {match.season}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-4">
                    <span>{formatDate(match.datestart)}</span>
                    <span>→</span>
                    <span>{formatDate(match.dateend)}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 text-[13px] text-gray-300 mb-4">
                    <span className="bg-gray-700/40 px-3 py-1 rounded-full">
                      {match.total_matches} Matches
                    </span>
                    <span className="bg-gray-700/40 px-3 py-1 rounded-full">
                      {match.total_teams} Teams
                    </span>
                  </div>

                  <span className="text-yellow-400 font-extrabold uppercase tracking-wider text-[12px]">
                    {match.status}
                  </span>
                </div>
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default MatchesSection;