import { Component, OnInit } from '@angular/core';
import { AppService } from './../../Services/app-service.service';
import { CandidatesService } from '../../Services/candidates.service';
import { Candidate } from '../Models/candidate';
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
    public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  public candidates: Subject<Candidate[]> = new Subject<Candidate[]>();
  public gridDataResult: GridDataResult = {data: [], total: 0};

  public columns: any[] = [
    {field: 'Id', title: 'Id', width: 40},
    {field: 'Name', title: 'Name', width: 120},
    {field: 'Status', title: 'Status', width: 80},
    {field: 'PhoneNumber', title: 'Mobile', width: 80},
    {field: 'Major', title: 'Major', width: 80},
    {field: 'GPA1', title: 'GPA', width: 50},
    {field: 'University', title: 'University', width: 120},
    {field: 'ExpectedSalary', title: 'Compensation', width: 90},
    {field: 'Devexperience', title: 'Experience', width: 80}
  ];

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
  private $filteredGridData: Candidate[] = [];

  constructor(private appService: AppService, private candService: CandidatesService, private router: Router) {
    this.candService.getCandidates().subscribe((res) => {
      // this.candidates.next(res as Candidate[]);
      res.forEach((cand) => {
        let candidateList: Candidate[] = [];
        candidateList = cand as Candidate[];
        candidateList.forEach((val: Candidate) => {
          console.log('hello', val);
        });
        this.candidates.next(candidateList as Candidate[]);
    });
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
  private getCountByStatus(status: string, $load: BehaviorSubject<any>) {
    const $Count = this.candService.getApplicantCountByStatus(status);
    return $load.pipe(
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
          res.subscribe((result: Candidate[]) => {
            this.$filteredGridData = result;
            this.gridState.skip = 0;
            this.gridState.take = 10;
            this.gridState.sort = [];
          });
          resolve(res);
        }
      );
    });
  }

  private dataStateChange(state: DataStateChangeEvent, list: any): void {
    this.gridState = state;
    this.gridData = process(list, this.gridState);
  }

    addApplicant() {
      this.router.navigate([`dashboard/applicants/add-new`]);
    }
}
