import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAccessAcceptanceComponent } from './applicant-access-acceptance.component';

describe('ApplicantAccessAcceptanceComponent', () => {
  let component: ApplicantAccessAcceptanceComponent;
  let fixture: ComponentFixture<ApplicantAccessAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantAccessAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantAccessAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
