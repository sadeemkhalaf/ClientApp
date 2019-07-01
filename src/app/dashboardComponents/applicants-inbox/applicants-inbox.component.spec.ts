import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsInboxComponent } from './applicants-inbox.component';

describe('ApplicantsInboxComponent', () => {
  let component: ApplicantsInboxComponent;
  let fixture: ComponentFixture<ApplicantsInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
