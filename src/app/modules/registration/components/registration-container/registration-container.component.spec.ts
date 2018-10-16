import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { pageRoutes } from '../../registration-page-routing';


import { RegistrationContainerComponent } from './registration-container.component';
import { CoreModule } from '../../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationContainerComponent', () => {
  let component: RegistrationContainerComponent;
  let fixture: ComponentFixture<RegistrationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationContainerComponent ],
      imports: [ CoreModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert one-word routes to titles', () => {
    expect(component.convertRouteToTitle('financial')).toBe('Financial');
    expect(component.convertRouteToTitle('review')).toBe('Review');
  });

  it('should convert two-word routes to titles', () => {
    expect(component.convertRouteToTitle('personal-info')).toBe('Personal Info');
    expect(component.convertRouteToTitle('child-info')).toBe('Child Info');
  });

  it('should have progressSteps defined and not empty', () => {
    expect(component.progressSteps).toBeDefined();
    expect(component.progressSteps.length).toBeDefined();
    expect(component.progressSteps.length).toBeGreaterThanOrEqual(1);
  });

  it('progressStep length should equal pageRoutes length', () => {
    // redirect path added therefore progress should be one less
    expect(component.progressSteps.length).toEqual(pageRoutes.length - 1);
  });

});
