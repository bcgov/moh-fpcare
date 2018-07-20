import {Component, OnInit, ViewChild} from '@angular/core';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Router } from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  /** Indicates whether or not the same PHN has been used for spouse */
  private _uniquePhnError = false;

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcareDataService.spouse;
  }

  /**
   *
   * @returns {boolean}
   */
  hasUniquePhnError(): boolean {
    return this._uniquePhnError;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcareDataService.hasSpouse();
  }

  /**
   * Indicates whether user can proceed to next page
   * @returns {boolean}
   */
  canContinue(): boolean {

    // Check PHNs are unique
    if ( this.hasSpouse()  && !!this.applicant.phn && !!this.spouse.phn ) {
      this._uniquePhnError = (this.applicant.phn === this.spouse.phn) ? true : false ;
    }
    return this.form.valid && !this._uniquePhnError;
  }

  /**
   * Navigates to next page
   */
  continue(): void {

    console.log( 'Form: ', this.form );

    console.log('form value', this.form.value);
    if ( this.canContinue() ) {
      this.navigate('registration/personal-info');
    }
  }

}
