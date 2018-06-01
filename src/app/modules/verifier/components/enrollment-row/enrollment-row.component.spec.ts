import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentRowComponent } from './enrollment-row.component';

describe('EnrollmentRowComponent', () => {
  let component: EnrollmentRowComponent;
  let fixture: ComponentFixture<EnrollmentRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
