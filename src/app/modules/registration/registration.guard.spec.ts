import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationGuard } from './registration.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrationService} from './registration.service';
import {FPCareDataService} from '../../services/fpcare-data.service';

describe('RegistrationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          RegistrationGuard,
          FPCareDataService,
          RegistrationService
      ],
      imports: [RouterTestingModule],

    });
  });

  it('should ...', inject([RegistrationGuard], (guard: RegistrationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
