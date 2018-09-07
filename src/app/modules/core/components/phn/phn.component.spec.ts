import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhnComponent } from './phn.component';

describe('PhnComponent', () => {
  let component: PhnComponent;
  let fixture: ComponentFixture<PhnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
