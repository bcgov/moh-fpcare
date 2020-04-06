import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MessageInterface, SRQ_Msgs } from '../../../../models/api.model';
import { ResponseStoreService } from '../../../../services/response-store.service';

export enum DisplayIcon {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2,
}

@Component({
  selector: 'fpcare-results-framework',
  templateUrl: './results-framework.component.html',
  styleUrls: ['./results-framework.component.scss'],
})
export class ResultsFrameworkComponent {
  @Input() displayIcon: DisplayIcon = DisplayIcon.SUCCESS;
  @Input() hasBody: boolean = true;
  @Input() displayPrint: boolean = false;

  public links = environment.links;

  constructor(protected responseStore: ResponseStoreService) {}

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
   * When no response return the following message, assume session has timed out.
   * @returns {string}
   */
  get noResponseMsg(): string {
    let msg: MessageInterface;

    // Use value from cache if exists
    if (this.responseStore.cacheMsgs) {
      msg = this.responseStore.cacheMsgs.find(
        (val) => val.msgCode === 'SRQ_058'
      );
    }
    return msg
      ? msg.msgText
      : SRQ_Msgs.find((val) => val.msgCode === 'SRQ_058').msgText;
  }
}
