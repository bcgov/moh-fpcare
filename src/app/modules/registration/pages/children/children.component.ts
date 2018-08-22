import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {DateTimeService} from '../../../../services/date-time.service';
import {SimpleDate} from '../../../core/components/date/simple-date.interface';
import {REGISTRATION_ADDRESS, REGISTRATION_PATH, REGISTRATION_REVIEW} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHNs has been used for another family member */
  private _uniquePhns = true;

  /** Page to naviage to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_ADDRESS;

  constructor( private fpcService: FPCareDataService
             , private validationService: ValidationService
             , private dateTimeService: DateTimeService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    let valid = true;


    if (this.hasChildren()) {

      const validDob = this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true);

      // Check that PHNs are unique
      this._uniquePhns = this.validationService.isUnique( this.familyPhnList );

      // Check that individuals are allowed on Parents FPC account
      const notLegitDep = this.children.map( x => {
        if (!this.isLegitDependant(x.dateOfBirth) ) {
          return x;
        }
      }).filter( x => x );

      valid = !!this.form.valid && (validDob.length === 0) && this._uniquePhns && (notLegitDep.length === 0);
    }

    return valid;
  }

  /**
   * Retrieves the list of children
   * @returns {Person[]}
   */
  get children(): Person[] {
    return this.fpcService.dependants;
  }

  /**
   * Indicates whether or not applicant has children
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return this.fpcService.hasChildren();
  }

  /**
   *
   * @param {Person} child
   * @returns {boolean}
   */
  hasUniquePhnError( child: Person ): boolean {

    if ( !this._uniquePhns ) {
      // Is this the PHN that is duplicated
      const list = this.familyPhnList.filter( x => { return x === child.phn; } );

      if ( list.length > 1 ) {
        // This PHN is duplicated
        return true;
      }
    }
    return false;
  }

  /**
   * Determines whether individual is a legitiment dependant
   * Individuals who are more than 25 years old cannot be on parents FPCare account
   * @returns {boolean}
   */
  isLegitDependant( dob: SimpleDate ): boolean {
    if ( dob.year && dob.month && dob.day ) {
      const age = this.dateTimeService.getAge( dob );
      console.log( 'age: ', age );
      return ( age < 25 );
    }
    return true;
  }

  /**
   * Determine whether or not to disable the add child button
   * @returns {boolean}
   */
  isAddDisabled(): boolean {
    return !this.fpcService.canAddChild();
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {

    return ( this.hasChildren() ) ? 'Continue' : 'Skip this step';
  }

  /**
   * Adds person object to dependants list
   */
  addChild() {
    this.fpcService.addChild();
  }

  /**
   * Remove a child from the list
   * @param {idx} number
   */
  removeChild( idx: number ) {
    this.children.splice( idx, 1 );
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {
    if ( this.canContinue() ) {
      this.navigate( this._url );
    }
  }

  /**
   *
   * @returns {string[]}
   */
  private get familyPhnList(): string [] {
    const phnList = this.children.map( x => x.phn );
    phnList.push( this.fpcService.applicant.phn );

    if ( this.fpcService.hasSpouse() ) {
      phnList.push(this.fpcService.spouse.phn);
    }

    return phnList.filter( x => x );
  }
}
