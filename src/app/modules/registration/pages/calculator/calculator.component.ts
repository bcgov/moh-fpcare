import { Component, OnInit, Input } from '@angular/core';
import {RegistrationService} from '../../registration.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../financial-calculator/finance.service';
import {REGISTRATION_ELIGIBILITY, REGISTRATION_PATH} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorPageComponent extends AbstractFormComponent implements OnInit {
  /** Formatted currency string for applicant's income */
  public income: string;
  public hasSpouse: boolean;
  /** Formatted currency string for applicant's spouse's income */
  public spouseIncome: string;
  public bornBefore1939: boolean;
  /** Numeric value for disability */
  public disabilityAmount: number;
  /** Formatted currency string for disability amount */
  public disabilityFormatted: string;
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
             , private registrationService: RegistrationService
             , private activatedRoute: ActivatedRoute ) {
    super(router);
  }

  ngOnInit() {
    this.moneyMask = this.financeService.moneyMask;
    this.registrationService.setItemIncomplete();

    // Retrieve standalone state from router data
    this.activatedRoute.data.subscribe((data: {standalone: boolean}) => {
      if (data.standalone === true){
        this.standalone = data.standalone;
      }
    });
  }

  canContinue() {
    return true;
  }

  continue() {
    console.log('todo');
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
