import { Component, OnInit } from '@angular/core';
import {DummyDataService} from '../../../../services/dummy-data.service';

@Component({
  selector: 'fpcare-status-results',
  templateUrl: './status-results.component.html',
  styleUrls: ['./status-results.component.scss']
})
export class StatusResultsComponent implements OnInit {
  private _useRegNumber = true;
  private _jsonObj;

  // Test: DummyDataService - to be removed once service created
  constructor( private dummyDataService: DummyDataService ) { }

  ngOnInit() {
    this._jsonObj = this.dummyDataService.getStatusResponse();
    console.log( 'jsonObj: ', this._jsonObj  );

    if ( this._jsonObj.phn ) {
      this._useRegNumber = false;
    }

  }

  get accountNumber(): string {

      if ( this._jsonObj ) {
        return this._useRegNumber ? this._jsonObj.familyNumber : this._jsonObj.phn;
      }
    return '';
  }

  get useRegNumber(): boolean {
    return this._useRegNumber;
  }

  get status(): string {
    return this._jsonObj ? this._jsonObj.status : '';
  }
}
