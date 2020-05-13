import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { Release } from '../models/release';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  releases: Release[];
  dataReady: boolean;
  constructor(private releasesService: ReleasesService) { }

  ngOnInit(): void {
    this.dataReady = false;
    this.releasesService.getReleasesGit().subscribe(data=>{
      console.log(data.length);

      this.releases = data;
      this.releases.forEach(element=>{
        let date = new Date(element.published_at);
        element.published_at = date;
      });
      this.dataReady = true;
    });
  }

}
