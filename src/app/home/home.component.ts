import { Component, OnInit } from '@angular/core';
import { CommitsService } from '../services/commits.service';
import { Commit } from '../models/commit';
import { DatabaseService } from '../services/database.service';
import { HighlightResult } from 'ngx-highlightjs';
import { RepositoryService } from '../services/repository.service';
import { PullRequest } from '../models/pullRequest';
import { PullRequestComment } from '../models/pullRequestComment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commits: Commit[];

  prueba: [];

  dataReady: boolean;

  pullRequest: PullRequest;

  comments: PullRequestComment[];


  constructor(private repoService: RepositoryService, private databaseService: DatabaseService) { }

  async ngOnInit(): Promise<void> {
    this.dataReady = false;
    this.pullRequest = await this.repoService.getPullRequest().toPromise();
    this.comments = await this.repoService.getPullRequestComments().toPromise();
    console.log(this.pullRequest);
    console.log(this.comments);
    this.dataReady = true;

  }
  response: HighlightResult;

  code1 = `/// -- CONECTIVITY ISSUES
  String get noNetworkConnection {
    return Intl.message('Check your network connection!',
        desc: 'home_network_connection_failed', name: 'noNetworkConnection');
  }`

  code2 = `Future<void> initConnectivity() async {
    ConnectivityResult result;
    try {
      result = await _connectivity.checkConnectivity();
    } on PlatformException catch (e) {
      log.e("Failed to recover connectivity status \${e.toString()}");
    }
    if (!mounted) {
      return Future.value(null);
    }
    return _updateConnectionStatus(result);
  }

  void _updateConnectionStatus(ConnectivityResult result) async {
    if (result == ConnectivityResult.none) {
      if (mounted) {
        setState(() {
          _connectivityErrorMsj =
              AppLocalization.of(context).noNetworkConnection;
        });
      }
    } else if (result != null) {
      if (mounted) {
        setState(() {
          _connectivityErrorMsj = '';
        });
      }
    }
  }`

  language = ["dart"];

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }


}
