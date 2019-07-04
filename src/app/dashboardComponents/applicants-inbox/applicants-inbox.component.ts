import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { InboxService } from './../../../Services/inbox.service';
import { InboxCandidates } from 'src/app/Models/InboxCandidates';
import { Candidates } from './../../Models/candidates';
import { CdkRow } from '@angular/cdk/table';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  public inboxCandidates: Subject<InboxCandidates[]> = new Subject<InboxCandidates[]>();
  public inboxedCandidatesData: InboxCandidates[];

  constructor(private inboxService: InboxService) {
    this.inboxService.getAllInbox().subscribe((res) => {
      this.inboxCandidates.next(res as InboxCandidates[]);
    });
    this.inboxCandidates.subscribe((res: InboxCandidates[]) => {
      this.inboxedCandidatesData = res;
      res.forEach((r: InboxCandidates) => {
      console.log (r.name);
      });

    });
   }
  updatedIndex: InboxCandidates [] = [];


  drop(event: CdkDragDrop<InboxCandidates[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.container.data.entries().next().value[1]);
    }
  }

}
