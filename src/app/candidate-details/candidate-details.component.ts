import { Component } from '@angular/core';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidates, CandidatesStatusHistory } from './../Models/candidates';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  private candidate: Candidates;
  private candidateForm = new FormGroup({});
  private id: number;
  private candidateStatusHistory: CandidatesStatusHistory[] = [];
  private status: string[] = [
    'Inbox',
    'Irrelevent',
    'To Call \'initial\'',
    'Archive',
    'Not interested',
    'Interview scheduled',
    'Irrelevent',
    'To Call',
    'Canceled',
    'Didn\'t attend',
    'Interviewed',
    'Rejected',
    'To hire',
    'Shortlisted',
    'Blacklisted',
    'Refused Test',
    'Hired',
    'Rejected offer'
  ];

  private dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Friday from being selected.
    return day !== 5;
  }

  constructor(private formBuilder: FormBuilder, private candidatesService: CandidatesService,
              private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
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
      // comments: this.candidate.,
      serializedDate : ((new Date()).toISOString()),
      time: '',
      technologies: ''
    }
      );
    console.log(new Date().toLocaleTimeString());
    // sql time pattern: 2019-07-14 17:06:25.2800000 (yyyy-mm-dd hh:mm:ss)

  }

  private convertGpa(gpa: number) {
    return gpa <= 4 ? gpa * 25 : gpa / 25;
  }

  onSubmit() {
    const gpa = this.candidateForm.value.gpa as number;
    const cand: Candidates = {
            name: this.candidate.name,
            email: !!this.candidateForm.value.email ? this.candidateForm.value.email : this.candidate.email,
            gpA1: !!gpa ? (gpa <= 4 ? gpa : this.convertGpa(gpa)) : 0,
            gpA2: !!gpa ? (gpa > 4 ? gpa : this.convertGpa(gpa)) : 0,
            careerLevel: !!this.candidateForm.value.careerLevel ? this.candidateForm.value.careerLevel : this.candidate.careerLevel,
            currentPosition: !!this.candidateForm.value.currentPosition ? this.candidateForm.value.currentPosition : this.candidate.title,
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
            examScore: this.candidate.examScore ,
            teamLeaderExperience: this.candidate.teamLeaderExperience,
            notes: this.candidate.notes,
            lastUdateLog: new Date().toDateString()
          };

    if (cand.status.includes('To Call')) {
        cand.toCallDate = this.candidateForm.get('serializedDate').value;
      } else if (cand.status.includes('Interview Scheduled')) {
          cand.interviewDate = this.candidateForm.get('serializedDate').value;
        }
    console.log(this.candidateForm.get('email'));
    this.updateCandidate(cand);
    // console.log('candidate is updated', cand);
      }

  async getCandidateDetails(id: number) {
    this.candidatesService.getCandidate(this.id).toPromise().then(
      async (res: Candidates) => {
          console.log(res);
          this.candidate = await res;
      },
      (error: any) => console.log(error));
  }

  async getCandidatesStatusHistory(id: number) {
    this.candidatesService.getApplicantStatusHistory(id).toPromise().then(
      async (result: CandidatesStatusHistory[]) => {
      this.candidateStatusHistory = await result;
    },
    (error: any) => console.log(error));
  }

  async updateCandidate(updateCandidate: Candidates) {
    console.log('candidate is updated', updateCandidate);
    await this.candidatesService.updateCandidate(this.id, updateCandidate)
    .finally(() => this.openSnackBar('applicant updated successfully', 'x'));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
