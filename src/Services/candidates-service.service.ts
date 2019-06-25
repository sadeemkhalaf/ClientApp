import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidates } from './../app/Models/candidates';


@Injectable({
  providedIn: 'root'
})
export class CandidatesServiceService {

  constructor(private http: HttpClient) { }

  public getApplicants() {
    return this.http.get('https://localhost:44318/api/applicants');
  }
}
