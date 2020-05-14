import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('accordion') accordion: MatExpansionModule;

  showOpenAll: boolean = true;
  commonImages: string[];

  constructor(
    private firebaseStorage: FirebaseStorageService
  ) { }

  ngOnInit(): void {
    this.loadCommonImages();
  }

  handleOpenClose = () => {
    this.showOpenAll = !this.showOpenAll;
  }

  loadCommonImages = () => {
    let tempList = [];
    this.firebaseStorage.getFileReference('common/').listAll().subscribe(async list => {
      for (let item of list.items) {
        let url = await item.getDownloadURL().catch(e => {
          console.error(e);
          return null;
        });
        if (url) {
          tempList.push({
            name: item.name,
            url
          });
        }
      }
      this.commonImages = [...tempList];
    })
  }

}
