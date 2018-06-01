import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentProgressRowComponent } from './enrollment-progress-row.component';

describe('EnrollmentProgressRowComponent', () => {
  let component: EnrollmentProgressRowComponent;
  let fixture: ComponentFixture<EnrollmentProgressRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentProgressRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentProgressRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
