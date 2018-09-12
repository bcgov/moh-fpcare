import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {REGISTRATION_PATH, REGISTRATION_PERSONAL} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';

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
             , private validationService: ValidationService
             , private registrationService: RegistrationService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete() ;
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {
    let valid = false;

    if ( !this.isFormEmpty() ) {

      const invalidDob = this.dobForm.map(x => {
        if (!x.form.valid) {
          return x;
        }
      })
        .filter(x => x);

      // Check PHNs are unique
      if ( this.hasSpouse() ) {
        console.log( this.applicant.phn + ' ' + this.spouse.phn );

        const phnList: string[] = [this.applicant.phn, this.spouse.phn];

        this._uniquePhn = this.validationService.isUnique(phnList);
      }

      valid = this.form.valid && !this.isFormEmpty() && (invalidDob.length === 0) && this._uniquePhn;
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
    return !!this.fpcareDataService.hasSpouse;
  }

  /**
   * Navigates to next page
   */
  continue(): void {

    if ( this.canContinue() ) {
      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }
}
