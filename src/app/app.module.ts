import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesSummaryComponent } from './candidates-summary/candidates-summary.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './../Services/app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule
    // MatGridListModule,
    // MatButtonModule
  ],
  providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
