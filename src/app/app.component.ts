import { Component } from '@angular/core';
import { AppService } from './../Services/app-service.service';
import { Subject } from 'rxjs';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidates } from './Models/candidates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private $drawerClosed: Subject<boolean> = new Subject<boolean>();
  private drawerClosed = true;
  title = 'ClientApp';
  private userName = 'User';
  private menuIcon: string;
  private greeting: string;
  private date = new Date();
  private weekday: string = this.date.toLocaleString('en-us', { weekday: 'long'});
  private month: string = this.date.toLocaleString('en-us', { month: 'short'});
  private day: string = this.date.getDate().toString();
  private inboxedCandidatesData: Candidates[] = [];
  private inboxCount = 0;
    constructor(private appService: AppService, private candidatesService: CandidatesService) {
    this.date.getHours() <= 12 ? this.greeting = 'Good Morning' : this.greeting = 'Good Afternoon';
    this.menuIcon = 'menu';


    this.candidatesService.getCandidates().subscribe((item: Candidates[]) => {
      item.forEach((i) => {
        this.inboxedCandidatesData = item.filter((appl) => appl.status && appl.status.toLowerCase() === 'inbox');
        this.inboxCount = this.inboxedCandidatesData.length;
      });
    });

  }

  private changeIcon(event: any) {
      if (this.menuIcon.includes('menu')) {
        this.menuIcon = 'arrow_back_ios';
        this.drawerClosed = false;
      } else {
        this.menuIcon = 'menu';
        this.drawerClosed = true;
      }
  }

}
