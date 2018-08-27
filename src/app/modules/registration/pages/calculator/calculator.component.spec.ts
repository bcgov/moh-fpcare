import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPageComponent } from './calculator.component';
import { CoreModule } from '../../../core/core.module';
import { FinancialCalculatorModule } from '../../../financial-calculator/financial-calculator.module';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterTestingModule } from '@angular/router/testing';

describe('CalculatorComponent', () => {
  let component: CalculatorPageComponent;
  let fixture: ComponentFixture<CalculatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorPageComponent ],
      imports: [ CoreModule, FinancialCalculatorModule, FormsModule, TextMaskModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
