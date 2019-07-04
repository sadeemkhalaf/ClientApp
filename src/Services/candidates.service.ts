import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidates } from 'src/app/Models/candidates';

@Injectable({
  providedIn: 'root'
})

export class CandidatesService {

  constructor(private http: HttpClient) { }

  public getCandidates() {
   return this.http.get('https://localhost:44318/api/applicants');
  }

  // getById
  public getCandidate(id: number) {
    return this.http.get(`https://localhost:44318/api/applicants/${id}`);
   }

  // insert
  public async insertCandidate(candidates: Candidates) {
    console.log(candidates);
    return this.http.post<Candidates>('https://localhost:44318/api/applicants', candidates).toPromise();
  }

  // update
  public async updateCandidate(id: number, candidates: Candidates) {
    return this.http.put<Candidates>(`https://localhost:44318/api/applicants/${id}`, candidates).toPromise();
  }

  // delete
  public async deleteCandidate(id: number) {
    return this.http.delete(`https://localhost:44318/api/applicants/${id}`).toPromise();
  }

}
