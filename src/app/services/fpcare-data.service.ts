import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';
@Injectable()
export class FPCareDataService {

  constructor() { }

  /** Applicant information */
  applicant: Person;
  /** Information for applicant's spouse */
  spouse: Person;
  /** Information for children related to applicant */
  dependants: Person[];

  /**
   * Indicates whether a spouse is present
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    if ( this.spouse ) {
      return true;
    }
    return false;
  }

  /**
   * Indicates whether a children are present
   * @returns {boolean}
   */
  hasChildren(): boolean {
    if ( this.dependants ) {
      return true;
    }
    return false;
  }
}
