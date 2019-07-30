import { Component } from '@angular/core';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidate, CandidatesStatusHistory } from './../Models/candidate';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  private candidate: Candidate;
  private candidateForm = new FormGroup({});
  private id: number;
  private candidateStatusHistory: CandidatesStatusHistory[] = [];
  private statusStage1: string[] = [
    'Irrelevent',
    'initial Call',
    'Archive'
  ];
  private statusStage2: string[] = [
    'Interview scheduled',
    'No Answer',
    'Wrong Number',
    'Inbox'
  ]; // if prev. status was 'To Call 'initial''

  private statusStage3: string[] = [
    'Canceled',
    'Didn\'t attend',
    'Interviewed',
    'Inbox'
  ]; // if prev. status was 'Interview scheduled'

  private statusStage4: string[] = [
    'To Call',
    'Cancelled',
    'Rejected',
    'Offer',
    'Hold',
    'Shortlisted',
    'Blacklisted',
    'Refused Test',
    'Inbox'
  ]; // if prev. status was Interviewed or To Call

  private statusStage5: string[] = [
    'Hired',
    'Rejected offer',
    'Inbox'
  ]; // if prev. status was to hire

  private statusStage6: string[] = [
    'Hired',
    'Resigned',
    'Terminated'
  ];

  private dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Friday from being selected.
    return day !== 5;
  }

  constructor(private formBuilder: FormBuilder, private candidatesService: CandidatesService,
              private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number);
    this.getCandidateDetails(this.id);
    this.getCandidatesStatusHistory(this.id);
    this.candidateForm = this.formBuilder.group({
      mobile: '',
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      social: [''],
      nationality: [''],
      statusSelect: [''],
      major: [''],
      gpa: [''],
      university: [''],
      degree: [''],
      otherUniversity: [''],
      lastPosition: [''],
      careerLevel: [''],
      experienceYears: [''],
      joinDate: [''],
      applyingAs: [''],
      expectedSalary: [''],
      englishSkills: [''],
      attachments: [''],
      status: [''],
      examScore: [''],
      notes: [''],
      serializedDate : ((new Date()).toISOString()),
      time: '',
      technologies: ''
    }
      );
  }

  private convertGpa(gpa: number) {
    return gpa <= 4 ? gpa * 25 : gpa / 25;
  }

  onSubmit() {
    const gpa = this.candidateForm.value.gpa as number;
    this.candidate = {
            name: this.candidate.name,
            email: !!this.candidateForm.value.email ? this.candidateForm.value.email : this.candidate.email,
            gpA1: !!this.candidate.gpA1 ? this.candidate.gpA1 : (!!gpa ? (gpa <= 4 ? gpa : this.convertGpa(gpa)) : 0),
            gpA2: !!this.candidate.gpA2 ? this.candidate.gpA2 : !!gpa ? (gpa > 4 ? gpa : this.convertGpa(gpa)) : 0,
            careerLevel: !!this.candidateForm.value.careerLevel ? this.candidateForm.value.careerLevel : this.candidate.careerLevel,
            currentPosition: !!this.candidateForm.value.lastPosition
            ? this.candidateForm.value.lastPosition : this.candidate.currentPosition,
            degree: !!this.candidateForm.value.degree ? this.candidateForm.value.degree : this.candidate.degree,
            expectedSalary: !!this.candidateForm.value.expectedSalary ? this.candidateForm.value.expectedSalary
            : this.candidate.expectedSalary,
            devexperience: this.candidate.devexperience,
            englishSkills: !!this.candidateForm.value.englishSkills ? this.candidateForm.value.englishSkills : this.candidate.englishSkills,
            howdidyoufindus: !!this.candidateForm.value.social ? this.candidateForm.value.social : this.candidate.howdidyoufindus,
            joinDate: !!this.candidateForm.value.joinDate ? this.candidateForm.value.joinDate : this.candidate.joinDate,
            major: !!this.candidateForm.value.major ? this.candidateForm.value.major : this.candidate.major,
            nationality: !!this.candidateForm.value.nationality ? this.candidateForm.value.nationality : this.candidate.nationality,
            otherUniversity: !!this.candidateForm.value.otherUniversity ? this.candidateForm.value.otherUniversity
            : this.candidate.otherUniversity,
            phoneNumber: !!this.candidateForm.value.mobile ? this.candidateForm.value.mobile : this.candidate.phoneNumber,
            university: !!this.candidateForm.value.university ? this.candidateForm.value.university : this.candidate.university,
            status: !!this.candidateForm.value.statusSelect ? this.candidateForm.value.statusSelect : this.candidate.status,
            title: !!this.candidateForm.value.applyingAs ? this.candidateForm.value.applyingAs : this.candidate.title,
            technologies: !!this.candidateForm.value.technologies ? this.candidateForm.value.technologies : this.candidate.technologies,
            examScore: this.candidateForm.value.examScore != null
            ? this.candidateForm.value.examScore as number : this.candidate.examScore,
            teamLeaderExperience: this.candidate.teamLeaderExperience,
            notes: !!this.candidate.notes ? this.candidate.notes : ' ',
            lastUdateLog: new Date().toDateString(),
            applicationDate: !!this.candidate.applicationDate ? this.candidate.applicationDate : new Date().toDateString()
          };

    if (this.candidate.status.includes('Call')) {
      const date = this.candidateForm.value.serializedDate as Date;
      const time = this.candidateForm.value.time.split(':');
      date.setHours(time[0]);
      date.setMinutes(time[1]);
      this.candidate.toCallDate = date.toLocaleString();
      } else if (this.candidate.status.includes('scheduled')) {
        const date = this.candidateForm.value.serializedDate as Date;
        const time = this.candidateForm.value.time.split(':');
        date.setHours(time[0]);
        date.setMinutes(time[1]);
        this.candidate.interviewDate = date.toLocaleString();
        }
    this.updateCandidate(this.candidate);
      }

  async getCandidateDetails(id: number) {
    this.candidatesService.getCandidate(this.id).toPromise().then(
      async (res: Candidate) => {
          this.candidate = await res;
      },
      (error: any) => console.log(error));
  }

  getCandidatesStatusHistory(id: number) {
    this.candidatesService.getApplicantStatusHistory(id).toPromise().then(
      async (result: CandidatesStatusHistory[]) => {
        this.candidateStatusHistory = await result;
    },
    (error: any) => console.log(error));
  }

  async updateCandidate(updateCandidate: Candidate) {
    console.log('candidate is updated', updateCandidate);
    await this.candidatesService.updateCandidate(this.id, updateCandidate)
    .finally(() => this.openSnackBar('applicant updated successfully', 'x'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
