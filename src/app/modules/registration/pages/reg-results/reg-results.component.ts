import {Component, OnInit} from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {RegistrationService} from '../../registration.service';
import {AbstractResultsComponent} from '../../../../models/abstract-results-component';
import {EligibilityPayload, RegistrationPayload, ServerPayload} from '../../../../models/api.model';
import {PharmaCareAssistanceLevel} from '../../../financial-calculator/assistance-levels.interface';
import {FinanceService} from '../../../financial-calculator/finance.service';
import {growVertical} from '../../../../animations/animations';
import * as moment from 'moment';
import {REGISTRATION_STATUS_PATH, REQUEST_REG_STATUS} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-reg-results',
  templateUrl: './reg-results.component.html',
  styleUrls: ['./reg-results.component.scss'],
  animations: [growVertical]
})
export class RegResultsComponent extends AbstractResultsComponent implements OnInit {

  public response: EligibilityPayload | RegistrationPayload | ServerPayload = null;
  public assistenceLevel: PharmaCareAssistanceLevel;
  public pgTitle: string = 'Fair PharmaCare Registration Status';
  public famNumber: string = null;

  constructor( private responseStore: ResponseStoreService
             , private registrationService: RegistrationService
             , private financeService: FinanceService ) {
    super();

    if ( this.hasRegistration ) {
      this.response = this.responseStore.registration;
    } else if ( this.hasEligibility && !this.registrationService.internalError) {
      this.response = this.responseStore.eligibility;
    } else {
      this.response = this.responseStore.internalResponse;
    }

  }

  ngOnInit() {

    if ( this.hasRegistration ) {
      this.pgTitle = 'Your Application has been submitted';

      // Registration was successful
      if ( this.isSuccess ) {
        this.famNumber = this.responseStore.registration.familyNumber;
        this.assistenceLevel = this.getAssistenceLevel();
      }
    }
  }

  /**
   * Registration for FPCare was submitted to be processed
   * @returns {boolean}
   */
  get hasRegistration(): boolean {
    return !!this.responseStore.registration;
  }

  get hasEligibility(): boolean {
    return !!this.responseStore.eligibility;
  }

  /**
   * Today's date
   * @returns {string}
   */
  get dateStamp(): string {
    return moment().format('MMMM DD, YYYY');
  }

  /**
   * Link to Check FPCare registration status
   * @returns {string}
   */
  get checkRegistrationStatus(): string {
    return  '/' + REGISTRATION_STATUS_PATH + '/' + REQUEST_REG_STATUS;
  }

  /**
   *
   * @returns {PharmaCareAssistanceLevel}
   */
  private getAssistenceLevel(): PharmaCareAssistanceLevel {
    return  {
      startRange: null,
      endRange: null,
      maximum: this.financeService.currencyStrToNumber(
          this.responseStore.registration.annualMaximumAmountText, true ),
      deductible: this.financeService.currencyStrToNumber(
          this.responseStore.registration.deductibleAmounText, true ),
      pharmaCarePortion: Number(this.responseStore.registration.copayPercentageText.replace('%', ''))
    };
  }

  /**
   * Upon leaving page set response store to null
   */
  protected destroyResults(): void {

    if (this.hasEligibility && !this.responseStore.eligibility.success) {
      // Clear eligibility check complete - error/warning occurred
      this.responseStore.eligibility = null;
    } else if (this.registrationService.internalError) {
      // Clear internal validation response
      this.responseStore.internalResponse = null;
    } else {
      // Clear all response registration submitted
      this.responseStore.registration = null;
      this.responseStore.eligibility = null;
      this.responseStore.internalResponse = null;
    }
  }
}
