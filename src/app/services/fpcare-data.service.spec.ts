import { TestBed, inject } from '@angular/core/testing';

import { FPCareDataService } from './fpcare-data.service';

describe('FPCareDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FPCareDataService]
    });
  });

  it('should be created', inject([FPCareDataService], (service: FPCareDataService) => {
    expect(service).toBeTruthy();
  }));
});
