import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";

// Services
// import { SoccerService } from "../services/SoccerService";
import { WebService } from "../services/WebService";

//interfaces
import { iRaking } from "../interfaces/iRanking";
import { iSchedule } from '../interfaces/iSchedule';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: '../views/Standings.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  providers: [Title, WebService],
  styles: [`
    h3 {
      text-align: center;
      color: navy;
      font-size: x-large;
      margin: 0px;
    }
    table {
      width: 92%;
      margin: 1em auto;
      font-size: large;
      font-family: "Comic Sans", cursive, sans-serif;
    }
    th {
      text-decoration: underline;
    }
  `]
})

export class AppStandings {

  // public properties (default is public)
  public LeagueName: string = '';
  public UsingAsync: boolean = false;
  public MySchedule: iSchedule[] = [];
  public Standings: iRaking[] = [];

  public IPAddr: string = '';
  private Teams: string = '';
  private ErrMsg: string = 'Something is wrong, baby.';

  public constructor(/*private _soccerService: SoccerService,*/ private _web: WebService, private _http: HttpClient) {
    this.LeagueName = "Over 30 men's league";

    // Service Web
    _web.getIP().subscribe((data: any) => this.IPAddr = data["ip"], (Error: any) => this.ErrMsg = Error.message);
    _web.getTeams().subscribe((data) => this.LoadTeamList(data));

    this.getSchedule();
    this.ComputeRanking();
  }

  private getSchedule() {
    if(this.UsingAsync) {
      let xx = this._web.getScheduleAsync();
      xx.then((Schedules: iSchedule[]) => this.MySchedule = Schedules);
    } else {
      this.MySchedule = this._web.getSchedule();
    }
  }

  public ComputeRanking() {
    var curDate: Date = new Date();
    var TeamAt: number;
    this.Standings = [];  // Empty the array

    this.MySchedule.forEach(element => {

      // If game has already been played
      if(element.PlayingDate < curDate && element.HomeScore >= 0) {
        TeamAt = this.FindTeam(element.HomeTeam);

        if(TeamAt < 0 ) {
          this.Standings.push({
            TeamName: element.HomeTeam,
            GamesPlayed: 0,
            Wins: 0,
            Ties: 0,
            GoalsFor: 0,
            GoalsAgainst: 0 });
          TeamAt = this.Standings.length-1;
        }

        this.UpdCurrentRow(element, TeamAt, 'H');
        TeamAt = this.FindTeam(element.AwayTeam);

        if(TeamAt < 0){
          this,this.Standings.push(
            {TeamName: element.AwayTeam,
            GamesPlayed: 0,
            Wins: 0,
            Ties: 0,
            GoalsFor: 0,
            GoalsAgainst: 0} )
          TeamAt = this.Standings.length-1;
        }

        this.UpdCurrentRow(element, TeamAt, 'A');
      }
    })

    // Sort standings
    this.Standings.sort((left, right): number => {
      if(left.Wins*3+left.Ties < right.Wins*3+right.Ties) return 1;
      if(left.Wins*3+left.Ties > right.Wins*3+right.Ties) return -1;

      // Else, then are tied, typically we'd add addition logic to break-Ties

      if(left.GoalsFor < right.GoalsFor) return 1;
      if(left.GoalsFor > right.GoalsFor) return -1;

      // Finally, return zero if still tied.
      return 0;
    })
  }

  private UpdCurrentRow(element: iSchedule, TeamAt: number, HomeAway: string) {
    this.Standings[TeamAt].GamesPlayed++;

    if(HomeAway == 'H') {
      this.Standings[TeamAt].GoalsFor += element.HomeScore;
      this.Standings[TeamAt].GoalsAgainst += element.AwayScore;

      // Win
      if(element.HomeScore > element.AwayScore) this.Standings[TeamAt].Wins++;
    }

    if(HomeAway = 'A') {
      this.Standings[TeamAt].GoalsFor += element.AwayScore;
      this.Standings[TeamAt].GoalsAgainst += element.HomeScore;

      if(element.AwayScore > element.HomeScore) this.Standings[TeamAt].Wins++;
    }

    if(element.HomeScore == element.AwayScore) this.Standings[TeamAt].Ties++;
  }

  private FindTeam(TeamName: string): number {
    var FoundAt: number = -1;

    for(var _x = 0; _x < this.Standings.length; _x++) {
      if(this.Standings[_x].TeamName == TeamName) {
        return _x
      }
    }

    return FoundAt;
  }

  private LoadTeamList(data: any) {
    this.Teams = data;
    // Other tasks to do
  }
}
