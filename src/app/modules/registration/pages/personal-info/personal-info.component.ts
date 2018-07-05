import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent implements OnInit {

  /* Flag to indicate whether or not the applicant can continue to next page
   * Required fields must be completed, PHN and SIN must pass MOD validations
   */
  private _canContinue = false;

  constructor() { }

  ngOnInit() {
  }



  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this._canContinue;
  }

  continue() {
  }
}
