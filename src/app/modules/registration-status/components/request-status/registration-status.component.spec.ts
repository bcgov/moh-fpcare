import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStatusComponent } from './registration-status.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ValidationService} from '../../../../services/validation.service';

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
        FPCareDataService,
        ValidationService
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

  it('disables reg number when a dob field is filled out', () => {
    component.applicant.dateOfBirth = {year: null, day: 11, month: null };
    expect(component.disableRegNum()).toBeTruthy();
    expect(component.disablePhn()).toBeFalsy();
  });

  it('disables phn when reg number is filled out', () => {
    component.applicant.fpcRegNumber = 'A999999998';
    expect(component.disablePhn()).toBeTruthy();
    expect(component.disableRegNum()).toBeFalsy();
  });

  it('invalid PHN', () => {

    component.applicant.phn = '9999999990';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(false);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
          .filter( str => str.includes('fpc-phn') )
          .length ).toEqual(1);
    });
  });

 it('valid PHN', () => {

    component.applicant.phn = '9999999998';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(false);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
          .filter( str => str.includes('fpc-phn') )
          .length ).toEqual(0);
    });
  });

  it('required PHN' , () => {

    component.applicant.address.postal = 'V1D3G4';
    component.applicant.dateOfBirth = {month: 1, day: 2, year: 1989 };

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(false);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
          .filter( str => str.includes('fpc-required') )
          .length ).toEqual(1);
    });
  });

  it('required Postal Code' , () => {

    component.applicant.phn = '9999999998';
    component.applicant.dateOfBirth = {month: 1, day: 2, year: 1989 };

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(false);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
          .filter( str => str.includes('fpc-required') )
          .length ).toEqual(1);
    });
  });

  it('invalid FPC Registration Number' , () => {

    component.applicant.fpcRegNumber = 'B99999999';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(false);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
          .filter( str => str.includes('fpc-regnumber') )
          .length ).toEqual(1);
    });
  });

  it('valid FPC Registration Number' , () => {

    component.applicant.fpcRegNumber = 'A08349678';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.form.valid).toBe(true);
      const errors = Object.keys(component.form.controls)
          .map( key => component.form.controls[key].errors )
          .filter( x => x );

      expect( errors.map( x => Object.getOwnPropertyNames( x ) )
         .filter( str => str.includes('fpc-regnumber') )
         .length ).toEqual(0);
    });
  });

});

