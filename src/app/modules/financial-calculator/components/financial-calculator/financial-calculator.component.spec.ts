import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCalculatorComponent } from './financial-calculator.component';
import { AnnualDeductibleComponent } from '../annual-deductible/annual-deductible.component';
import { TextMaskModule } from 'angular2-text-mask';

describe('FinancialCalculatorComponent', () => {
  let component: FinancialCalculatorComponent;
  let fixture: ComponentFixture<FinancialCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialCalculatorComponent, AnnualDeductibleComponent ],
      imports: [ TextMaskModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
