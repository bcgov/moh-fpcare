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

}
