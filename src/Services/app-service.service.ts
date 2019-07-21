import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public titleOnNav: Subject<string> = new Subject<string>();
  constructor() { }

}
