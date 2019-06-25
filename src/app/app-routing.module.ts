import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesSummaryComponent } from './candidates-summary/candidates-summary.component';

const routes: Routes = [{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'dashboard', component: CandidatesSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
