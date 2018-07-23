import { TestBed, inject } from '@angular/core/testing';

import { DateTimeService } from './date-time.service';

describe('DateTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeService]
    });
  });

  it('should be created', inject([DateTimeService], (service: DateTimeService) => {
    expect(service).toBeTruthy();
  }));
});
