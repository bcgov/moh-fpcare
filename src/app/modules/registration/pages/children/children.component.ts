import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {REGISTRATION_ADDRESS, REGISTRATION_PATH, REGISTRATION_REVIEW} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit {

  public MAX_CHILD_AGE = 25;

  /** Indicates whether or not the same PHNs has been used for another family member */
  private _uniquePhns = true;

  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_ADDRESS;

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

    if ( !this.hasChildren ) {
      // no children, continue
      return true;
    }
    
    // Main and sub forms are not empty and are valid
    if ( super.canContinue() ) {

      // Check that PHNs are unique
      this._uniquePhns = this.validationService.isUnique(this.familyPhnList);

      // Check that individuals are allowed on Parents FPC account
      const notLegitDeps = this.children.map(x => !this.legitimateDependant(x))
          .filter(legit => legit === true ).length === 0;

      return (this._uniquePhns && notLegitDeps);
    }

    return false;
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
  get hasChildren(): boolean {
    return this.fpcService.hasChildren;
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

    return ( this.hasChildren ) ? 'Continue' : 'Skip this step';
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
      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }

  /**
   *
   * @param {Person} child
   * @returns {boolean}
   */
  legitimateDependant( child: Person ): boolean {
    return !child.isDobEmpty() ? (child.getAge() < this.MAX_CHILD_AGE) : true;
  }

  /**
   *
   * @returns {string[]}
   */
  private get familyPhnList(): string [] {

    const phnList = this.children.map( x => x.phn );

    phnList.push( this.fpcService.applicant.phn );

    if ( this.fpcService.hasSpouse ) {
      phnList.push(this.fpcService.spouse.phn);
    }
    return phnList;
  }
}
