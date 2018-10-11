import { Component, OnInit } from '@angular/core';
import {ReprintLetterPayload} from '../../../../models/api.model';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {LetterTypes} from '../request-template/request-template.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import { Logger } from '../../../../services/logger.service';

@Component({
  selector: 'fpcare-consent-results',
  templateUrl: './reprint-status.component.html',
  styleUrls: ['./reprint-status.component.scss']
})
export class ReprintStatusComponent implements OnInit {

  private _response: ReprintLetterPayload;

  constructor( private fpcareDataService: FPCareDataService,
               private responseStore: ResponseStoreService,
               private logger: Logger ) { }

  ngOnInit() {
    this._response = this.responseStore.reprintLetter;

    if (this._response){
      // Log result
      const message = `Success - Status Check ${this.pgTitle}`;
      this.logger.log({
        event: 'submission',
        message
      });

    }
  }

  /**
   * Retrieve the message returned
   * @returns {string}
   */
  get status(): string {
    if (this._response) {
      return this._response.message;
    }
  }

  /**
   * Title to be displayed on the results page
   * @returns {string}
   */
  get pgTitle(): string {
    const letterType = (this._response) ? this._response.letterType : this.fpcareDataService.reprintLetterType;
    let title = 'Request Reprint Letter status';

    switch (letterType) {
      case LetterTypes.CONSENT_LETTER: // consent letter
        title = 'Request Fair PharmaCare Consent Form Status';
        break;
      case LetterTypes.COB_LETTER: // confirmation of benefits/assistance
        title = 'Request Confirmation of your Fair PharmaCare Assistance Status';
        break;
      default:
        break;
    }

    return title;
  }

  /**
   * Retrieve the response for request
   * @returns {ReprintLetterPayload}
   */
  get response(): ReprintLetterPayload {
    return this._response;
  }
}
