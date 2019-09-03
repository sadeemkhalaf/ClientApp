import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate, CandidatesStatusHistory } from 'src/app/Models/candidate';
import { throwError, Observable } from 'rxjs';
import { CandidateFiles } from 'src/app/Models/CandidateFiles';
import { EducationDetails } from 'src/app/Models/EducationDetails';
import { API , environment} from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class CandidatesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  // candidates

  private fbReference = firebase.database().ref().ref;
  private getRef = this.db;
  public getCandidates() {
    return this.db.list('/').valueChanges();
    // return this.db.list('/').valueChanges();
    // return this.http.get(`${API}/applicants`);
  }

  public getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${API}/applicants/${id}`);
   }

  public async insertCandidate(candidates: Candidate) {
    return this.http.post<Candidate>(`${API}/applicants`, candidates).toPromise();
  }

  public async updateCandidate(id: number, candidates: Candidate) {
    return this.http.put<Candidate>(`${API}/applicants/${id}`, candidates).toPromise();
  }

  public async deleteCandidate(id: number) {
    return this.http.delete(`${API}/applicants/${id}`).toPromise();
  }

  public getApplicantStatusHistory(id: number) {
    return this.http.get<CandidatesStatusHistory[]>(`${API}/applicantStatusHistory/${id}`);
  }
  public getApplicantCountByStatus(status: string) {
    return this.http.get<number>(`${API}/applicants/count/${status}`);
  }

  public async getApplicantByStatus(status: string) {
    return this.http.get(`${API}/applicants/status/${status}`);
  }

  // eduacationDeatils
  public addEducationDetails(educationDetailsList: EducationDetails[]) {
    return this.http.post<EducationDetails[]>(`${API}/ApplicantEducationDetails`, educationDetailsList).toPromise();
  }

  public getEducationDetailsList(applicantId: number) {
    return this.http.get<EducationDetails[]>(`${API}/ApplicantEducationDetails/${applicantId}`);
  }

  public editEducationDetailsField(educationDetails: EducationDetails) {
    return this.http.put<EducationDetails>(`${API}/ApplicantEducationDetails/${educationDetails.id}`
    , educationDetails).toPromise();
  }

  public deleteEducationDetailsField(id: number) {
    return this.http.delete(`${API}/ApplicantEducationDetails/${id}`).toPromise();
  }

  // files
  public addFiles(candidateFilesList: CandidateFiles[]) {
    return this.http.post<CandidateFiles[]>(`${API}/ApplicantFiles`, candidateFilesList).toPromise();
  }

  public getFilesList(applicantId: number) {
    return this.http.get<CandidateFiles[]>(`${API}/ApplicantFiles/${applicantId}`);
  }

  public getFile(applicantId: number, id: number) {
    return this.http.get<CandidateFiles>(`${API}/ApplicantFiles/${applicantId}/${id}`);
  }

  public deletefile(id: number) {
    return this.http.delete(`${API}/ApplicantFiles/${id}`).toPromise();
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
