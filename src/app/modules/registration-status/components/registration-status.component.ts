import { Component, OnInit } from '@angular/core';
import {Person} from '../../../models/person.model';
import {Base} from '../../core/components/base/base.class';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends Base implements OnInit {

  private _canContinue = false; // TODO: Remove one form set up

  /** Flag to indicate what data needs to be collected for checking registration status */
  private _useRegNumber = true;

  /** Applicant requesting registration status */
  private _applicant: Person;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  get applicant(): Person {
    return this._applicant;
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
