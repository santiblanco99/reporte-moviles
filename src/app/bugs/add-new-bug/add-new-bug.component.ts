import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-add-new-bug',
  templateUrl: './add-new-bug.component.html',
  styleUrls: ['./add-new-bug.component.css']
})
export class AddNewBugComponent implements OnInit {

  titleValue: string;
  selectedFile: File;
  constructor() { }

  ngOnInit(): void {
  }

  public onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  public onUploadFile(): void {
    if (this.selectedFile) {

    }
  }

}
