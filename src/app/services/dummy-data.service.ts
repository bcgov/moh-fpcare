
import { Injectable } from '@angular/core';
import { Collection } from '../models/collections.model';
import { EnrollmentStatus, Person, Address } from '../models/fpcare.models';
import { Site, SiteAccess, SiteAccessProgressSteps } from '../models/sites.model';



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
    const future = new Date(2019, 1, 0);

    for (let index = 0; index < count; index++) {
      const person = new Person();
      person.name = this.generatePersonName();
      person.dateOfBirth = this.generateDateOfBirth();
      person.phone = '250-555-5555';
      person.phoneSecondary = '604-555-5555';
      person.address = {
        street: '123 Main St',
        postal: 'V9R 2VR',
        country: "Canada",
        province: "British Columbia",
        city: "Victoria"
      }
      person.email = person.firstName[0].toLowerCase() + person.lastName.toLowerCase() + "@gmail.com";
      person.renewalDate =  this.randomDate(today, future);
      result.push(person);
    }

    return result;
  }

  /** Returns an array of sites with a random name. */
  createSites(count: number, name: string = "London Drugs"): Site[] {
    const result: Site[] = [];
    for (let index = 0; index < count; index++) {
      const site = new Site();
      site.name = this.generateSiteName(name);
      result.push(site);
    }

    return result;
  }

  /** Returns an array of collections that come populated with sites. */
  createCollectionsWithSites(names: string[] = ["London Drugs"], siteCount: number = 5): Collection[] {
    const result: Collection[] = [];

    names.forEach(name => {
      const sites = this.createSites(siteCount, name);
      let collection = new Collection(name, sites);
      result.push(collection);
    })


    return result;
  }
   /**
   * Creates a Site Access with a random status that's associated to the input
   * parameters.  It does  modify the inputted Person and Site objects to
   * associate them with the Site Access.
   */
  createSiteAccessAndAssociate(site: Site, person: Person): SiteAccess {

    // Only one SiteAccess between a specific person and specific site. (TODO: Verify business logic, as conceivably this can change)
    if (person.sites.includes(site)){
      return null;
    }

    const SA: SiteAccess = new SiteAccess();
    let randomStatusString : string = this.getRandomElFromArray(Object.keys(EnrollmentStatus));
    let status: EnrollmentStatus = EnrollmentStatus[randomStatusString];
    SA.status = status;
    SA.site = site;
    SA.person = person;

    // Random Date. Currently we're only interested in "upcoming renewals", so
    // they expire soon.
    const today = new Date();
    const sixMonthsFuture =  new Date(today.getFullYear(), today.getMonth() + 4, today.getDate())
    const endDate = this.randomDate(today, sixMonthsFuture)
    SA.endDate = endDate;

    // Request date is any time in the past.
    const pastDate = new Date(2012, 1, 0);
    SA.requestDate = this.randomDate(today, pastDate);

    // Random Progress status. Not necessarily logical. For example, a user that
    // has status=active should not have an in progress status.
    let randomProgressString : string = this.getRandomElFromArray(Object.keys(SiteAccessProgressSteps));
    let progress: SiteAccessProgressSteps = SiteAccessProgressSteps[randomProgressString];
    SA.progress = progress;


    person.siteAccess.push(SA)
    site.siteAccess.push(SA);



    return SA;
  }

  /**
   * Returns an array of SiteAccess objects that have been associated to the
   * inputted collection and people.
   */
  populateSiteAccessFromCollection(collection: Collection, people: Person[]): SiteAccess[] {
    const result: SiteAccess[] = [];

    // Make sure at least each site has one person
    collection.members.map(site => {
      const person = this.getRandomElFromArray(people);
      const sa: SiteAccess = this.createSiteAccessAndAssociate(site, person);
      result.push(sa);
    })

    // Make sure ALL people have one active Site Access, for dev purposes. Can be removed.
    people.map(person => {
      // Assume they have at least 1 site w/o any
      const site = this.getRandomElFromArray(collection.members)
      const sa: SiteAccess = this.createSiteAccessAndAssociate(site, person);
      if (sa) { sa.status = EnrollmentStatus.Active; }
      else { person.siteAccess[0].status = EnrollmentStatus.Active; }
      result.push(sa);
    })


    return result.filter(x => x); //filter out null
  }

  /** Edits the Person in place, setting it up for the Applicant module */
  setPersonToApplicant(person: Person): void {
    console.log('SETTING PERSON TO APPLICANT');
    // TODO: Don't overwrite values if there's something already there!
    person.name = "James Smith";
    person.phone = "250-592-8553"
    person.email = "jsmith@email.com";
    person.renewalDate = new Date(2018, 10, 12);
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

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }




}
