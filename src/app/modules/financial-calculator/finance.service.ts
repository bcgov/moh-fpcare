import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { conformToMask } from 'angular2-text-mask';
import { PharmaCareAssistanceLevel } from './assistance-levels.interface';


@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  public PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[];
  public Pre1939PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[];

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

    if ( !this.PharmaCareAssistanceLevels || !this.Pre1939PharmaCareAssistanceLevels ) {
      console.log( 'Assistance levels not loaded' );
      return;
    }

    let source = this.PharmaCareAssistanceLevels;
    if (config && config.bornBefore1939) {
      source = this.Pre1939PharmaCareAssistanceLevels;
    }

    return source
      .find(item => item.startRange <= familyNetIncome && item.endRange >= familyNetIncome);
  }

  public currencyFormat(currency: number, withDollarSign = false): string {
    if ( !!!currency ) {
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


  /**
   * Convert the currency string to a numeric
   * @param {string} str
   * @returns {number}
   */
  public currencyStrToNumber( str: string ): number {
    return str ? Number( str.replace(/,/g, '') ) : 0;
  }
}
