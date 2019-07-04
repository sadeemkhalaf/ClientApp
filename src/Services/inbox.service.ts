import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InboxCandidates } from 'src/app/Models/InboxCandidates';
@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  public getAllInbox() {
   return this.http.get('https://localhost:44318/api/inbox');
  }

  // getById
  public getInboxCandidate(id: number) {
    return this.http.get(`https://localhost:44318/api/inbox/${id}`);
   }

  // insert
  public async insertInboxCandidate(candidates: InboxCandidates) {
    return this.http.post<InboxCandidates>('https://localhost:44318/api/inbox', candidates).toPromise();
  }

  // delete
  public async deleteInboxedCandidate(id: number) {
    return this.http.delete(`https://localhost:44318/api/inbox/${id}`).toPromise();
  }
}
