import { TestBed, inject } from '@angular/core/testing';

import { SpaEnvService } from './spa-env.service';

describe('SpaEnvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpaEnvService]
    });
  });

  it('should be created', inject([SpaEnvService], (service: SpaEnvService) => {
    expect(service).toBeTruthy();
  }));
});
