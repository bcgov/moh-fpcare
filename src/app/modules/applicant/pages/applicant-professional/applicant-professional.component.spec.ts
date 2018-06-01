import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfessionalComponent } from './applicant-professional.component';

describe('ApplicantProfessionalComponent', () => {
  let component: ApplicantProfessionalComponent;
  let fixture: ComponentFixture<ApplicantProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
