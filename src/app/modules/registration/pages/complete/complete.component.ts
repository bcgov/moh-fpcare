import {Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {environment} from '../../../../../environments/environment';
import {ApiService} from '../../../../services/api-service.service';
import {RegistrationService} from '../../registration.service';
import { Logger } from '../../../../services/logger.service';

@Component({
  selector: 'fpcare-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompletePageComponent extends AbstractFormComponent implements OnInit  {

  public applicantAgreement: boolean = false;
  public spouseAgreement: boolean = false;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private apiService: ApiService
             , private registrationService: RegistrationService
             , private logger: Logger ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  get hasSpouse(): boolean {
    return this.fpcService.hasSpouse;
  }

  // Methods triggered by the form action bar
  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Submit Applicaion';
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    let valid = this.applicantAgreement;

    if ( this.hasSpouse ) {
      valid = (valid && this.spouseAgreement);
    }

    return valid;
  }

  /**
   * Navigates to the next page
   */
  continue() {

    console.log('can submit request: ', this.canContinue());
    if (this.canContinue()) {
      this.registrationService.setItemComplete();
      // TODO - Do the HTTP request to submit the application
      this.logger.log({
        event: 'submission',
        todo: 'TODO'
      });
   }
  }
}
