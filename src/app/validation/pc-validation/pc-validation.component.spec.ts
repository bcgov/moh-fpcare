import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcValidationComponent } from './pc-validation.component';

describe('PcValidationComponent', () => {
  let component: PcValidationComponent;
  let fixture: ComponentFixture<PcValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
