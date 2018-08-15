import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';

/**
 * FPCareDataService is responsible for storing and searching data. It is not
 * responsible for retrieving data (i.e. no HTTP requests here). It includes
 * business logic insofar as it applies to all data, but on the whole business
 * logic constraints should happen in the models themselves.
 */
@Injectable()
export class FPCareDataService {

  /** Applicant information */
  private _applicant: Person;
  /** Information for applicant's spouse */
  private _spouse: Person;
  /** Information for children related to applicant */
  private _dependants: Person[] = [];

  /** FPC benefit year - calendar year */
  public benefitYear: string;
  /** FPC tax year is 2 years prior to benefit year */
  public taxYear: string;

  /** Maximum number of dependents on an account */
  MAX_DEPENDANTS = 18;

  constructor() {
    // Create applicant
    this._applicant = new Person();
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    /** If Person Object does not exist, create new Object **/
    return this._applicant;
  }

  /**
   * Sets the applicant object
   * @param {Person} applicant
   */
  set applicant( applicant: Person ) {
    this._applicant = applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    /** If Person Object does not exist, create new Object **/
    return this._spouse;
  }

  /**
   * Sets the spouse object
   * @param {Person} spouse
   */
  set spouse( spouse: Person ) {
    this._spouse = spouse;
  }

  /**
   * Gets list of dependants
   * @returns {Person[]}
   */
  get dependants(): Person[] {
    return this._dependants;
  }

  /**
   * Sets the list of dependants
   * @param {Person[]} children
   */
  set dependants( children: Person[] ) {
    this._dependants = children;
  }

  /**
   * Indicates whether a spouse is present
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return !!(this._spouse);
  }

  /**
   * Adds a spouse
   */
  addSpouse() {
    this._spouse = new Person();
  }

  /**
   * Indicates whether a children are present
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return !!(this._dependants && this._dependants.length);
  }

  /**
   * Adds a child to the dependants list
   */
  addChild() {
    const child: Person = new Person();

    if (this.canAddChild()){
      this._dependants.push(child);
    }
  }

  /**
   * Indicated whether additional children can be added to the dependants list
   * @returns {boolean}
   */
  canAddChild(): boolean {
    return this._dependants.length <= this.MAX_DEPENDANTS;
  }

  /**
   * Convert the person structure into a JSON formatted request
   *
   * TODO:  This may changed once integrated service has been developed
   * NOTE: This function will likely be completely removed as DataService is not responsible for retrieving data, only storing/searching it.
   * @param {Person} person
   * @returns {string}
   */
  getStatusRequest( person: Person ): Object {

    console.log( 'Get Request Registration Status' );

    return {
      'uuid': '',
      'phn': person.phn,
      'familyNumber': person.fpcRegNumber,
      'dateOfBirth': person.dateOfBirth,
      'postalCode': person.address.postal,
      'benefitYear': '',
      'clientApplication': '',
      'status': ''
    };
  }
}
