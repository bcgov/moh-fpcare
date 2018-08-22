import { TestBed, inject } from '@angular/core/testing';

import { LogService } from './log.service';
import {HttpClientModule} from '@angular/common/http';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        LogService
      ]
    });
  });

  it('should be created', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));
});
