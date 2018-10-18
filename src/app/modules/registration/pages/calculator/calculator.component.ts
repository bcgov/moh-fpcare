import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../registration.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import {FinanceService} from '../../../financial-calculator/finance.service';
import {REGISTRATION_ELIGIBILITY, REGISTRATION_PATH} from '../../../../models/route-paths.constants';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ApiService} from '../../../../services/api-service.service';
import {BenefitYearPayload, DeductiblePayload} from '../../../../models/api.model';


@Component({
  selector: 'fpcare-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorPageComponent extends AbstractFormComponent implements OnInit {
  /** Numeric value for income + spouseIncome (if applicable) */
  public totalFamilyIncome: number;
  /** Numeric value for RDSP + spouse RDSP (if applicable) */
  public totalFamilyRdsp: number;
  /** The text mask responsible for the currency formatting. */
  public moneyMask;
  /** Formatted currency string for applicant's income */
  public income: string;
  /** Formatted currency string for applicant's spouse's income */
  public spouseIncome: string;
  /** Formatted currency string for disability amount */
  public disability: string;
  /** Formatted currency string for disability amount */
  public spouseDisability: string;

  /** Text displayed on button */
  public buttonText: string = 'Apply for Fair PharmaCare Assistance';

  /**
   * Is the form standalone? If false, it's part of Registration's flow, if
   * true, it's a page treated in isolation. This includes, for example,
   * removing the form continue button.
   */
  public standalone: boolean = false;

  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_ELIGIBILITY;

  constructor( protected router: Router
             , private financeService: FinanceService
             , private fpcareDataService: FPCareDataService
             , private registrationService: RegistrationService
             , private activatedRoute: ActivatedRoute
             , private apiService: ApiService ) {
    super(router);
  }

  ngOnInit() {

// TODO - Ideally instead of nested Observable subscriptions, we should use rxjs delayWhen() or concatMap() to triger sequential operation
/** NOTE:  Captcha logic not fully implemented - standalone calculator does not have a consent module so these
 *         requests are currently white listed - need way to push data to cache
 */

    this.apiService.getBenefitYear().subscribe(benefitResponse => {
      const benefitPayload = new BenefitYearPayload(benefitResponse);

      if (benefitPayload.success){
        this.fpcareDataService.benefitYear = benefitPayload.benefitYear;
        this.fpcareDataService.taxYear = benefitPayload.taxYear;
      }

      // Nested observable call - should be unnested and sequential.
      this.apiService.getDeductibles( { benefitYear: this.fpcareDataService.benefitYear }).subscribe(
        (deductibleResponse) => {
          const deductiblePayload = new DeductiblePayload(deductibleResponse);

          if (benefitPayload.success){
            this.financeService.setAssistanceLevels(deductiblePayload.assistanceLevels,
                deductiblePayload.pre1939AssistanceLevels);

            if (deductiblePayload.error) {
              this.financeService.failedToLoadAssistanceLevels(deductiblePayload.error);
            }
          }
        },
        (deductibleError) => {
          // When API service returns an error we need to manually trigger an error in financeService
          this.financeService.failedToLoadAssistanceLevels(deductibleError);
        });
    });

    // Retrieve standalone state from router data
    this.activatedRoute.data.subscribe((data: {standalone: boolean}) => {
      if (data.standalone === true){
        this.standalone = data.standalone;
      }
    });

    this.moneyMask = this.financeService.moneyMask;
    this.registrationService.setItemIncomplete();

    // If not defined do not update the page
    if ( this.fpcareDataService.applicantIncome ||
         this.fpcareDataService.spouseIncome  ) {

      this.income = this.financeService.currencyFormat( this.fpcareDataService.applicantIncome );

      if ( this.fpcareDataService.disabilityAmount ) {
        this.disability = this.financeService.currencyFormat(this.fpcareDataService.disabilityAmount);
      }

      if ( this.hasSpouse ) {
        this.spouseIncome = this.financeService.currencyFormat( this.fpcareDataService.spouseIncome );

        if (this.fpcareDataService.spouseDisabilityAmount ) {
          this.spouseDisability = this.financeService.currencyFormat(this.fpcareDataService.spouseDisabilityAmount);
        }
      }

      // Update data - user may have used back button on browser
      this.update();
    }
  }

  /**
   * Indicates whether applicant has spouse
   * @returns {boolean}
   */
  get hasSpouse(): boolean {
    return this.fpcareDataService.hasSpouse;
  }
  /**
   * Sets whether applicant has spouse
   * @param {boolean} value
   */
  set hasSpouse( value: boolean ) {

    if ( !value ) {
      // set blank - no spouse
      this.spouseIncome = '';
      this.spouseDisability = '';
    } else {
      // Spouse
      this.fpcareDataService.addSpouse();
    }
    this.fpcareDataService.hasSpouse = value;
  }

  /**
   * Retrieves flag indicating whether applicant or spouse was born before 1939
   * @returns {boolean}
   */
  get bornBefore1939(): boolean {
    return this.fpcareDataService.bornBefore1939;
  }

  /**
   * Sets flag indicating whether applicant or spouse was born before 1939
   * @param {boolean} value
   */
  set bornBefore1939( value: boolean ) {
    this.fpcareDataService.bornBefore1939 = value;
  }

  canContinue() {
    // Main and sub forms are not empty and are valid
    if ( super.canContinue() ) {
      return (undefined !== this.hasSpouse && undefined !== this.bornBefore1939 );
    }
    return false;
  }

  continue() {
    if ( this.canContinue() ) {

      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }

  public update(): void {

    // Need income to do calculations
    if ( undefined !== this.income || undefined !== this.spouseIncome ) {
      this.totalFamilyIncome = this.calculateTotalFamilyIncome();
    }

    this.totalFamilyRdsp = this.calculateTotalFamilyRdsp();

    // Update fpcare-data service values
    this.fpcareDataService.applicantIncome = this.financeService.currencyStrToNumber(this.income);
    this.fpcareDataService.spouseIncome = this.financeService.currencyStrToNumber(this.spouseIncome);
    this.fpcareDataService.disabilityAmount = this.financeService.currencyStrToNumber(this.disability);
    this.fpcareDataService.spouseDisabilityAmount = this.financeService.currencyStrToNumber(this.spouseDisability);
  }

  /**
   * Income adjustment
   * @param {string} value
   */
  public onIncomeAdjustment( value: string ) {
    this.fpcareDataService.adjustedIncome = this.financeService.currencyStrToNumber( value );
  }

  /**
   * Get the tax year for this benefit year
   * @returns {string}
   */
  get taxYear(): string {
    return this.fpcareDataService.taxYear;
  }

  private calculateTotalFamilyIncome(): number {
    let incomeNum = 0;
    let spouseNum = 0;

    if (this.income) {
      incomeNum = this.financeService.currencyStrToNumber( this.income );
    }

    if ( this.hasSpouse && this.spouseIncome ) {
      spouseNum = this.financeService.currencyStrToNumber( this.spouseIncome );
    }

    return this.financeService.calculateFamilyNetIncome( incomeNum, spouseNum );
  }

  private calculateTotalFamilyRdsp(): number {
    let rdspNum = 0;
    let spouseNum = 0;

    if (this.disability) {
      rdspNum = this.financeService.currencyStrToNumber( this.disability );
    }

    if ( this.hasSpouse && this.spouseDisability ) {
      spouseNum = this.financeService.currencyStrToNumber( this.spouseDisability );
    }

    return this.financeService.calculateFamilyRdsp( rdspNum, spouseNum );
  }

  get bornBefore1939Label(): string {
    return this.hasSpouse ? 'Were you or your spouse born in 1939 or earlier?' : 'Were you born in 1939 or earlier?';
  }

  get hasSpouseLabel(): string {
    return 'Do you have a spouse/common-law partner?';
  }
}
