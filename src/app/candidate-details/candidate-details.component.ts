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
  private _statusPicked: string;
  private candidateStatusHistory: CandidatesStatusHistory[] = [];
  // tslint:disable-next-line: variable-name
  private _statusStage1: string[] = [];
   // tslint:disable-next-line: variable-name
  private _statusStage2: string[] = [];
   // tslint:disable-next-line: variable-name
  private _statusStage3: string[] = [];
   // tslint:disable-next-line: variable-name
  private _statusStage4: string[] = [];
   // tslint:disable-next-line: variable-name
  private _statusStage5: string[] = [];
   // tslint:disable-next-line: variable-name
  private _statusStage6: string[] = [];

  private dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Friday from being selected.
    return day !== 5;
  }

  constructor(private formBuilder: FormBuilder, private candidatesService: CandidatesService,
              private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this._statusPicked = '';
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number);
    this.getCandidateDetails(this.id);
    // this.getCandidatesStatusHistory(this.id);
    this.candidateForm = this.formBuilder.group({
      id: this.id,
      name: [''],
      phoneNumber: '',
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      howdidyoufindus: [''],
      nationality: [''],
      status: [''],
      major: [''],
      gpA1: [''],
      gpA2: [''],
      university: [''],
      degree: [''],
      otherUniversity: [''],
      currentposition: [''],
      careerLevel: [''],
      devexperience: [''],
      teamLeaderExperience: [''],
      joinDate: [''],
      title: [''],
      expectedSalary: [''],
      englishSkills: [''],
      cvAttachment: [''],
      examScore: [''],
      notes: [''],
      lastUdateLog: [],
      technologies: '',
      toCallDate: [''],
      interviewDate: [''],
      applicationDate: [''],
      comments: [''],
      rating: [''],
      applicantStatusHistory: [''],
      applicantFiles: [''],
      activityLog: [''],
      applicantEducationDetails: ['']
    }
      );

  }

  private convertGpa(gpa: number) {
    return gpa <= 4 ? gpa * 25 : gpa / 25;
  }

  onSubmit() {
    this.updateCandidate(this.candidateForm.value);
    console.log(this.candidateForm.value);
      }

  async getCandidateDetails(id: number) {
    this.candidatesService.getCandidate(this.id).toPromise().then(
      async (res: Candidate) => {
          this.candidate = await res;
          this.candidateForm.setValue(this.candidate);
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

  pickedStatus(status: string) {
    console.log(status);
    this._statusPicked = status;
  }

}
