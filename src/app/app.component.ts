import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';
import {environment} from 'environments/environment';
import { ApiService } from './services/api-service.service';
import { BenefitYearPayload } from 'app/models/api.model';

import * as version from '../VERSION.generated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FPCare – Applicant Enrollment';


  constructor(private userService: UserService,
    private dummyDataService: DummyDataService,
    private fpcareDataService: FPCareDataService,
    private apiService: ApiService) {
  }

  ngOnInit() {
    // Testers have asked for Version to be logged with every build.
    if (version.success){
      console.log(version.message);
    }
    else {
      console.error(version.message);
    }


    if ( environment.useDummyData ) {

      // Purpose: Development
      this.fpcareDataService.applicant = this.dummyDataService.createApplicant();
      // console.log( 'applicant: ', this.fpcareDataService.applicant );
      this.fpcareDataService.spouse = this.dummyDataService.createSpouse();
      // console.log( 'spouse: ', this.fpcareDataService.spouse );
      this.fpcareDataService.dependants = this.dummyDataService.createChildren( 2 );
      // console.log( 'children: ', this.fpcareDataService.dependants );
    }

    if (environment.confirmOnExit){
      this.enableConfirmOnExit();
    }

    // Retrieve benefit year
    this.apiService.getBenefitYear().subscribe(response => {
      const payload = new BenefitYearPayload(response);
      // console.log( ' payload: ', payload );

      if (payload.success){
        this.fpcareDataService.benefitYear = payload.benefitYear;
        this.fpcareDataService.taxYear = payload.taxYear;
      }
    });
  }

  /**
   * Enables the confirm on exit/there are unsaved changes prompt when
   * navigating away or reloading the page. Has only been tested for FF/Chrome,
   * need to test for IE.
   *
   * Note: Due to browser security policies we are unable to control the
   * displayed text. Additionally, the prompt will not work if user has disabled
   * them in browser settings or has not yet interacted with the page.
   */
  enableConfirmOnExit(){
    window.addEventListener('beforeunload', function (event) {
      event.preventDefault(); // Most browsers, including FF
      event.returnValue = ''; // Chrome/Chromium based browsers still need this one.
    });
  }
}
