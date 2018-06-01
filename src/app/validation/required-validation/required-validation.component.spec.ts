import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequiredValidationErrorsComponent } from './required-validation.component';
import { mockValue } from '../base-validation.component.spec';

describe('RequiredErrorAlertComponent', () => {
  let component: RequiredValidationErrorsComponent;
  let fixture: ComponentFixture<RequiredValidationErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredValidationErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredValidationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('be able to validate a field as required', () => {
    expect(RequiredValidationErrorsComponent.validate(mockValue('Some Data'))).toBeTruthy();
    expect(RequiredValidationErrorsComponent.validate(mockValue(''))).toBeFalsy();
    expect(RequiredValidationErrorsComponent.validate(mockValue(' '))).toBeTruthy();
    expect(RequiredValidationErrorsComponent.validate(mockValue(''))).toBeFalsy();
  });
});
