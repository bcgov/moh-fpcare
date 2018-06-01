import { Component, OnInit } from '@angular/core';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { DummyDataService } from '../../../../services/dummy-data.service';
import { Person } from '../../../../models/fpcare.models';

@Component({
  selector: 'fpcare-applicant-contact',
  templateUrl: './applicant-contact.component.html',
  styleUrls: ['./applicant-contact.component.scss']
})
export class ApplicantContactComponent implements OnInit {

  constructor(private fpcareDataService: FPCareDataService, private dummyDataService: DummyDataService) { }


  ngOnInit() {
    // DEV ONLY! TODO: Remove.
    // this.applicant = this.dummyDataService.createPeople(1)[0];
  }

  get applicant(): Person {
    return this.fpcareDataService.user;
  }

}
