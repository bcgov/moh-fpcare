import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PersonInterface, PersonType} from '../../models/api.model';
import {FPCPerson} from '../../models/person.model';
import * as Md5 from 'js-md5';

export interface RegistrationItem {
  route: string;
  isComplete: boolean;
}

@Injectable()
export class RegistrationService {

  public registrationItems: RegistrationItem [] = [];

  /**
   * Used for front-end errors.
   */
  public internalError: boolean = false;

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
  setPersonInterfaceForReg( person: FPCPerson,
                            personType: PersonType,
                            netIncome: number = 0,
                            rdsp: number = 0 ): PersonInterface {

    let famMember: PersonInterface;

    if ( personType !== PersonType.dependent ) {

      famMember = {
        perType: personType,
        phn: person.getNonFormattedPhn(),
        dateOfBirth: person.dateOfBirthShort,
        givenName: person.firstName,
        surname: person.lastName,
        sin : person.getNonFormattedSin(),
        netIncome: (netIncome ? netIncome.toFixed(2) : '0.00'),
        rdsp: (rdsp ? rdsp.toFixed( 2 ) : '0.00' )
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

  /**
   * Compare
   * @param {string} value
   * @param {string} hashed
   * @returns {boolean}
   */
  public compare( value: string, hashed: string ): boolean {
    const hashedValue = Md5.base64( value );
    //console.log( 'Compare: ' + hashedValue + ' - ' + hashed );
    return (hashed === hashedValue);
  }
}
