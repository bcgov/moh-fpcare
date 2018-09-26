import { Component } from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {EligibilityPayload} from '../../../../models/api.model';

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
    console.log( 'response: ', this.responseStore.eligibility );
    return this.responseStore.eligibility;
  }
}
