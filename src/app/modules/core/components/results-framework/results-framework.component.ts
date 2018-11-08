import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {SRQ_099Msg} from '../../../../models/api.model';

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

  public links = environment.links;

  constructor() { }

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
    return SRQ_099Msg.msgText;
  }
}
