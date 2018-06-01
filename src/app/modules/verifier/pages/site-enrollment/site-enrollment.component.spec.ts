import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteEnrollmentComponent } from './site-enrollment.component';

describe('SiteEnrollmentComponent', () => {
  let component: SiteEnrollmentComponent;
  let fixture: ComponentFixture<SiteEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
