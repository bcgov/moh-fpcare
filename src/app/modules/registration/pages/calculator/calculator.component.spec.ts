import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { CalculatorPageComponent } from './calculator.component';
import { CoreModule } from '../../../core/core.module';
import { FinancialCalculatorModule } from '../../../financial-calculator/financial-calculator.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationService } from '../../registration.service';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../services/api-service.service';
import { FinanceService } from '../../../financial-calculator/finance.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  baselineAssist,
  pre1939Assist,
} from '../../../financial-calculator/assistenceLevelsTestData';

describe('CalculatorComponent', () => {
  let component: CalculatorPageComponent;
  let fixture: ComponentFixture<CalculatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorPageComponent],
      imports: [
        CoreModule,
        FinancialCalculatorModule,
        FormsModule,
        TextMaskModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        RegistrationService,
        FPCareDataService,
        FinanceService,
        ApiService,
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorPageComponent);
    component = fixture.componentInstance;
    component['financeService'].setAssistanceLevels(
      baselineAssist,
      pre1939Assist
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });

  // Required Fields - validations
  it('applicant cannot continue without relationship status', (done) => {
    component.income = '45,000';
    component.bornBefore1939 = false;

    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();

      done();
    });
  });

  it('applicant cannot continue without indicating if born before 1939', (done) => {
    component.income = '45,000';
    component.hasSpouse = false;

    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();

      done();
    });
  });

  it('Single applicant can continue (No spouse)', (done) => {
    component.income = '45,000';
    component.hasSpouse = false;
    component.bornBefore1939 = false;

    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeTruthy();

      done();
    });
  });

  it('applicant with spouse cannot continue without spouse income', (done) => {
    component.income = '45,000';
    component.hasSpouse = true;
    component.bornBefore1939 = false;

    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeFalsy();

      done();
    });
  });

  it('applicant with spouse can continue', (done) => {
    component.income = '45,000';
    component.hasSpouse = true;
    component.bornBefore1939 = false;
    component.spouseIncome = '45,000';

    fixture.whenStable().then(() => {
      expect(component.canContinue()).toBeTruthy();

      done();
    });
  });
});
