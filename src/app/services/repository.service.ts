import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }


  getRepoInfo(){

    return this.http.get('https://api.github.com/repos/appditto/natrium_wallet_flutter/readme',{
      headers: new HttpHeaders({
        'Content-Type': 'text/html',
        'Accept': 'application/vnd.github.html',
      }),
      responseType: 'text'
    });
  }
}
