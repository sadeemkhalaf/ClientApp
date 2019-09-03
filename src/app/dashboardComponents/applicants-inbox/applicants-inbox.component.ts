import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReplaySubject } from 'rxjs';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidate } from 'src/app/Models/candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  public inboxCandidates: ReplaySubject<Candidate[]> = new ReplaySubject<Candidate[]>(1);
  public inboxedCandidatesData: Candidate[] = [];
  private updatedIndex: Candidate [] = [];
  constructor(private candidatesService: CandidatesService, private router: Router) {
    this.candidatesService.getCandidates().subscribe((item: Candidate[]) => {
      this.inboxCandidates.next(item);
    });

    this.inboxCandidates.subscribe((item) => {
      this.updatedIndex = item.filter((appl) => appl.Status && appl.Status.toLowerCase() !== 'inbox');
      this.inboxedCandidatesData = item.filter((appl) => appl.Status && appl.Status.toLowerCase() === 'inbox');
    });
   }

  async drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        0);
    }
  }

  applicantDetails(cand: any) {
    const idChanged = cand.id;
    this.router.navigate([`dashboard/details/${idChanged}`]);
  }

}
