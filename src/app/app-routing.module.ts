import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingsComponent } from './ratings/ratings.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: 'f/team/:teamId', component: TeamComponent },
    { path: 'x/team/:teamId', component: TeamComponent },
    { path: 'team/:teamId', component: TeamComponent },
    { path: 'about', component: AboutComponent },
    { path: 'f', component: RatingsComponent },
    { path: 'x', component: RatingsComponent },
    { path: '', component: RatingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
