import { Component } from '@angular/core';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {EligibilityPayload} from '../../../../models/api.model';
import {RegistrationService} from '../../registration.service';
import {DisplayIcon} from '../../../core/components/results-framework/results-framework.component';

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

  /**
   *
   * @returns {number}
   */
  getIcon(): number {
    let iconValue = DisplayIcon.ERROR;

    if ( this.response ) {
      iconValue = this.response.success ? DisplayIcon.SUCCESS : DisplayIcon.ERROR;
    }

    return iconValue;
  }
}
