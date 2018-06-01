import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailValidationComponent } from './email-validation.component';

describe('EmailValidationComponent', () => {
  let component: EmailValidationComponent;
  let fixture: ComponentFixture<EmailValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
