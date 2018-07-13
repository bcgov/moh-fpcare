import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNumberValidationComponent } from './reg-number-validation.component';

describe('RegNumberValidationComponent', () => {
  let component: RegNumberValidationComponent;
  let fixture: ComponentFixture<RegNumberValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNumberValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNumberValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
