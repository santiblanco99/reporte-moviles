import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  constructor(private repoService: RepositoryService) { }
  html: any;
  dataReady: boolean
  ngOnInit(): void {
    this.dataReady = false;
    this.repoService.getRepoInfo().subscribe(data=>{
      console.log(data);
      this.html = data;
      this.dataReady = true;
    });

  }

}
