import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AppService } from './../Services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ClientApp';
  constructor(private appService: AppService) {}
  ngAfterViewInit(): void {
    this.appService.titleOnNav.subscribe((title) => this.title = title);
  }

}
