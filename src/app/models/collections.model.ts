import { Site, SiteAccess } from './sites.model';
import { Base } from '../core/base/base.class';
import { Person, EnrollmentStatus } from './fpcare.models';



abstract class Group<T> extends Base {
  find() { };
  contains() { }; // just an example
  members: T[];
  // Displayed name to user
  name: string;
}
export class Collection extends Group<Site> {

  constructor(public name: string, sites: Site[]){
    super();
    this.members = sites;
  }

  get allUsers(): Person[] {
    // flatten array
    return [].concat(...this.members.map(site => site.users));
  }

  get allSiteAccess(): SiteAccess[] {
    return [].concat(...this.members.map(site => site.siteAccess))
  }

  getSiteAccessWithStatus(status: EnrollmentStatus): SiteAccess[]{
    return this.allSiteAccess.filter(SA => SA.status === status);
  }
 };
