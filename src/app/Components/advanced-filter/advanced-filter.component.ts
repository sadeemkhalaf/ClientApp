import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CandidatesService } from 'src/Services/candidates.service';
import { Router } from '@angular/router';
import { ApplicantQueryStructure, Candidate } from 'src/app/Models/candidate';
import { status } from './../../../environments/environment';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent implements OnInit {
  @Output() filteredCandidates: EventEmitter<Candidate[]> = new EventEmitter<Candidate[]>();
  private advancedFilterForm = new FormGroup({});
  public queryTerms: ApplicantQueryStructure;
  public show: boolean;
  public statusList = status;
  constructor(private _candidatesService: CandidatesService, private _router: Router
            , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.show = false;
    this.advancedFilterForm = this.formBuilder.group({
      devexperience: [],
      currentPosition: [],
      status: [],
      gpa: [],
      rating: [],
      major: [],
      experienceLevel: []
    });
    this.queryTerms = {devexperience: 0, experienceLevel: [], currentPosition: [], gpa: 0, major: [], rating: [], status: []};
  }

  pushSelection(formCtrl: string) {
    const value: string  = this.advancedFilterForm.get(formCtrl).value;
    if (!!value) {
          switch (formCtrl) {
          case 'experienceLevel':
            if (!this.queryTerms.experienceLevel.includes(value)) {
               this.queryTerms.experienceLevel.push(value);
            }
            break;
          case 'currentPosition':
              if (!this.queryTerms.currentPosition.includes(value)) {
                this.queryTerms.currentPosition.push(value);
             }
              break;
          case 'status':
              if (!this.queryTerms.status.includes(value)) {
                this.queryTerms.status.push(value);
             }
              break;
          case 'rating':
              if (!this.queryTerms.rating.includes(value)) {
                this.queryTerms.rating.push(value);
             }
              break;
          case 'major':
              if (!this.queryTerms.major.includes(value)) {
                this.queryTerms.major.push(value);
             }
              break;
           }
    }

    this.advancedFilterForm.get(formCtrl).reset();
  }

  deleteSelection(formCtrl: string, value: string) {
    switch (formCtrl) {
      case 'experienceLevel':
          this.queryTerms.experienceLevel = this.queryTerms.experienceLevel.filter((v) => v !== value);
          break;
      case 'currentPosition':
          this.queryTerms.currentPosition = this.queryTerms.currentPosition.filter((v) => v !== value);
          break;
      case 'status':
          this.queryTerms.status = this.queryTerms.status.filter((v) => v !== value);
          break;
      case 'rating':
          this.queryTerms.rating = this.queryTerms.rating.filter((v) => v !== value);
          break;
      case 'major':
          this.queryTerms.major = this.queryTerms.major.filter((v) => v !== value);
          break;
       }
  }

  onSubmit() {
    this.queryTerms.gpa = !!this.advancedFilterForm.get('gpa').value ? this.advancedFilterForm.get('gpa').value : 0;
    this.queryTerms.devexperience = !!this.advancedFilterForm.get('devexperience').value
    ? this.advancedFilterForm.get('devexperience').value : 0;
    this._candidatesService.getCandidateQueryResults(this.queryTerms).subscribe((res) => {
      this.filteredCandidates.emit(res);
    });
  }

  reset() {
    this.advancedFilterForm.reset();
    this.onSubmit();
    this.queryTerms = {devexperience: 0, experienceLevel: [], currentPosition: [], gpa: 0, major: [], rating: [], status: []};
  }

  toggle() {
    this.show = !this.show;
  }
}
