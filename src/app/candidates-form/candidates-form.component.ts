import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, ReplaySubject } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { Upload } from '../Models/upload';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  private filesList: Upload[] = [];
  private filesListEmpty: boolean = true;
  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = true;
  private filteredTechnologies: Observable<string[]>;
  private technologies: string[] = [];
  private allTechnologies: string[] = ['Java', 'C#', '.net core', 'Angular', 'Flutter', 'docker', 'JavaScript', 'ionic'];

  @ViewChild('TechnologiesInput', {static: false}) TechnologiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  private technologiesCtrl = new FormControl();
  private candidateForm = new FormGroup({
    firstName: new FormControl('sadeem', Validators.required),
    lastName: new FormControl('khalaf', Validators.required),
    mobile: new FormControl('0792077863', Validators.required),
    email: new FormControl('sadeem@capella.io', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    social: new FormControl('LinkedIn', Validators.required),
    nationality: new FormControl('JO', Validators.required),
    major: new FormControl('CS', Validators.required),
    gpa: new FormControl('3.3', Validators.required),
    university: new FormControl('YU', Validators.required),
    degree: new FormControl(''),
    otherUniversity: new FormControl(''),
    lastPosition: new FormControl(''),
    careerLevel: new FormControl(''),
    experienceLevel: new FormControl(''),
    experienceYears: new FormControl('1', Validators.required),
    joinDate: new FormControl('', Validators.required),
    applyingAs: new FormControl('SE'),
    expectedSalary: new FormControl('1000', Validators.required),
    englishSkills: new FormControl('', Validators.required),
    attachments: new FormControl(''),
  });

  constructor() {
    this.filteredTechnologies = this.technologiesCtrl.valueChanges.pipe(
      startWith(null),
      map((technology: string | null) => technology ? this._filter(technology) : this.allTechnologies.slice()));
   }
  ngOnInit() {}

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

  private onSubmit() {
    console.log(this.candidateForm.get('englishSkills').value, this.technologies);
  }

  private getFilesList(event: Upload[]) {
    event.forEach((fList) => {
      this.filesList.push(fList);
    });
  }
}
