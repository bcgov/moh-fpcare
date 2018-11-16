import { TestBed, inject } from '@angular/core/testing';

import { SpaEnvService } from './spa-env.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpaEnvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [SpaEnvService]
    });
  });

  it('should be created', inject([SpaEnvService], (service: SpaEnvService) => {
    expect(service).toBeTruthy();
  }));
});
