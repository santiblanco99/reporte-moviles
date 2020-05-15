import { Component, OnInit, Input } from '@angular/core';
import { Bug } from 'src/app/models/bug';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Issue } from 'src/app/models/Issue';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['./bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

  @Input() bug: Bug = new Bug();
  @Input() issues: Issue[] = [];
  bugImages: string[] = [];
  showIssues: boolean;
  selectedIssue: Issue;

  constructor(
    private firebaseStorage: FirebaseStorageService, private dbService: DatabaseService
  ) { }

  async ngOnInit(): Promise<void> {
  }

  toggleIssues(){
    this.showIssues = !this.showIssues;
    console.log(this.showIssues);
  }

  selectIssue(issue:Issue){
    console.log(issue);
    this.selectedIssue = issue;
  }

  async updateIssueBug(){
    if(this.selectedIssue == undefined){
      alert('debe seleccionar un issue primero');
      return;
    }
    this.bug.issue = this.selectedIssue;
    try{
      await this.dbService.updateBug(this.bug);
      alert('¡Bug actualizado!');
    }
    catch(e){
      console.log(e);
      alert('Hubo un error actualizando el bug');
    }
  }


}
