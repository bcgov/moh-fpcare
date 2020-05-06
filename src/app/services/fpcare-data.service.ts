import { Injectable } from '@angular/core';
import {FPCPerson} from '../models/person.model';

/**
 * FPCareDataService is responsible for storing and searching data. It is not
 * responsible for retrieving data (i.e. no HTTP requests here). It includes
 * business logic insofar as it applies to all data, but on the whole business
 * logic constraints should happen in the models themselves.
 */
@Injectable()
export class FPCareDataService {

  /** Applicant information */
  public applicant: FPCPerson;

  /** Flag to indicate that applicant has a spouse */
  public hasSpouse: boolean;

  /** Information for applicant's spouse */
  public spouse: FPCPerson;

  /** Information for children related to applicant */
  private _dependants: FPCPerson[] = [];

  /** Variable to record whether individual has consented to collection notice */
  public acceptedCollectionNotice: boolean = false;

  /** Variable to record the letter type if response is not returned by API service */
  public reprintLetterType: string;

  /** Financial Information for applicant */
  public applicantIncome: number; /** Income for applicant */
  public spouseIncome: number; /** Income for applicant's spouse */
  public disabilityAmount: number; /** Amount for disability */
  public spouseDisabilityAmount: number; /** Amount for disability */
  public adjustedIncome: number;
  public bornBefore1939: boolean;

  /** Maximum number of dependents on an account */
  MAX_DEPENDANTS = 18;

  constructor() {
    // Create applicant
    this.applicant = new FPCPerson();
  }

  /**
   * Gets list of dependants
   * @returns {FPCPerson[]}
   */
  get dependants(): FPCPerson[] {
    return this._dependants;
  }

  /**
   * Sets the list of dependants
   * @param {FPCPerson[]} children
   */
  set dependants( children: FPCPerson[] ) {
    this._dependants = children;
  }

  /**
   * Adds a spouse
   */
  addSpouse() {
    this.spouse = new FPCPerson();
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
    const child: FPCPerson = new FPCPerson();

    if (this.canAddChild()){
      this._dependants.push(child);
    }
  }

  /**
   * Indicates whether additional children can be added to the dependants list
   * @returns {boolean}
   */
  canAddChild(): boolean {
    return this._dependants.length < this.MAX_DEPENDANTS;
  }
}
