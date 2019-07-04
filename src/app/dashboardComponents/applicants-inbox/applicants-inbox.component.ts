import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { InboxService } from './../../../Services/inbox.service';
import { InboxCandidates } from 'src/app/Models/InboxCandidates';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidates } from 'src/app/Models/candidates';

@Component({
  selector: 'app-applicants-inbox',
  templateUrl: './applicants-inbox.component.html',
  styleUrls: ['./applicants-inbox.component.css']
})
export class ApplicantsInboxComponent {

  public inboxCandidates: Subject<InboxCandidates[]> = new Subject<InboxCandidates[]>();
  public inboxedCandidatesData: InboxCandidates[] = [];
  private updatedIndex: Candidates [] = [];
  constructor(private inboxService: InboxService,
              private candidatesService: CandidatesService) {
    this.inboxService.getAllInbox().subscribe((res) => {
      this.inboxCandidates.next(res as InboxCandidates[]);
    });
    this.inboxCandidates.subscribe((res: InboxCandidates[]) => {
      this.inboxedCandidatesData = res;
    });
    this.candidatesService.getCandidates().subscribe((item: Candidates[]) => {
      this.updatedIndex = item;
    });
    this.updatedIndex.forEach((item) => {
      console.log((item));
    });
   }

  async drop(event: CdkDragDrop<InboxCandidates[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        0);

      const itemData = event.container.data.entries().next().value[1];

      if (itemData.status.toLowerCase() === 'inbox') {
      const candidate: Candidates = {
        name: itemData.name,
        email: itemData.email,
        careerLevel: itemData.careerLevel,
        currentPosition: itemData.currentPosition,
        cvAttachment: itemData.cvAttachment,
        degree: itemData.degree,
        devExperience: itemData.devExperience,
        englishSkills: itemData.englishSkills,
        examScore: 0,
        expectedSalary: itemData.expectedSalary,
        howDidYouFindUs: itemData.howDidYouFindUs,
        gpA1: itemData.gpA1,
        gpA2: itemData.gpA2,
        interviewDate: new Date(),
        joinDate: itemData.joinDate,
        lastUdateLog: 'updated status',
        major: itemData.major,
        nationality: itemData.nationality,
        university: itemData.university,
        otherUniversity: itemData.otherUniversity,
        phoneNumber: itemData.phoneNumber,
        status: 'archived',
        technologies: itemData.technologies,
        teamLeaderExperience: itemData.teamLeaderExperience,
        toCallDate: new Date(),
        notes: '',
        title: itemData.title
      };
      const data = await this.candidatesService.insertCandidate(candidate);
      const deleted = await this.inboxService.deleteInboxedCandidate(itemData.id);
      } else {
        const candidate: InboxCandidates = {
          name: itemData.name,
          email: itemData.email,
          careerLevel: itemData.careerLevel,
          currentPosition: itemData.currentPosition,
          cvAttachment: itemData.cvAttachment,
          degree: itemData.degree,
          devExperience: itemData.devExperience,
          englishSkills: itemData.englishSkills,
          expectedSalary: itemData.expectedSalary,
          howDidYouFindUs: itemData.howDidYouFindUs,
          gpA1: itemData.gpA1,
          gpA2: itemData.gpA2,
          joinDate: itemData.joinDate,
          major: itemData.major,
          nationality: itemData.nationality,
          university: itemData.university,
          otherUniversity: itemData.otherUniversity,
          phoneNumber: itemData.phoneNumber,
          status: 'Inbox',
          technologies: itemData.technologies,
          teamLeaderExperience: itemData.teamLeaderExperience,
          title: itemData.title
        };
        const data = await this.inboxService.insertInboxCandidate(candidate);
        const deleted = await this.candidatesService.deleteCandidate(itemData.id);
        }

    }
  }

}
