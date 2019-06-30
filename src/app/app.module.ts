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

@NgModule({
  declarations: [
    AppComponent,
    CandidatesSummaryComponent,
    InboxDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    DragDropModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
