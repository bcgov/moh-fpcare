import { Component, OnInit } from '@angular/core';
import { FPCareDataService } from '../../../../services/fpcare-data.service';

@Component({
  selector: 'fpcare-applicant-professional',
  templateUrl: './applicant-professional.component.html',
  styleUrls: ['./applicant-professional.component.scss']
})
export class ApplicantProfessionalComponent implements OnInit {

  constructor(private dataService: FPCareDataService) { }

  ngOnInit() {
  }

  get applicant() {
    return this.dataService.user;
  }

}
