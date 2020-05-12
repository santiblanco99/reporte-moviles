import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Release } from '../models/release';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private http: HttpClient) { }

  getReleasesGit(){
    return this.http.get<Release[]>('https://api.github.com/repos/appditto/natrium_wallet_flutter/releases');
  }
}
