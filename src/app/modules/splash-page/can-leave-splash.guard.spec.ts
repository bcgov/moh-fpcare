import { TestBed, async, inject } from '@angular/core/testing';

import { CanLeaveSplashGuard } from './can-leave-splash.guard';

describe('CanLeaveSplashGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanLeaveSplashGuard]
    });
  });

  it('should ...', inject([CanLeaveSplashGuard], (guard: CanLeaveSplashGuard) => {
    expect(guard).toBeTruthy();
  }));
});
