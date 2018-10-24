import { TestBed, inject } from '@angular/core/testing';

import { SplashPageService } from './splash-page.service';

describe('SplashPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplashPageService]
    });
  });

  it('should be created', inject([SplashPageService], (service: SplashPageService) => {
    expect(service).toBeTruthy();
  }));
});
