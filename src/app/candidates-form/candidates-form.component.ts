import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { Upload } from '../Models/upload';
import { CandidatesService } from 'src/Services/candidates.service';
import { Candidates } from './../Models/candidates';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  private filesList: Upload[] = [];
  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = true;
  private filteredTechnologies: Observable<string[]>;
  private technologies: string[] = [];
  private allTechnologies: string[] = ['java', 'C#', '.net core', 'angular', 'flutter', 'docker', 'javaScript', 'ionic'];

  @ViewChild('TechnologiesInput', {static: false}) TechnologiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private technologiesCtrl = new FormControl();
  private candidateForm = new FormGroup({});
  constructor(private candidatesService: CandidatesService) {
    this.filteredTechnologies = this.technologiesCtrl.valueChanges.pipe(
      startWith(null),
      map((technology: string | null) => technology ? this._filter(technology) : this.allTechnologies.slice()));
   }
  ngOnInit() {
    this.candidateForm = new FormGroup({
      firstName: new FormControl('test', Validators.required),
      lastName: new FormControl('capella', Validators.required),
      mobile: new FormControl('0792077863', Validators.required),
      email: new FormControl('sadeem@capella.io', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      social: new FormControl('LinkedIn', Validators.required),
      nationality: new FormControl('Jordanian', Validators.required),
      major: new FormControl('', Validators.required),
      gpa: new FormControl('3.24', Validators.required),
      university: new FormControl('YU', Validators.required),
      degree: new FormControl('', Validators.required),
      otherUniversity: new FormControl(''),
      lastPosition: new FormControl('SE'),
      careerLevel: new FormControl('', Validators.required),
      experienceLevel: new FormControl('', Validators.required),
      experienceYears: new FormControl('1', Validators.required),
      joinDate: new FormControl('', Validators.required),
      applyingAs: new FormControl('SE'),
      expectedSalary: new FormControl('700', Validators.required),
      englishSkills: new FormControl('', Validators.required),
      attachments: new FormControl(''),
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
     console.log(this.candidateForm.status);
     if (this.candidateForm.status !== 'INVALID') {
           const gpa = this.candidateForm.get('gpa').value as number;
           const candidate: Candidates = {
        name: this.candidateForm.get('firstName').value + ' ' +  this.candidateForm.get('lastName').value,
        email:  this.candidateForm.get('email').value,
        gpA1: gpa <= 4 ? gpa : this.convertGpa(gpa),
        gpA2: gpa > 4 ? gpa : this.convertGpa(gpa),
        careerLevel: this.candidateForm.get('careerLevel').value,
        currentPosition: !!this.candidateForm.get('lastPosition').value ? this.candidateForm.get('lastPosition').value : '',
        cvAttachment: this.getUrlFromFilesList(this.filesList).toString(),
        degree: this.candidateForm.get('degree').value,
        expectedSalary: this.candidateForm.get('expectedSalary').value as number,
        devExperience: this.candidateForm.get('experienceYears').value as number,
        englishSkills: this.candidateForm.get('englishSkills').value,
        howDidYouFindUs: this.candidateForm.get('social').value,
        joinDate: this.candidateForm.get('joinDate').value,
        major: this.candidateForm.get('major').value,
        nationality: this.candidateForm.get('nationality').value,
        otherUniversity: this.candidateForm.get('otherUniversity').value,
        phoneNumber: this.candidateForm.get('mobile').value,
        technologies: this.technologies.toString(),
        university: this.candidateForm.get('university').value,
        teamLeaderExperience: 0,
        title: this.candidateForm.get('applyingAs').value
      };
           this.initializeForm();
           await this.candidatesService.insertCandidate(candidate);
     } else {
       console.log('complete form first!');
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
      console.log(file);
    });
    return files;
  }
}
