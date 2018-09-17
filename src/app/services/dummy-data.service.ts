import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Address } from '../models/address.model';
import {SimpleDate} from '../modules/core/components/date/simple-date.interface';


/**
 * Responsible for generating dummy data, useful for development Not responsible
 * for *injecting* dummy data, must be called from components.
 *
 * This class is not necessary for production builds. Ideally, we should find a
 * way to remove it entirely from prod builds (i.e. from app.module.ts too).
 */
@Injectable()
export class DummyDataService {

  private _regStatusResponse;

  constructor() { }

  // Applicant for test purpose - personal info
  createApplicant( populated: boolean = true ): Person {
    return populated ? this.createAdult( true, false ) : new Person();
  }

  // Spouse for test purpose - personal info
  createSpouse( populated: boolean = true ): Person {
    return populated ? this.createAdult() : new Person();
  }

  createAdult( setAddress: boolean = false, setUpdAddress: boolean = false ): Person {
    const result: Person = new Person;

    result.name = this.generatePersonName();
    result.dateOfBirth = this.generateDateOfBirth();
    result.phn = this.generatePHN();
    result.sin = this.generateSIN();

    // Populate address in person object
    if ( setAddress ) {
      result.address = this.generateAddress();
    }

    // Populate update address in person object
    if ( setUpdAddress ) {
      result.updAddress = this.generateAddress();
    }

    return result;
  }

  // Applicant for test purpose - personal info
  createChildren( count: number ): Person[] {
    const result: Person [] = [];

    for (let index = 0; index < count; index++) {
      const person = new Person();
      person.name = this.generatePersonName();
      person.dateOfBirth = this.generateDateOfBirth( 1, 19 );
      person.phn = this.generatePHN();
      result.push(person);
    }

    return result;
  }

  getStatusResponse(): Object {
    return this._regStatusResponse ? this._regStatusResponse : {} ;
  }

  // --- Helpers
  private getRandomElFromArray<T>(arr: T[]): T {
    return arr[Math.ceil(Math.random() * arr.length) - 1];
  }

  private generatePersonName(): string {
    const firstNames = ['Bob', 'Alice', 'Fred', 'Ellen', 'James', 'Tom', 'Greg', 'Kate'];
    const lastNames = ['Hunt', 'Smith', 'Jones', 'Stewart', 'Mason'];
    const middleInitials = ['A', 'R', 'H', 'B', 'C', 'D'];

    return `${this.getRandomElFromArray(firstNames)} ${this.getRandomElFromArray(middleInitials)} ${this.getRandomElFromArray(lastNames)}`;
  }

  private generateDateOfBirth( minAge: number = 20, maxAge: number = 80): SimpleDate {
    const today = new Date();
    const minDate = new Date( today.getFullYear() - minAge, 1, today.getDate() - 10);
    const maxDate = new Date( today.getFullYear() - maxAge, 1, today.getDate() - 10);
    const dob = this.randomDate( minDate, maxDate );

    return {
      year: dob.getFullYear(),
      month: (dob.getMonth() === 0) ? dob.getMonth() + 1 : dob.getMonth(),
      day: dob.getDate()
    };
  }

  private generatePHN(): string {
    const validPhns = [
      '9043 076 746', '9059 437 075', '9125 715 913', '9151 060 317', '9151 843 149', '9151 949 138',
      '9151 970 861', '9300 000 076', '9300 000 194', '9300 000 202', '9300 000 234', '9300 000 241'
    ];
    const phn = this.getRandomElFromArray( validPhns );
    return phn;
  }

  private generateSIN(): string {

    const validSins = [
        '743 235 277', '680 943 958', '642 332 704', '627 384 738', '389 043 027', '337 143 549',
        '545 553 711', '127 591 188', '302 762 042', '610 702 607', '394 429 864', '616 708 368'
    ];
    const sin = this.getRandomElFromArray( validSins );
    return sin;
  }

  private generateAddress(): Address {
    const streetNames = ['Kings', 'Main', 'Fort', 'Yates', 'Douglas'];
    const postalCodes = ['V8R 1R9', 'V8R 2W0', 'V8E 2T9', 'V6R 0N2', 'V6E 2N9'];
    const address = new Address();

    address.street = `${Math.ceil(Math.random() * 8000)} ${this.getRandomElFromArray( streetNames )} St.`;
    address.postal = `${this.getRandomElFromArray( postalCodes )}`;
    address.country = 'Canada';
    address.province = 'British Columbia';
    address.city = 'Victoria';
    return address;
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

}
