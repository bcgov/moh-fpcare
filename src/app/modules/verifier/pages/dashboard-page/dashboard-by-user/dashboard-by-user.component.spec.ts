import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardByUserComponent } from './dashboard-by-user.component';

describe('DashboardByUserComponent', () => {
  let component: DashboardByUserComponent;
  let fixture: ComponentFixture<DashboardByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
