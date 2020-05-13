import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
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

  public getCurrentRepositoryBugs = (): Observable<any[]> => {
    return this.bugsRepositoryCollection.snapshotChanges();
  }

  public createBug = (data: Bug): Promise<any> => {
    return this.bugsCollection.add(data);
  }

}
