export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
export type Role = "marketing" | "financial" | "super_admin" | "";

export interface Transaction {
  TID: string;
  OID: string;
  amount: number;
  status: TransactionStatus;
  time: Date;
}

export interface PortfolioTransaction {
  type: "buy" | "sell";
  quantity: number;
  price: number;
  timestamp: Date;
  autoSold: boolean;
  reason?: string;
}

export interface PlayerHolding {
  matchId: string;
  playerId: string;
  playerName: string;
  team: string;
  initialPrice: string;
  transactions: PortfolioTransaction[];
  currentHoldings: number;
}

export interface TeamHolding {
  matchId: string;
  teamId: string;
  teamName: string;
  initialPrice: string;
  transactions: PortfolioTransaction[];
  currentHoldings: number;
}

export interface User {
  name: string;
  mobile: string;
  isVerified: boolean;
  password: string;

  isAdmin: boolean;
  role: Role;

  googleId?: string;
  email?: string;

  lastSeen: Date;

  profileImage?: string;
  amount: string;
  referralCode?: string;
  referredBy?: string;

  transactions: Transaction[];
  portfolio: PlayerHolding[];
  teamPortfolio: TeamHolding[];
}
