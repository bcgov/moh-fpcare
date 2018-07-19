import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCobComponent } from './request-cob.component';

describe('RequestCobComponent', () => {
  let component: RequestCobComponent;
  let fixture: ComponentFixture<RequestCobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
