import { Component, OnInit } from '@angular/core';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { randomNumber } from 'src/environments/environment';
import { Candidates } from './../Models/candidates';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent {

  private candidate: Candidates;
  private id: number;
  constructor(private candidatesService: CandidatesService, private router: Router, private route: ActivatedRoute) {
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number) / randomNumber;
    this.getCandidateDetails(this.id);
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
    console.log('candidate is updated')
  }

}
