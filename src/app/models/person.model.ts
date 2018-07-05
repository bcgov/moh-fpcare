import { Base } from './base.alias';
import { Address } from './address.model';

/**
 * Information about person. Should be relevant to all people in app, from the
 * logged in user to people only displayed in records.
 */
export class Person extends Base {

  // Parts of a person's name
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;

  private _dateOfBirth: Date;

  // Personal Health Number (validation mod 11 check - reuse logic from old web app)
  private _phn: string;

  // Social Insurance Number (validation mod 10 check - reuse logic from old web app)
  private _sin: string;

  // Contact information for person
  /* Mailing address for person */
  address: Address;
  phone: PhoneNumber;
  email: string;

  /**
   * Set first name for person
   * @param {string} name
   */
  set firstName( name: string ) {
    this._firstName = name;
  }

  /**
   * Gets first name for person
   * @returns {string}
   */
  get firstName(): string {
    return this._firstName ? this._firstName : '';
  }

  /**
   * Set middle name for person
   * @param {string} name
   */
  set middleName( name: string ) {
    this._middleName = name;
  }

  /**
   * Gets middle name for person
   * @returns {string}
   */
  get middleName(): string {
    return this._middleName ? this._middleName : '';
  }

  /**
   * Set last name for person
   * @param {string} name
   */
  set lastName( name: string ) {
    this._lastName = name;
  }

  /**
   * Gets last name for person
   * @returns {string}
   */
  get lastName(): string {
    return this._lastName ? this._lastName : '';
  }

  /**
   * Set birth date for person
   * @param {Date} dob
   */
  set dateOfBirth( dob: Date ) {
    this._dateOfBirth = dob;
  }

  /**
   * Gets birth date for person
   * @returns {Date}
   */
  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  /**
   * Concatenates the first and last name together
   * @returns {string}
   */
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
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
}

/* Interface for telephone number */
interface PhoneNumber { }
