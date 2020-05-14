import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage) { }

  public uploadBugFileTask(bug_id: string, fileName: string, data: any) {
    if (!bug_id || !fileName || !data) {
      return null;
    }
    return this.storage.upload(`bugs/${bug_id}/${fileName}`, data);
  }

  public getFileReference(fileName) {
    return this.storage.ref(fileName);
  }
}
