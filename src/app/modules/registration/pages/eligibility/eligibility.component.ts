import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {FPCareDateComponent} from '../../../core/components/date/date.component';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHN has been used for spouse */
  private _uniquePhnError = false;

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    let valid = this.form.valid;

    // Check PHNs are unique
    if ( this.hasSpouse() && !!this.applicant.phn && !!this.spouse.phn) {

      this._uniquePhnError = (this.applicant.phn === this.spouse.phn) ? true : false;
      valid = valid && !this._uniquePhnError;
    }

    valid = valid && !!this.dobForm;
    if ( !!this.dobForm ) {
      valid = valid && (this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true).length === 0);
    }

    this._canContinue = valid;
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
   * Indicates whether the PHNs are the same
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
   * Navigates to next page
   */
  continue(): void {
    if ( this.canContinue() ) {
      this.navigate('registration/personal-info');
    }
  }
}
