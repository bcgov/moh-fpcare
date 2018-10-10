import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';
import { environment } from 'environments/environment';

/**
 * FPCareDataService is responsible for storing and searching data. It is not
 * responsible for retrieving data (i.e. no HTTP requests here). It includes
 * business logic insofar as it applies to all data, but on the whole business
 * logic constraints should happen in the models themselves.
 */
@Injectable()
export class FPCareDataService {

  /** Applicant information */
  public applicant: Person;

  /** Flag to indicate that applicant has a spouse */
  public hasSpouse: boolean;

  /** Information for applicant's spouse */
  public spouse: Person;

  /** Information for children related to applicant */
  private _dependants: Person[] = [];

  /** Variable to record whether individual has consented to collection notice */
  public acceptedCollectionNotice: boolean = false;

  /** Variable to record the letter type if response is not returned by API service */
  public reprintLetterType: string;

  /** FPC benefit year - calendar year */
  public benefitYear: string;
  /** FPC tax year is 2 years prior to benefit year */
  public taxYear: string;

  /** Financial Information for applicant */
  public applicantIncome: number; /** Income for applicant */
  public spouseIncome: number; /** Income for applicant's spouse */
  public disabilityAmount: number; /** Amount for disability */
  public adjustedIncome: number;
  public bornBefore1939: boolean;

  /** Maximum number of dependents on an account */
  MAX_DEPENDANTS = 18;

  constructor() {
    // Create applicant
    this.applicant = new Person();
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
   * Adds a spouse
   */
  addSpouse() {
    this.spouse = new Person();
  }

  /**
   * Indicates whether a children are present
   * @returns {boolean}
   */
  get hasChildren(): boolean {
    return (this._dependants && this._dependants.length !== 0);
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
   * Indicates whether additional children can be added to the dependants list
   * @returns {boolean}
   */
  canAddChild(): boolean {
    return this._dependants.length <= this.MAX_DEPENDANTS;
  }

  /**
   *
   * @param {string} value
   * @returns {string}
   */
  removeStrFormat( value: string ): string {

    return (value ? value.replace(/ /g, '') : null);
  }
}
