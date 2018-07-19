import { Component, OnInit } from '@angular/core';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-request-consent',
  templateUrl: './request-consent.component.html',
  styleUrls: ['./request-consent.component.scss']
})
export class RequestConsentComponent extends  Base implements OnInit {

  /** Applicant requesting registration status */
  private _applicant: Person = new Person();

  constructor( private router: Router
    , private fpcareDataService: FPCareDataService
    , private dummyDataService: DummyDataService ) {
    super();
  }

  ngOnInit() {
  }

  get applicant(): Person {
    return this._applicant;
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Request Consent';
  }

  /**
   *
   * @param {boolean} canContinue
   */
  continue( canContinue: boolean ) {

    console.log('consent: continue ', canContinue );

    if (canContinue) {

      const link = '/consent-letter-results';
      this.router.navigate([link]);
    }
  }
}
