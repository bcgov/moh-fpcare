import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegResultsComponent } from './reg-results.component';
import {CoreModule} from '../../../core/core.module';
import {RegistrationService} from '../../registration.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FinancialCalculatorModule} from '../../../financial-calculator/financial-calculator.module';

describe('RegResultsComponent', () => {
  let component: RegResultsComponent;
  let fixture: ComponentFixture<RegResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegResultsComponent
      ],
      imports: [
        CoreModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FinancialCalculatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        RegistrationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
