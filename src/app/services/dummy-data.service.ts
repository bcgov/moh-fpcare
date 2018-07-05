
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Address } from '../models/address.model';
import * as moment from 'moment';

/**
 * Responsible for generating dummy data, useful for development Not responsible
 * for *injecting* dummy data, must be called from components.
 *
 * This class is not necessary for production builds. Ideally, we should find a
 * way to remove it entirely from prod builds (i.e. from app.module.ts too).
 */
@Injectable()
export class DummyDataService {

  constructor() { }

  // -- Generating Models
  /** Returns an array of people with random names.*/
  createPeople(count): Person[] {
    const result: Person[] = [];
    const today = new Date();
    /** We want nearFuture show that they show up in Upcoming Renewals */
    const nearFuture =  new Date(today.getFullYear(), today.getMonth() + 4, today.getDate())

    for (let index = 0; index < count; index++) {
      const person = new Person();
      person.name = this.generatePersonName();
      person.dateOfBirth = this.generateDateOfBirth();
      person.phone = '250-555-5555';
      person.address = this.generateAddress();
      person.email = person.firstName[0].toLowerCase() + person.lastName.toLowerCase() + "@gmail.com";
      result.push(person);
    }

    return result;
  }

  // --- Helpers
  private getRandomElFromArray<T>(arr: T[]): T {
    return arr[Math.ceil(Math.random() * arr.length) - 1];
  }

  private generateSiteName(siteName: string = "London Drugs"): string {
    let id = Math.ceil(Math.random() * 8000)
    return `${siteName} - ${id}`;
  }

  private generatePersonName(): string {
    const firstNames = ['Bob', 'Alice', 'Fred', 'Ellen', 'James', 'Tom', 'Greg', 'Kate'];
    const lastNames = ['Hunt', 'Smith', 'Jones', 'Stewart', 'Mason'];
    const middleInitials = ['A', 'R', 'H', 'B', 'C', 'D']

    return `${this.getRandomElFromArray(firstNames)} ${this.getRandomElFromArray(middleInitials)} ${this.getRandomElFromArray(lastNames)}`
  }

  private generateDateOfBirth(): Date {
    const today = new Date();
    const pastDate = new Date(1970, 1, 0);
    return this.randomDate(today, pastDate);
  }

  private generateAddress(): Address {
    const streetNames = ['Kings', 'Main', 'Fort', 'Yates', 'Douglas'];
    const address = new Address();

    address.street = `${Math.ceil(Math.random() * 8000)} ${this.getRandomElFromArray(streetNames)} St.`;
    address.postal = 'V8R 2N9';
    address.country = 'Canada';
    address.province = 'British Columbia';
    address.city = 'Victoria';
    return address;
  }


  private generatePosUserId(): string {
    const posIds = ['T', 'SJ', 'OA', 'KL', 'M'];
    return `${this.getRandomElFromArray(posIds)}${Math.ceil(Math.random() * 8000)} `;

  }

  private generateProvisionedDate(): string{
    const today = new Date();
    const pastDate = new Date(2017, 1, 0);
    return moment(this.randomDate(today, pastDate)).format('DD/MM/YYYY');
  }

  private generateStartDate(): string{
    const today = new Date();
    const pastDate = new Date(2017, 1, 0);
    return moment(this.randomDate(today, pastDate)).format('DD/MM/YYYY');
  }

  private generateEndDate(): string{
    const today = new Date();
    const pastDate = new Date(2020, 1, 0);
    return moment(this.randomDate(today, pastDate)).format('DD/MM/YYYY');
  }

  // Generates PEC for a Site
  private generatePEC(){
    return `BC00000A` + Math.ceil(Math.random() * 99);
  }


  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }


  private generateCollegeId (){
    return 'P1 - ' + Math.ceil(Math.random() * 999999);
  }

}
