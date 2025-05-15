import { create } from "zustand";
import { io, Socket } from "socket.io-client";
// import { toast } from "sonner"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SocketStore {
  socket: Socket | null;
  scoreData: any;
  selectedMatch: any;
  setScoreData: (data: any) => void;
  setSelectedMatch: (data: any) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  scoreData: null,
  selectedMatch: null,

  setScoreData: (data) => set({ scoreData: data }),
  setSelectedMatch: (data) => set({ selectedMatch: data }),

  connectSocket: () => {
    const socket = io(BACKEND_URL, {
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

      try {
        const res = await fetch(`${BACKEND_URL}/match-scores/connected-users`);
        const data = await res.json();
        console.log("Connected users:", data.count);
      } catch (err) {
        console.error("Error fetching connected users:", err);
      }

      const savedMatch = localStorage.getItem("SelectedMatch");
      if (savedMatch) {
        try {
          const matchData = JSON.parse(savedMatch);
          if (matchData?.matchId) {
            console.log("Auto-resubscribing to match:", matchData.matchId);
            socket.emit("subscribeMatch", matchData);
            set({ selectedMatch: matchData });

            const savedScoreData = localStorage.getItem("MatchData");
            if (savedScoreData) {
              set({ scoreData: JSON.parse(savedScoreData) });
            }
          }
        } catch (e) {
          console.error("Error parsing saved match data:", e);
        }
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      // Optional: Use your custom toast implementation
      // toast.error("Connection error. Retrying...");
    });

    socket.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      // toast.error("Connection timeout. Please try again.");
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log("Reconnecting to WebSocket server, attempt:", attempt);
      // toast.success(`Reconnecting to server... Attempt: ${attempt}`);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket server:", reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("scoreUpdate", (data) => {
      set({ scoreData: data });
      localStorage.setItem("MatchData", JSON.stringify(data));
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
}));
