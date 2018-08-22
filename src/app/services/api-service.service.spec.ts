import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api-service.service';
import {HttpClientModule} from '@angular/common/http';

describe('ApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ApiService
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
