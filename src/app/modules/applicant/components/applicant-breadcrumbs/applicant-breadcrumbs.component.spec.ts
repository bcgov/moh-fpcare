import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantBreadcrumbsComponent } from './applicant-breadcrumbs.component';

describe('ApplicantBreadcrumbsComponent', () => {
  let component: ApplicantBreadcrumbsComponent;
  let fixture: ComponentFixture<ApplicantBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
