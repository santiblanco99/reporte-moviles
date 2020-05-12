import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('accordion') accordion: MatExpansionModule;

  showOpenAll : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleOpenClose = () => {
    this.showOpenAll = !this.showOpenAll;
  }

}
