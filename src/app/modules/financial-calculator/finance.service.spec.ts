import { TestBed, inject } from '@angular/core/testing';

import { FinanceService } from './finance.service';
import {PharmaCareAssistanceLevelServerResponse} from './assistance-levels.interface';

export const baselineAssist: PharmaCareAssistanceLevelServerResponse[] = [
  {startRange: '250000.01', endRange: '283333', deductible: '$8000.00', pharmaCarePortion: '70%', maximum: '$10000.00'},
  {startRange: '283333.01', endRange: '316667', deductible: '$9000.00', pharmaCarePortion: '70%', maximum: '$10000.00'},
  {startRange: '316667.01', endRange: '999999999', deductible: '$10000.00', pharmaCarePortion: '100%', maximum: '$10000.00'},
  {startRange: '-999999999', endRange: '1875', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$25.00'},
  {startRange: '1875.01', endRange: '3125', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$50.00'},
  {startRange: '3125.01', endRange: '4375', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$75.00'},
  {startRange: '4375.01', endRange: '6250', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$100.00'},
  {startRange: '6250.01', endRange: '8750', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$150.00'},
  {startRange: '8750.01', endRange: '11250', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$200.00'},
  {startRange: '11250.01', endRange: '13750', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$250.00'},
  {startRange: '13750.01', endRange: '15000', deductible: '$0.00', pharmaCarePortion: '70%', maximum: '$300.00'},
  {startRange: '15000.01', endRange: '16250', deductible: '$300.00', pharmaCarePortion: '70%', maximum: '$450.00'},
  {startRange: '16250.01', endRange: '18750', deductible: '$350.00', pharmaCarePortion: '70%', maximum: '$525.00'},
  {startRange: '18750.01', endRange: '21250', deductible: '$400.00', pharmaCarePortion: '70%', maximum: '$600.00'},
  {startRange: '21250.01', endRange: '23750', deductible: '$450.00', pharmaCarePortion: '70%', maximum: '$675.00'},
  {startRange: '23750.01', endRange: '26250', deductible: '$500.00', pharmaCarePortion: '70%', maximum: '$750.00'},
  {startRange: '26250.01', endRange: '28750', deductible: '$550.00', pharmaCarePortion: '70%', maximum: '$825.00'},
  {startRange: '28750.01', endRange: '30000', deductible: '$600.00', pharmaCarePortion: '70%', maximum: '$900.00'},
  {startRange: '30000.01', endRange: '31667', deductible: '$900.00', pharmaCarePortion: '70%', maximum: '$1200.00'},
  {startRange: '31667.01', endRange: '35000', deductible: '$1000.00', pharmaCarePortion: '70%', maximum: '$1350.00'},
  {startRange: '35000.01', endRange: '38333', deductible: '$1100.00', pharmaCarePortion: '70%', maximum: '$1475.00'},
  {startRange: '216667.01', endRange: '250000', deductible: '$7000.00', pharmaCarePortion: '70%', maximum: '$9350.00'},
  {startRange: '125000.01', endRange: '141667', deductible: '$4000.00', pharmaCarePortion: '70%', maximum: '$5350.00'},
  {startRange: '141667.01', endRange: '158333', deductible: '$4500.00', pharmaCarePortion: '70%', maximum: '$6000.00'},
  {startRange: '158333.01', endRange: '183333', deductible: '$5000.00', pharmaCarePortion: '70%', maximum: '$6675.00'},
  {startRange: '183333.01', endRange: '216667', deductible: '$6000.00', pharmaCarePortion: '70%', maximum: '$8000.00'},
  {startRange: '38333.01', endRange: '41667', deductible: '$1200.00', pharmaCarePortion: '70%', maximum: '$1600.00'},
  {startRange: '41667.01', endRange: '45000', deductible: '$1300.00', pharmaCarePortion: '70%', maximum: '$1750.00'},
  {startRange: '45000.01', endRange: '48333', deductible: '$1400.00', pharmaCarePortion: '70%', maximum: '$1875.00'},
  {startRange: '48333.01', endRange: '51667', deductible: '$1500.00', pharmaCarePortion: '70%', maximum: '$2000.00'},
  {startRange: '51667.01', endRange: '55000', deductible: '$1600.00', pharmaCarePortion: '70%', maximum: '$2150.00'},
  {startRange: '55000.01', endRange: '58333', deductible: '$1700.00', pharmaCarePortion: '70%', maximum: '$2275.00'},
  {startRange: '58333.01', endRange: '61667', deductible: '$1800.00', pharmaCarePortion: '70%', maximum: '$2400.00'},
  {startRange: '61667.01', endRange: '65000', deductible: '$1900.00', pharmaCarePortion: '70%', maximum: '$2550.00'},
  {startRange: '65000.01', endRange: '70833', deductible: '$2000.00', pharmaCarePortion: '70%', maximum: '$2675.00'},
  {startRange: '70833.01', endRange: '79167', deductible: '$2250.00', pharmaCarePortion: '70%', maximum: '$3000.00'},
  {startRange: '79167.01', endRange: '87500', deductible: '$2500.00', pharmaCarePortion: '70%', maximum: '$3350.00'},
  {startRange: '87500.01', endRange: '95833', deductible: '$2750.00', pharmaCarePortion: '70%', maximum: '$3675.00'},
  {startRange: '95833.01', endRange: '108333', deductible: '$3000.00', pharmaCarePortion: '70%', maximum: '$4000.00'},
  {startRange: '108333.01', endRange: '125000', deductible: '$3500.00', pharmaCarePortion: '70%', maximum: '$4675.00'}
];

export const pre1939Assist: PharmaCareAssistanceLevelServerResponse[] = [
  {startRange: '87500.01', endRange: '92500', deductible: '$1800.00', pharmaCarePortion: '75%', maximum: '$2700.00'},
  {startRange: '92500.01', endRange: '97500', deductible: '$1900.00', pharmaCarePortion: '75%', maximum: '$2850.00'},
  {startRange: '97500.01', endRange: '106250', deductible: '$2000.00', pharmaCarePortion: '75%', maximum: '$3000.00'},
  {startRange: '106250.01', endRange: '118750', deductible: '$2250.00', pharmaCarePortion: '75%', maximum: '$3375.00'},
  {startRange: '118750.01', endRange: '131250', deductible: '$2500.00', pharmaCarePortion: '75%', maximum: '$3750.00'},
  {startRange: '131250.01', endRange: '143750', deductible: '$2750.00', pharmaCarePortion: '75%', maximum: '$4125.00'},
  {startRange: '143750.01', endRange: '162500', deductible: '$3000.00', pharmaCarePortion: '75%', maximum: '$4500.00'},
  {startRange: '162500.01', endRange: '187500', deductible: '$3500.00', pharmaCarePortion: '75%', maximum: '$5250.00'},
  {startRange: '187500.01', endRange: '212500', deductible: '$4000.00', pharmaCarePortion: '75%', maximum: '$6000.00'},
  {startRange: '212500.01', endRange: '237500', deductible: '$4500.00', pharmaCarePortion: '75%', maximum: '$6750.00'},
  {startRange: '475000.01', endRange: '999999999', deductible: '$10000.00', pharmaCarePortion: '100%', maximum: '$10000.00'},
  {startRange: '72500.01', endRange: '77500', deductible: '$1500.00', pharmaCarePortion: '75%', maximum: '$2250.00'},
  {startRange: '77500.01', endRange: '82500', deductible: '$1600.00', pharmaCarePortion: '75%', maximum: '$2400.00'},
  {startRange: '82500.01', endRange: '87500', deductible: '$1700.00', pharmaCarePortion: '75%', maximum: '$2550.00'},
  {startRange: '237500.01', endRange: '275000', deductible: '$5000.00', pharmaCarePortion: '75%', maximum: '$7500.00'},
  {startRange: '275000.01', endRange: '325000', deductible: '$6000.00', pharmaCarePortion: '75%', maximum: '$9000.00'},
  {startRange: '325000.01', endRange: '375000', deductible: '$7000.00', pharmaCarePortion: '75%', maximum: '$10000.00'},
  {startRange: '375000.01', endRange: '425000', deductible: '$8000.00', pharmaCarePortion: '75%', maximum: '$10000.00'},
  {startRange: '425000.01', endRange: '475000', deductible: '$9000.00', pharmaCarePortion: '75%', maximum: '$10000.00'},
  {startRange: '-999999999', endRange: '3000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$25.00'},
  {startRange: '3000.01', endRange: '5000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$50.00'},
  {startRange: '7000.01', endRange: '10000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$100.00'},
  {startRange: '10000.01', endRange: '14000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$150.00'},
  {startRange: '14000.01', endRange: '18000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$200.00'},
  {startRange: '18000.01', endRange: '22000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$250.00'},
  {startRange: '5000.01', endRange: '7000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$75.00'},
  {startRange: '22000.01', endRange: '26000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$300.00'},
  {startRange: '26000.01', endRange: '30000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$350.00'},
  {startRange: '30000.01', endRange: '33000', deductible: '$0.00', pharmaCarePortion: '75%', maximum: '$400.00'},
  {startRange: '33000.01', endRange: '37500', deductible: '$350.00', pharmaCarePortion: '75%', maximum: '$700.00'},
  {startRange: '37500.01', endRange: '42500', deductible: '$400.00', pharmaCarePortion: '75%', maximum: '$800.00'},
  {startRange: '42500.01', endRange: '47500', deductible: '$450.00', pharmaCarePortion: '75%', maximum: '$900.00'},
  {startRange: '47500.01', endRange: '50000', deductible: '$500.00', pharmaCarePortion: '75%', maximum: '$1000.00'},
  {startRange: '50000.01', endRange: '52500', deductible: '$1000.00', pharmaCarePortion: '75%', maximum: '$1500.00'},
  {startRange: '52500.01', endRange: '57500', deductible: '$1100.00', pharmaCarePortion: '75%', maximum: '$1650.00'},
  {startRange: '57500.01', endRange: '62500', deductible: '$1200.00', pharmaCarePortion: '75%', maximum: '$1800.00'},
  {startRange: '62500.01', endRange: '67500', deductible: '$1300.00', pharmaCarePortion: '75%', maximum: '$1950.00'},
  {startRange: '67500.01', endRange: '72500', deductible: '$1400.00', pharmaCarePortion: '75%', maximum: '$2100.00'}
];

/**
 * Compare the values of 2 objects
 * @param expected
 * @param actual
 * @returns {boolean}
 */
export function compareObj( expected, actual ): boolean {
  return Object.keys( expected ).map( key => expected[key].value === actual[key].value )
      .filter( x => x === false)
      .length === 0;
}

describe('FinanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceService]
    });

  });

  it('should be created', inject([FinanceService], (service: FinanceService) => {
    expect(service).toBeTruthy();
  }));

  // PHARMACARE LOOKUP

  it('should lookup PharmaCare Assistance Levels', inject([FinanceService], (service: FinanceService) => {
    service.setAssistanceLevels(baselineAssist, pre1939Assist);

    const expected = {startRange: -999999999, endRange: 1875, deductible: 0, pharmaCarePortion: 70, maximum: 25};

    expect( compareObj( expected, service.findAssistanceLevel(0) ) ).toBe( true );
  }));

  it('should lookup PharmaCare Assistance Levels from 1939', inject([FinanceService], (service: FinanceService) => {
    service.setAssistanceLevels(baselineAssist, pre1939Assist);
    const expected = {startRange: -999999999, endRange: 3000, deductible: 0, pharmaCarePortion: 75, maximum: 25};

    expect( compareObj( expected, service.findAssistanceLevel(0) ) ).toBe( true );
  }));

  // BUSINESS RULES

  it('should calculate family net income', inject([FinanceService], (service: FinanceService) => {
    expect(service.calculateFamilyNetIncome(0, 0)).toBe(0);
    expect(service.calculateFamilyNetIncome(1, 0)).toBe(1);
    expect(service.calculateFamilyNetIncome(0, 1)).toBe(1);
    expect(service.calculateFamilyNetIncome(3417, 10)).toBe(3427);
    expect(service.calculateFamilyNetIncome(50000, 25000)).toBe(75000);
  }));

  it('should not need spouse income to calculate family net income', inject([FinanceService], (service: FinanceService) => {
    service.setAssistanceLevels(baselineAssist, pre1939Assist);
    expect(service.calculateFamilyNetIncome(0)).toBe(0);
    expect(service.calculateFamilyNetIncome(1000)).toBe(1000);
    expect(service.calculateFamilyNetIncome(1000000)).toBe(1000000);
    expect(service.calculateFamilyNetIncome(1000000, undefined)).toBe(1000000);
  }));

  it('should calculate family adjusted income', inject([FinanceService], (service: FinanceService) => {
    expect(service.calculateFamilyAdjustedIncome(100, 1)).toBe(99);
    expect(service.calculateFamilyAdjustedIncome(50000, 20000)).toBe(30000);
  }));

  it('should never return an adjusted income below 0', inject([FinanceService], (service: FinanceService) => {
    expect(service.calculateFamilyAdjustedIncome(0, 1)).toBe(0);
    expect(service.calculateFamilyAdjustedIncome(10000, 20000)).toBe(0);
  }));

  // STRING FORMATTING

  it('should currency format strings without dollar signs', inject([FinanceService], (service: FinanceService) => {
    expect(service.currencyFormat(1)).toBe('1');
    expect(service.currencyFormat(1.05)).toBe('1.05');
    expect(service.currencyFormat(1000)).toBe('1,000');
    expect(service.currencyFormat(20000)).toBe('20,000');
    expect(service.currencyFormat(300000)).toBe('300,000');
    expect(service.currencyFormat(999999999)).toBe('999,999,999');

    // Js converts 1.00 to 1, nothing we can do about this
    expect(service.currencyFormat(1.00)).toBe('1');
  }));

  it('should currency format strings with dollar signs', inject([FinanceService], (service: FinanceService) => {
    expect(service.currencyFormat(1, true)).toBe('$1');
    expect(service.currencyFormat(1.05, true)).toBe('$1.05');
    expect(service.currencyFormat(1000, true)).toBe('$1,000');
    expect(service.currencyFormat(999999999, true)).toBe('$999,999,999');
  }));
});


