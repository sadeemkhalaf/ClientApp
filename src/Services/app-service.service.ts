import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CandidatesService } from './candidates.service';
import { Candidates } from 'src/app/Models/candidates';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public titleOnNav: Subject<string> = new Subject<string>();
  constructor() { }

}
