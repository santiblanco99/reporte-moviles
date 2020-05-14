import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../services/database.service";
import { BugDetailComponent } from "./bug-detail/bug-detail.component";
import { Router } from '@angular/router';

/*
  MODELS
*/
import { Bug } from '../models/bug';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  bugsList: Bug[];

  constructor(private databaseService: DatabaseService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllBugsFromRepository();
  }

  getAllBugsFromRepository = () => {
    this.databaseService.getCurrentRepositoryBugs().subscribe(bugsResponse => {
      this.bugsList = bugsResponse.map(item => {
        const data = item.payload.doc.data();
        return <Bug>{
          id: item.payload.doc.id,
          commit_id: data.commit_id,
          description: data.description,
          title: data.title,
          is_resolved: data.is_resolved,
          priority: data.priority,
          repository_id: data.repository_id,
          multimedia_list: data.multimedia_list
        };
      });
    })
  }


  handlerAddNewBug = () => {
    this.router.navigateByUrl('/bugs/add_new_bug');
  }


}
