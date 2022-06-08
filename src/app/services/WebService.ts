import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SEASON_SCHEDULE, TEAMS } from './Schedule-data';

import { iTeam } from './../interfaces/iTeam';

@Injectable()

export class WebService {
  public constructor(private _http: HttpClient) {}

  private _IPURL: string = "http://ip.jsontest.com";

  public getIP(): any {
    return this._http.get(this._IPURL);
  }

  public CallURL(_URL: string) {
    return this._http.get(_URL);
  }

  public getTeams() {
    let _TeamURL: string = '../../assets/teams.json';
    return this._http.get<iTeam>(_TeamURL);
  }

  getScheduleAsync(): any {
    return Promise.resolve(SEASON_SCHEDULE);
  }

  getSchedule(): any {
    return SEASON_SCHEDULE;
  }

  getTeamsAsync(): any {
    return Promise.resolve(TEAMS);
  }

}
