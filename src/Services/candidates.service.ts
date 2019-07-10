import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidates } from 'src/app/Models/candidates';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CandidatesService {

  constructor(private http: HttpClient) { }

  public getCandidates() {
   return this.http.get('https://localhost:44318/api/applicants');
  }

  public getCandidate(id: number): Observable<Candidates> {
    return this.http.get<Candidates>(`https://localhost:44318/api/applicants/${id}`);
   }

  public async insertCandidate(candidates: Candidates) {
    return this.http.post<Candidates>('https://localhost:44318/api/applicants', candidates).toPromise();
  }

  public async updateCandidate(id: number, candidates: Candidates) {
    return this.http.put<Candidates>(`https://localhost:44318/api/applicants/${id}`, candidates).toPromise();
  }

  public async deleteCandidate(id: number) {
    return this.http.delete(`https://localhost:44318/api/applicants/${id}`).toPromise();
  }

    // Error handling
  private handleError( error: any ) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }

}
