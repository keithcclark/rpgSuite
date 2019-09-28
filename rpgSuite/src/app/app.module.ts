import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


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
import { TraitCardComponent } from './monster/trait-card/trait-card.component';
import { ActionCardComponent } from './monster/action-card/action-card.component';
import { ReactionCardComponent } from './monster/reaction-card/reaction-card.component';
import { LegendaryCardComponent } from './monster/legendary-card/legendary-card.component';
import { FractionsPipe } from './shared/pipes/fractions.pipe';
import { ClickOutsideDirective } from './shared/directive/click-outside.directive';




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
    AddMonsterComponent,
    TraitCardComponent,
    ActionCardComponent,
    ReactionCardComponent,
    LegendaryCardComponent,
    FractionsPipe,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxExtendedPdfViewerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [MonsterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
