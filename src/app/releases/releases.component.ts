import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../services/releases.service';
import { Release } from '../models/release';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  releases: Release[];
  releaseSizes: number[];
  dataReady: boolean;
  constructor(private releasesService: ReleasesService) { }

  async ngOnInit(): Promise<void> {
    // this.releaseSizes = [];
    // this.dataReady = false;
    // this.releasesService.getReleasesGit().subscribe(data => {
    //   console.log(data[0].assets_url);

    //   this.releases = data;
    //   this.releases.forEach(element => {
    //     let date = new Date(element.published_at);
    //     element.published_at = date;
    //     this.releasesService.getReleaseAssets(element.assets_url).subscribe(assets=>{
    //       element.assets = assets;
    //       this.releaseSizes.push(element.assets[0].size);
    //       console.log(this.releaseSizes);
    //       this.lineChartData = [{ data: this.releaseSizes, label: 'Series A' }];
    //     });
    //     this.releasesService.getReleasesGit().toPromise()

    //   });
    //   this.dataReady = true;
    //   console.log(this.releases[0].assets[0].size);
    // });

    this.releaseSizes = [];
    this.dataReady = false;

    let data = await this.releasesService.getReleasesGit().toPromise();

      this.releases = data;
      this.releases.forEach(async element => {
        let date = new Date(element.published_at);
        element.published_at = date;
        let assets = await this.releasesService.getReleaseAssets(element.assets_url).toPromise();
        console.log(assets);
        element.assets = assets;
        if(assets.length>0){
          this.releaseSizes.push(assets[0].size);
        }
      });
      this.dataReady = true;
  }

  //Chart Info
  public lineChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
