import {Component, Input} from '@angular/core';
import {RegistrationService} from '../../../registration/registration.service';
import {ResponseStoreService} from '../../../../services/response-store.service';

export enum DisplayIcon {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2
}

@Component({
  selector: 'fpcare-results-framework',
  templateUrl: './results-framework.component.html',
  styleUrls: ['./results-framework.component.scss']
})
export class ResultsFrameworkComponent {

  @Input() displayIcon: DisplayIcon = DisplayIcon.SUCCESS;
  @Input() hasBody: boolean = true;
  @Input() displayPrint: boolean = false;

  constructor( private responseStore: ResponseStoreService ) { }

  get errorIcon() {
    return DisplayIcon.ERROR;
  }

  get successIcon() {
    return DisplayIcon.SUCCESS;
  }

  get warningIcon() {
    return DisplayIcon.WARNING;
  }

  /**
   * When no response return the following message
   * @returns {string}
   */
  get noResponseMsg(): string {
    this.responseStore.internalError =  'SRQ_099';
    return this.responseStore.internalResponse.message;
  }
}
