import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { Upload } from '../Models/upload';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidate } from './../Models/candidate';
import { Router } from '@angular/router';
import { universitiesList, technologiesList } from './../../environments/environment';
import { EducationDetails } from '../Models/EducationDetails';
import {Location} from '@angular/common';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  private filesList: Upload[] = [];
  private registerationSuccess = false;
  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = true;
  private filteredTechnologies: Observable<string[]>;
  private technologies: string[] = [];
  private allTechnologies: string[] = technologiesList;
  private universitiesList: string[] = universitiesList;
  private educationList: EducationDetails[] = [];

  @ViewChild('TechnologiesInput', {static: false}) TechnologiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private technologiesCtrl = new FormControl();
  private candidateForm = new FormGroup({});
  private educationDetails: FormArray;
  constructor(private candidatesService: CandidatesService, private router: Router
            , private _location: Location , private formBuilder: FormBuilder) {
     this.filteredTechnologies = this.technologiesCtrl.valueChanges.pipe(
       startWith(null),
       map((technology: string | null) => technology ? this._filter(technology) : this.allTechnologies.slice()));
   }
  ngOnInit() {
    console.log(this.router.url.includes('apply'));

    this.candidateForm = this.formBuilder.group({
      name: ['Sadeem Capella'],
      phoneNumber: '0782111000',
      email: ['sadeem@gmail.com', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
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
    });
  }

  private initializeForm() {
    this.candidateForm.reset();
    this.technologiesCtrl.reset();
    this.technologies = [];
    this.filesList = [];
  }
  private add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.technologies.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.technologiesCtrl.setValue(null);
    }
  }

  private remove(technology: string): void {
    const index = this.technologies.indexOf(technology);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }

  private selected(event: MatAutocompleteSelectedEvent): void {
    this.technologies.push(event.option.viewValue);
    this.technologiesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTechnologies.filter(tech => tech.toLowerCase().indexOf(filterValue) === 0);
  }

   private async onSubmit() {
     if (this.candidateForm.valid) {
      this.educationDetails = this.candidateForm.get('educationDetails') as FormArray;
      await this.candidatesService.insertCandidate(this.candidateForm.value).then((reason) => {
        console.log(reason);
      });
      this.initializeForm();
      this.registerationSuccess = true;
  }
}

  private getFilesList(event: Upload[]) {
    event.forEach((fList) => {
      this.filesList.push(fList);
      console.log(fList);
    });
  }

  private convertGpa(gpa: number) {
    return gpa <= 4 ? gpa * 25 : gpa / 25;
  }

  private getUrlFromFilesList(filesList: Upload[]) {
    const files: string [] = [];
    filesList.forEach((file) => {
      files.push(file.url);
    });
    return files;
  }

  private closeCard(event: boolean) {
    if (event) {
      this.registerationSuccess = !event;
    }
  }

  private cancel() {
    this._location.back();
  }

  addRow(): void {
    this.educationDetails = this.candidateForm.get('educationDetails') as FormArray;
    this.educationDetails.push(this.createGroup());
    console.log('educationDetails length: ', this.educationDetails.controls.length);
  }

  removeRow(index: number): void {
    this.educationDetails.removeAt(index);
  }

  createGroup(): FormGroup {
    return this.formBuilder.group({
      major: '',
      gpa: '',
      university: '',
      degree: '',
      graduated: false
    });
  }
}
