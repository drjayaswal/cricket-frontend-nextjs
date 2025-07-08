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

export interface Match {
  _id: string;
  match_id: string;
  __v: number;
  commentary: string;

  competition: {
    cid: string;
    title: string;
    abbr: string;
    type: string;
    category: string;
    match_format: string;
    season: string;
    status: string;
    datestart: string;
    dateend: string;
    country: string;
    total_matches: string;
    total_rounds: string;
    total_teams: string;
  };

  date_end: string;
  date_end_ist: string;
  date_start: string;
  date_start_ist: string;
  day: string;
  domestic: string;
  equation: string;
  format: string;
  format_str: string;
  game_state: string;
  game_state_str: string;
  latest_inning_number: string;
  live: string;
  match_dls_affected: string;
  match_number: string;

  odds_available: string;

  pitch: {
    pitch_condition: string;
    batting_condition: string;
    pace_bowling_condition: string;
    spine_bowling_condition: string;
  };

  pre_squad: string;
  presquad_time: string;
  referee: string;
  result: string;
  result_type: string;
  session: string;
  short_title: string;
  status: string;
  status_note: string;
  status_str: string;
  subtitle: string;

  teama: {
    team_id: string;
    name: string;
    short_name: string;
    logo_url: string;
    scores_full: string;
    scores: string;
    overs: string;
  };

  teamb: {
    team_id: string;
    name: string;
    short_name: string;
    logo_url: string;
    scores_full: string;
    scores: string;
    overs: string;
  };

  timestamp_end: string;
  timestamp_start: string;

  umpires: string;

  venue: {
    venue_id: string;
    name: string;
    location: string;
    country: string;
    timezone: string;
  };

  verified: string;
  verify_time: string;
  wagon: string;

  weather: {
    weather: string;
    weather_desc: string;
    temp: string;
    humidity: string;
    visibility: string;
    wind_speed: string;
    clouds: string;
  };
}
