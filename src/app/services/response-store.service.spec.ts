import { TestBed, inject } from '@angular/core/testing';

import { ResponseStoreService } from './response-store.service';

describe('ResponseStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseStoreService]
    });
  });

  it('should be created', inject([ResponseStoreService], (service: ResponseStoreService) => {
    expect(service).toBeTruthy();
  }));
});
