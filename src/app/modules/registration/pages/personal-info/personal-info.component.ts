import { Component, OnInit } from '@angular/core';
import {Person} from '../../../../models/person.model';
import * as moment from 'moment';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent implements OnInit {

  /* Flag to indicate whether or not the applicant can continue to next page
   * Required fields must be completed, PHN and SIN must pass MOD validations
   */
  private _canContinue = false;

  // TEMPORARY: Variable to store data into until services built
  private _applicant: Person = new Person();
  private _spouse: Person = new Person();
  private _hasSpouse: boolean = true;
  // TEMPORARY:  --end--

  /** Format string for displaying dates in this component */
  dateFormat: string = 'YYYY/MM/DD';

  constructor() { }

  ngOnInit() {
  }

  // Applicant

  /**
   * Sets the applicant's first name
   * @param {string} name
   */
  set apFirstName( name: string ) {
    console.log( 'Applicant first name: ', name );
    this._applicant.firstName = name;
  }

  /**
   * Sets the applicant's first name
   * @returns {string}
   */
  get apFirstName(): string {
    return this._applicant.firstName;
  }

  /**
   * Sets the applicant's middle name
   * @param {string} name
   */
  set apMiddleName( name: string ) {
    console.log( 'Applicant middle name: ', name );
    this._applicant.middleName = name;
  }

  /**
   * Sets the applicant's middle name
   * @returns {string}
   */
  get apMiddleName(): string {
    return this._applicant.middleName;
  }

  /**
   * Sets the applicant's last name
   * @param {string} name
   */
  set apLastName( name: string ) {
    console.log( 'Applicant last name: ', name );
    this._applicant.lastName = name;
  }

  /**
   * Sets the applicant's last name
   * @returns {string}
   */
  get apLastName(): string {
    return this._applicant.lastName;
  }

  /**
   * Sets the birth date for the applicant
   * @param {Date} dob
   */
  set apDtOfBirth( dob: Date ) {
    console.log( 'Applicant DOB: ', moment( dob ).format( this.dateFormat ) );
    this._applicant.dateOfBirth = dob;
  }

  /**
   * Gets the birth date for the applicant
   * @returns {Date}
   */
  get apDtOfBirth(): Date {
    return this._applicant.dateOfBirth;
  }

  /**
   * Sets the Personal Health Number for the applicant
   * @param {string} phn
   */
  set apPhn( phn: string ) {
    console.log( 'Applicant PHN: ', phn );
    this._applicant.phn = phn;
  }

  /**
   * Gets the Personal Health Number for the applicant
   * @returns {string}
   */
  get apPhn(): string {
    return this._applicant.phn;
  }

  /**
   * Sets the Social Insurance Number for the applicant
   * @param {string} sin
   */
  set apSin( sin: string ) {
    console.log( 'Applicant SIN: ', sin );
    this._applicant.sin = sin;
  }

  /**
   * Gets the Social Insurance  Number for the applicant
   * @returns {string}
   */
  get apSin(): string {
    return this._applicant.sin;
  }

  // Spouse
  /**
   * Sets the spouse's first name
   * @param {string} name
   */
  set spFirstName( name: string ) {
    console.log( 'Spouse first name: ', name );
    this._spouse.firstName = name;
  }

  /**
   * Sets the spouse's first name
   * @returns {string}
   */
  get spFirstName(): string {
    return this._spouse.firstName;
  }

  /**
   * Sets the spouse's middle name
   * @param {string} name
   */
  set spMiddleName( name: string ) {
    console.log( 'Spouse middle name: ', name );
    this._spouse.middleName = name;
  }

  /**
   * Sets the spouse's middle name
   * @returns {string}
   */
  get spMiddleName(): string {
    return this._spouse.middleName;
  }
  /**
   * Sets the spouse's last name
   * @param {string} name
   */
  set spLastName( name: string ) {
    console.log( 'Spouse last name: ', name );
    this._spouse.lastName = name;
  }

  /**
   * Sets the spouse's first name
   * @returns {string}
   */
  get spLastName(): string {
    return this._spouse.lastName;
  }

  /**
   * Sets the birth date for the applicant's spouse
   * @param {Date} dob
   */
  set spDtOfBirth( dob: Date ) {
    console.log( 'Spouse DOB: ', moment( dob ).format( this.dateFormat ) );
    this._spouse.dateOfBirth = dob;
  }

  /**
   * Gets the birth date for the applicant's spouse
   * @returns {Date}
   */
  get spDtOfBirth(): Date {
    return this._spouse.dateOfBirth;
  }

  /**
   * Sets the Personal Health Number for the spouse
   * @param {string} phn
   */
  set spPhn( phn: string ) {
    console.log( 'Spouse PHN: ', phn );
    this._spouse.phn = phn;
  }

  /**
   * Gets the Personal Health Number for the spouse
   * @returns {string}
   */
  get spPhn(): string {
    return this._spouse.phn;
  }

  /**
   * Sets the Social Insurance Number for the spouse
   * @param {string} sin
   */
  set spSin( sin: string ) {
    console.log( 'Spouse SIN: ', sin );
    this._spouse.sin = sin;
  }

  /**
   * Gets the Social Insurance  Number for the spouse
   * @returns {string}
   */
  get spSin(): string {
    return this._spouse.sin;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this._hasSpouse;
  }

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this._canContinue;
  }

  continue() {
  }
}
