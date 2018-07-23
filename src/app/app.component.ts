import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';
import {Person} from './models/person.model';
import {environment} from '../environments/environment';


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

    if ( environment.useDummyData ) {

      // Purpose: Development - data set for personal information
      //this.fpcareDataService.applicant = this.dummyDataService.createApplicant();
      //this.fpcareDataService.spouse = this.dummyDataService.createSpouse();

      // Registration - eligibility
      this.fpcareDataService.applicant = this.dummyDataService.newApplicant();
      this.fpcareDataService.spouse = this.dummyDataService.newSpouse();
    }
  }
}
