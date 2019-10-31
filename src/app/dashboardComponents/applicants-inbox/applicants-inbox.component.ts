import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReplaySubject } from 'rxjs';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidate } from 'src/app/Models/candidate';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  public inboxCandidates: ReplaySubject<Candidate[]> = new ReplaySubject<Candidate[]>(1);
  public inboxedCandidatesData: Candidate[] = [];
  private screeningIndex: Candidate [] = [];
  private interviewIndex: Candidate [] = [];
  private candidatesFilteredList: Candidate[] = [];
  private basicFilterForm = new FormGroup({});
  constructor(private candidatesService: CandidatesService, private router: Router, private formBuilder: FormBuilder) {
    this.candidatesService.getCandidates().subscribe((item: Candidate[]) => {
      this.inboxCandidates.next(item);
    });

    this.inboxCandidates.subscribe((item) => {
      this.candidatesFilteredList = item;
      this.screeningIndex = item.filter((appl) => appl.status && appl.status.toLowerCase().includes('screen'));
      this.interviewIndex = item.filter((appl) => appl.status && appl.status.toLowerCase().includes('interview'));
      this.inboxedCandidatesData = item.filter((appl) => appl.status && appl.status.toLowerCase() === 'inbox');
    });

    this.basicFilterForm = this.formBuilder.group({
      search: [''],
      status: ['']
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

  filterCandidate() {
    const name = this.basicFilterForm.get('search').value;
    const status = this.basicFilterForm.get('status').value;
    switch (status) {
      case 'inbox':
          this.inboxedCandidatesData = this.candidatesFilteredList.filter((appl) =>
          (appl.status && appl.status.toLowerCase().includes('inbox')) && (appl.name.toLowerCase().includes(name)));
          break;
      case 'screen':
          this.screeningIndex = this.candidatesFilteredList.filter((appl) =>
          (appl.status && appl.status.toLowerCase().includes('screen')) && (appl.name.toLowerCase().includes(name)));
          break;
      case 'interview':
          this.interviewIndex = this.candidatesFilteredList.filter((appl) =>
          (appl.status && appl.status.toLowerCase().includes('interview')) && (appl.name.toLowerCase().includes(name)));
          break;
      default:
          this.screeningIndex = this.candidatesFilteredList.filter((appl) =>
          appl.status && appl.status.toLowerCase().includes('screen'));
          this.interviewIndex = this.candidatesFilteredList.filter((appl) =>
          appl.status && appl.status.toLowerCase().includes('interview'));
          this.inboxedCandidatesData = this.candidatesFilteredList.filter((appl) =>
          appl.status && appl.status.toLowerCase() === 'inbox');
    }
  }

  filterList(list: any[], name: string, status?: string) {
    if (!!status) {
      return list.filter((appl) =>
      (appl.status && appl.status.toLowerCase().includes(status)) && (appl.name.toLowerCase().includes(name)));
    } else if (!!name) {
      return list.filter((appl) => appl.name.toLowerCase().includes(name));
    }
  }

}
