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
import * as uuid from 'uuid';
import { UploadFilesService } from 'src/Services/upload-files.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public tempId: string;

  @ViewChild('TechnologiesInput', {static: false}) TechnologiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private technologiesCtrl = new FormControl();
  private candidateForm = new FormGroup({});
  private educationDetails: FormArray;
  constructor(private candidatesService: CandidatesService, private router: Router
            , private _location: Location , private formBuilder: FormBuilder
            , private uploadFileService: UploadFilesService, private snackBar: MatSnackBar) {
     this.filteredTechnologies = this.technologiesCtrl.valueChanges.pipe(
       startWith(null),
       map((technology: string | null) => technology ? this._filter(technology) : this.allTechnologies.slice()));
   }
  ngOnInit() {
    this.tempId = uuid.v4();
    this.candidateForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
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
      cvAttachment: [this.tempId],
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
      await this.candidatesService.insertCandidate(this.candidateForm.value).then((reason: any) => {
        console.log(reason.error.error.text);
      }, error => {
        this.openSnackBar(error.error.text, 'x');
        console.log(error.error.text);
      });
      this.initializeForm();
      this.registerationSuccess = true;
  }
}

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private getFilesList(event: Upload[]) {
    event.forEach((fList) => {
      this.filesList.push(fList);
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
    this.uploadFileService.deleteBucket(this.tempId);
    this.initializeForm();
    this._location.back();
  }
}
