import { StandaloneCalculatorPageModule } from './standalone-calculator-page.module';

xdescribe('StandaloneCalculatorPageModule', () => {
  let standaloneCalculatorPageModule: StandaloneCalculatorPageModule;

  beforeEach(() => {
    standaloneCalculatorPageModule = new StandaloneCalculatorPageModule();
  });

  it('should create an instance', () => {
    expect(standaloneCalculatorPageModule).toBeTruthy();
  });
});
