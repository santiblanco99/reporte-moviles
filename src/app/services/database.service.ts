import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


/*
  MODELS
*/
import { Bug } from '../models/bug';
import { AuthorCommits } from '../models/authorCommits';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private repositoriesCollection: AngularFirestoreCollection;

  private bugsRepositoryCollection: AngularFirestoreCollection;

  private bugsCollection: AngularFirestoreCollection;

  private dependencies: AngularFirestoreCollection;

  private authorCommits: AngularFirestoreCollection;

  constructor(firestore: AngularFirestore) {
    this.repositoriesCollection = firestore.collection('repositories');

    this.dependencies = firestore.collection('dependencies');

    this.bugsRepositoryCollection = firestore.collection('bugs', ref => ref.where('repository_id', '==', 'JC9m2GT33XF8nYFl30qZ'));

    this.bugsCollection = firestore.collection('bugs');

    this.authorCommits = firestore.collection("authorCommits");
  }

  public getRespositories = (): Observable<any[]> => {
    return this.repositoriesCollection.snapshotChanges();
  }

  /**
   * DEPENDENCIES
   */
  public getDependencies = (): Observable<any[]> => {
    return this.dependencies.snapshotChanges();
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
   * authorCommits
   */
  public createAuthorCommit = (data: AuthorCommits): Promise<any> => {
    return this.authorCommits.add(this.transformData(data));
  }

  public getAuthorCommits = (): Observable<any[]> => {
    return this.authorCommits.snapshotChanges();
  }

  /**
   * HELPERS
   */

  private transformData = (data: any): any => {
    Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
    return data;
  }

}
