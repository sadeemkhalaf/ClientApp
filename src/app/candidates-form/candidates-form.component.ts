import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = true;
  private filteredTechnologies: Observable<string[]>;
  private technologies: string[] = ['c#'];
  private allTechnologies: string[] = ['Java', 'C#', '.net core', 'Angular', 'Flutter', 'docker', 'JavaScript', 'ionic'];

  @ViewChild('TechnologiesInput', {static: false}) TechnologiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  private technologiesCtrl = new FormControl();
  private candidateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    countryCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    social: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    major: new FormControl('', Validators.required),
    gpa: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    otherUniversity: new FormControl(''),
    lastPosition: new FormControl(''),
    careerLevel: new FormControl('', Validators.required),
    experienceLevel: new FormControl('', Validators.required),
    applyingAs: new FormControl('', Validators.required),
    expectedSalary: new FormControl('', Validators.required),
    englishSkills: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
  });


  constructor() {
    this.filteredTechnologies = this.technologiesCtrl.valueChanges.pipe(
      startWith(null),
      map((technology: string | null) => technology ? this._filter(technology) : this.allTechnologies.slice()));
   }
  ngOnInit() {}

  add(event: MatChipInputEvent): void {
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

  remove(technology: string): void {
    const index = this.technologies.indexOf(technology);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologies.push(event.option.viewValue);
    // this.TechnologiesInput.nativeElement = '';
    this.technologiesCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTechnologies.filter(tech => tech.toLowerCase().indexOf(filterValue) === 0);
  }
}
