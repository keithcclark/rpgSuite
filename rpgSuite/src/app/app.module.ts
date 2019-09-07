import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';


import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { NavComponent } from './core/nav/nav.component';
import { HerocardComponent } from './hero/herocard/herocard.component';
import { MonstercardComponent } from './monster/monstercard/monstercard.component';
import { MonsterService } from './shared/services/monster.service';
import { TrackerComponent } from './Tracker/tracker/tracker.component';
import { TrackerframeComponent } from './tracker/trackerframe/trackerframe.component';
import { TrackerCardComponent } from './Tracker/tracker/tracker-card/tracker-card.component';
import { TrackerInfoComponent } from './Tracker/tracker/tracker-info/tracker-info.component';
import { CombatantStatusComponent } from './Tracker/tracker/combatant-status/combatant-status.component';
import { AddMonsterComponent } from './monster/add-monster/add-monster.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TrackerframeComponent,
    HomeComponent,
    MonstercardComponent,
    TrackerComponent,
    HerocardComponent,
    TrackerCardComponent,
    TrackerInfoComponent,
    CombatantStatusComponent,
    AddMonsterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [MonsterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
