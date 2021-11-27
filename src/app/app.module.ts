import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RatingsComponent } from './ratings/ratings.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';

import { ReliableRatingsPipe } from './reliable-ratings.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RatingsComponent,
    TeamComponent,
      AboutComponent,
      ReliableRatingsPipe
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      Ng2GoogleChartsModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
