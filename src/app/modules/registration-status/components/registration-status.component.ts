import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent implements OnInit {

  private _canContinue = false;

  private _useRegNumber = true;

  // Temporary variable
  public dob: Date; // TODO: Fix date module to accept undefined variable

  constructor() {}

  ngOnInit() {
  }

  /**
   * Gets flag to indicated whether of not the Registration Number is to used for status search
   * @returns {boolean}
   */
  get useRegNumber(): boolean {
    return !!this._useRegNumber;
  }


  /**
   * Toggles the useRegNumber flag
   */
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
