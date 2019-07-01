import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesSummaryComponent } from './candidates-summary/candidates-summary.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'dashboard', component: MainDashboardComponent},
{ path: 'dashboard/applicants', component: CandidatesSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
