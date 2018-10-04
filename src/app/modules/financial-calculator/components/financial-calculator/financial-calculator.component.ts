import {Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { FinanceService } from '../../finance.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import { growVertical } from '../../../../animations/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fpcare-financial-calculator',
  templateUrl: './financial-calculator.component.html',
  styleUrls: ['./financial-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [growVertical]
})
export class FinancialCalculatorComponent implements OnInit {

  /** A number in dollars corresponding to total family income. If and only if they have a spouse the spouse's income will be included. */
  @Input() income: number;
  @Input() disabilitySavingsAmount: number;
  @Input() hasSpouse: boolean;
  @Input() bornBefore1939: boolean;
  @Output() incomeAdjustment: EventEmitter<string> = new EventEmitter<string>();

  /** A currency formatted string corresponding to `income` */
  private _incomeDisplay: string;
  /** A currency formatted string corresponding to `disabilitySavingsAmount` */
  private _disabilityDisplay: string;
  /** A currency formatted string retrieved from the finance service. */
  private _adjustedIncomeDisplay: string;

  /** Place holder when values are undefined */
  private _zeroAmountStr: string = '0';

  /** A number in dollars, used to determine what level of PharmaCare coverage. */
  public adjustedIncomeAmount: number;

  /** Finance Service is still loading data. */
  public isLoadingData: boolean = true;
  public errorLoadingData: boolean = false;
  private financeHasData$: Subscription;

  /**
   * Invoked on every ngOnChanges, the salient difference is it only invokes
   * them _after_ ngOnInit() has fired, not before.
   */
  onChanges = new BehaviorSubject<SimpleChanges>( null );


  constructor(private financeService: FinanceService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.onChanges.subscribe((changes: SimpleChanges) => {
      //console.log('finCalc onchanges', changes);

      if (changes.income) {
        this._incomeDisplay = this.currencyFormat(this.income);
      }

      if (changes.disabilitySavingsAmount) {
        this._disabilityDisplay = this.currencyFormat(this.disabilitySavingsAmount);
      }

      if (changes.income || changes.disabilitySavingsAmount){
        this.adjustedIncomeAmount = this.financeService.calculateFamilyAdjustedIncome(this.income,
            this.disabilitySavingsAmount);
        this._adjustedIncomeDisplay = this.currencyFormat(this.adjustedIncomeAmount);
        this.incomeAdjustment.emit( this._adjustedIncomeDisplay );
      }
    });

    // Listen for Finance Service having it's data loaded
    this.financeHasData$ = this.financeService.hasData.subscribe(hasData => {
      this.isLoadingData = !hasData;
      this.cd.detectChanges();
    }, (_onError) => {
      this.isLoadingData = true;
      this.errorLoadingData = true;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.financeHasData$.unsubscribe();
    this.onChanges.unsubscribe();
    this.cd.detach();
  }

  private currencyFormat(input: number): string {
    return this.financeService.currencyFormatLg(input);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }


  /**
   * Retrieve formatted string value for adjusted income
   * @returns {string}
   */
  get adjustedIncomeDisplay(): string {
    return this._adjustedIncomeDisplay ? this._adjustedIncomeDisplay : this._zeroAmountStr;
  }

  /**
   * Retrieve formatted string value for disability
   * @returns {string}
   */
  get disabilityDisplay(): string {
    return this._disabilityDisplay ? this._disabilityDisplay : this._zeroAmountStr ;
  }

  /**
   * Retrieve formatted string value for income
   * @returns {string}
   */
  get incomeDisplay(): string {
    return this._incomeDisplay ? this._incomeDisplay : this._zeroAmountStr ;
  }
}
