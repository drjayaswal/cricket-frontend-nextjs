import { PlayerPortfolioData, SellPlayerData, SellTeamData, TeamPortfolioData } from "@/types/portfolio";
import { create } from "zustand";

interface PortfolioState {
  selectedPlayerPortfolio: PlayerPortfolioData | null;
  playerPortfolio: PlayerPortfolioData[];
  teamPortfolio: TeamPortfolioData[];
  sellPlayerPortfolio: SellPlayerData[];
  sellTeamPortfolio: SellTeamData[];
}

export const usePortfolioStore = create<PortfolioState>(
  (set, get) => (
    {
      selectedPlayerPortfolio: null,
      playerPortfolio: [],
      teamPortfolio: [],
      sellPlayerPortfolio: [],
      sellTeamPortfolio: [],
      addPlayerPortfolio: (data: PlayerPortfolioData) => {
        const currentPortfolio = get().playerPortfolio;
        set({ playerPortfolio: [...currentPortfolio, data] });
      },
      addTeamPortfolio: (data: TeamPortfolioData) => {
        const currentPortfolio = get().teamPortfolio;
        set({ teamPortfolio: [...currentPortfolio, data] });
      },
      addSellPlayerPortfolio: (data: SellPlayerData) => {
        const currentPortfolio = get().sellPlayerPortfolio;
        set({ sellPlayerPortfolio: [...currentPortfolio, data] });
      },
      addSellTeamPortfolio: (data: SellTeamData) => {
        const currentPortfolio = get().sellTeamPortfolio;
        set({ sellTeamPortfolio: [...currentPortfolio, data] });
      },
      setSelectedPlayerPortfolio: (data: PlayerPortfolioData | null) => set({ selectedPlayerPortfolio: data }),
      setPlayerPortfolio: (data: PlayerPortfolioData[]) => set({ playerPortfolio: data }),
      setTeamPortfolio: (data: TeamPortfolioData[]) => set({ teamPortfolio: data }),
      setSellPlayerPortfolio: (data: SellPlayerData[]) => set({ sellPlayerPortfolio: data }),
      setSellTeamPortfolio: (data: SellTeamData[]) => set({ sellTeamPortfolio: data }),
    }
  )
)
