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
  dependants: Person[] = [];

  MAX_DEPENDANTS = 18;

  /**
   * Indicates whether a spouse is present
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return !!(this.spouse);
  }

  /**
   * Indicates whether a children are present
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return !!(this.dependants && this.dependants.length);
  }

  addChild() {
    const child: Person = new Person;


    if (this.canAddChild()){
      this.dependants.push(child);
    }
  }

  canAddChild(){
    return this.dependants.length <= this.MAX_DEPENDANTS;
  }
}
