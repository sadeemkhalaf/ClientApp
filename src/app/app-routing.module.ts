import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesSummaryComponent } from './candidates-summary/candidates-summary.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

const routes: Routes = [{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'dashboard', component: MainDashboardComponent},
{ path: 'dashboard/applicants', component: CandidatesSummaryComponent},
{ path: 'dashboard/apply', component: CandidatesFormComponent},
{ path: 'dashboard/details/:id', component: CandidateDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
