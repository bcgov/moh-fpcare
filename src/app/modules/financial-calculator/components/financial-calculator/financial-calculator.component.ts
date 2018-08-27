import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { FinanceService } from '../../finance.service';
import { conformToMask } from 'angular2-text-mask';
import { Subject } from 'rxjs';

@Component({
  selector: 'fpcare-financial-calculator',
  templateUrl: './financial-calculator.component.html',
  styleUrls: ['./financial-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialCalculatorComponent implements OnInit {

  /** A number in dollars corresponding to total family income. If and only if they have a spouse the spouse's income will be included. */
  @Input() income: number;
  @Input() disabilitySavingsAmount: number;
  @Input() hasSpouse: boolean;
  @Input() bornBefore1939: boolean;

  /** A currency formatted string corresponding to `income` */
  public incomeDisplay: string = '0';
  /** A currency formatted string corresponding to `disabilitySavingsAmount` */
  public disabilityDisplay: string = '0';

  /** A number in dollars, used to determine what level of PharmaCare coverage. */
  public adjustedIncomeAmount: number;
  /** A currency formatted string retrieved from the finance service. */
  public adjustedIncomeDisplay: string = '0';

  /**
   * Invoked on every ngOnChanges, the salient difference is it only invokes
   * them _after_ ngOnInit() has fired, not before.
   */
  onChanges = new Subject<SimpleChanges>();


  constructor(private financeService: FinanceService) {
  }

  ngOnInit() {

    this.onChanges.subscribe((changes: SimpleChanges) => {
      // console.log('finCalc onchanges', changes);
      if (changes.income) {
        this.incomeDisplay = this.currencyFormat(this.income);
      }

      if (changes.disabilitySavingsAmount) {
        this.disabilityDisplay = this.currencyFormat(this.disabilitySavingsAmount);
      }

      if (changes.income || changes.disabilitySavingsAmount){
        this.adjustedIncomeAmount = this.financeService.calculateFamilyAdjustedIncome(this.income, this.disabilitySavingsAmount);
        this.adjustedIncomeDisplay = this.currencyFormat(this.adjustedIncomeAmount);
      }
    });
  }

  private currencyFormat(input: number): string {
    return this.financeService.currencyFormat(input);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }

  ngOnDestroy() {
    this.onChanges.unsubscribe();
  }

}
