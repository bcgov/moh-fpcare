import { TestBed, inject } from '@angular/core/testing';

import { SplashPageService } from './splash-page.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SplashPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [SplashPageService]
    });
  });

  it('should be created', inject([SplashPageService], (service: SplashPageService) => {
    expect(service).toBeTruthy();
  }));
});
