import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router } from '@angular/router';
import { FinanceService } from '../../../financial-calculator/finance.service';

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

  constructor(protected router: Router, private financeService: FinanceService) {
    super(router);
  }

  ngOnInit() {
    this.moneyMask = this.financeService.moneyMask;
  }

  canContinue() {
    return false;
  }

  continue() {
    console.log('todo');
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
