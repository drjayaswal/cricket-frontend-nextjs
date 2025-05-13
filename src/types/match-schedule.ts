export type VenueInfo = {
  ground: string;
  city: string;
  country: string;
  timezone: string;
};

export type Team = {
  teamId: number;
  teamName: string;
  teamSName: string;
  imageId: number;
};

export type MatchInfo = {
  matchId: number;
  seriesId: number;
  matchDesc: string;
  matchFormat: string;
  startDate: string;
  endDate: string;
  team1: Team;
  team2: Team;
  venueInfo: VenueInfo;
};

export type MatchScheduleListItem = {
  seriesName: string;
  matchInfo: MatchInfo[];
  seriesId: number;
  seriesHomeCountry: number;
  seriesCategory: string;
};

export type MatchSchedule = {
  date: string;
  longDate: string;
  matchScheduleList: MatchScheduleListItem[];
  createdAt?: Date;
  updatedAt?: Date;
};
