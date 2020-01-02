import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerframeComponent } from '../app/tracker/trackerframe/trackerframe.component';
import { HomeComponent } from '../app/core/home/home.component';
import { LabComponent } from './lab/lab.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracker', component: TrackerframeComponent },
  { path: 'lab', component: LabComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
