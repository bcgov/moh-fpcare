import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../registration.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../financial-calculator/finance.service';
import {REGISTRATION_ELIGIBILITY, REGISTRATION_PATH} from '../../../../models/route-paths.constants';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {isUndefined} from 'util';
import {ApiService} from '../../../../services/api-service.service';;
import {BenefitYearPayload, DeductiblePayload} from '../../../../models/api.model';


@Component({
  selector: 'fpcare-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorPageComponent extends AbstractFormComponent implements OnInit {
  /** Numeric value for disability */
  public disabilityAmount: number;
  /** Numeric value for income + spouseIncome (if applicable) */
  public totalFamilyIncome: number;
  /** The text mask responsible for the currency formatting. */
  public moneyMask;

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
    console.log( 'Calculator (onInit) ' );


    this.apiService.getBenefitYear().subscribe(response => {
      const payload = new BenefitYearPayload(response);
       console.log( ' payload: ', payload );

      if (payload.success){
        this.fpcareDataService.benefitYear = payload.benefitYear;
        this.fpcareDataService.taxYear = payload.taxYear;
      }

      console.log( 'get deductibles');
      this.apiService.getDeductibles( { benefitYear: this.fpcareDataService.benefitYear })
          .subscribe(response2 => {
            const payload2 = new DeductiblePayload(response2);
            console.log( ' payload: ', payload2);

            if (payload.success){
              this.financeService.PharmaCareAssistanceLevels = payload2.assistanceLevels;
              this.financeService.Pre1939PharmaCareAssistanceLevels = payload2.pre1939AssistanceLevels;
            }
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

    // Update data - user may have used back button on browser
    this.update();
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
      this.fpcareDataService.spouseIncome = '';
    } else {
      // Spouse
      this.fpcareDataService.addSpouse();
    }
    this.fpcareDataService.hasSpouse = value;
  }

  /**
   * Retrieves formatted currency string for applicant's income
   * @returns {string}
   */
  get income(): string {
    return this.fpcareDataService.applicantIncome;
  }

  /**
   * Sets formatted currency string for applicant's income
   * @param {string} value
   */
  set income( value: string ) {
    this.fpcareDataService.applicantIncome = value;
  }

  /**
   * Retrieves formatted currency string for applicant's spouse's income
   * @returns {string}
   */
  get spouseIncome(): string {
    return this.fpcareDataService.spouseIncome;
  }

  /**
   * Sets formatted currency string for applicant's spouse's income
   * @param {string} value
   */
  set spouseIncome( value: string ) {
    this.fpcareDataService.spouseIncome = value;
  }

  /**
   *  Retrieve formatted currency string for disability amount
   * @returns {string}
   */
  get disabilityFormatted() {
    return this.fpcareDataService.disabilityAmount;
  }

  /**
   * Set formatted currency string for disability amount
   * @param {string} value
   */
  set disabilityFormatted( value: string ) {
    if ( !!value ) {
      this.fpcareDataService.disabilityAmount = value;
    }
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
    return (!this.isFormEmpty() && this.form.valid &&
        !isUndefined( this.hasSpouse ) && !isUndefined( this.bornBefore1939 ));
  }

  continue() {
    if ( this.canContinue() ) {

      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }

  public update(): void {
    this.totalFamilyIncome = this.calculateTotalFamilyIncome();

    if (this.disabilityFormatted && this.disabilityFormatted.length) {
      this.disabilityAmount = Number(this.disabilityFormatted.replace(/,/g, ''));
    }
    else {
      this.disabilityAmount = 0;
    }
  }

  /**
   * Income adjustment
   * @param {string} value
   */
  public onIncomeAdjustment( value: string ) {
    this.fpcareDataService.adjustedIncome = value;
  }

  private calculateTotalFamilyIncome(): number {
    let incomeNum = 0;
    let spouseNum = 0;

    if (this.income){
      incomeNum = Number(this.income.replace(/,/g, ''));
    }

    if ( this.hasSpouse && this.spouseIncome) {
      spouseNum = Number(this.spouseIncome.replace(/,/g, ''));
    }

    return this.financeService.calculateFamilyNetIncome(incomeNum, spouseNum);
  }
}
