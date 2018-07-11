import { RegistrationStatusModule } from './registration-status.module';

describe('RegistrationStatusModule', () => {
  let registrationStatusModule: RegistrationStatusModule;

  beforeEach(() => {
    registrationStatusModule = new RegistrationStatusModule();
  });

  it('should create an instance', () => {
    expect(registrationStatusModule).toBeTruthy();
  });
});
