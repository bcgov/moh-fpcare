import { TestBed, async, inject } from '@angular/core/testing';

import { CanLeaveSplashGuard } from './can-leave-splash.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CanLeaveSplashGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [CanLeaveSplashGuard]
    });
  });

  it('should ...', inject([CanLeaveSplashGuard], (guard: CanLeaveSplashGuard) => {
    expect(guard).toBeTruthy();
  }));
});
