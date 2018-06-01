import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionerDashboardComponent } from './provisioner-dashboard.component';

describe('ProvisionerDashboardComponent', () => {
  let component: ProvisionerDashboardComponent;
  let fixture: ComponentFixture<ProvisionerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
