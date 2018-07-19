import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTemplateComponent } from './request-template.component';

describe('RequestTemplateComponent', () => {
  let component: RequestTemplateComponent;
  let fixture: ComponentFixture<RequestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
