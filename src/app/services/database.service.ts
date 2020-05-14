import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


/*
  MODELS
*/
import { Bug } from '../models/bug';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private repositoriesCollection: AngularFirestoreCollection;

  private bugsRepositoryCollection: AngularFirestoreCollection;

  private bugsCollection: AngularFirestoreCollection;

  constructor(firestore: AngularFirestore) {
    this.repositoriesCollection = firestore.collection('repositories');

    this.bugsRepositoryCollection = firestore.collection('bugs', ref => ref.where('repository_id', '==', 'JC9m2GT33XF8nYFl30qZ'));

    this.bugsCollection = firestore.collection('bugs');
  }

  public getRespositories = (): Observable<any[]> => {
    return this.repositoriesCollection.snapshotChanges();
  }

  /**
   * BUGS
   */

  public getCurrentRepositoryBugs = (): Observable<any[]> => {
    return this.bugsRepositoryCollection.snapshotChanges();
  }

  public createBug = (data: Bug): Promise<any> => {
    return this.bugsCollection.add(this.transformData(data));
  }

  public updateBug = (data: Bug): Promise<any> => {
    if (!data || !data.id) {
      return Promise.reject('You must specify an id');
    }
    return this.bugsCollection.doc(data.id).update(this.transformData(data));
  }

  /**
   * HELPERS
   */

  private transformData = (data: any): any => {
    Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
    return data;
  }

}
