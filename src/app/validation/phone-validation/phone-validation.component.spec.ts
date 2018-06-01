import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneValidationComponent } from './phone-validation.component';
import { ElementRef } from '@angular/core';
import { mockValue } from '../base-validation.component.spec';

describe('PhoneValidationComponent', () => {
  let component: PhoneValidationComponent;
  let fixture: ComponentFixture<PhoneValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a regex', () => {
    expect(PhoneValidationComponent.regex).toBeDefined();
  });

  it('be able to validate a phone number', () => {
    expect(PhoneValidationComponent.validate(mockValue('250-555-0609'))).toBeTruthy();
    //Numbers cannot start with a 1. Must start w/ 2-9.
    expect(PhoneValidationComponent.validate(mockValue('150-555-0609'))).toBeFalsy();
    expect(PhoneValidationComponent.validate(mockValue('250-555-0609a'))).toBeFalsy();
    expect(PhoneValidationComponent.validate(mockValue('plzfaila'))).toBeFalsy();
    expect(PhoneValidationComponent.validate(mockValue('2505550609'))).toBeTruthy();
  });
});
