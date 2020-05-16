import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../services/database.service";
import { Router } from '@angular/router';

/*
  MODELS
*/
import { Bug } from '../models/bug';
import { Issue } from '../models/Issue';
import { IssuesService } from '../services/issues.service';
import { element } from 'protractor';
import { Author } from '../models/author';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  bugsList: Bug[];
  issues: Issue[];

  constructor(private issueService: IssuesService, private databaseService: DatabaseService, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    this.issues = [];
    this.issues = (await this.issueService.getIssues().toPromise()).map(element => {
      return {
        id: element.id,
        html_url: element.html_url,
        title: element.title,
        body: element.body,
        user: {
          id: element.user.id,
          login: element.user.login,
        } as Author,
        created_at: element.created_at,
        updated_at: element.updated_at,
      } as Issue
    });
    this.getAllBugsFromRepository();
  }

  getAllBugsFromRepository = () => {
    this.databaseService.getCurrentRepositoryBugs().subscribe(bugsResponse => {
      this.bugsList = bugsResponse.map(item => {
        const data = item.payload.doc.data();
        return <Bug>{
          id: item.payload.doc.id,
          issue: data.issue,
          description: data.description,
          title: data.title,
          is_resolved: data.is_resolved,
          priority: data.priority,
          repository_id: data.repository_id,
          multimedia_list: data.multimedia_list,
        };
      });
    })
  }


  handlerAddNewBug = () => {
    this.router.navigateByUrl('/bugs/add_new_bug');
  }


}
