import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { conformToMask } from 'angular2-text-mask';
import { PharmaCareAssistanceLevel } from './assistance-levels.interface';
import {isUndefined} from 'util';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  public PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[];
  public Pre1939PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[];

  private _hasData = new BehaviorSubject<boolean>(false);
  /** Subscribe to this observable to check it's true prior to accessing this.PharmacareAssistanceLevels / Pre1939 */
  public hasData = this._hasData.asObservable();

  constructor() { }

  /**
   * An input mask for currency formatting. If you just want to format a string
   * use `currencyFormat()` This format does NOT include the $ at the beginning
   * so be sure to add it directly to your template.
   */
  public moneyMask = createNumberMask({
    prefix: '', // No $ prefix, because we add it directly to the HTML as an input prepend
    allowDecimal: true,
    integerLimit: 9 // Max numeric value is 999,999,999.99 - from Light FDS
  });

  public setAssistanceLevels(normal: PharmaCareAssistanceLevel[], pre1939: PharmaCareAssistanceLevel[]){
    // Change strings of numbers into numbers, as we do math on them
    // this.PharmaCareAssistanceLevels = normal.map(item => this.convertFormattedStringToNumber(item))
    // TODO - TEmp commented out to merge branches. Use the line below.
    // this.PharmaCareAssistanceLevels = normal
      // .map(item => this.mapObjectByKey(item, this.convertFormattedStringToNumber));

    this.PharmaCareAssistanceLevels = normal;
    this.Pre1939PharmaCareAssistanceLevels = pre1939;

    console.log('AssistaneLevels', {normal: this.PharmaCareAssistanceLevels, pre1939: this.Pre1939PharmaCareAssistanceLevels});

    this._hasData.next(true);
  }

  // todo - move
  private mapObjectByKey<T>(item: T, mutator: (input) => any ): T {
    Object.keys(item).map(key => {
      item[key] = mutator(item[key]);
    });
    return item;
  }

  // todo - move
  private convertFormattedStringToNumber(string: string): number {

    return 0;
  }

  public failedToLoadAssistanceLevels(error): void {
    this._hasData.error(error);
  }

  /**
   * Looks up the official PharmaCare Assistance Level for a given income.
   *
   * An optional configuration object can be passed in to lookup values from the
   * 1939 table. If it is omitted, the recent table is used.
   *
   * @param {number} [familyNetIncome=0]
   * @param {{bornBefore1939: boolean}} [config]
   * @returns {PharmaCareAssistanceLevel}
   * @memberof FinanceService
   */
  public findAssistanceLevel(familyNetIncome: number = 0, config?: { bornBefore1939: boolean }): PharmaCareAssistanceLevel {
    // console.log( 'PharmaCareAssistanceLevels: ', this.PharmaCareAssistanceLevels );
    // console.log( 'Pre1939PharmaCareAssistanceLevels: ', this.Pre1939PharmaCareAssistanceLevels );

    if ( !this.PharmaCareAssistanceLevels  || !this.Pre1939PharmaCareAssistanceLevels ) {
      console.error( 'Assistance levels not loaded', this.PharmaCareAssistanceLevels, this.Pre1939PharmaCareAssistanceLevels );
      return null;
    }

    let source = this.PharmaCareAssistanceLevels;
    if (config && config.bornBefore1939) {
      source = this.Pre1939PharmaCareAssistanceLevels;
    }

    return source
      .find(item => item.startRange <= familyNetIncome && item.endRange >= familyNetIncome);
  }

  public currencyFormat(currency: number, withDollarSign = false): string {
    if ( !currency ) {
      return null;
    }
    const mask = conformToMask(currency.toString(), this.moneyMask, {});
    return `${withDollarSign ? '$' : ''}${mask.conformedValue}`;
  }

  // BUSINESS RULE METHODS ----------------------------------------------------
  // The below methods are defined in Functional Requirement Documents

  public calculateFamilyNetIncome(applicantIncome: number = 0, spouseIncome: number = 0) {
    //Family Net Income = Applicant's Net Income (I01) + Spouse's Net Income (I03)
    return applicantIncome + spouseIncome;
  }

  public calculateFamilyAdjustedIncome(familyNetIncome: number, disability: number): number {
    //Family Adjusted Income = Family Net Income - Family RDSP amount (I05)
    const adjustedIncome = familyNetIncome - disability;
    if (adjustedIncome < 0) {
      return 0;
    }
    return adjustedIncome;
  }

}
