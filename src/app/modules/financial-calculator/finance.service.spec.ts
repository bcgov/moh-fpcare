import { TestBed, inject } from '@angular/core/testing';

import { FinanceService } from './finance.service';
import { PharmaCareAssistanceLevels, Pre1939PharmaCareAssistanceLevels } from './assistance-levels.interface';

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
    expect(service.findAssistanceLevel(0)).toBe(PharmaCareAssistanceLevels[0]);
  }));

  it('should lookup PharmaCare Assistance Levels from 1939', inject([FinanceService], (service: FinanceService) => {
    expect(service.findAssistanceLevel(0, {bornBefore1939: true})).toBe(Pre1939PharmaCareAssistanceLevels[0]);
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
