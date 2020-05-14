
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

/**
 * COMPONENTS
 */
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';
import { ReleasesComponent } from './releases/releases.component';
import { BugsComponent } from './bugs/bugs.component';
import { IntroductionComponent } from './components/contentElement/introduction/introduction.component';
import { DesignComponent } from './components/contentElement/design/design.component';


/**
  MATERIAL MODULES
*/
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RepositoryComponent } from './components/contentElement/repository/repository.component';
import { EventualConnectivityComponent } from './components/contentElement/eventual-connectivity/eventual-connectivity.component';
import { StorageComponent } from './components/contentElement/storage/storage.component';
import { SecurityComponent } from './components/contentElement/security/security.component';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

// //http
import { HttpClientModule } from '@angular/common/http';
import { BugDetailComponent } from './bugs/bug-detail/bug-detail.component';
import { AddNewBugComponent } from './bugs/add-new-bug/add-new-bug.component';

//charts
import { ChartsModule } from 'ng2-charts';

//Forms
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    AboutComponent,
    ReportComponent,
    ReleasesComponent,
    BugsComponent,
    IntroductionComponent,
    DesignComponent,
    RepositoryComponent,
    EventualConnectivityComponent,
    StorageComponent,
    SecurityComponent,
    BugDetailComponent,
    AddNewBugComponent
  ],
  imports: [
    BrowserModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,

    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
