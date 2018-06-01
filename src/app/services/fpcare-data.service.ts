import { Injectable } from '@angular/core';
import { EnrollmentRowItem } from '../modules/verifier/components/enrollment-row/enrollment-row.interface';
import { MillerColumnConfig } from '../modules/verifier/components/miller-columns/miller-columns.interface';
import { Collection } from '../models/collections.model';
import { EnrollmentStatus, Person } from '../models/fpcare.models';
import { Site, SiteAccess } from '../models/sites.model';


@Injectable()
export class FPCareDataService {

  constructor() { }

  /** List of all sites the front-end app has access to currently */
  sites: Site[] = [];
  /** List of all collections the front-end app has access to currently */
  collections: Collection[] = [];
  /** List of all people the front-end app has access to currently */
  people: Person[] = [];
  siteAccesses: SiteAccess[] = [];

  /** The logged in user interacting with the webapp. When in the Applicant dashboard, this would be the applicant. */
  user: Person = new Person();





  getEnrollmentBySite(): EnrollmentRowItem[] {

    // By Site means collections at the top level
    let result: EnrollmentRowItem[] = [];

    this.collections.map(collection => {
      const rowItem: EnrollmentRowItem = {
        title: collection.name,
        associatedObjectId: collection.objectId,
        sites: collection.members,
        users: collection.allUsers
      }
      const pending = collection.getSiteAccessWithStatus(EnrollmentStatus.Pending)
      const expired = collection.getSiteAccessWithStatus(EnrollmentStatus.Expired)
      const declined = collection.getSiteAccessWithStatus(EnrollmentStatus.Declined)

      const problemAccess = pending.concat(expired, declined)
      rowItem.expandableRows = problemAccess;
      result.push(rowItem);
    })

    return result;
  }

  getEnrollmentByUser(): EnrollmentRowItem[] {
    let result: EnrollmentRowItem[] = [];

    // SiteAccess still as expandableRows, just higher levels which are changed?

    this.people.map(person => {
      const rowItem: EnrollmentRowItem = {
        title: person.name,
        associatedObjectId: person.objectId,
        sites: person.sites,
        collections: this.findCollectionFromSites(person.sites)
      }

      const pending = person.siteAccess
        .filter(sa => sa.status === EnrollmentStatus.Pending)
      const expired = person.siteAccess
        .filter(sa => sa.status === EnrollmentStatus.Expired)
      const declined = person.siteAccess
        .filter(sa => sa.status === EnrollmentStatus.Declined)

      const problemAccess = pending.concat(expired, declined)
      rowItem.expandableRows = problemAccess;

      result.push(rowItem);
    })

    return result;
  }

  findCollectionFromSites(sites: Site[]): Collection[] {
    let result: Collection[] = [];
    for (let index = 0; index < sites.length; index++) {
      const site = sites[index];
      const collection = this.findCollectionFromSite(site);
      result.push(... collection);
    }

    return result;
  }

  findCollectionFromSite(site: Site): Collection[] {;
    return this.collections.map(collection => {
      let exists = collection.members.indexOf(site) >= 0;
      if (exists) return collection;
    }).filter(x => x); //Remove undefined
  }

  getMillerColumnDataByUser(): MillerColumnConfig {
    const collectionMiller = this.collections.map(collection => {
      collection.members = this.setAssociationId(collection.objectId, collection.members);
      return collection;
    })

    let result = {
      data: {
        collections: collectionMiller,
        sites: this.sites,
        people: this.people,
      },
      options: {
        primaryColumn: "people",
      }
    }

    return result;
  }

  // FIXME: This is very likely wrong/buggy. AssociationIDs perhaps not set correctly? Look at enrollment/site.
  getMillerColumnDataByCollection(): MillerColumnConfig {


    this.collections.map(collection => {
      collection.members = this.setAssociationId(collection.objectId, collection.members);

      //Also set association id from Person->Site
      // collection.allUsers.map(person => {
      //   person.associationId = person.sites[0].objectId;
      // })
    })

    this.sites.map(site => {
      this.setAssociationId(site.objectId, site.users);
      // console.log(`${site.name} has ${site.users.length} users`)
    })


    let result = {
      data: {
        collections: this.collections,
        sites: this.sites,
        people: this.people,
      },
      options: {}
    }

    return result;
  }

  findPersonByObjectId(objectId: string): Person{
    return this.people.find(person => person.objectId === objectId);
  }

  findSiteByObjectId(objectId: string): Site{
    return this.sites.find(site => site.objectId === objectId);
  }

  private filterUnique(x, i, a){
    return x && a.indexOf(x) === i
  }

  private setAssociationId<T>(associationId: string, items: T[]): T[] {
    return items.map(item => {

      if (  typeof (item as any).associationId === 'undefined') {
        (item as any).associationId = [];
      }

      (item as any).associationId.push(associationId);
      return item;
    })
  }

  private clearAssociationId<T>(associationId: string, items: T[]): T[] {
    return items.map(item => {
      // item.associationId = associationId;
      (item as any).associationId = [];
      return item;
    })
  }


}
