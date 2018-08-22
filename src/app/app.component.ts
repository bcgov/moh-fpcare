import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './services/dummy-data.service';
import { UserService } from './services/user.service';
import { FPCareDataService } from './services/fpcare-data.service';
import {environment} from 'environments/environment';
import { ApiService } from './services/api-service.service';
import { BenefitYearPayload } from 'app/models/api.model';


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

    if ( environment.useDummyData ) {

      // Purpose: Development
      this.fpcareDataService.applicant = this.dummyDataService.createApplicant();
      // console.log( 'applicant: ', this.fpcareDataService.applicant );
      this.fpcareDataService.spouse = this.dummyDataService.createSpouse();
      // console.log( 'spouse: ', this.fpcareDataService.spouse );
      this.fpcareDataService.dependants = this.dummyDataService.createChildren( 2 );
      // console.log( 'children: ', this.fpcareDataService.dependants );
    }

    // Retrieve benefit year
    this.apiService.getBenefitYear().subscribe(response => {
      const payload = new BenefitYearPayload(response);
      console.log( ' payload: ', payload );

      if (payload.success){
        this.fpcareDataService.benefitYear = payload.benefitYear;
        this.fpcareDataService.taxYear = payload.taxYear;
      }
    });
  }
}
