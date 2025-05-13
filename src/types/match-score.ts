export type Batsman = {
  id: number;
  name: string;
  nickName: string;
  balls: number;
  runs: number;
  fours: number;
  sixes: number;
  dots: number;
  ones: number;
  twos: number;
  threes: number;
  fives: number;
  boundaries: number;
  minutes: number;
  strikeRate: string;
  outDesc: string;
  bowlerId: number;
  fielderId1: number;
  fielderId2: number;
  fielderId3: number;
  wicketCode: string;
  isCaptain: boolean;
  isKeeper: boolean;
  isOverseas: boolean;
  inMatchChange: string;
  playingXIChange: string;
};

export type Bowler = {
  id: number;
  name: string;
  nickName: string;
  overs: string;
  maidens: number;
  wickets: number;
  runs: number;
  economy: string;
  balls: number;
  dots: number;
  noBalls: number;
  wides: number;
  runsPerBall: number;
  isCaptain: boolean;
  isKeeper: boolean;
  isOverseas: boolean;
  inMatchChange: string;
  playingXIChange: string;
};

export type Extras = {
  legByes: number;
  byes: number;
  wides: number;
  noBalls: number;
  penalty: number;
  total: number;
};

export type Wicket = {
  batsmanId: number;
  batsmanName: string;
  wicketNumber: number;
  overNumber: string;
  runs: number;
  ballNumber: number;
};

export type Partnership = {
  bat1Id: number;
  bat1Name: string;
  bat1Runs: number;
  bat1Balls: number;
  bat1Dots: number;
  bat1Ones: number;
  bat1Twos: number;
  bat1Threes: number;
  bat1Fours: number;
  bat1Fives: number;
  bat1Sixes: number;
  bat1Boundaries: number;

  bat2Id: number;
  bat2Name: string;
  bat2Runs: number;
  bat2Balls: number;
  bat2Dots: number;
  bat2Ones: number;
  bat2Twos: number;
  bat2Threes: number;
  bat2Fours: number;
  bat2Fives: number;
  bat2Sixes: number;
  bat2Boundaries: number;

  totalRuns: number;
  totalBalls: number;
};

export type Innings = {
  inningsId: number;
  batTeamName: string;
  batTeamSName: string;
  bowlTeamName: string;
  bowlTeamSName: string;
  score: number;
  wickets: number;
  overs: string;
  runRate: string;
  ballNbr: number;
  rpb: number;
  isDeclared: boolean;
  isFollowOn: boolean;
  revisedOvers: number;

  batsmen: Batsman[];
  bowlers: Bowler[];
  extras: Extras;
  partnerships: Partnership[];

  powerPlayData: Record<string, any>;
};

export type MatchScore = {
  matchId: number;
  status: string;
  isMatchComplete: boolean;
  responseLastUpdated: Date;
  innings: Innings[];
  createdAt?: Date;
  updatedAt?: Date;
};
