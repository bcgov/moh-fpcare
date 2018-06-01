import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DummyDataService } from './services/dummy-data.service';
import { environment } from './../environments/environment';
import 'rxjs/add/operator/filter';

// import { EnrollmentRowItem, EnrollmentRowChild, EnrollmentStatus, BadgeLevel } from './core/enrollment-row/enrollment-row.interface';
// import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FPCare – Applicant Enrollment';


  constructor(private userService: UserService,
    private dummyDataService: DummyDataService,
    private fpcareDataService: FPCareDataService ) {
  }

  ngOnInit() {
    const dummyCollections = this.dummyDataService.createCollectionsWithSites([
      "London Drugs - North",
      "London Drugs - South",
      "Rexall Vancouver Island - All",
      "SDM Vancouver Island"
    ], 5);
    const dummyPeople = this.dummyDataService.createPeople(5);
    const dummySites = [].concat(... dummyCollections.map(collection => collection.members)); //flatten array

    // Create Site Access objects + associate with people/collections
    dummyCollections.map(collection => {
      const SA = this.dummyDataService.populateSiteAccessFromCollection(collection, dummyPeople)
      this.fpcareDataService.siteAccesses.push(... SA);
    });

    this.fpcareDataService.collections = dummyCollections;
    this.fpcareDataService.sites = dummySites;
    this.fpcareDataService.people = dummyPeople;
  }
}
