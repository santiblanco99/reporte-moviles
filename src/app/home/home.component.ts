import { Component, OnInit } from '@angular/core';
import { CommitsService } from '../services/commits.service';
import { Commit } from '../models/commit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commits: Commit[];

  prueba: [];

  dataReady: boolean;

  constructor(private commitService: CommitsService) { }

  ngOnInit(): void {
    // this.commitService.getCommits().subscribe(data =>{
    //   this.commits = data.map(e =>{
    //   return {
    //     id: e.payload.doc.id,
    //     ...e.payload.doc.data() as object
    //   } as Commit;
    //   });
    // });
    this.dataReady = false;
    this.commitService.getCommitsGit().subscribe(data=>{
      console.log(data);
      this.prueba = data;
      this.dataReady = true;

    });
  }


}
