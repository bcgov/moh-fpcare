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
    const str = this.dummyDataService.getStatusResponse();
    console.log( 'str: ', str ? str : 'empty' );

    if ( str ) {

      this._jsonObj = JSON.parse( str );

      if ( this._jsonObj.PHN ) {
        this._useRegNumber = false;
      }
    }
  }

  get accountNumber(): string {

      if ( this._jsonObj ) {
        console.log( 'Obj: ', this._jsonObj );
        console.log( 'this._jsonObj.RegNumber: ', this._jsonObj.RegNumber )
        return this._useRegNumber ? this._jsonObj.RegNumber : this._jsonObj.PHN;
      }
    return '';
  }

  get useRegNumber(): boolean {
    return this._useRegNumber;
  }

  get status(): string {
    return this._jsonObj ? this._jsonObj.Status : '';
  }
}
