import { Component, OnInit } from '@angular/core';
import { Octokit } from "@octokit/rest";

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  octokit;
  user;
  constructor() {
    const accessToken = '0fec170cc23bf494e1a14056c8a54c21e5561423';
    const repositoryName = 'natrium_wallet_flutter';
    this.octokit = new Octokit({
      auth: accessToken,
      userAgent: 'GithubFetching v1.2.3',
      baseUrl: 'https://api.github.com',
    });

  }

  ngOnInit(): void {
    this.getUser().then(user => {
      console.log('user ', user);
    }).catch(e => console.error(e));

  }

  getUser = async () => {
    if (!this.octokit)
      return Promise.reject();
    const { data } = await this.octokit.users.getByUsername({
      username: 'sergioyepes21'
    });
    return Promise.resolve(data);
  }

}
