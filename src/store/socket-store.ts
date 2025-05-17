import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useMatchStore } from "./match-store";
import { MatchScore } from "@/types/match-score";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SocketState {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  scoreData: MatchScore | null;
  setScoreData: (data: any) => void;
  handleGetScore: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  scoreData: null,

  connectSocket: () => {
    const socket = io(BACKEND_URL as string, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket", "polling"],
      withCredentials: true,
      timeout: 20000,
    });

    socket.on("connect", async () => {
      console.log("Connected to WebSocket server");

      // Get the selected match from the store
      const selectedMatch = useMatchStore.getState().selectedMatch;
      if (selectedMatch?.matchId) {
        console.log("Auto-resubscribing to match:", selectedMatch.matchId);
        socket.emit("subscribeMatch", selectedMatch);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      toast.error("Connection error. Retrying...");
    });

    socket.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      toast.error("Connection timeout. Please try again.");
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log("Reconnecting to WebSocket server, attempt:", attempt);
      toast.success(`Reconnecting to server... Attempt: ${attempt}`);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket server:", reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("scoreUpdate", (data) => {
      console.log("Score update received:", data);
      set({ scoreData: data });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  handleGetScore: () => {
    // console.log("Fetching score for selected match...");
    const selectedMatch = useMatchStore.getState().selectedMatch;
    // console.log("selectedMatch :", selectedMatch)
    const socket = useSocketStore.getState().socket;

    // If already subscribed to a match, unsubscribe first
    if (selectedMatch?.matchId && socket) {
      socket.emit("unsubscribeMatch", selectedMatch.matchId);
    }
    const connectSocket = useSocketStore.getState().connectSocket;
    connectSocket();

    // Set new selected match
    // set({ selectedMatch: selectedMatch });

    // Subscribe to new match
    if (socket) {
      socket.emit("subscribeMatch", selectedMatch);
      toast.success(`Selected Match: ${selectedMatch?.team1} vs ${selectedMatch?.team2}`);
    }

    // Navigate to betting interface
    // window.location.href = "/betting-interface";
  },

  setScoreData: (data) => set({ scoreData: data }),
}));
