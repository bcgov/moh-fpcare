import { Component, OnInit } from '@angular/core';
import {Person} from '../../../../models/person.model';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {FPCareDataService} from '../../../../services/fpcare-data.service';

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

  /** Format string for displaying dates in this component */
  dateFormat: string = 'yyyy/mm/dd';

  constructor( private fpcService: FPCareDataService ) { }

  ngOnInit() {
  }

  // Applicant
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  // Spouse
  get spouse(): Person {
    return this.fpcService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcService.hasSpouse();
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
