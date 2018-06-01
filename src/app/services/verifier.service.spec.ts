import { TestBed, inject } from '@angular/core/testing';

import { VerifierService } from './verifier.service';

describe('VerifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifierService]
    });
  });

  it('should be created', inject([VerifierService], (service: VerifierService) => {
    expect(service).toBeTruthy();
  }));
});
