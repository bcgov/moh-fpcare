import { TestBed, inject } from '@angular/core/testing';
import { Applicant } from './applicant.model';
import { Colleges } from './colleges.enum';
import { DummyDataService } from '../services/dummy-data.service';

describe('Applicant Model', () => {
  let applicant: Applicant;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DummyDataService]
    });
    applicant = new Applicant();
  });

  it('should create an applicant', () => {
    expect(applicant).toBeDefined();
  });

  it('should be able to go to a single college', () => {
    expect(applicant.goesToCollege()).toBeFalsy();
    applicant.college = [Colleges.CPBC];
    expect(applicant.goesToCollege(Colleges.CPBC)).toBe(true);
    expect(applicant.goesToCollege(Colleges.CPSBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.CRNBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.None)).toBe(false);
    expect(applicant.goesToCollege()).toBe(true);
  });

  it('should be able to go to multiple colleges', () => {
    applicant.college = [Colleges.CPBC, Colleges.CRNBC];
    expect(applicant.goesToCollege(Colleges.CPBC)).toBe(true);
    expect(applicant.goesToCollege(Colleges.CRNBC)).toBe(true);
    expect(applicant.goesToCollege(Colleges.CPSBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.None)).toBe(false);
    expect(applicant.goesToCollege()).toBe(true);
  });

  it('should not go to college when college selection is undefined', () => {
    applicant.college = [];
    expect(applicant.goesToCollege()).toBe(false);
    expect(applicant.goesToCollege(Colleges.CPBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.CRNBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.CPSBC)).toBe(false);
    expect(applicant.goesToCollege(Colleges.None)).toBe(false);
  });

  it(`should not go to college when college selection is Colleges.None, BUT it \
   should be able to specifically lookup if applicant goes to College.None`, () => {
    applicant.college = [Colleges.None];
    expect(applicant.goesToCollege(Colleges.None)).toBe(true);
    expect(applicant.goesToCollege()).toBe(false);
  });

  it('should have a full name field', () => {
    expect(applicant.fullName).toBeNull();
    applicant.firstName = 'William';
    applicant.lastName = 'Gates';
    expect(applicant.fullName).toBe('William Gates');
    applicant.middleName = 'Henry';
    expect(applicant.fullName).toBe('William Henry Gates');
  });

  it('should detect the presence of security questions', () => {
    expect(applicant.hasSecurityQuestions).toBe(false);
    for (let i = 0; i < 3; i++) {
      applicant.securityQuestions.push({ question: null, answer: null });
    }
    expect(applicant.hasSecurityQuestions).toBe(false);
    for (let i = 0; i < 3; i++) {
      applicant.securityQuestions.push({ question: 'Test', answer: 'Test' });
    }
    expect(applicant.hasSecurityQuestions).toBe(true);
  });

  it('should work with DummyDataService', inject([DummyDataService], (dummyData: DummyDataService) => {
    applicant = dummyData.useApplicantDummyData(applicant);
    expect(applicant.goesToCollege()).toBeTruthy();
    expect(applicant.hasSecurityQuestions).toBeTruthy();
    expect(applicant.fullName).toEqual('Bill Henry Gates');
  }));
});
