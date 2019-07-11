import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { randomNumber } from 'src/environments/environment';
import { Candidates } from './../Models/candidates';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  private candidate: Candidates;
  private candidateForm = new FormGroup({});
  private id: number;
  constructor(private candidatesService: CandidatesService, private router: Router, private route: ActivatedRoute) {
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number);
    this.getCandidateDetails(this.id);
    this.candidateForm = new FormGroup({
      mobile: new FormControl(''),
      email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      social: new FormControl(''),
      nationality: new FormControl(''),
      major: new FormControl(''),
      gpa: new FormControl(''),
      university: new FormControl(''),
      degree: new FormControl(''),
      otherUniversity: new FormControl(''),
      lastPosition: new FormControl(''),
      careerLevel: new FormControl(''),
      experienceLevel: new FormControl(''),
      experienceYears: new FormControl(''),
      joinDate: new FormControl(''),
      applyingAs: new FormControl(''),
      expectedSalary: new FormControl(''),
      englishSkills: new FormControl(''),
      attachments: new FormControl(''),
      status: new FormControl(''),
      examScore: new FormControl(''),
      notes: new FormControl(''),
      comments: new FormControl('')
    }
      );
  }

  async getCandidateDetails(id: number) {
    this.candidatesService.getCandidate(this.id).subscribe(
      async (res: Candidates) => {
          console.log(res);
          this.candidate = await res;
      },
      (error: any) => console.log(error),
      () => console.log('completed')
  );
  }

  async updateCandidate(updateCandidate: Candidates) {
    await this.candidatesService.insertCandidate(updateCandidate);
    console.log('candidate is updated');
  }

}
