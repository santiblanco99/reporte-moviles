import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';
import { ReleasesComponent } from './releases/releases.component';
import { BugsComponent } from './bugs/bugs.component';
import { AddNewBugComponent } from './bugs/add-new-bug/add-new-bug.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'report', component: ReportComponent
  },
  {
    path: 'releases', component: ReleasesComponent
  },
  {
    path: 'bugs', component: BugsComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'bugs/add_new_bug', component: AddNewBugComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
