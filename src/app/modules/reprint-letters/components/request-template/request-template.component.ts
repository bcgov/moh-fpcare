import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FPCPerson} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ApiService} from '../../../../services/api-service.service';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {ReprintLetter, ReprintLetterPayload} from '../../../../models/api.model';
import {ERROR_PAGE, REPRINT_LETTERS_PATH, REPRINT_STATUS} from '../../../../models/route-paths.constants';
import {ErrorPageService} from '../../../../pages/error-page/error-page.service';

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
  @ViewChild('consentModal', { static: true }) consentModal: ConsentModalComponent;

  /** Result page */
  private _url = REPRINT_LETTERS_PATH + '/' + REPRINT_STATUS;

  constructor( protected router: Router,
               private fpcareDataService: FPCareDataService,
               private apiService: ApiService,
               private responseStore: ResponseStoreService,
               private errorPageService: ErrorPageService) {
    super( router );
  }

  ngOnInit() {
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
   * @returns {FPCPerson}
   */
  get applicant(): FPCPerson {
    return this.fpcareDataService.applicant;
  }

  canContinue(): boolean {

    // Main and sub forms are not empty and are valid
    if ( super.canContinue() ) {

      return (this.fpcareDataService.acceptedCollectionNotice);
    }
    return false;
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
    }

    this.loading = true;

    // Setup the request
    const subscription = this.apiService.reprintLetter({
        phn: this.applicant.getNonFormattedPhn(),
        dob: this.applicant.dateOfBirthShort,
        postalCode: this.applicant.getNonFormattedPostalCode(),
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
      this.errorPageService.errorResponse = error;
      this.navigate( ERROR_PAGE );
    });
  }
}
