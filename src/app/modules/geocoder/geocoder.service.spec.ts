import { TestBed, inject } from '@angular/core/testing';

import { GeocoderService } from './geocoder.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('GeocoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GeocoderService,
      ]
    });
  });

  it('should be created', inject([GeocoderService], (service: GeocoderService) => {
    expect(service).toBeTruthy();
  }));
});
