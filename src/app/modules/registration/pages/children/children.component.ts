import { Component, OnInit } from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent implements OnInit {

  /* Flag to indicate whether or not the applicant can continue to next page
   * Required fields must be completed, PHN and SIN must pass MOD validations
   */
  private _canContinue = true;

  constructor( private fpcService: FPCareDataService ) { }

  ngOnInit() {
  }

  // Methods triggered by the form action bar

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  buttonLabel(): string {

    if ( this.fpcService.hasChildren() ) {
      return 'Submit';
    }

    return 'Skip this step';
  }

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
