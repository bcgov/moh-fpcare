import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPageComponent } from './calculator.component';
import { CoreModule } from '../../../core/core.module';

describe('CalculatorComponent', () => {
  let component: CalculatorPageComponent;
  let fixture: ComponentFixture<CalculatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorPageComponent ],
      imports: [ CoreModule ]
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
