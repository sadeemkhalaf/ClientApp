import { Component, OnInit } from '@angular/core';
import { AppService } from './../../Services/app-service.service';
import { CandidatesService } from '../../Services/candidates.service';
import { Candidates } from '../Models/candidates';
import { Subject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-candidates-summary',
  templateUrl: './candidates-summary.component.html',
  styleUrls: ['./candidates-summary.component.css']
})
export class CandidatesSummaryComponent implements OnInit {

  public title = 'Dashboard';
  public gridData: any ;
  public candidates: Subject<Candidates[]> = new Subject<Candidates[]>();
  public gridDataResult: GridDataResult = {data: [], total: 0};
  public columns: any[] = [
    {field: 'name', title: 'Name'},
    {field: 'status', title: 'Status'},
    {field: 'phoneNumber', title: 'Mobile'},
    {field: 'major', title: 'Major'},
    {field: 'gpA1', title: 'GPA'},
    {field: 'university', title: 'University'},
    {field: 'expectedSalary', title: 'Expected Salary'},
    {field: 'devexperience', title: 'Experience Years'}];

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
};

  constructor(private appService: AppService, private candService: CandidatesService) {

    this.candService.getCandidates().subscribe((res) => {
      this.candidates.next(res as Candidates[]);
    });

    this.candidates.subscribe((res) => {
      this.gridData = res;
      this.gridDataResult.data = res;
      this.gridDataResult.total = res.length;
    });
  }

  ngOnInit() {
    this.appService.titleOnNav.next(this.title);
  }
}
