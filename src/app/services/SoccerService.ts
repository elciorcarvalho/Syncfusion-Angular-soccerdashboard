import { SEASON_SCHEDULE, TEAMS } from './Schedule-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SoccerService {
  getScheduleAsync(): any {
    return Promise.resolve(SEASON_SCHEDULE);
  }

  getSchedule(): any {
    return SEASON_SCHEDULE;
  }

  getTeamsAsync(): any {
    return Promise.resolve(TEAMS);
  }

  getTeams(): any {
    return TEAMS;
  }
}
