import { Component, OnInit } from '@angular/core';
import {ReprintLetterPayload} from '../../../../models/api.model';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {LetterTypes} from '../request-template/request-template.component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import { Logger } from '../../../../services/logger.service';

import {AbstractResultsComponent} from '../../../../models/abstract-results-component';

@Component({
  selector: 'fpcare-consent-results',
  templateUrl: './reprint-status.component.html',
  styleUrls: ['./reprint-status.component.scss']
})
export class ReprintStatusComponent extends AbstractResultsComponent implements OnInit {

  public response: ReprintLetterPayload = null;

  constructor( private fpcareDataService: FPCareDataService,
               private responseStore: ResponseStoreService,
               private logger: Logger ) {
    super();

    this.response = this.responseStore.reprintLetter;
  }

  ngOnInit() {

    if (this.response) {
      // Log result
      const message = `Success - Reprint Status ${this.pgTitle}`;
      this.logger.log({
        event: 'submission',
        message
      });
    }
  }

  /**
   * Title to be displayed on the results page
   * @returns {string}
   */
  get pgTitle(): string {
    const letterType = (this.response) ? this.response.letterType : this.fpcareDataService.reprintLetterType;
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
   * Upon leaving page set response store to null
   */
  protected destroyResults(): void {
    this.responseStore.reprintLetter = null;
  }
}
