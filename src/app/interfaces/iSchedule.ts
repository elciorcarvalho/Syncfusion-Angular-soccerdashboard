export interface iSchedule {
  id: number,
  PlayingDate: Date,
  HomeTeam: string,
  AwayTeam: string,
  HomeScore: number,
  AwayScore: number,
  RefName: string,
  notes?: string
}
