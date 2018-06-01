import { TestBed, inject } from '@angular/core/testing';

import { CollegeDataService } from './college-data.service';
import { Colleges } from '../models/colleges.enum';

describe('CollegeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollegeDataService]
    });
  });

  it('should be created', inject([CollegeDataService], (service: CollegeDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 4 items in college list', inject([CollegeDataService], (service: CollegeDataService) => {
    expect(service.defaultCollegeList().length === 4).toBeTruthy();
    expect(service.defaultCollegeList()[0].text === 'None').toBeTruthy();
  }));

  it('should get text for single selections', inject([CollegeDataService], (service: CollegeDataService) => {
      expect(service.getTextFromSelection([Colleges.None])).toEqual('None');
      expect(service.getTextFromSelection([Colleges.CPSBC])).toEqual('College of Physicians and Surgeons of BC (CPSBC) - 91');
      expect(service.getTextFromSelection([Colleges.CPBC])).toEqual('College of Pharmacists of BC (CPBC) - P1');
  }));

  it('should get text for multiple selections', inject([CollegeDataService], (service: CollegeDataService) => {
    expect(service.getTextFromSelection([Colleges.CPSBC, Colleges.CPBC]))
    .toEqual('College of Physicians and Surgeons of BC (CPSBC) - 91, College of Pharmacists of BC (CPBC) - P1');
}));
});
