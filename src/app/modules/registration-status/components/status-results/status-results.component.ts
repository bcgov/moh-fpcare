import { Component, OnInit } from '@angular/core';
import { DummyDataService } from '../../../../services/dummy-data.service';
import { ResponseStoreService } from '../../../../services/response-store.service';
import { StatusCheckPHNPayload, StatusCheckRegNumberPayload } from '../../../../models/api.model';

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
export class StatusResultsComponent {

  constructor(private responseStore: ResponseStoreService) { }

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

    // return '';
  }


  get status(): string {
    if (this.response) {
      return this.response.regStatusMsg;
    }

    // return '';
  }


  get response(): StatusCheckPHNPayload | StatusCheckRegNumberPayload {
    if (this.hasReg) {
      return this.responseStore.statusCheckRegNumber;
    }

    if (this.hasPHN) {
      return this.responseStore.statusCheckPHN;
    }

    return null;
  }
}
