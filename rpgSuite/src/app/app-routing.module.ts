import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerframeComponent } from '../app/tracker/trackerframe/trackerframe.component';
import { HomeComponent } from '../app/core/home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracker', component: TrackerframeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
