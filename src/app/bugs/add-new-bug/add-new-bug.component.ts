import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Bug } from 'src/app/models/bug';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-bug',
  templateUrl: './add-new-bug.component.html',
  styleUrls: ['./add-new-bug.component.css']
})
export class AddNewBugComponent implements OnInit {

  titleValue: string;
  descriptionValue: string;
  filesList: File[];
  formData: FormData = new FormData();
  fileMsj: string = '';

  constructor(
    private database: DatabaseService,
    private firebaseStorage: FirebaseStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public onFileSelected(event): void {
    this.filesList = Array.from(event.target.files);
    console.log('fileslist', this.filesList);
    if (this.filesList && this.filesList.length > 0) {
      console.log('type', typeof this.filesList);

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

  public onSafeBug(): void {
    if (!this.titleValue) {
      alert('Debe seleccionar un título');
    } else {
      // TODO: Change the repository id 
      const bug: Bug = {
        title: this.titleValue,
        description: this.descriptionValue,
        repository_id: 'JC9m2GT33XF8nYFl30qZ',
        is_resolved: false,
        priority: 1
      }
      this.database.createBug(bug).then(response => {
        if (response) {
          const id = response.id;
          this.onUploadFile(id).then((_) => {
            alert('Bug creado exitosamente.');
            this.router.navigateByUrl('/bugs');
          }).catch(e => {
            console.error(e);
            alert('Ha ocurrido un error inesperado.')
          });

        }
      }).catch(e => console.error(e));
    }
  }

  public async onUploadFile(bug_id: string): Promise<number> {
    if (!bug_id) {
      return Promise.reject();
    }
    let filesUploaded = 0;
    if (this.filesList && this.filesList.length > 0) {
      for (const file of this.filesList) {
        const reference = this.firebaseStorage.getFileReference(file.name);
        const uploadTask = this.firebaseStorage.uploadBugFileTask(bug_id, file.name, file);
        await uploadTask.then((_) => filesUploaded++).catch(e => Promise.reject(e));
      }
    } else {
      this.fileMsj = 'Primero debe seleccionar una imágen.';
    }
    return filesUploaded;
  }

}
