import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillerColumnsComponent } from './miller-columns.component';

describe('MillerColumnsComponent', () => {
  let component: MillerColumnsComponent;
  let fixture: ComponentFixture<MillerColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillerColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillerColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
