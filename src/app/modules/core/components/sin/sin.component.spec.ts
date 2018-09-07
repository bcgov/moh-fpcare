import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinComponent } from './sin.component';

describe('SinComponent', () => {
  let component: SinComponent;
  let fixture: ComponentFixture<SinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
