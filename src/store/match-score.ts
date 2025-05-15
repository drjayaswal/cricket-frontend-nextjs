import { create } from "zustand";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export interface Match {
  matchId: string | null;
  seriesName: string;
  format: string;
  team1: string;
  team2: string;
  startDate: number | null;
  venue: string;
  isMatchComplete: boolean;
}

interface MatchesState {
  isLoading: boolean;
  error: string | null;
  matchData: Match[];
  seriesMatchData: Record<string, Match[]>;
  fetchMatches: () => Promise<void>;
}

export const useMatchesStore = create<MatchesState>((set) => ({
  isLoading: false,
  error: null,
  matchData: [],
  seriesMatchData: {},

  fetchMatches: async () => {
    try {
      set({ isLoading: true, error: null });

      const res = await fetch(`${BACKEND_URL}/matches/all-stored-matches`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch match data");

      const data = await res.json();

      const extractedMatches: Match[] =
        data?.matches?.flatMap((series: any) =>
          series.matchScheduleList?.flatMap((schedule: any) =>
            schedule.matchInfo?.map((match: any) => ({
              matchId: match.matchId || null,
              seriesName: schedule.seriesName || "Series Not Available",
              format: match.matchFormat || "Format Not Available",
              team1: match.team1?.teamName || "Team 1",
              team2: match.team2?.teamName || "Team 2",
              startDate: match.startDate ? Number(match.startDate) : null,
              venue: match.venueInfo?.ground || "Venue Not Available",
              isMatchComplete: match.isMatchComplete,
            })) || []
          ) || []
        ) || [];

      const today = new Date();
      const todayMatches = extractedMatches.filter((match) => {
        if (!match.startDate) return false;
        const matchDate = new Date(match.startDate);
        return (
          matchDate.getDate() === today.getDate() &&
          matchDate.getMonth() === today.getMonth() &&
          matchDate.getFullYear() === today.getFullYear() &&
          (match.format === "T20" || match.seriesName.includes("IPL"))
        );
      });

      const currentTime = Date.now();
      const matchesBySeries = extractedMatches.reduce<Record<string, Match[]>>((acc, match) => {
        if (
          match.startDate &&
          match.startDate >= currentTime &&
          (match.format === "T20" || match.seriesName.includes("IPL"))
        ) {
          if (!acc[match.seriesName]) acc[match.seriesName] = [];
          acc[match.seriesName].push(match);
        }
        return acc;
      }, {});

      set({
        matchData: todayMatches,
        seriesMatchData: matchesBySeries,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch matches:", error);
      set({ error: error.message || "Unknown error", isLoading: false });
    }
  },
}));

