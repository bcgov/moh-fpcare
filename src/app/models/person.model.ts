import { Base } from './base.alias';
import { Address } from './address.model';

/**
 * Information about person. Should be relevant to all people in app, from the
 * logged in user to people only displayed in records.
 */
export class Person extends Base {

  firstName: string;
  middleName: string;
  lastName: string;

  address: Address;
  dateOfBirth: Date;
  phone: PhoneNumber;
  email: string;

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Just for development with dummy data, likely to be removed later on.
  set name(fullName: string) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    if (names.length === 2) {
      this.lastName = names[1];
    }
    else if (names.length === 3) {
      this.middleName = names[1];
      this.lastName = names[2];
    }
  }


}

interface PhoneNumber { }
