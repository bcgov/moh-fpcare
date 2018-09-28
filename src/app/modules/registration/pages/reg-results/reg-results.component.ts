import { Component } from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {EligibilityPayload, RegStatusCode} from '../../../../models/api.model';

@Component({
  selector: 'fpcare-reg-results',
  templateUrl: './reg-results.component.html',
  styleUrls: ['./reg-results.component.scss']
})
export class RegResultsComponent {

  constructor(private responseStore: ResponseStoreService) { }

  get status(): string {
    if (this.response) {
      return this.response.message;
    }
  }

  // TODO: add registrationpayload to this function
  get response(): EligibilityPayload {
    return this.responseStore.eligibility;
  }

  /**
   * Retrieves whether the request was successful or not
   * @returns {boolean}
   */
  get isSuccessful(): boolean {
    return (this.response.regStatusCode === RegStatusCode.SUCCESS);
  }
}
