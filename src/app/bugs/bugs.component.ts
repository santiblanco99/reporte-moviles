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
        return new Bug(item.payload.id, data.is_resolved, data.commit_id, data.description, data.title, data.priority, data.multimedia_list);
      })

    })
  }


  handlerAddNewBug = () => {
    this.router.navigateByUrl('/bugs/add_new_bug');
  }


}
