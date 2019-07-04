import { Component } from '@angular/core';
import { AppService } from './../Services/app-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  private $drawerClosed: Subject<boolean> = new Subject<boolean>();
  private drawerClosed: boolean = false;
  title = 'ClientApp';
  private userName = 'User';
  private menuIcon = '';
  private greeting = '';
  private date = new Date();
  private weekday: string = this.date.toLocaleString('en-us', { weekday: 'long'});
  private month: string = this.date.toLocaleString('en-us', { month: 'short'});
  private day: string = this.date.getDate().toString();

    constructor(private appService: AppService) {
    this.date.getHours() <= 12 ? this.greeting = 'Good Morning' : this.greeting = 'Good Afternoon';
    this.menuIcon = 'menu';
    this.$drawerClosed.subscribe((res) => {
        console.log(res);
        this.drawerClosed = res;
    });
  }

  private changeIcon(event: any) {
    if (!!event) {
      if (this.menuIcon.localeCompare('menu') === -1) {
        this.menuIcon = 'menu';
        this.$drawerClosed.next(true);
      } else {
        this.menuIcon = 'arrow_back_ios';
        this.$drawerClosed.next(false);
      }
    }
  }

}
