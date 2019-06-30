import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesServiceService {

  constructor(private http: HttpClient) { }

  public getApplicants() {
   return this.http.get('https://localhost:44318/api/applicants');
  }
}
