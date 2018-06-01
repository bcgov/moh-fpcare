import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBySiteComponent } from './dashboard-by-site.component';

describe('DashboardBySiteComponent', () => {
  let component: DashboardBySiteComponent;
  let fixture: ComponentFixture<DashboardBySiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBySiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
