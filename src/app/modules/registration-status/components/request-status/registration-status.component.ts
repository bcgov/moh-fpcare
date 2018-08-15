import { Component, DoCheck, OnInit, QueryList, ViewChild } from '@angular/core';
import { Person } from '../../../../models/person.model';
import { Router } from '@angular/router';
import { DummyDataService } from '../../../../services/dummy-data.service';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { FPCareDateComponent } from '../../../core/components/date/date.component';
import { environment } from 'environments/environment';
import { ApiService } from '../../../../services/api-service.service';
import { ResponseStoreService } from '../../../../services/response-store.service';
import { StatusCheckPHNPayload, StatusCheckRegNumberPayload } from 'app/models/api.model';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChild(FPCareDateComponent) dobForm: FPCareDateComponent;
  public captchaApiBaseUrl;

  private _disableRegNum = false;
  private _disablePhn = false;
  private _hasToken = false;

  constructor(protected router: Router,
              private fpcareDataService: FPCareDataService,
              // private dummyDataService: DummyDataService,
              private apiService: ApiService,
              private responseStore: ResponseStoreService) {
    super(router);
  }

  ngOnInit() {
    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;

    // Bypass the CAPTCHA if not production.
    if (!environment.production){
      this._hasToken = true;
    }
  }


  canContinue(): boolean {
    // return this._canContinue;
    let valid = this.form.valid;

    // We have to explicitly check the DateComponent validity as it doesn't bubble to this.form.
    if (this.disableRegNum()){
      valid = valid && this.dobForm.form.valid;
    }

    return (valid && this._hasToken);
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
    return Object.keys(this.applicant.dateOfBirth)
      .map(key => this.applicant.dateOfBirth[key])
      .filter(x => x) // Filter out null/undefined
      .length === 0;
  }

  /**
   * Disable Registration Number field
   * @returns {boolean}
   */
  disableRegNum(): boolean {
    const hasDateOfBirth = !this.isDobEmpty();
    return !!this.applicant.phn || hasDateOfBirth || !!this.applicant.address.postal;
  }

  /**
   * Disable PHN, DOB, & postal code fields
   * @returns {boolean}
   */
  disablePhn(): boolean {
    return !!this.applicant.fpcRegNumber;
  }

  setToken(token): void {
    this._hasToken = true;
    this.apiService.setCaptchaToken(token);
  }

  // Methods triggered by the form action bar
  /**
   * Navigates to the next page
   *
   */
  continue(): void {

    console.log('continue clicked');
    if (!this.canContinue()) {
      return;
    };

    // Setup the request
    let subscription;
    if (this.disableRegNum()) {
      subscription = this.apiService.statusCheckPHN({
        phn: this.applicant.phn,
        benefitYear: this.fpcareDataService.benefitYear,
        dob: this.applicant.dateOfBirthShort,
        postalCode: this.applicant.address.postal
      });
    }
    else {
      subscription = this.apiService.statusCheckFamNumber({
        benefitYear: this.fpcareDataService.benefitYear,
        regNumber: this.applicant.fpcRegNumber
      });
    }

    // Trigger the HTTP request
    subscription.subscribe(response => {
      if (this.disableRegNum()) {
        this.responseStore.statusCheckPHN = new StatusCheckPHNPayload(response);
      }
      else {
        this.responseStore.statusCheckRegNumber = new StatusCheckRegNumberPayload(response);
      }
      const link = '/registration-status/status-results';
      this.router.navigate([link]);
    });


  }
}
