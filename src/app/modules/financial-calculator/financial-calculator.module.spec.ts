import { FinancialCalculatorModule } from './financial-calculator.module';

xdescribe('FinancialCalculatorModule', () => {
  let financialCalculatorModule: FinancialCalculatorModule;

  beforeEach(() => {
    financialCalculatorModule = new FinancialCalculatorModule();
  });

  it('should create an instance', () => {
    expect(financialCalculatorModule).toBeTruthy();
  });
});
