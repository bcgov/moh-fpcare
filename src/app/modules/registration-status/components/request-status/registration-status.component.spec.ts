import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStatusComponent } from './registration-status.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';

describe('RegistrationStatusComponent', () => {
  let component: RegistrationStatusComponent;
  let fixture: ComponentFixture<RegistrationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationStatusComponent,
      ],
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        FPCareDataService,
        DummyDataService,
        ApiService,
      ],
      // We use NO_ERRORS_SCHEMA to stop the CaptchaComponent from trying to make an HTTP request
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStatusComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cannot continue by default', () => {
    expect(component.canContinue()).toBeFalsy();
  });

  it('disables reg number when phn is filled out', () => {
    component.applicant.phn = '999999998';
    expect(component.disableRegNum()).toBeTruthy();
    expect(component.disablePhn()).toBeFalsy();
  });

  it('disables phn when reg number is filled out', () => {
    component.applicant.fpcRegNumber = '999999998';
    expect(component.disablePhn()).toBeTruthy();
    expect(component.disableRegNum()).toBeFalsy();
  });

});
