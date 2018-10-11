import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ApiService} from '../../../../services/api-service.service';
import {environment} from '../../../../../environments/environment';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {ReprintLetter, ReprintLetterPayload} from '../../../../models/api.model';
import {REPRINT_LETTERS_PATH, REPRINT_STATUS} from '../../../../models/route-paths.constants';
import {phn_def, phn_hdr} from '../../../../models/fpcare-aside-definitions';


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
  @ViewChild('consentModal') consentModal: ConsentModalComponent;

  // headers and definitions for aside (repeated in multiple places)
  public phnHdr: string = phn_hdr;
  public phnDef: string =  phn_def;

  /** Result page */
  private _url = REPRINT_LETTERS_PATH + '/' + REPRINT_STATUS;

  constructor( protected router: Router,
               private fpcareDataService: FPCareDataService,
               private apiService: ApiService,
               private responseStore: ResponseStoreService ) {
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
   * @returns {Person}
   */
  get applicant(): Person {
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

    if ( value ) {
      // load the benefit year
      this.apiService.loadBenefitYear();
    }
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
        phn: this.fpcareDataService.removeStrFormat( this.applicant.phn ),
        benefitYear: this.fpcareDataService.benefitYear,
        dob: this.applicant.dateOfBirthShort,
        postalCode: this.fpcareDataService.removeStrFormat( this.applicant.address.postal ),
        letterType: this.data.letterType
      });

    // Trigger the HTTP request
    subscription.subscribe(response => {
      this.responseStore.reprintLetter = new ReprintLetterPayload(response as ReprintLetter);
      this.loading = false;
      this.navigate( this._url );
    },
    error => { // TODO: Confirm that this will be the error-page component
      this.loading = false;
      console.log( 'Error occurred: ', error );
      this.navigate( this._url );
    });
  }
}
