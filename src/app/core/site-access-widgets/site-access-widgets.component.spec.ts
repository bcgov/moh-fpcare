import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAccessWidgetsComponent } from './site-access-widgets.component';

describe('SiteAccessWidgetsComponent', () => {
  let component: SiteAccessWidgetsComponent;
  let fixture: ComponentFixture<SiteAccessWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAccessWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAccessWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
