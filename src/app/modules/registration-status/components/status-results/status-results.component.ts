import { Component } from '@angular/core';
import { ResponseStoreService } from '../../../../services/response-store.service';
import {
  StatusCheckPHNPayload,
  StatusCheckRegNumberPayload
} from '../../../../models/api.model';
import { Logger } from '../../../../services/logger.service';
import {AbstractResultsComponent} from '../../../../models/abstract-results-component';

/**
 * Displays data in ResponseStore.statusCheckPHN or statusCheckRegNumber. This
 * component assumes one and only one of those responses is set. Bugs may occur
 * if both are set.
 */
@Component({
  selector: 'fpcare-status-results',
  templateUrl: './status-results.component.html',
  styleUrls: ['./status-results.component.scss']
})
export class StatusResultsComponent extends AbstractResultsComponent {

  public response:  StatusCheckRegNumberPayload | StatusCheckPHNPayload = null;

  constructor(private responseStore: ResponseStoreService, private logger: Logger) {
    super();

    if (this.hasReg) {
      this.response = this.responseStore.statusCheckRegNumber;
    }

    if (this.hasPHN) {
      this.response =  this.responseStore.statusCheckPHN;
    }
  }

  get hasPHN(): boolean {
    return !!this.responseStore.statusCheckPHN;
  }

  get hasReg(): boolean {
    return !!this.responseStore.statusCheckRegNumber;
  }

  get accountNumber(): string {
    //We can't use `this.response` here because we need the unique fields for each different type
    if (this.hasReg) {
      return this.responseStore.statusCheckRegNumber.regNumber;
    }

    if (this.hasPHN) {
      return this.responseStore.statusCheckPHN.phn;
    }
  }
  ngOnInit() {
    if (this.response){
      // Log result
      const type = this.hasReg ? 'RegNumber' : 'PHN';
      const message = `Success - Status Check ${type}`;
      this.logger.log({
        event: 'submission',
        message
      });

    }
  }

  /**
   * Upon leaving page set response store to null
   */
  protected destroyResults(): void {
    this.responseStore.statusCheckRegNumber.regNumber = null;
    this.responseStore.statusCheckPHN.phn = null;
  }
}
