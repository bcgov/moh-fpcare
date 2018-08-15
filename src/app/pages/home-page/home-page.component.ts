import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api-service.service';
import {FPCareDataService} from '../../services/fpcare-data.service';

@Component({
  selector: 'fpcare-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // API & FPCare Data Services to be removed after DEVELOPMENT
  constructor( private fpcareDataService: FPCareDataService
             , private apiService: ApiService ) { }

  ngOnInit() {
  }


  // To be removed at end of development
  request() {
    // Test API End to End works. In the future we will store the calendar data in a service as it's necessary for the app.
    // Remove after testing complete
    this.apiService.getBenefitYear().subscribe(data => {
      console.log('ApiService getCalendar', data);
    });
  }

  checkStatusRegNum() {
    // Test API End to End works.
    // Remove after testing complete
    this.apiService.statusCheckFamNumber( 'A127653497', this.fpcareDataService.benefitYear ).subscribe(data => {
      console.log('ApiService statusCheckFamNumber', data);
    });
  }

  checkStatusPHN() {
    // Test API End to End works.
    // Remove after testing complete
    console.error('todo! commented out');
    // this.apiService.statusCheckPHN( '9373028835', '19741123', 'V8V8V8', this.fpcareDataService.benefitYear ).subscribe(data => {
    //   console.log('ApiService statusCheckFamNumber', data);
    // });
  }
}
