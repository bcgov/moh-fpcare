import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../registration.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import {decimalsRegex, FinanceService} from '../../../financial-calculator/finance.service';
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
  /** The text mask responsible for the currency formatting. */
  public moneyMask;
  /** Formatted currency string for applicant's income */
  public income: string;
  /** Formatted currency string for applicant's spouse's income */
  public spouseIncome: string;
  /** Formatted currency string for disability amount */
  public disabilityFormatted: string;
  /** Numeric value for disability */
  public disabilityAmount: number;

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

      if ( this.hasSpouse ) {
        this.spouseIncome = this.financeService.currencyFormat( this.fpcareDataService.spouseIncome );
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
    if ( this.income ) {
      this.totalFamilyIncome = this.calculateTotalFamilyIncome();
    }

    if (this.disabilityFormatted && this.disabilityFormatted.length) {
      this.disabilityAmount = this.financeService.currencyStrToNumber(this.disabilityFormatted);
    }
    else {
      this.disabilityAmount = 0;
    }

    // Update fpcare-data service values
    this.fpcareDataService.applicantIncome = this.financeService.currencyStrToNumber(this.income);
    this.fpcareDataService.spouseIncome = this.financeService.currencyStrToNumber(this.spouseIncome);
    this.fpcareDataService.disabilityAmount = this.disabilityAmount;
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
}
