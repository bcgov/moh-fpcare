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
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;

  // initialize dob to nulls
  private _dateOfBirth: SimpleDate = { year: null, month: null, day: null };

  // Personal Health Number (validation mod 11 check - reuse logic from old web app)
  private _phn: string;

  // Social Insurance Number (validation mod 10 check - reuse logic from old web app)
  private _sin: string;

  // FPCare registration number
  private _regNumber: string;

  // Contact information for person
  /* Mailing address for person */
  address: Address = new Address();
  updAddress: Address;
  private _updatedAddress: boolean = false;

  /**
   *
   * @param {boolean} updated
   */
  set updatedAddress( updated: boolean ) {
    this._updatedAddress = updated;
  }

  /**
   *
   * @returns {boolean}
   */
  isAdressUpdated(): boolean {
    return this._updatedAddress;
  }

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
  set dateOfBirth( dob: SimpleDate ) {
    this._dateOfBirth = dob;
  }

  /**
   * Gets birth date for person
   * @returns {Date}
   */
  get dateOfBirth(): SimpleDate {
    return this._dateOfBirth;
  }

  /**
   * Returns DoB in YYYYMMDD format, used by API.
   */
  get dateOfBirthShort(): string {
    return moment()
      .date(this._dateOfBirth.day)
      .month(this._dateOfBirth.month - 1) //moment is 0 indexed, SimpleDate is not
      .year(this._dateOfBirth.year)
      .format('YYYYMMDD');
  }

  /**
   * Set Personal Health Number for person
   * @param {string} phn
   */
  set phn( phn: string ) {
    this._phn = phn;
  }

  /**
   * Gets Personal Health Number for person
   * @returns {string}
   */
  get phn(): string {
    return this._phn ? this._phn : '';
  }

  /**
   * Set Social Insurance Number for person
   * @param {string} phn
   */
  set sin( sin: string ) {
    this._sin = sin;
  }

  /**
   * Gets Social Insurance Number for person
   * @returns {string}
   */
  get sin(): string {
    return this._sin ? this._sin : '';
  }

  /**
   * Sets the Fair PharmaCare Registration Number
   * @param {string} regNumber
   */
  set fpcRegNumber( regNumber: string ) {
    this._regNumber = regNumber;
  }

  /**
   * Gets the Fair PharmaCare Registration Number
   * @returns {string}
   */
  get fpcRegNumber(): string {
    return this._regNumber ? this._regNumber : '';
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
