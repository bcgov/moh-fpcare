import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConsentComponent } from './request-consent.component';

describe('RequestConsentComponent', () => {
  let component: RequestConsentComponent;
  let fixture: ComponentFixture<RequestConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
