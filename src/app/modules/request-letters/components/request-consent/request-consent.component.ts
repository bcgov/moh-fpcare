import { Component, OnInit } from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-request-consent',
  templateUrl: './request-consent.component.html',
  styleUrls: ['./request-consent.component.scss']
})
export class RequestConsentComponent extends  Base implements OnInit {

  constructor( private fpcareDataService: FPCareDataService ) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Object for recording registrant's information
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  /**
   * Label for button
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Request Consent';
  }

  /**
   * Page to navigate to on continue
   * @returns {string}
   */
  get nextPg(): string {
    return '/request-letter/consent-results';
  }
}
