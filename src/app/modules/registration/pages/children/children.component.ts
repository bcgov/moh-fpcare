import {Component, OnInit} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {FPCPerson} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {ValidationService} from '../../../../services/validation.service';
import {
  REGISTRATION_ADDRESS,
  REGISTRATION_PATH,
  REGISTRATION_RESULTS
} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {
  DependentMandatory,
  PersonInterface,
  PersonType
} from '../../../../models/api.model';
import {SimpleDate} from '../../../core/components/date/simple-date.interface';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit {

  /** Indicates whether or not the same PHNs has been used for another family member */
  public uniquePhnError = false;

  private _dependentMandatory: boolean = false;
  private _childList: PersonInterface[];

  /** Page to naviage to when continue process */
  private _baseUrl = REGISTRATION_PATH + '/';

  constructor(private fpcService: FPCareDataService
      , protected router: Router
      , private responseStore: ResponseStoreService
      , private registrationService: RegistrationService) {
    super(router);
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
    this.registrationService.internalError = false;

    if (this.responseStore.eligibility) {

      this._dependentMandatory = (this.responseStore.eligibility.dependantMandatory === DependentMandatory.YES);

      if (this._dependentMandatory && !this.hasChildren) {
        // Create child so that the skip button is not available
        this.fpcService.addChild();
      }

      this._childList = this.responseStore.eligibility.persons.filter(person => {
        if (person.perType === PersonType.dependent) {
          return person;
        }
      });
    }
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    if (!this.hasChildren) {
      // no children, continue
      return true;
    }

    /* Main and sub forms are not empty and are valid
     * If children exist, ensure PHNs are unique
     */
    return super.canContinue() ?  !this.uniquePhnError : false;
  }

  /**
   * Retrieves the list of children
   * @returns {Person[]}
   */
  get children(): FPCPerson[] {
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
   * @returns {string[]}
   */
  get familyPhnList(): string [] {

    const phnList = this.children.map(x => x.phn);

    phnList.push(this.fpcService.applicant.phn);

    if (this.fpcService.hasSpouse) {
      phnList.push(this.fpcService.spouse.phn);
    }
    return phnList;
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

    return (this.hasChildren) ? 'Continue' : 'No Child';
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
   * @param index
   */
  removeChild(index: number) {

    this.children.splice(index, 1);

    // Child to be added if mandatory
    if (this._dependentMandatory && this.children.length === 0) {
      this.fpcService.addChild();
    }
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {

    if (!this.canContinue()) {
      return;
    }

    this.registrationService.setItemComplete();

    // Children have been entered - need to valid with information returned by eligibility check
    if (this.hasChildren) {

      if ( !this.childrenHaveMsp() ) {
        this.registrationService.internalError = true;
        this.responseStore.internalError = 'SRQ_026';
      } else if ( !this.correctDob() ) {
        this.registrationService.internalError = true;
        this.responseStore.internalError = 'SRQ_029';
      }
    }

    this.navigate(this._baseUrl +
        (this.registrationService.internalError ? REGISTRATION_RESULTS : REGISTRATION_ADDRESS) );
  }

  /**
   * Check whether child is in the family, no children reported on MSP return false if children entered
   * @param {string} phn
   * @returns {boolean}
   */
  private isInFamily(phn: string): boolean {

    // No children on MSP, cannot register with children
    if (this._childList) {
      const child = this._childList.find(x => this.registrationService.compare(phn, x.phn));
      return !!child;
    }
    return false;
  }

  /**
   * Check whether child information matches that returned by eligibility check, No children on MSP return false
   * @param {string} phn
   * @param {SimpleDate} dob
   * @returns {boolean}
   */
  private isDobCorrect(phn: string, dob: string): boolean {

    if (this._childList) {
      const child = this._childList.find(x => this.registrationService.compare(phn, x.phn) &&
          this.registrationService.compare(dob, x.dateOfBirth));
      return !!child;
    }
    return false;
  }

  /**
   * Verify children have active MSP
   * @returns {boolean}
   */
  private childrenHaveMsp(): boolean {

    // Validate children
    return this.children.map(child => this.isInFamily(child.getNonFormattedPhn()))
        .filter(x => x !== true)
        .length === 0;
  }

  /**
   * Verify children's birthdates are correct
   * @returns {boolean}
   */
  private correctDob(): boolean {

    return this.children.map(child =>
        this.isDobCorrect(child.getNonFormattedPhn(), child.dateOfBirthShort))
        .filter(x => x !== true).length === 0;
  }
}
