import { Component, OnChanges, OnInit } from '@angular/core';
import { AppService } from './../Services/app-service.service';
import { Subject, timer, of, merge, Observable, BehaviorSubject } from 'rxjs';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidate } from './Models/candidate';
import { map, catchError, switchMap, takeUntil, repeat, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


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
  private inboxedCandidatesData: Candidate[] = [];
  private $inboxCount: Observable<number>;
  private inboxCount: number;
  private load$ = new BehaviorSubject('');

    constructor(private appService: AppService, private candidatesService: CandidatesService) {
    this.date.getHours() <= 12 ? this.greeting = 'Good Morning' : this.greeting = 'Good Afternoon';
    this.menuIcon = 'menu';
  }

  ngOnInit(): void {
    this.filterByStatus('inbox');
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

  private filterByStatus(status: string) {
    const $count = this.candidatesService.getApplicantCountByStatus(status);
    this.$inboxCount = this.load$.pipe(
      switchMap( _ => timer(0, 3000).pipe(
        concatMap(_ => $count),
        map((response: number) => response)
      ))
    );
  }

  private getInboxCount() {
    this.candidatesService.getCandidates().toPromise().then((item: Candidate[]) => {
      item.forEach((i) => {
        this.inboxCount = item.filter((appl) => appl.status && appl.status.toLowerCase() === 'inbox').length;
      });
    });
  }

}
