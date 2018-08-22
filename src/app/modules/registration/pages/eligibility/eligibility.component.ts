import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {REGISTRATION_PATH, REGISTRATION_PERSONAL, REGISTRATION_REVIEW} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHN has been used for spouse */
  private _uniquePhn = true;

  /** Page to naviage to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_PERSONAL;

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService
             , private validationService: ValidationService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    let valid = false;

    if (!!this.form && !!this.dobForm) {

      const validDob = this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true);

      // Check PHNs are unique
      if (this.hasSpouse()) {

        const phnList: string[] = [this.applicant.phn, this.spouse.phn];

        this._uniquePhn = this.validationService.isUnique(phnList);
      }

      valid = this.form.valid && (validDob.length === 0) && this._uniquePhn;
    }

    return valid;
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
    return !this._uniquePhn;
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
      this.navigate( this._url );
    }
  }
}
