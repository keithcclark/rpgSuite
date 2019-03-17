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




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TrackerframeComponent,
    HomeComponent,
    MonstercardComponent,
    TrackerComponent,
    HerocardComponent
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
