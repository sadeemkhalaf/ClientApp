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
    this.candidateForm = new FormGroup({
      firstName: new FormControl('test', Validators.required),
      lastName: new FormControl('capella', Validators.required),
      mobile: new FormControl('0792277999', Validators.required),
      email: new FormControl('sadeem@capella.io', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      social: new FormControl('LinkedIn', Validators.required),
      nationality: new FormControl('Jordanian', Validators.required),
      otherUniversity: new FormControl(''),
      lastPosition: new FormControl('Software Engineer'),
      careerLevel: new FormControl('junior', Validators.required),
      experienceLevel: new FormControl('middle'),
      experienceYears: new FormControl('1', Validators.required),
      joinDate: new FormControl('1-2 weeks'),
      applyingAs: new FormControl('Software Engineer', Validators.required),
      expectedSalary: new FormControl('500', Validators.required),
      englishSkills: new FormControl('Intermediate'),
      attachments: new FormControl(''),
      socialOther: new FormControl(''),
      educationDetails: this.formBuilder.array([
        this.formBuilder.group({
          major: '',
          gpa: '',
          university: '',
          degree: '',
          graduated: false
        })
      ])
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
            const gpa = this.educationDetails.at(0).get('gpa').value as number;
            const candidate: Candidate = {
                  name: this.candidateForm.get('firstName').value + ' ' +  this.candidateForm.get('lastName').value,
                  email:  this.candidateForm.get('email').value,
                  gpA1: gpa <= 4 ? gpa : this.convertGpa(gpa),
                  gpA2: gpa > 4 ? gpa : this.convertGpa(gpa),
                  careerLevel: this.candidateForm.get('careerLevel').value,
                  currentPosition: !!this.candidateForm.get('lastPosition').value ? this.candidateForm.get('lastPosition').value : '',
                  cvAttachment: this.getUrlFromFilesList(this.filesList).toString(),
                  degree: this.educationDetails.at(0).get('degree').value,
                  expectedSalary: this.candidateForm.get('expectedSalary').value as number,
                  devexperience: this.candidateForm.get('experienceYears').value as number,
                  englishSkills: this.candidateForm.get('englishSkills').value,
                  howdidyoufindus: (!!this.candidateForm.get('social').value && this.candidateForm.get('social').value !== 'Other')
                  ? this.candidateForm.get('social').value : this.candidateForm.get('socialOther').value,
                  joinDate: this.candidateForm.get('joinDate').value,
                  major: this.educationDetails.at(0).get('major').value,
                  nationality: this.candidateForm.get('nationality').value,
                  otherUniversity: '',
                  phoneNumber: this.candidateForm.get('mobile').value,
                  technologies: this.technologies.toString(),
                  university: this.educationDetails.at(0).get('university').value,
                  teamLeaderExperience: 0,
                  status: 'inbox',
                  title: this.candidateForm.get('applyingAs').value
                };
            this.initializeForm();
            await this.candidatesService.insertCandidate(candidate);
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
