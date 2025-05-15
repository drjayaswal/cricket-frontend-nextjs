import { create } from "zustand";
import { Match } from "./match-store";
import { useSocketStore } from "./socket-store";
import { toast } from "sonner";

interface SelectedMatchState {
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;
  handleGetScore: (match: Match) => void;
}

export const useSelectedMatchStore = create<SelectedMatchState>((set, get) => ({
  selectedMatch: null,

  setSelectedMatch: (match) => {
    set({ selectedMatch: match });
  },

  handleGetScore: (match) => {
    const { selectedMatch } = get();
    const socket = useSocketStore.getState().socket;

    // If already subscribed to a match, unsubscribe first
    if (selectedMatch?.matchId && socket) {
      socket.emit("unsubscribeMatch", selectedMatch.matchId);
    }

    // Set new selected match
    set({ selectedMatch: match });

    // Subscribe to new match
    if (socket) {
      socket.emit("subscribeMatch", match);
      toast.success(`Selected Match: ${match.team1} vs ${match.team2}`);
    }

    // Navigate to betting interface
    window.location.href = "/betting-interface";
  },
})); 
