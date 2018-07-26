import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {DateTimeService} from '../../../../services/date-time.service';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same SIN has been used for spouse */
  private _uniqueSinError = false;

  constructor( private fpcService: FPCareDataService
             , private dateTimeService: DateTimeService
             , private validationService: ValidationService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    const sinList: string[] = [];
    let valid = this.form.valid;

    // Check SINs are unique
    if ( this.hasSpouse() ) {

      sinList.push( this.applicant.sin );
      sinList.push( this.spouse.sin );
      this._uniqueSinError = !this.validationService.isUnique( sinList );
      valid = valid && !this._uniqueSinError;
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
    return this.dateTimeService.convertSimpleDateToStr( this.applicant.dateOfBirth );
  }

  /**
   * Retrieves the spouse's date of birth as a string
   * @returns {string}
   */
  getSpouseDob(): string {
    return this.dateTimeService.convertSimpleDateToStr( this.spouse.dateOfBirth );
  }

  /**
   * Indicates whether the SINs are the same
   * @returns {boolean}
   */
  hasUniqueSinError(): boolean {
    return this._uniqueSinError;
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {

    if ( this.canContinue() ) {
      this.navigate( '/registration/child-info' );
    }
  }
}
