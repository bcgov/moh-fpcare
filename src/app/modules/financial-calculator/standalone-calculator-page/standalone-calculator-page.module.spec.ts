import { StandaloneCalculatorPageModule } from './standalone-calculator-page.module';

describe('StandaloneCalculatorPageModule', () => {
  let standaloneCalculatorPageModule: StandaloneCalculatorPageModule;

  beforeEach(() => {
    standaloneCalculatorPageModule = new StandaloneCalculatorPageModule();
  });

  it('should create an instance', () => {
    expect(standaloneCalculatorPageModule).toBeTruthy();
  });
});
