import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CandidatesServiceService } from 'src/Services/candidates-service.service';
import { Candidates } from 'src/app/Models/candidates';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  public candidates: Subject<Candidates[]> = new Subject<Candidates[]>();
  public candidatesData: any ;
  constructor(private candService: CandidatesServiceService) {
    this.candService.getApplicants().subscribe((res) => {
      this.candidates.next(res as Candidates[]);
    });
    this.candidates.subscribe((res) => {
      this.candidatesData = res;
      res.forEach((r) => {
        console.log(r);
      });
    });
   }

  updatedCandidates: Candidates [] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
