import { TestBed, inject } from '@angular/core/testing';

import { Logger } from './logger.service';
import {HttpClientModule} from '@angular/common/http';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        Logger
      ]
    });
  });

  it('should be created', inject([Logger], (service: Logger) => {
    expect(service).toBeTruthy();
  }));
});
