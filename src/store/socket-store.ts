import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useSelectedMatchStore } from "./selected-match-store";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SocketState {
  socket: Socket | null;
  scoreData: any;
  connectedUsers: number;
  connectSocket: () => void;
  disconnectSocket: () => void;
  setScoreData: (data: any) => void;
  setConnectedUsers: (count: number) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  scoreData: null,
  connectedUsers: 0,

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
      const selectedMatch = useSelectedMatchStore.getState().selectedMatch;
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

  setScoreData: (data) => set({ scoreData: data }),
  setConnectedUsers: (count) => set({ connectedUsers: count }),
})); 
