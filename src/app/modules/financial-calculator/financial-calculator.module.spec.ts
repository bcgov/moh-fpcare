import { FinancialCalculatorModule } from './financial-calculator.module';

describe('FinancialCalculatorModule', () => {
  let financialCalculatorModule: FinancialCalculatorModule;

  beforeEach(() => {
    financialCalculatorModule = new FinancialCalculatorModule();
  });

  it('should create an instance', () => {
    expect(financialCalculatorModule).toBeTruthy();
  });
});
