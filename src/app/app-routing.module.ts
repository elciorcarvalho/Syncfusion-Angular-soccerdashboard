import { AppAdmin } from './components/app.component.admin';
import { AppScoring } from './components/app.component.scoring';
import { AppStandings } from './components/app.component.standings';
import { PageNotFound } from './components/app.PageNotFound.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Standings', component: AppStandings },
  { path: 'Scoring', component: AppScoring },
  { path: 'Admin', component: AppAdmin },
  { path: '', redirectTo: '/Standings', pathMatch: 'full' },

  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
