import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityPageComponent } from './eligibility.component';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ValidationService} from '../../../../services/validation.service';
import {RegistrationService} from '../../registration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('EligibilityComponent - Single Applicant', () => {
  let component: EligibilityPageComponent;
  let fixture: ComponentFixture<EligibilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EligibilityPageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        FPCareDataService,
        ValidationService,
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });

  // Field Validations
  it('missing birthdate cannot continue', () => {
    component.applicant.phn = '9999 999 998';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });

  it('missing PHN cannot continue', () => {
    component.applicant.dateOfBirth = {year: 1989, month: 4, day: 1};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });

  it('required data populated can continue', () => {
    component.applicant.phn = '9999 999 998';
    component.applicant.dateOfBirth = {year: 1989, month: 4, day: 1};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeTruthy();
    });
  });
});


describe('EligibilityComponent - Applicant with Spouse', () => {
  let component: EligibilityPageComponent;
  let fixture: ComponentFixture<EligibilityPageComponent>;
  let dataService: FPCareDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EligibilityPageComponent
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        FPCareDataService,
        ValidationService,
        RegistrationService
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get( FPCareDataService );
    dataService.addSpouse();
    dataService.hasSpouse = true;
    fixture = TestBed.createComponent(EligibilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });

  it('missing applicant birthdate cannot continue', () => {
    component.applicant.phn = '9999 999 998';
    component.spouse.dateOfBirth = {year: 1989, month: 4, day: 1};
    component.spouse.phn = '9999 999 973'
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });
  it('missing applicant phn cannot continue', () => {
    component.spouse.phn = '9999 999 998';
    component.spouse.dateOfBirth = {year: 1989, month: 4, day: 1};
    component.applicant.dateOfBirth = {year: 1990, month: 5, day: 30};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });

  it('missing spouse birthdate cannot continue', () => {
    component.applicant.phn = '9999 999 998';
    component.applicant.dateOfBirth = {year: 1989, month: 4, day: 1};
    component.spouse.phn = '9999 999 973'
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });

  it('missing spouse phn cannot continue', () => {
    component.applicant.phn = '9999 999 998';
    component.applicant.dateOfBirth = {year: 1989, month: 4, day: 1};
    component.applicant.dateOfBirth = {year: 1990, month: 5, day: 30};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();
    });
  });

  it('required data populated can continue', () => {
    component.applicant.phn = '9999 999 998';
    component.applicant.dateOfBirth = {year: 1989, month: 4, day: 1};
    component.spouse.phn = '9999 999 973'
    component.spouse.dateOfBirth = {year: 1990, month: 5, day: 30};
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeTruthy();
    });
  });
});
