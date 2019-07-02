import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AppService } from './../Services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ClientApp';
  private userName = 'User';
  private menuIcon = '';
  private greeting: string = '';
  private drawerClosed: boolean = false;
  private date = new Date();
  private weekday: string = this.date.toLocaleString('en-us', { weekday: 'long'});
  private month: string = this.date.toLocaleString('en-us', { month: 'short'});
  private day: string = this.date.getDate().toString();

  constructor(private appService: AppService) {
    this.menuIcon = 'menu';
    this.date.getHours() <= 12 ? this.greeting = 'Good Morning' : this.greeting = 'Good Afternoon';
    console.log(this.date.getHours().toString());
  }
  ngAfterViewInit(): void {
    this.appService.titleOnNav.subscribe((title) => this.title = title);
  }

  private changeIcon(event: any) {
    if (!!event) {
      if (!this.menuIcon.match('menu') && !this.drawerClosed) {
        this.menuIcon = 'menu';
        this.drawerClosed = !this.drawerClosed;
      } else {
        this.menuIcon = 'arrow_back_ios';
        this.drawerClosed = !this.drawerClosed;
      }
    }
  }
}
