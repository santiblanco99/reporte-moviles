import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Dependency } from 'src/app/models/dependency';
import { Repository } from 'src/app/models/repository';
import { AuthorCommits } from 'src/app/models/authorCommits';

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

  authorCommits: AuthorCommits[];

  constructor(private repoService: RepositoryService, private dbService: DatabaseService) {
    this.readmeReady = false;
  }
  async ngOnInit(): Promise<void> {

    this.dataReady = false;
    this.getRepositoryReadme();
    console.log("skjdfs");
    this.dbService.getDependencies().subscribe(data => {
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

    //Get commits by author
    // let commitData = await this.repoService.getCommitsbyAuthor().toPromise();
    // this.authorCommits = commitData.map(element=>{
    //   return {
    //     author: element.author,
    //     total: element.total
    //   } as AuthorCommits
    // });
    // this.authorCommits.forEach(async authorCommit =>{
    //   await this.dbService.createAuthorCommit(authorCommit);
    // });
    this.dbService.getAuthorCommits().subscribe(commitData => {
      this.authorCommits = commitData.map(element => {
        let data = element.payload.doc.data();
        return {
          author: data.author,
          total: data.total
        } as AuthorCommits;
      });
      console.log("AuhtorCommits:");
      console.log(this.authorCommits);
      this.dataReady = true;
    });

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
