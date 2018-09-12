import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Person } from '../../../../models/person.model';
import { Router } from '@angular/router';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { FPCareDateComponent } from '../../../core/components/date/date.component';
import { environment } from 'environments/environment';
import { ApiService } from '../../../../services/api-service.service';
import { ResponseStoreService } from '../../../../services/response-store.service';
import { StatusCheckPHNPayload, StatusCheckRegNumberPayload, StatusCheckPHN, StatusCheckRegNum } from 'app/models/api.model';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';
import {REGISTRATION_STATUS_PATH, RESULT_REG_STATUS} from '../../../../models/route-paths.constants';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit, AfterViewInit {

  /** Access to date component */
  @ViewChild(FPCareDateComponent) dobForm: FPCareDateComponent;
  @ViewChild('consentModal') consentModal: ConsentModalComponent;

  public placeholder = 'A12345678';

  public captchaApiBaseUrl;

  private _hasToken = false;

  /** Result page */
  private _url = REGISTRATION_STATUS_PATH + '/' + RESULT_REG_STATUS;


  constructor(protected router: Router,
              private fpcareDataService: FPCareDataService,
              private apiService: ApiService,
              private responseStore: ResponseStoreService) {
    super(router);
  }

  /**
   * Set max lenght of the registration number input
   * @returns {number}
   */
  regNumberMaxLn(): number {
    return ValidationService.MAX_REGNUM_LENGTH;
  }

  /**
   * Turn letters to upper case
   * @param {string} value
   */
  updateRegNumber(value: string ) {
    this.applicant.fpcRegNumber = value.toUpperCase();
  }

  ngOnInit() {
    this.apiService.subscribeBenefitYear();
    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
  }

  ngAfterViewInit() {

    // Individual has not consented to collection notice
    if (!this.fpcareDataService.acceptedCollectionNotice) {
      this.consentModal.openModal();
    }
  }

  canContinue(): boolean {

    let valid = this.form.valid;

    // We have to explicitly check the DateComponent validity as it doesn't bubble to this.form.
    if (this.disableRegNum()){
      valid = valid && this.dobForm.isValid();
    }

    return (valid && this._hasToken && !this.isFormEmpty());
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
   * Disable Registration Number field
   * @returns {boolean}
   */
  disableRegNum(): boolean {
    const hasDateOfBirth = !this.applicant.isDobEmpty();
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

  /**
   * Method to set the consented value for the collection notice
   * @param {boolean} value
   */
  onAccept( value: boolean ){
    this.fpcareDataService.acceptedCollectionNotice = value;
  }

  // Methods triggered by the form action bar
  /**
   * Navigates to the next page
   *
   */
  continue(): void {

    if (!this.canContinue()) {
      return;
    }

    this.loading = true;

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
        this.responseStore.statusCheckPHN = new StatusCheckPHNPayload(response as StatusCheckPHN);
      }
      else {
        this.responseStore.statusCheckRegNumber = new StatusCheckRegNumberPayload(response as StatusCheckRegNum);
      }
      this.loading = false;
      this.navigate( this._url );
    },
    error => {
      this.loading = false;
      console.log( 'Error occurred: ' + error );
      this.navigate( this._url );
    });
  }
}
