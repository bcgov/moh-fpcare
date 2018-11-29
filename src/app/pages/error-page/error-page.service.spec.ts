import { TestBed, inject } from '@angular/core/testing';

import { ErrorPageService } from './error-page.service';

describe('ErrorPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorPageService]
    });
  });

  it('should be created', inject([ErrorPageService], (service: ErrorPageService) => {
    expect(service).toBeTruthy();
  }));
});
