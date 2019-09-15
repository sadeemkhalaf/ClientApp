import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Candidate, CandidatesStatusHistory, CandidateStatusDetails } from '../../Models/candidate';
import { statusStage1, statusStage2, statusStage3, statusStage4, statusStage5, statusStage6} from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CandidatesService } from 'src/Services/candidates.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-status-component',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnChanges {

  public pickedStatus: string;
  public status: string;
  public candidateStatusHistory: any[] = [];
  private id: number;
  private candidateStatusForm = new FormGroup({});
  // tslint:disable-next-line: variable-name
  private _statusStage1 = [];
  // tslint:disable-next-line: variable-name
  private _statusStage2 = [];
    // tslint:disable-next-line: variable-name
  private _statusStage3 = [];
    // tslint:disable-next-line: variable-name
  private _statusStage4 = [];
    // tslint:disable-next-line: variable-name
  private _statusStage5 = [];
    // tslint:disable-next-line: variable-name
  private _statusStage6 = [];

  @Input() $candidate: Candidate;
  @Input() $candidateStatusHistory: any[] = [];
  @Input() $candidateForm: FormGroup;
  @Output() $status: EventEmitter<CandidateStatusDetails> = new EventEmitter<CandidateStatusDetails>();

  constructor(private formBuilder: FormBuilder
            , private candidatesService: CandidatesService
            , private route: ActivatedRoute) {

    this.status = '';
    this.id = (this.route.snapshot.paramMap.get('id') as unknown as number);
    this.getCandidatesStatusHistory(this.id);
    this._statusStage1 = statusStage1;
    this._statusStage2 = statusStage2;
    this._statusStage3 = statusStage3;
    this._statusStage4 = statusStage4;
    this._statusStage5 = statusStage5;
    this._statusStage6 = statusStage6;

    this.candidateStatusForm = this.formBuilder.group({
      status: [''],
      toCallDate: [''],
      interviewDate: [''],
      applicationDate: [''],
      applicantStatusHistory: [''],
      time: [''],
      serializedDate: ['']
    }
      );
  }

  getStatusList(status: string): string[] {
    if (!!status) {
      status = status.toLowerCase();
      if ( status.includes('inbox') || status.includes('rejected')) {
        return this._statusStage1;
      } else if (  status.includes('scheduled') || status.includes('initial call') || status.includes('archive')) {
        return this._statusStage2;
      } else if ( status.includes('schedule') || status.includes('interview') ) {
        return this._statusStage3;
      } else if ( status.includes('to call') || status.includes('interviewed') || status.includes('hold') ) {
        return this._statusStage4;
      } else if ( status.includes('offer')) {
        return this._statusStage5;
      } else if ( status.includes('hired')) {
        return this._statusStage6;
      }
    } else {
        return this._statusStage1;
      }
  }

  getCandidatesStatusHistory(id: number) {
    this.candidatesService.getApplicantStatusHistory(id).toPromise().then(
      async (result: CandidatesStatusHistory[]) => {
        this.candidateStatusHistory = await result;
        this.pickedStatus = this.candidateStatusHistory[this.candidateStatusHistory.length - 1].status;
    },
    (error: any) => console.log(error));
  }

  ngOnInit() {
  }

  ngOnChanges(changes: import ('@angular/core').SimpleChanges): void {
    this.candidateStatusForm.valueChanges.subscribe((val) => {
      this.status = val.status;
      this.$status.emit(val);
    });
  }

}
