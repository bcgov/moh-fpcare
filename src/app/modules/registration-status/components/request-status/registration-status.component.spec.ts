import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStatusComponent } from './registration-status.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
        HttpClientTestingModule
      ],
      providers: [
        FPCareDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStatusComponent);

    component = fixture.componentInstance;
    component['fpcareDataService'].acceptedCollectionNotice = true;
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
    component.applicant.fpcRegNumber = 'A999999998';
    expect(component.disablePhn()).toBeTruthy();
    expect(component.disableRegNum()).toBeFalsy();
  });

});
