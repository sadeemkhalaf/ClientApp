import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent implements OnInit {
  private advancedFilterForm = new FormGroup({});
  constructor(private candidatesService: CandidatesService, private router: Router
            , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.advancedFilterForm = this.formBuilder.group({
      devexperience: [{}],
      currentPosition: [{}],
      status: [{}],
      gpa: [''],
      rating: [{}],
      major: [{}],
      experienceLevel: [{}]
    });
  }
}
