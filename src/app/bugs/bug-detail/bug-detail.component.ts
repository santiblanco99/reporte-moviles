import { Component, OnInit, Input } from '@angular/core';
import { Bug } from 'src/app/models/bug';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['./bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

  @Input() bug: Bug = new Bug();
  bugImages: string[] = [];
  constructor(
    private firebaseStorage: FirebaseStorageService,
  ) { }

  ngOnInit(): void {
  }


}
