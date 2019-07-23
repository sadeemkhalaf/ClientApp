import { Component, OnInit, Output } from '@angular/core';
import { EducationDetails } from '../Models/EducationDetails';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit {

  private educationDetailsFormGroup: FormGroup = new FormGroup ({
    major: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    gpa: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    graduated: new FormControl('', Validators.required)
  });
  private isGraduated = false;
  private educationDetails: EducationDetails;
  constructor() { }
  ngOnInit() {
  }

}
