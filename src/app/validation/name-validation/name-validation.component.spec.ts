import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameValidationComponent } from './name-validation.component';

describe('NameValidationComponent', () => {
  let component: NameValidationComponent;
  let fixture: ComponentFixture<NameValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
