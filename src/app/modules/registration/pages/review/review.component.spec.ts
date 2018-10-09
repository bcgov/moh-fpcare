import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review.component';
import { CoreModule } from '../../../core/core.module';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {fPCareDataServiceStub} from '../../../../services/fpcare-data.service.spec';
import {RegistrationService} from '../../registration.service';
import {FinanceService} from '../../../financial-calculator/finance.service';
import {FinancialCalculatorModule} from '../../../financial-calculator/financial-calculator.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {baselineAssist, pre1939Assist} from '../../../financial-calculator/assistenceLevelsTestData';

describe('ReviewComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewPageComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FinancialCalculatorModule
      ],
      providers: [
        { provide: FPCareDataService, useValue: fPCareDataServiceStub },
        RegistrationService,
        FinanceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    component['financeService'].setAssistanceLevels(baselineAssist, pre1939Assist);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
