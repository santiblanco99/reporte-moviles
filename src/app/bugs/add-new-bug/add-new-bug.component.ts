import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Bug } from 'src/app/models/bug';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-new-bug',
  templateUrl: './add-new-bug.component.html',
  styleUrls: ['./add-new-bug.component.css']
})
export class AddNewBugComponent implements OnInit {

  titleValue: string;
  descriptionValue: string;
  priorityValue: string = '1';
  filesList: File[];
  formData: FormData = new FormData();
  fileMsj: string = '';

  constructor(
    private database: DatabaseService,
    private firebaseStorage: FirebaseStorageService,
    private _location: Location,
    private router: Router) { }

  ngOnInit(): void {
  }

  public onFileSelected(event): void {
    this.filesList = Array.from(event.target.files);
    if (this.filesList && this.filesList.length > 0) {
      if (!this.filesList.find(item => !item.type.includes('image/'))) {
        this.fileMsj = 'Archivos seleccionados exitosamente';
      } else {
        this.filesList = [];
        this.fileMsj = 'Todos los archivos deben ser imágenes.';
      }
    } else {
      this.fileMsj = 'No se seleccionó ningún archivo.';
    }
  }

  public async onSafeBug(): Promise<void> {
    if (!this.titleValue) {
      alert('Debe seleccionar un título');
    } else {
      // TODO: Change the repository id 
      let bug: Bug = new Bug();
      bug = {
        ...bug,
        title: this.titleValue,
        description: this.descriptionValue,
        repository_id: 'JC9m2GT33XF8nYFl30qZ',
        is_resolved: false,
        priority: Number(this.priorityValue)
      }
      const onError = e => {
        console.error(e);
        alert('Ha ocurrido un error inesperado.');
      };
      await this.database.createBug(bug).then(response => {
        if (response) {
          const id = response.id;
          bug.id = id;
          this.onUploadFile(id).then(async (_) => {
            this.loadBugImages(bug).then((_) => {
              alert('Bug creado exitosamente.');
              this.router.navigateByUrl('/bugs');
            }).catch(onError);
          }).catch(onError);
        }
      }).catch(onError);
      
    }
  }

  public async onUploadFile(bug_id: string): Promise<number> {
    if (!bug_id) {
      return Promise.reject();
    }
    let filesUploaded = 0;
    if (this.filesList && this.filesList.length > 0) {
      for (const file of this.filesList) {
        const uploadTask = this.firebaseStorage.uploadBugFileTask(bug_id, file.name, file);
        await uploadTask.then((_) => filesUploaded++).catch(e => Promise.reject(e));
      }
    } else {
      this.fileMsj = 'Primero debe seleccionar una imágen.';
    }
    return filesUploaded;
  }


  private async loadBugImages(bug: Bug): Promise<any> {
    if (bug && bug.id) {
      const reference = this.firebaseStorage.getFileReference('bugs/' + bug.id);
      let bugImages: string[] = [];
      reference.listAll().subscribe(async list => {
        for (const item of list.items) {
          const url = await item.getDownloadURL().catch(e => {
            console.error(e);
            return null;
          });
          if (url) {
            bugImages.push(url);
          }
        }
        if (bugImages.length > 0) {
          bug.multimedia_list = [...bugImages];
          return await this.database.updateBug(bug);
        } else {
          return Promise.resolve();
        }
      }, e => {
        return Promise.reject(e);
      })
    }
  }

  public onCancel(): void {
    this._location.back();
  }

}
