import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Commit } from '../models/commit';
import { HttpClient} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }

  constructor(private http: HttpClient) { }

  // getCommits() {
  //   return this.firestore.collection('commits').snapshotChanges();
  // }

  // createCommit(commit: Commit){
  //   return this.firestore.collection('commits').add(commit);
  // }

  getCommitsGit(){
    return this.http.get<[]>('https://api.github.com/repos/santiblanco99/reporte-moviles/commits');
  }
}
