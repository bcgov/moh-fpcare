import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Applicant requesting registration status */
  private _applicant: Person = new Person();

  private _disableRegNum = false;
  private _disablePhn = false;

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService
             , private dummyDataService: DummyDataService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    if ( !!!this.applicant.fpcRegNumber &&
         !!!this.applicant.phn &&
         !!!this.applicant.address.postal &&
         this.isDobEmpty()) {
      // empty fields
      this._disableRegNum = false;
      this._disablePhn = false;

      console.log('Form: ', this.form);
      // Reset for to Pristine/Untouched
      // TODO: Figure out how to clear errors if set
      this.form.resetForm();
      if ( !!this.dobForm ) {
        this.dobForm.map(x => { x.form.resetForm(); } );
      }
    } else if ( !!this.applicant.fpcRegNumber ) {
      // Use FPC Registration Number
      this._disableRegNum = false;
      this._disablePhn = true;
    } else {
      // Use PHN, DOB & postal code
      this._disableRegNum = true;
      this._disablePhn = false;
    }

    let valid = this.form.valid;

    if (!this._disablePhn) {

      valid = valid && !!this.dobForm;
      if (!!this.dobForm) {
        const dobForm = (this.dobForm.map(x => {
          if (x.isValid()) {
            return x.form.valid;
          }
        })
          .filter(x => x !== true).length === 0);
        valid = valid && dobForm;
      }
  }

    this._canContinue = valid;
  }

  /**
   * Structure to record data for request
   * @returns {Person}
   */
  get applicant(): Person {
    return this._applicant;
  }

  isDobEmpty(): boolean {
    return ( (this.applicant.dateOfBirth.year === null || this.applicant.dateOfBirth.year === 0 ) &&
       (this.applicant.dateOfBirth.month === null || this.applicant.dateOfBirth.month === 0 ) &&
       (this.applicant.dateOfBirth.day === null || this.applicant.dateOfBirth.day === 0 ) ) ? true : false ;
  }

  /**
   * Disable Registration Number field
   * @returns {boolean}
   */
  disableRegNum(): boolean {
    return this._disableRegNum;
  }

  /**
   * Disable PHN, DOB, & postal code fields
   * @returns {boolean}
   */
  disablePhn(): boolean {
    return this._disablePhn;
  }

  // Methods triggered by the form action bar
  // TODO: Code functionality
  continue(): void {

    if (this.canContinue()) {

      const request = this.fpcareDataService.getStatusRequest(this._applicant);

      console.log('JSON object: ', request);
      // TODO: remove dummyservice when back-end is built
      this.dummyDataService.submitRequestStatus(request);

      const link = '/registration-status/status-results';
      this.router.navigate([link]);
    }
  }
}
