import { SplashPageModule } from './splash-page.module';

describe('SplashPageModule', () => {
  let splashPageModule: SplashPageModule;

  beforeEach(() => {
    splashPageModule = new SplashPageModule();
  });

  it('should create an instance', () => {
    expect(splashPageModule).toBeTruthy();
  });
});
