import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
