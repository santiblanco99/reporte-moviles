import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  readmeHtml: any;
  readmeReady: boolean

  constructor(private repoService: RepositoryService) {
    this.readmeReady = false;
  }
  ngOnInit(): void {
    this.getRepositoryReadme();
  }

  getRepositoryReadme = () => {
    this.repoService.getRepoInfo().subscribe(data => {
      this.readmeHtml = data;
    });
  }

  handleReadmeClicked = () => {
    if (this.readmeHtml) {
      this.readmeReady = !this.readmeReady;
    } else{
      alert('Ha ocurrido un error cargando el README')
    }
  }

}
