import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequirementsComponent } from './registration-requirements.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { APP_BASE_HREF } from '@angular/common';

describe('RegistrationRequirementsComponent', () => {
  let component: RegistrationRequirementsComponent;
  let fixture: ComponentFixture<RegistrationRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRequirementsComponent ],
      imports: [ RouterTestingModule, CoreModule ],
      providers: [ {provide: APP_BASE_HREF, useValue: '/'} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
