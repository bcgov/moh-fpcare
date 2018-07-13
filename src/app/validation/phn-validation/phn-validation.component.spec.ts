import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhnValidationComponent } from './phn-validation.component';

describe('PhnValidationComponent', () => {
  let component: PhnValidationComponent;
  let fixture: ComponentFixture<PhnValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhnValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
