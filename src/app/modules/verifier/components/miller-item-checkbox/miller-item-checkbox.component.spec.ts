import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillerItemCheckboxComponent } from './miller-item-checkbox.component';

describe('MillerItemCheckboxComponent', () => {
  let component: MillerItemCheckboxComponent;
  let fixture: ComponentFixture<MillerItemCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillerItemCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillerItemCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
