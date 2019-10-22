import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidate, CandidatesStatusHistory, CandidateStatusDetails } from './../Models/candidate';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  private candidate: Candidate;
  private candidateForm = new FormGroup({});
  private id: number;
  private _statusPicked: CandidateStatusDetails;
  private candidateStatusHistory: CandidatesStatusHistory[] = [];

  private dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Friday from being selected.
    return day !== 5;
  }

  constructor(private formBuilder: FormBuilder, private candidatesService: CandidatesService,
              private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number);
    this.getCandidateDetails(this.id);
    this.candidateForm = this.formBuilder.group({
      id: this.id,
      name: ['', Validators.required],
      phoneNumber: [''],
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
      lastUdateLog: [''],
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

  ngOnInit(): void {}

  private convertGpa(gpa: number) {
    return gpa <= 4 ? gpa * 25 : gpa / 25;
  }

  onSubmit() {
    this.updateCandidate(this.candidateForm.value);
    }

  async getCandidateDetails(id: number) {
    this.candidatesService.getCandidate(this.id).toPromise().then(
      async (res: Candidate) => {
          this.candidate = await res;
          if (this.candidate.cvAttachment === null || !(this.candidate.cvAttachment.length !== 0)) {
            this.candidate.cvAttachment = uuid.v4();
          }
          this.candidateForm.setValue(this.candidate);
      });
  }

  getCandidatesStatusHistory(id: number) {
    this.candidatesService.getApplicantStatusHistory(id).toPromise().then(
      async (result: CandidatesStatusHistory[]) => {
        this.candidateStatusHistory = await result;
    });
  }

  async updateCandidate(updateCandidate: Candidate) {
    await this.candidatesService.updateCandidate(this.id, updateCandidate)
    .finally(() => this.openSnackBar('applicant updated successfully', 'x'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  pickedStatus(status: CandidateStatusDetails) {
    this._statusPicked = status;
    this.candidateForm.patchValue({status: status.status});
  }
}
