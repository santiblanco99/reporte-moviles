import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {
  
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name:'Inicio',
      route: '',
      icon: 'home'
    },
    {
      name:'Reporte',
      route: '/report',
      icon: 'assignment'
    },
    {
      name:'Releases',
      route: '/releases',
      icon: 'new_releases'
    },
    {
      name:'Bugs detectados',
      route: '/bugs',
      icon: 'bug_report'
    },
    {
      name:'Acerca',
      route: '/about',
      icon: 'info'
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
