import {Component, OnInit} from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {RegistrationService} from '../../registration.service';
import {AbstractResultsComponent} from '../../../../models/abstract-results-component';
import {EligibilityPayload, RegistrationPayload} from '../../../../models/api.model';
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

  public response: EligibilityPayload | RegistrationPayload = null;
  public assistenceLevel: PharmaCareAssistanceLevel;
  public pgTitle: string = 'Fair PharmaCare Registration Status';
  public famNumber: string = null;

  constructor( private responseStore: ResponseStoreService
             , private registrationService: RegistrationService
             , private financeService: FinanceService ) {
    super();

    if ( this.hasRegistration ) {
      this.response = this.responseStore.registration;
    } else {
      this.response = this.responseStore.eligibility;
    }
  }

  ngOnInit() {

    if (this.hasRegistration) {
      this.pgTitle = 'Your Application has been submitted';
      this.famNumber = this.responseStore.registration.familyNumber;
      this.assistenceLevel = this.getAssistenceLevel();
    }
  }

  /**
   *
   * @returns {boolean}
   */
  get hasRegistration(): boolean {
    return !!this.responseStore.registration;
  }

  /**
   *
   * @returns {boolean}
   */
  get isRegistrationComplete(): boolean {
    return this.registrationService.isRegistrationComplete();
  }

  get dateStamp(): string {
    return moment().format('MMMM DD, YYYY');
  }

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
}
