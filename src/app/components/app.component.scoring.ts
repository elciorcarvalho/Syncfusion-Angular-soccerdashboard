import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";

// Services
import { SoccerService } from "../services/SoccerService";
import { WebService } from "../services/WebService";

// Interfaces
import { iSchedule } from "../interfaces/iSchedule";

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [Title, SoccerService, WebService],
  templateUrl: '../views/Scoring.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  styles: [`
  h3 {
    text-align: center;
    color: navy;
    font-size: x-large;
    margin: 0px;
    font-weight: bold;
  }
  select {
    font-size: large;
    margin-left: 25px;
  }`]
})

export class AppScoring {

  private UsingAsync: boolean = false;
  public CurGame: number = 0;
  public MySchedule: iSchedule[] = [];
  public LeagueName: string = '';
  public HomeTeam: string = '';
  public AwayTeam: string = '';
  public HomeScore: number = 0;
  public AwayScore: number = 0;
  public SeasonStart: Date = new Date;
  public CurrentRole: number = 1;

  public IPAddr: string = '';
  private Teams: string = '';
  private ErrMsg: string = 'Something is wrong, baby.';

  public constructor(private _soccerService: SoccerService, private _web: WebService, private _http: HttpClient){
    this.LeagueName = "Over 30 men's league";

    // Service Web
    _web.getIP().subscribe((data: any) => this.IPAddr = data["ip"], (Error: any) => this.ErrMsg = Error.message);
    _web.getTeams().subscribe((data) => this.LoadTeamList(data));

    this.getSchedule();
    this.SeasonStart.setTime(this.SeasonStart.getTime() +4*864000000);

    if(this.MySchedule.length > 0) {
      this.UpdVariables(0);
      this.CurGame = 1;
    }

    //this._titleService.setTitle("422 Soccer");
    this._soccerService.getTeams();
  }


  private getSchedule() {
    if(this.UsingAsync) {
      let xx = this._soccerService.getScheduleAsync();
      xx.then((Schedules: iSchedule[]) => this.MySchedule = Schedules);
    } else {
      this.MySchedule = this._soccerService.getSchedule();
    }
  }

  private UpdVariables(GameID: number) {
    // Need to search Schedule array, looking for game ID
    var x: number = 0;

    if(GameID > 0){
      x = GameID - 1;
    }

    this.HomeTeam = this.MySchedule[x].HomeTeam;
    this.AwayTeam = this.MySchedule[x].AwayTeam;
    this.HomeScore = this.MySchedule[x].HomeScore;
    this.AwayScore = this.MySchedule[x].AwayScore;
  }

  public onSchedChange( changeEvent: any) {
    let GameValue = changeEvent.target.value;
    if(GameValue > 0){
      this.UpdVariables(GameValue);
      this.CurGame = GameValue;
    }
  }

  // Get the score from the form and update it
  public onRecordScores() {
    this.MySchedule[this.CurGame-1].AwayScore = Number(this.AwayScore);
    this.MySchedule[this.CurGame-1].HomeScore = Number(this.HomeScore);
  }

  private LoadTeamList(data: any) {
    this.Teams = data;
    // Other tasks to do
  }
}
