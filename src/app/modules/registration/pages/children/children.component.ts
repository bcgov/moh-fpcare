import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {ValidationService} from '../../../../services/validation.service';
import {
  REGISTRATION_ADDRESS,
  REGISTRATION_PATH,
  REGISTRATION_RESULTS,
  REGISTRATION_REVIEW
} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {DependentMandatory, PersonInterface, PersonType} from '../../../../models/api.model';
import {SimpleDate} from '../../../core/components/date/simple-date.interface';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit {

  public MAX_CHILD_AGE = 25;

  /** Indicates whether or not the same PHNs has been used for another family member */
  private _uniquePhns = true;
  private _dependentMandatory = false;
  private _childList: PersonInterface[];

  /** Page to navigate to when continue process */
  /** Page to naviage to when continue process */
  private _baseUrl = REGISTRATION_PATH + '/';

  constructor( private fpcService: FPCareDataService
             , private validationService: ValidationService
             , protected router: Router
             , private responseStore: ResponseStoreService
             , private registrationService: RegistrationService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
    this.registrationService.processError = false;

    if ( this.responseStore.eligibility ) {

      this._dependentMandatory = (this.responseStore.eligibility.dependantMandatory === DependentMandatory.YES);

      if ( this._dependentMandatory && !this.hasChildren ) {
        // Create child so that the skip button is not available
        this.fpcService.addChild();
      }

      this._childList = this.responseStore.eligibility.persons.map( person => {
        if ( person.perType === PersonType.dependent ) {
          return person;
        }
      }).filter( x => x );
    }
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
   * Maximum length a first name can be
   * @returns {number}
   */
  get maxLenGivenName(): number {
    return ValidationService.MAX_GIVEN_NAME_LENGTH;
  }

  /**
   * Maximum length a last name can be
   * @returns {number}
   */
  get maxLenSurname(): number {
    return ValidationService.MAX_SURNAME_LENGTH;
  }

  /**
   * Remove a child from the list
   * @param {idx} number
   */
  removeChild( idx: number ) {
    this.children.splice( idx, 1 );

    // Child to be added if mandatory
    if ( this._dependentMandatory && this.children.length === 0 ) {
      this.fpcService.addChild();
    }

  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {

    if ( !this.canContinue() ) {
      return;
    }

    this.registrationService.setItemComplete();

    // Children have been entered - need to valid with information returned by eligibility check
    if ( this.hasChildren ) {

      // Validate children
      const childActiveMSP = this.children.map( child => this.isInFamily( child.getNonFormattedPhn() ) )
          .filter( x => x !== true )
          .length === 0;

      if ( !childActiveMSP ) {
        //Set message #26 - need to pull actual message from front-end message cache
        this.registrationService.processError = true;
        this.registrationService.processErrorMsg = 'Child does not have active MSP (message to be updated when cache working)';
      } else {
        const childInfoCorrect = this.children.map(child => this.isInfoCorrect( child.getNonFormattedPhn(), child.dateOfBirthShort) )
            .filter(x => x !== true).length === 0;

        if (!childInfoCorrect) {
          //Set message #48 - need to pull actual message from front-end message cache
          this.registrationService.processError = true;
          this.registrationService.processErrorMsg = 'We could not confirm some of the information entered (message to be updated when cache working)';
        }
      }
    }

    this.navigate( this._baseUrl +
        ( this.registrationService.processError ? REGISTRATION_RESULTS : REGISTRATION_ADDRESS ) );
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

  /**
   * Check whether child is in the family, no children reported on MSP return false if children entered
   * @param {string} phn
   * @returns {boolean}
   */
  isInFamily( phn: string ): boolean {
    // No children on MSP cannot register with children
    return ( this._childList ? this._childList.filter(
        child => this.registrationService.compare( phn, child.phn ) ).length !== 0 : false );
  }

  /**
   * Check whether child information matches that returned by eligibility check, No children on MSP return false
   * @param {string} phn
   * @param {SimpleDate} dob
   * @returns {boolean}
   */
  isInfoCorrect( phn: string, dob: string ): boolean {
    return ( this._childList ? this._childList.filter(
        child => this.registrationService.compare( phn, child.phn ) &&
            this.registrationService.compare( dob, child.dateOfBirth ) )
        .length !== 0 : false );
  }
}
