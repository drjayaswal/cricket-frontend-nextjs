import { useEffect, useState } from "react";
import {
  Trophy,
  Globe2,
  Flag,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MatchCard from "./match-card";
interface Match {
  matchDesc: string;
  matchFormat: string;
  team1: { teamName: string };
  team2: { teamName: string };
  startDate: string;
  venueInfo: {
    ground: string;
    city: string;
    country: string;
  };
}
interface MatchesSectionProps {
  matches: {
    date: string;
    matchScheduleList: {
      seriesCategory: string;
      seriesName: string;
      matchInfo: Match[];
    }[];
  }[];
  isLoading: boolean;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({
  matches,
  isLoading,
}) => {
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  const [expandedSeries, setExpandedSeries] = useState<Record<string, boolean>>(
    {}
  );
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  useEffect(() => {
    console.log(matches);
  }, [matches]);
  const toggleSeries = (key: string) => {
    setExpandedSeries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative z-10 py-10 px-4 md:px-8 bg-gray-950">
      <div className="max-w-[1500px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
          Upcoming Matches This Week
        </h2>

        {isLoading ? (
          <p className="text-gray-400">Loading matches...</p>
        ) : (
          matches
            .filter((matchDay) => matchDay.date !== today)
            .map((matchDay, index) => (
              <div key={index} className="mb-8">
                {matchDay.matchScheduleList.map((series, seriesIdx) => {
                  const filteredMatches = series.matchInfo.filter(
                    (match) => match.matchFormat.toLowerCase() === "t20"
                  );

                  if (filteredMatches.length === 0) return null;

                  const key = `${matchDay.date}-${series.seriesName}`;
                  const isExpanded = expandedSeries[key] || false;
                  const firstMatch = filteredMatches[0];
                  const remainingMatches = filteredMatches.slice(1);

                  return (
                    <div key={seriesIdx} className="mb-6 pb-4">
                      {/* Series Header */}
                      <div className="mb-2 flex justify-between items-center flex-wrap">
                        <div className="flex items-center gap-2">
                          {/* Icons based on keywords */}
                          {series.seriesName.toLowerCase().includes("cup") && (
                            <Trophy className="text-yellow-400 w-6 h-6" />
                          )}
                          {series.seriesName.toLowerCase().includes("tour") && (
                            <Globe2 className="text-blue-400 w-6 h-6" />
                          )}
                          {series.seriesName
                            .toLowerCase()
                            .includes("league") && (
                            <ShieldCheck className="text-green-400 w-6 h-6" />
                          )}
                          {series.seriesName
                            .toLowerCase()
                            .includes("trophy") && (
                            <Flag className="text-red-400 w-6 h-6" />
                          )}
                          {series.seriesName
                            .toLowerCase()
                            .includes("stars") && (
                            <Sparkles className="text-pink-400 w-6 h-6" />
                          )}

                          <span className="text-white font-bold ml-1 text-2xl md:text-3xl">
                            {series.seriesName}
                          </span>
                        </div>
                        {(() => {
                          const categoryColors: Record<string, string> = {
                            International: "bg-blue-800/30 text-blue-400",
                            League: "bg-green-800/30 text-green-400",
                            "World Cup": "bg-yellow-900/30 text-yellow-600",
                            Men: "bg-orange-800/30 text-orange-400",
                            Women: "bg-pink-800/30 text-pink-400",
                            Others: "bg-gray-700/30 text-gray-300",
                          };
                          const category = series.seriesCategory;

                          const lowerName = series.seriesName.toLowerCase();

                          const rawCategories: string[] = [];

                          // Keyword-based tagging
                          if (lowerName.includes("world cup"))
                            rawCategories.push("World Cup");
                          if (lowerName.includes("league"))
                            rawCategories.push("League");

                          // Series category-based tagging
                          if (series.seriesCategory === "International")
                            rawCategories.push("International");
                          if (series.seriesCategory === "League")
                            rawCategories.push("League");
                          if (series.seriesCategory === "Women")
                            rawCategories.push("Women");
                          if (series.seriesCategory === "Men")
                            rawCategories.push("Men");

                          // Default fallback if no tag was detected
                          if (rawCategories.length === 0)
                            rawCategories.push("Others");

                          // Final unique categories
                          const categoriesToRender = Array.from(
                            new Set(rawCategories)
                          );
                          return (
                            <div className="flex gap-1 flex-wrap">
                              {categoriesToRender.map((cat) => {
                                const badgeClass =
                                  categoryColors[cat] ||
                                  "bg-gray-700/30 text-gray-300";
                                return (
                                  <span
                                    key={cat}
                                    className={`text-sm font-semibold px-3 py-2 rounded-3xl ${badgeClass} mb-2`}
                                  >
                                    {cat}
                                  </span>
                                );
                              })}
                            </div>
                          );
                        })()}{" "}
                      </div>
                      {/* First Match */}
                      <MatchCard match={firstMatch} />
                      {/* Expandable Section */}
                      <AnimatePresence>
                        {isExpanded && remainingMatches.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mt-4 space-y-4">
                              {remainingMatches.map((match, idx) => (
                                <MatchCard key={idx} match={match} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {filteredMatches.length > 1 && (
                        <button
                          onClick={() => toggleSeries(key)}
                          className="inline-flex items-center px-4 py-1.5 rounded-br-2xl rounded-bl-2xl bg-gray-800 hover:bg-gray-950 border-4 border-gray-800 text-sm font-medium active:scale-95 transition-all duration-200 border-t-0"
                        >
                          {isExpanded ? "Show Less" : `Show More`}
                        </button>
                      )}{" "}
                    </div>
                  );
                })}
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default MatchesSection;
