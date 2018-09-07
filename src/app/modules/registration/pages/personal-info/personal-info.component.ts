import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {REGISTRATION_CHILD, REGISTRATION_PATH, REGISTRATION_REVIEW} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same SIN has been used for spouse */
  private _uniqueSin = true;

  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_CHILD;

  constructor( private fpcService: FPCareDataService
             , private validationService: ValidationService
             , protected router: Router
             , private registrationService: RegistrationService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    let valid = false;

    if ( !!this.form ) {

      // Check SINs are unique
      if ( this.hasSpouse() ) {
        const sinList: string[] = [this.applicant.sin, this.spouse.sin];

        this._uniqueSin = this.validationService.isUnique( sinList );
      }

      valid = this.form.valid && this._uniqueSin && !this.isFormEmpty();
    }

    return valid;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
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

  /**
   * Retrieves the applicant's date of birth as a string
   * @returns {string}
   */
  getApplicantDob(): string {
    return this.applicant.dateOfBirthShort;
  }

  /**
   * Retrieves the spouse's date of birth as a string
   * @returns {string}
   */
  getSpouseDob(): string {
    return this.spouse.dateOfBirthShort;
  }

  /**
   * Indicates whether the SINs are the same
   * @returns {boolean}
   */
  hasUniqueSinError(): boolean {
    return !this._uniqueSin;
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {
    if ( this.canContinue() ) {
      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }
}
