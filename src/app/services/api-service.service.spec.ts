import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api-service.service';

describe('ApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
