import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesSummaryComponent } from './candidates-summary/candidates-summary.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './../Services/app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InboxDashboardComponent } from './inbox-dashboard/inbox-dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ApplicantsInboxComponent } from './dashboardComponents/applicants-inbox/applicants-inbox.component';
import { ReminderComponent } from './dashboardComponents/reminder/reminder.component';
import { MenuComponent } from './dashboardComponents/menu/menu.component';
import { MaterialModule } from '../app/material/material.module';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesSummaryComponent,
    InboxDashboardComponent,
    MainDashboardComponent,
    ApplicantsInboxComponent,
    MenuComponent,
    ReminderComponent,
    CandidatesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    DragDropModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
