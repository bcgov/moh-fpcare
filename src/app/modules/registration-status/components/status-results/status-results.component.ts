import { Component } from '@angular/core';
import { ResponseStoreService } from '../../../../services/response-store.service';
import {
  StatusCheckPHNPayload,
  StatusCheckRegNumberPayload
} from '../../../../models/api.model';
import { Logger } from '../../../../services/logger.service';
import {AbstractResultsComponent} from '../../../../models/abstract-results-component';
import {FPCareDataService} from '../../../../services/fpcare-data.service';

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

  constructor( private responseStore: ResponseStoreService,
               private logger: Logger,
               private fpcareDataService: FPCareDataService ) {
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
      return this.fpcareDataService.applicant.fpcRegNumber;
    }

    if (this.hasPHN) {
      // PHN is not being return in the response payload, use value entered by registrant
      return this.fpcareDataService.applicant.getNonFormattedPhn();
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
    this.responseStore.statusCheckRegNumber = null;
    this.responseStore.statusCheckPHN = null;
  }
}
