export interface PlayerPortfolioData {
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  initialPrice: string;
  price: string;
  quantity: number;
}

export interface TeamPortfolioData {
  matchId: string;
  teamId: string;
  teamName: string;
  initialPrice: string;
  price: string;
  quantity: number;
}

interface BaseSellType {
  matchId: string;
  price: string;
  quantity: number;
  autoSold?: boolean;
  reason?: string;
}

export interface SellPlayerData extends BaseSellType {
  playerId: string;
  playerName: string;
}

export interface SellTeamData extends BaseSellType {
  teamId: string;
  teamName: string;
}

