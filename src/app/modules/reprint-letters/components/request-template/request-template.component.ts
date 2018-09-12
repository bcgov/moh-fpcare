import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ApiService} from '../../../../services/api-service.service';
import {environment} from '../../../../../environments/environment';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {ReprintLetter, ReprintLetterPayload} from '../../../../models/api.model';
import {REPRINT_LETTERS_PATH, REPRINT_STATUS} from '../../../../models/route-paths.constants';

/**
 * Letter types
 */
export enum LetterTypes {
  CONSENT_LETTER  = '1',
  COB_LETTER = '5'
}

export interface ComponentData {
  label: string;
  letterType: string;
}

@Component({
  selector: 'fpcare-request-template',
  templateUrl: './request-template.component.html',
  styleUrls: ['./request-template.component.scss']
})
export class RequestTemplateComponent extends AbstractFormComponent implements OnInit, AfterViewInit {

  @Input() data: ComponentData;

  /** Access to date component */
  @ViewChild(FPCareDateComponent) dobForm: FPCareDateComponent;
  @ViewChild('consentModal') consentModal: ConsentModalComponent;

  public captchaApiBaseUrl;

  protected _hasToken = false;

  /** Result page */
  private _url = REPRINT_LETTERS_PATH + '/' + REPRINT_STATUS;

  constructor( protected router: Router,
               private fpcareDataService: FPCareDataService,
               private apiService: ApiService,
               private responseStore: ResponseStoreService ) {
    super( router );
  }

  ngOnInit() {
    this.apiService.subscribeBenefitYear();

    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
    this.fpcareDataService.reprintLetterType = this.data.letterType;
  }

  ngAfterViewInit() {

    // Individual has not consented to collection notice
    if (!this.fpcareDataService.acceptedCollectionNotice) {
      this.consentModal.openModal();
    }
  }

  /**
   * Object for recording registrant's information
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  canContinue(): boolean {

    let valid = this.form.valid;

    // We have to explicitly check the DateComponent validity as it doesn't bubble to this.form.
    valid = valid && this.dobForm.form.valid;

    // User should have already consented to close modal, but we check again here just in case.
    const consented = this.fpcareDataService.acceptedCollectionNotice;

    return (valid && this._hasToken && !this.isFormEmpty() && consented);
  }

  /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
  get nonce(): string {
    return this.objectId;
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
   * Sends request to API service and receives response
   */
  continue() {
    if (!this.canContinue()) {
      return;
    };

    this.loading = true;

    // Setup the request
    const subscription = this.apiService.reprintLetter({
        phn: this.applicant.phn,
        benefitYear: this.fpcareDataService.benefitYear,
        dob: this.applicant.dateOfBirthShort,
        postalCode: this.applicant.address.postal,
        letterType: this.data.letterType
      });

    // Trigger the HTTP request
    subscription.subscribe(response => {
      this.responseStore.reprintLetter = new ReprintLetterPayload(response as ReprintLetter);
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
