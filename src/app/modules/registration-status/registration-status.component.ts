import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent implements OnInit {

  private _canContinue = false;

   private _useRegNumber = true;

  constructor() { }

  ngOnInit() {
  }

  get useRegNumber(): boolean {
    console.log( 'useRegNumber: ', this._useRegNumber );
    return !!this._useRegNumber;
  }


  toggleInputData() {
    this._useRegNumber = !this._useRegNumber;
  }

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this._canContinue;
  }

  // TODO: Code functionality
  continue() {
  }
}
