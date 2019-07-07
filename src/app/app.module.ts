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
import { UploadFormComponent } from './upload-form/upload-form.component';
import { FileDropDirective } from './file-drop.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CandidatesSummaryComponent,
    InboxDashboardComponent,
    MainDashboardComponent,
    ApplicantsInboxComponent,
    MenuComponent,
    ReminderComponent,
    CandidatesFormComponent,
    UploadFormComponent,
    FileDropDirective
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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  exports: [],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
