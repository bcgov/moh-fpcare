import { TestBed, inject } from '@angular/core/testing';

import { ApplicantDataService } from './applicant-data.service';

describe('ApplicantDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicantDataService]
    });
  });

  it('should be created', inject([ApplicantDataService], (service: ApplicantDataService) => {
    expect(service).toBeTruthy();
  }));
});
