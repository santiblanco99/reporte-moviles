import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Release } from '../models/release';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private http: HttpClient) { }

  getReleasesGit(){
    return this.http.get<Release[]>('https://api.github.com/repos/appditto/natrium_wallet_flutter/releases');
  }

  getReleaseAssets(assets_url: string){
    return this.http.get<Asset[]>(assets_url);
  }
}
