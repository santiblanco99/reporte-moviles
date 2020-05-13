import { Component, OnInit } from '@angular/core';
import { CommitsService } from '../services/commits.service';
import { Commit } from '../models/commit';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commits: Commit[];

  prueba: [];

  dataReady: boolean;

  repositoriesFromDatabase;


  constructor(private commitService: CommitsService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    // this.dataReady = false;
    // this.commitService.getCommitsGit().subscribe(data => {
    //   this.prueba = data;
    //   this.dataReady = true;
    // });
    // this.getRespositoriesFromDatabase();

  }

  getRespositoriesFromDatabase = () => {
    this.databaseService.getRespositories().subscribe(repositoriesResponse => {
      this.repositoriesFromDatabase = repositoriesResponse.map(item => {
        return {
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        }
      });
    })
  }


}
