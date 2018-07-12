import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';
import * as moment from 'moment';

@Injectable()
export class FPCareDataService {

  constructor() { }

  /** Applicant information */
  private _applicant: Person;
  /** Information for applicant's spouse */
  private _spouse: Person;
  /** Information for children related to applicant */
  private _dependants: Person[] = [];

  /** Maximum number of dependents on an account */
  MAX_DEPENDANTS = 18;

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
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
    const child: Person = new Person;


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
   * Converts date to a data string of a specified format (e.g. YYYY/MM/DD)
   * @param {Date} date
   * @param {string} dateFormat
   * @returns {string}
   */
  formatDate(date: Date, dateFormat: string = 'dd/mm/yyyy'): string {
    return moment(date).format( dateFormat.toUpperCase() );
  }
}
