import { Component, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { ReplaySubject } from 'rxjs';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidates } from 'src/app/Models/candidates';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  @Output() inboxCount = new EventEmitter<number>();
  public inboxCandidates: ReplaySubject<Candidates[]> = new ReplaySubject<Candidates[]>(1);
  public inboxedCandidatesData: Candidates[] = [];
  private updatedIndex: Candidates [] = [];
  constructor(private candidatesService: CandidatesService) {
    this.candidatesService.getCandidates().subscribe((item: Candidates[]) => {
      this.inboxCandidates.next(item);
    });

    this.inboxCandidates.subscribe((item) => {
      this.updatedIndex = item;
      this.inboxedCandidatesData = item.filter((appl) => appl.status && appl.status.toLowerCase() === 'inbox');
    });
    this.inboxCount.emit(this.inboxedCandidatesData.length);
   }

  async drop(event: CdkDragDrop<Candidates[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        0);
      // const itemData = event.container.data.entries().next().value[1];
    }
  }

}
