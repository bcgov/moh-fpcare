import { RequestLettersModule } from './request-letters.module';

describe('RequestLettersModule', () => {
  let requestLettersModule: RequestLettersModule;

  beforeEach(() => {
    requestLettersModule = new RequestLettersModule();
  });

  it('should create an instance', () => {
    expect(requestLettersModule).toBeTruthy();
  });
});
