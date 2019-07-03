import { Component, OnInit } from '@angular/core';
import { AppService } from './../../Services/app-service.service';
import { CandidatesService } from '../../Services/candidates.service';
import { Candidates } from '../Models/candidates';
import { Subject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';

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
  public columns: any[] = [{field: 'degree'}, {field: 'name'}, {field: 'major'}];

  constructor(private appService: AppService, private candService: CandidatesService) {

    this.candService.getApplicants().subscribe((res) => {
      this.candidates.next(res as Candidates[]);
    });

    this.candidates.subscribe((res) => {
      this.gridData = res;
      this.gridDataResult.data = res;
      this.gridDataResult.total = res.length;
      res.forEach((r) => {
        console.log(r);
      });
    });
  }

  ngOnInit() {
    this.appService.titleOnNav.next(this.title);
  }

}
