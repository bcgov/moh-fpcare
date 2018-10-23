import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PersonInterface, PersonType} from '../../models/api.model';
import {Person} from '../../models/person.model';

export interface RegistrationItem {
  route: string;
  isComplete: boolean;
}

@Injectable()
export class RegistrationService {

  public registrationItems: RegistrationItem [] = [];

  /**
   * Used for front-end errors.
   * ex.
   * Dependents entered by applicant do not match those returned by eligibility check
   */
  public processErrorMsg: string;
  public processError: boolean = false;

  constructor( private router: Router ) {}

  /**
   *  Sets page to not be completed, so applicants cannot complete application out of sequence
   */
  setItemIncomplete(): void {
    const idx = this.getUrlIndex( this.router.url );
    if ( !this.isEmpty() ) { // Check guards could be turned off in dev environment
      this.registrationItems = this.registrationItems.map((item, index) => {
        if (index >= idx) {
          item.isComplete = false;
        }
        return item;
      });
    }
  }

  /**
   * Sets the page to completed, allowing applicant to proceed to next page.
   */
  setItemComplete(): void {
    const idx = this.getUrlIndex( this.router.url );
    if ( !this.isEmpty() ) { // Check guards could be turned in dev environment
      this.registrationItems[idx].isComplete = true;
    }
  }

  /**
   * Indicates whether page has been completed or not.
   * @param {string} url
   * @returns {boolean}
   */
  isComplete( url: string ): boolean {
    const idx = this.getUrlIndex( url );

    // returns previous items isComplete value
    return (idx - 1 >= 0) ? this.registrationItems[idx - 1].isComplete : true;
  }

  /**
   * Checks if registration item list is present
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return (this.registrationItems.length === 0);
  }

  /**
   * Index of URL in the registration items list, -1 if not exist
   * @param {string} url
   * @returns {number}
   */
  private getUrlIndex( url: string ): number {
    return this.registrationItems.findIndex( x => url.includes( x.route ) );
  }

  /**
   * Check for incomplete registration pages
   * @returns {boolean}
   */
  isRegistrationComplete(): boolean {

    const incompletePages = this.registrationItems.filter( x => x.isComplete !== true );
    return (incompletePages.length !== 0 ? false : true );
  }

  // Family structure verification
  /**
   *
   * @param {Person} person
   * @param {PersonType} personType
   * @param {string} netIncome
   * @param {string} rdsp
   * @returns {PersonInterface}
   */
  setPersonInterfaceForReg( person: Person,
                            personType: PersonType,
                            netIncome: string = null,
                            rdsp: string = null ): PersonInterface {

    let famMember: PersonInterface;

    if ( personType !== PersonType.dependent ) {

      famMember = {
        perType: personType,
        phn: person.getNonFormattedPhn(),
        dateOfBirth: person.dateOfBirthShort,
        givenName: person.firstName,
        surname: person.lastName,
        sin : person.getNonFormattedSin(),
        netIncome: netIncome,
        rdsp: rdsp
      };
    } else {
      famMember = {
        perType: personType,
        phn: person.getNonFormattedPhn(),
        dateOfBirth: person.dateOfBirthShort,
        givenName: person.firstName,
        surname: person.lastName,
      };
    }

    return famMember;
  }
}
