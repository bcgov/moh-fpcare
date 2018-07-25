import { TestBed, inject } from '@angular/core/testing';
import { FPCareDataService } from './fpcare-data.service';
import {DummyDataService} from './dummy-data.service';
import {Injectable} from '@angular/core';

const dummyDataService = new DummyDataService();

/**
 * Stud to inject data into tests
 * @type {{applicant: Person; spouse: Person; hasSpouse: () => boolean}}
 */
export const fPCareDataServiceStub: Partial<FPCareDataService> = {
  applicant: dummyDataService.createAdult(),
  spouse: dummyDataService.createAdult(),
  hasSpouse: () => { return true; }
}

describe('FPCareDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FPCareDataService]
    });
  });

  it('should be created', inject([FPCareDataService], (service: FPCareDataService) => {
    expect(service).toBeTruthy();
  }));
});
