import { Component, OnInit } from '@angular/core';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { Person } from '../../../../models/fpcare.models';
import { DummyDataService } from '../../../../services/dummy-data.service';

@Component({
  selector: 'fpcare-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {

  constructor(private fpcareDataService: FPCareDataService, private dummyDataService: DummyDataService) {}

  ngOnInit() {
    // TODO: Make sure this only fires once! Don't want to overwrite user behaviour.
    // TODO: Need to move this so it always excutes on ALL applicants, but only once. Maybe need ApplicantComponent like AppComponent?
    // ALTERNATIVELY: JUST REMOVE THIS! Users can fill it out themselves.
    // this.dummyDataService.setPersonToApplicant(this.applicant);
  }

  get applicant(): Person {
    return this.fpcareDataService.user;
  }



  get contactDone(): boolean {
    return this.applicant.hasContactInfo;
  }

  get professionalDone(): boolean {
    return !!this.applicant.license;
  }

  get accessAcceptanceDone(): boolean {
    return !!this.applicant.accessAcceptance;
  }

  updatesRequiringUserAction(): string[] {
    let result = [];

    if (!this.contactDone){
      result.push("Contact");
    }

    if (!this.professionalDone){
      result.push("Professional");
    }

    if (!this.accessAcceptanceDone){
      result.push("User Access Acceptance");
    }

    return result;
  }

  get updatesRequiringUserActionText(): string {
    let items = this.updatesRequiringUserAction();
    if (items.length === 0 ) return;
    if (items.length === 1 ) {
      return `Please update ${items[0]}`
    }
    else if (items.length > 1 ) {
      let beforeAnd: string[] = items.slice(0, items.length-1);
      let afterAnd: string = items[items.length - 1 ];

      return `Please update ${ beforeAnd.join(", ") } and ${afterAnd}`
    }
  }

}
