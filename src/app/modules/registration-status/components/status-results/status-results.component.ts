import { Component, OnInit } from '@angular/core';
import {DummyDataService} from '../../../../services/dummy-data.service';
import { ResponseStoreService } from '../../../../services/response-store.service';

@Component({
  selector: 'fpcare-status-results',
  templateUrl: './status-results.component.html',
  styleUrls: ['./status-results.component.scss']
})
export class StatusResultsComponent  {

  constructor( private responseStore: ResponseStoreService ) { }

  get hasPHN(): boolean {
    return !!this.responseStore.statusCheckPHN;
  }

  get hasReg(): boolean {
    return !!this.responseStore.statusCheckRegNumber;
  }

  get accountNumber(): string {
    if (this.hasReg){
      return this.responseStore.statusCheckRegNumber.regNumber;
    }

    if (this.hasPHN){
      return this.responseStore.statusCheckPHN.phn;
    }

    return '';
  }

  get status(): string {
    if (this.hasReg){
      return this.responseStore.statusCheckRegNumber.regStatusMsg;
    }

    if (this.hasPHN){
      return this.responseStore.statusCheckPHN.regStatusMsg;
    }

    return '';
  }
}
