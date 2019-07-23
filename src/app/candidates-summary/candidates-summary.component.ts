import { Component, OnInit } from '@angular/core';
import { AppService } from './../../Services/app-service.service';
import { CandidatesService } from '../../Services/candidates.service';
import { Candidates } from '../Models/candidates';
import { Subject, Observable, BehaviorSubject, timer } from 'rxjs';
import { GridDataResult, RowArgs, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { switchMap, concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-summary',
  templateUrl: './candidates-summary.component.html',
  styleUrls: ['./candidates-summary.component.css']
})
export class CandidatesSummaryComponent implements OnInit {

  public title = 'Dashboard';
  public candidates: Subject<Candidates[]> = new Subject<Candidates[]>();
  public gridDataResult: GridDataResult = {data: [], total: 0};

  public columns: any[] = [
    {field: 'id', title: 'Id', width: 30},
    {field: 'name', title: 'Name', width: 120},
    {field: 'status', title: 'Status', width: 80},
    {field: 'phoneNumber', title: 'Mobile', width: 80},
    {field: 'major', title: 'Major', width: 80},
    {field: 'gpA1', title: 'GPA', width: 50},
    {field: 'university', title: 'University', width: 120},
    {field: 'expectedSalary', title: 'Compensation', width: 90},
    {field: 'devexperience', title: 'Experience', width: 80}
  ];

    public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  public gridData: GridDataResult;
  private $archivedCount: Observable<number>;
  private $toCallCount: Observable<number>;
  private $interviewcount: Observable<number>;
  private $holdCount: Observable<number>;
  private $allCount: Observable<number>;
  private all$ = new BehaviorSubject('');
  private archive$ = new BehaviorSubject('');
  private toCall$ = new BehaviorSubject('');
  private hold$ = new BehaviorSubject('');
  private interview$ = new BehaviorSubject('');
  private $filteredGridData: Candidates[] = [];

  constructor(private appService: AppService, private candService: CandidatesService, private router: Router) {
    this.candService.getCandidates().subscribe((res) => {
      this.candidates.next(res as Candidates[]);
    });
    this.candidates.subscribe((res) => {
      this.$filteredGridData = res;
      this.gridDataResult.data = res;
      this.gridDataResult.total = res.length;
    });
    this.gridData = process(this.$filteredGridData, this.gridState);
  }

  ngOnInit() {
    this.appService.titleOnNav.next(this.title);
    this.$allCount = this.getCountByStatus('AllApplicants', this.all$);
    this.$archivedCount = this.getCountByStatus('Archive', this.archive$);
    this.$holdCount = this.getCountByStatus('hold', this.hold$);
    this.$interviewcount = this.getCountByStatus('interview', this.interview$);
    this.$toCallCount = this.getCountByStatus('call', this.toCall$);
  }
  private getCountByStatus(status: string, load$: BehaviorSubject<any>) {
    const $Count = this.candService.getApplicantCountByStatus(status);
    return load$.pipe(
      switchMap( _ => timer(0, 30000).pipe(
        concatMap( _ => $Count),
        map((response: number) => response)
      ))
    );
  }

  private selected(data: any) {
    this.router.navigate([`dashboard/details/${data.id}`]);
  }

  private async filterByStatusValue(event: any, status: string) {
    this.$filteredGridData = [];
    return new Promise((resolve, reject) => {
      this.candService.getApplicantByStatus(status).then(
        res => {
          res.subscribe((result: Candidates[]) => {
            this.$filteredGridData = result;
          });
          resolve(res);
          this.gridState.skip = 0;
          this.gridData = process(this.$filteredGridData, this.gridState);
        }
      );
    });


  }
    addApplicant() {
      this.router.navigate([`dashboard/applicants/add-new`]);
    }
}
