import { Base } from './base.alias';
import { Address } from './address.model';
import {SimpleDate} from '../modules/core/components/date/simple-date.interface';
import * as moment from 'moment';

/**
 * Information about person. Should be relevant to all people in app, from the
 * logged in user to people only displayed in records.
 */
export class Person extends Base {

  // Parts of a person's name
  public firstName: string;
  public middleName: string;
  public lastName: string;

  // initialize dob to nulls
  public dateOfBirth: SimpleDate = { year: null, month: null, day: null };

  // Personal Health Number (validation mod 11 check - reuse logic from old web app)
  public phn: string;

  // Social Insurance Number (validation mod 10 check - reuse logic from old web app)
  public sin: string;

  // FPCare registration number
  public fpcRegNumber: string;

  // Contact information for person
  /* Mailing address for person */
  public address: Address = new Address();
  public updAddress: Address = new Address();

  /**
   * Checks if address was updated
   * @returns {boolean}
   */
  get isAdressUpdated(): boolean {
    return ( this.updAddress && !this.updAddress.isComplete() );
  }

  /**
   * Returns DoB in YYYYMMDD format, used by API.
   */
  get dateOfBirthShort(): string {
    return this.isDobEmpty() ? null :
        moment( {
          year: this.dateOfBirth.year,
          month: this.dateOfBirth.month - 1,
          day: this.dateOfBirth.day
        }).format('YYYYMMDD' );
  }

  /**
   * Returns DoB in DD/MM/YYYY format, for display purposes
   */
  get formatDateOfBirth(): string {
    return this.isDobEmpty() ? null :
        moment( {
          year: this.dateOfBirth.year,
          month: this.dateOfBirth.month - 1,
          day: this.dateOfBirth.day
        }).format('DD/MM/YYYY');
  }

  /**
   * Indicates whether or not the date of birth is empty
   * @returns {boolean}
   */
  isDobEmpty(): boolean {
    return Object.keys(this.dateOfBirth)
        .map(key => this.dateOfBirth[key])
        .filter(x => x) // Filter out null/undefined
        .length !== 3;
  }

  /**
   * Concatenates the first and last name together
   * @returns {string}
   */
  get name(): string {
    let _name = null;

    if ( this.firstName ) {
      _name = this.firstName;
    }

    if ( this.lastName ) {
      _name = _name ? _name.concat( ' ' + this.lastName ) : this.lastName;
    }

    return _name;
  }

  /**
   * Sets the full name for the person (first, middle and last names)
   * NOTE: Just for development with dummy data, likely to be removed later on.
   *
   * @param {string} fullName
   */
  set name(fullName: string) {

    const names = fullName.split(' ');
    this.firstName = names[0];

    if (names.length === 2) {
        this.lastName = names[1];
    }
    else if (names.length === 3) {
      this.middleName = names[1];
      this.lastName = names[2];
    }
  }

  /**
   * Calculates the age from date of birth
   * @returns {Number}
   */
  getAge(): Number {
    const today = new Date();
    const dobDt = new Date( this.dateOfBirth.year, this.dateOfBirth.month, this.dateOfBirth.day );
    return moment( today ).diff( dobDt, 'year' );
  }
}

