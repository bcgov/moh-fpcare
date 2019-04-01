import { Injectable } from '@angular/core';
import { FPCPerson } from '../models/person.model';
import { FPCAddress } from '../models/address.model';
import {SimpleDate} from '../modules/core/components/date/simple-date.interface';
import {CountryNames, ProvinceNames} from '../models/province-names.enum';

export enum TestScenario {
  EligNotReg = 0,
  Reg = 1,
  NotReg = 2,
  NotElig = 3
}

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
  createApplicant( populated: boolean = true ): FPCPerson {

    return populated ? this.createAdult( true, false ) : new FPCPerson();
  }

  // Spouse for test purpose - personal info
  createSpouse( populated: boolean = true ): FPCPerson {
    return populated ? this.createAdult() : new FPCPerson();
  }

  createAdult( setAddress: boolean = false, setUpdAddress: boolean = false ): FPCPerson {
    const result: FPCPerson = new FPCPerson;

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
  createChildren( count: number ): FPCPerson[] {
    const result: FPCPerson [] = [];

    for (let index = 0; index < count; index++) {
      const person = new FPCPerson();
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
      '9999 999 973', '9999 999 998', '9999 999 927', '9999 999 934', '9999 999 941', '9999 999 959',
      '9999 999 966', '9300 000 076', '9300 000 194', '9300 000 202', '9300 000 234', '9300 000 241'
    ];
    const phn = this.getRandomElFromArray( validPhns );
    return phn;
  }

  private generateSIN(): string {

    const validSins = [
        '078 522 844', '041 771 650', '035 236 512', '025 335 415', '062 048 947', '018 893 297',
        '068 928 902', '020 085 916', '087 937 272', '010 018 034', '076 046 762', '057 761 686'
    ];
    const sin = this.getRandomElFromArray( validSins );
    return sin;
  }

  private generateAddress(): FPCAddress {
    const streetNames = ['Kings', 'Main', 'Fort', 'Yates', 'Douglas'];
    const postalCodes = ['V8R 1R9', 'V8R 2W0', 'V8E 2T9', 'V6R 0N2', 'V6E 2N9'];
    const address = new FPCAddress();

    address.street = `${Math.ceil(Math.random() * 8000)} ${this.getRandomElFromArray( streetNames )} St.`;
    address.postal = `${this.getRandomElFromArray( postalCodes )}`;
    address.country = CountryNames.CAN;
    address.province = ProvinceNames.BC;
    address.city = 'Victoria';
    return address;
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  generateRandomNumber( min: number , max: number ): number {
    return min + (Math.random() * (max - min));
  }

  // Data that uses fake-backend

  createPerson( phn: string, dob: SimpleDate, postalCode: string = null ): FPCPerson {
    const result: FPCPerson = new FPCPerson;

    result.name = this.generatePersonName();
    result.dateOfBirth = dob;
    result.phn = phn;
    result.sin = this.generateSIN();

    if (postalCode) {
      result.address.postal = postalCode;
    }
    return result;
  }

  createPersonforStatusCheck( value: string, dob: SimpleDate = {year: null, month: null, day: null},
                              postalCode: string = null ) {
    const result: FPCPerson = new FPCPerson;

    if ( dob && postalCode ) {
      result.phn = value;
      result.dateOfBirth = dob;
      result.address.postal = postalCode;
    } else {
      result.fpcRegNumber = value;
    }
    return result;
  }
}
