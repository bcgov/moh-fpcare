import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualDeductibleComponent } from './annual-deductible.component';

describe('AnnualDeductibleComponent', () => {
  let component: AnnualDeductibleComponent;
  let fixture: ComponentFixture<AnnualDeductibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualDeductibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualDeductibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
