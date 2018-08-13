import { Component, DoCheck, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Person } from '../../../../models/person.model';
import { Router } from '@angular/router';
import { DummyDataService } from '../../../../services/dummy-data.service';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { FPCareDateComponent } from '../../../core/components/date/date.component';
import { environment } from 'environments/environment';
import { ApiService } from '../../../../services/api-service.service';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;
  public captchaApiBaseUrl;

  private _disableRegNum = false;
  private _disablePhn = false;

  constructor(protected router: Router,
              private fpcareDataService: FPCareDataService,
              private dummyDataService: DummyDataService,
              private apiService: ApiService) {
    super(router);
  }

  ngOnInit() {
    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    if (this.form.dirty || this.form.touched ||
      (!!this.dobForm && this.dobForm.map(x => {
        if (x.form.dirty || x.form.touched) {
          return x;
        }
      }).filter(x => x).length > 0)) {
      console.log('Form touched or dirty');
      if (this._disablePhn && (!!!this.applicant.fpcRegNumber ||
        (!!this.applicant.fpcRegNumber && this.applicant.fpcRegNumber.length < 1))) {

        console.log('Reg Number touched');
        this._disablePhn = false;
        this.form.resetForm(); // set form back to pristine/untouched
      } else if (this._disableRegNum && (!!!this.applicant.phn ||
        (!!this.applicant.phn && this.applicant.phn.length < 1)) &&
        (!!!this.applicant.address.postal ||
          (!!this.applicant.address.postal && this.applicant.address.postal.length < 1)) &&
        this.isDobEmpty()) {

        console.log('PHN criteria touched');
        this._disableRegNum = false;
        this.form.resetForm(); // set form back to pristine/untouched
        if (!!this.dobForm) {
          this.dobForm.map(x => { x.form.resetForm(); });
        }
      } else if (!!this.applicant.fpcRegNumber) {

        // Use FPC Registration Number
        console.log('Use FPC Reg Number');
        this._disableRegNum = false;
        this._disablePhn = true;
      } else if (this.applicant.phn || this.applicant.address.postal || !this.isDobEmpty()) {
        // Use PHN, DOB & postal code

        console.log('Use PHN criteria');
        this._disableRegNum = true;
        this._disablePhn = false;
      } else {
        console.log('else case');
      }
    } else {
      console.log('pristine form');
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
    return this.fpcareDataService.applicant;
  }

  /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
  get nonce(): string {
    return this.objectId;
  }

  /**
   * Indicates whether or not the date of birth is empty
   * @returns {boolean}
   */
  isDobEmpty(): boolean {
    return ((this.applicant.dateOfBirth.year === null || this.applicant.dateOfBirth.year === 0) &&
      (this.applicant.dateOfBirth.month === null || this.applicant.dateOfBirth.month === 0) &&
      (this.applicant.dateOfBirth.day === null || this.applicant.dateOfBirth.day === 0)) ? true : false;
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

  setToken(token): void {
    this.apiService.setCaptchaToken(token);
  }

  // Methods triggered by the form action bar
  /**
   * Navigates to the next page
   *
   * TODO: Code functionality
   */
  continue(): void {

    if (this.canContinue()) {

      const request = this.fpcareDataService.getStatusRequest(this.applicant);

      console.log('JSON object: ', request);
      // TODO: remove dummyservice when back-end is built
      this.dummyDataService.submitRequestStatus(request);

      const link = '/registration-status/status-results';
      this.router.navigate([link]);
    }
  }
}
