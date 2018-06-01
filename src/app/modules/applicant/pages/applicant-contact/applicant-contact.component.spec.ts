import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantContactComponent } from './applicant-contact.component';

describe('ApplicantContactComponent', () => {
  let component: ApplicantContactComponent;
  let fixture: ComponentFixture<ApplicantContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
