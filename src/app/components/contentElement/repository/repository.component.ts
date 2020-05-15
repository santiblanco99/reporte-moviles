import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Dependency } from 'src/app/models/dependency';
import { Repository } from 'src/app/models/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  readmeHtml: any;
  readmeReady: boolean
  dataReady: boolean

  repository: Repository;

  dependencies: Dependency[];

  constructor(private repoService: RepositoryService, private dbService: DatabaseService) {
    this.readmeReady = false;
  }
  async ngOnInit(): Promise<void> {
    
    this.dataReady = false;
    this.getRepositoryReadme();
    console.log("skjdfs");
    this.dbService.getDependencies().subscribe(data=>{
      console.log('hey');
      this.dependencies = data.map(element => {
        const data = element.payload.doc.data();
        return {
          title: data.title,
          desc: data.desc
        } as Dependency
      });
    })
    
    this.repository = await this.repoService.getRepository().toPromise();
    let date = this.repository.updated_at;
    console.log("hola");
    console.log(date.toLocaleDateString);
    let formattedDate = new Date(date);
    this.repository.updated_at = formattedDate;
    this.dataReady = true;
  }

  getRepositoryReadme = () => {
    this.repoService.getRepoInfo().subscribe(data => {
      this.readmeHtml = data;
    });
  }

  handleReadmeClicked = () => {
    if (this.readmeHtml) {
      this.readmeReady = !this.readmeReady;
    } else {
      alert('Ha ocurrido un error cargando el README')
    }
  }


}
