import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import {Repository} from "../models/repository";
import { PullRequest } from '../models/pullRequest';
import { PullRequestComment } from '../models/pullRequestComment';
import { Author } from '../models/author';
import { AuthorCommits } from '../models/authorCommits';

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

  getRepository(){
    return this.http.get<Repository>("https://api.github.com/repos/appditto/natrium_wallet_flutter");
  }

  getPullRequest(){
    return this.http.get<PullRequest>("https://api.github.com/repos/appditto/natrium_wallet_flutter/pulls/72");
  }

  getPullRequestComments(){
    return this.http.get<PullRequestComment[]>("https://api.github.com/repos/appditto/natrium_wallet_flutter/issues/72/comments");
  }

  getCommitsbyAuthor(){
    return this.http.get<AuthorCommits[]>("https://api.github.com/repos/appditto/natrium_wallet_flutter/stats/contributors");
  }
}
