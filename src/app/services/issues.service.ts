import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Issue } from '../models/Issue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  getIssues():Observable<Issue[]>{
    return this.http.get<Issue[]>("https://api.github.com/repos/appditto/natrium_wallet_flutter/issues");
  }
}
