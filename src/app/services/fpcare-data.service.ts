import { Injectable } from '@angular/core';
import {Person} from '../models/person.model';
@Injectable()
export class FPCareDataService {

  constructor() { }

  applicant: Person;
  spouse: Person;
  dependants: Person[];

  hasSpouse(): boolean {
    if ( this.spouse ) {
      return true;
    }
    return false;
  }
}
