import { Component } from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {EligibilityPayload} from '../../../../models/api.model';
import {RegistrationService} from '../../registration.service';

@Component({
  selector: 'fpcare-reg-results',
  templateUrl: './reg-results.component.html',
  styleUrls: ['./reg-results.component.scss']
})
export class RegResultsComponent {

  constructor( private responseStore: ResponseStoreService
             , private registrationService: RegistrationService ) { }

  get status(): string {
    if (this.response) {
      return this.response.message;
    }
  }

  // TODO: add registrationpayload to this function
  get response(): EligibilityPayload {
    return this.responseStore.eligibility;
  }

  get isRegistrationComplete(): boolean {
    return this.registrationService.isRegistrationComplete();
  }
}
