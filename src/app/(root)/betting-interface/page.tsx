"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BettingInterface from "./betting-interface";

export interface LiveScore {
  runs: string;
  overs: string;
  wickets: string;
  target: string;
  runrate: string;
  required_runrate: string;
}

export interface Batsman {
  id: string;
  name: string;
  runs: string;
  balls_faced: string;
  fours: string;
  sixes: string;
  strike_rate: string;
}

export interface Bowler {
  id: string;
  name: string;
  overs: string;
  runs_conceded: string;
  wickets: string;
  maidens: string;
  econ: string;
}

export interface LastWicket {
  name: string;
  batsman_id: string;
  runs: string;
  balls: string;
  how_out: string;
  score_at_dismissal: string;
  overs_at_dismissal: string;
}

export interface ExtraRuns {
  byes: string;
  legbyes: string;
  wides: string;
  noballs: string;
  penalty: string;
  total: string;
}

export interface PartnershipBatsman {
  name: string;
  batsman_id: string;
  runs: string;
  balls: string;
  _id: string;
}

export interface CurrentPartnership {
  runs: string;
  balls: string;
  overs: string;
  batsmen: PartnershipBatsman[];
}

export interface DidNotBatPlayer {
  player_id: string;
  name: string;
  _id: string;
}

export interface LiveInning {
  last_wicket: LastWicket;
  extra_runs: ExtraRuns;
  current_partnership: CurrentPartnership;
  id: string;
  name: string;
  status: string;
  batting_team_id: string;
  fielding_team_id: string;
  scores: string;
  did_not_bat: DidNotBatPlayer[];
  max_over: string;
  target: string;
  recent_scores: string;
}

export interface Player {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  short_name: string;
  birthdate: string;
  birthplace: string;
  country: string;
  playing_role: string;
  batting_style: string;
  bowling_style: string;
  bowling_type: string;
  _id: string;
}

export interface Team {
  id: string;
  name: string;
  short_name: string;
  thumb_url: string;
  logo_url: string;
  head_coach: string;
  score: string;
  _id: string;
}

export interface MatchData {
  live_score: LiveScore;
  batsmen: Batsman[];
  bowlers: Bowler[];
  live_inning: LiveInning;
  _id: string;
  mid: string;
  __v: number;
  players: Player[];
  status: string;
  status_note: string;
  team_batting: string;
  team_bowling: string;
  teams: Team[];
}

export default function BettingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const searchParams = useSearchParams()
  const matchId = searchParams.get("id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/cricket/live/${matchId}`
        );
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        const matchData: MatchData = data.data;
        console.log(matchData)
        setMatchData(matchData)
        return
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div className="text-white">Loading match...</div>;

  if (!matchId) return <div className="text-white">No match data.</div>;

  return (
    <div>
      {matchData &&
        <BettingInterface {...matchData} />
      }
    </div>
  );
}