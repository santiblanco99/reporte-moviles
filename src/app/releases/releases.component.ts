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
  releaseDates: string[];
  dataReady: boolean;
  lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];


  constructor(private releasesService: ReleasesService) { }

  async ngOnInit(): Promise<void> {
  

    this.releaseSizes = [];
    this.releaseDates = [];
    this.dataReady = false;
    // console.log(localStorage.getItem('releasesizes'));
    // console.log(localStorage.getItem('releaseDates'));
    // let releasesizesTemp = JSON.parse('['+localStorage.getItem('releasesizes')+']');
    // let releaseDatesTemp = localStorage.getItem('releaseDates').split(',');

   

    let data = await this.releasesService.getReleasesGit().toPromise();

    this.releases = data;
    for(var i = 0; i < this.releases.length;i++) {
      let element = this.releases[i];
      let date = new Date(element.published_at);
      element.published_at = date;
      let assets = await this.releasesService.getReleaseAssets(element.assets_url).toPromise();
      element.assets = assets;
      if (assets.length > 0) {
        this.releaseSizes.push(assets[0].size/1000000);
        this.releaseDates.push(element.published_at.toLocaleDateString());
      }
    }
    this.lineChartData = [
      { data: this.releaseSizes.reverse(), label: 'Tamaño Release (MB)' }
    ];
    this.lineChartLabels = this.releaseDates.reverse();
    // console.log(this.releaseSizes.toString());
    // localStorage.setItem('releasesizes',this.releaseSizes.toString());
    // localStorage.setItem('releaseDates',this.releaseDates.toString());
    // console.log(localStorage.getItem('releasesizes'));
    // console.log(JSON.parse('['+localStorage.getItem('releasesizes')+']'));
    this.dataReady = true;

    


  }

  //Chart Info
  // public lineChartData: ChartDataSets[] = [
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Tamaño Release' },
  //   // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  // ];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'];

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
            fontColor: 'grey',
          }
        }
      ]
    },
    annotation: {
      annotations: [],
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
