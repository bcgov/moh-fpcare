import { Collection } from "../../../../models/collections.model";
import { Person } from "../../../../models/fpcare.models";
import { Site } from "../../../../models/sites.model";


export interface MillerItem {
  // id: string;
  objectId?: string; // Can be used _instead_ of ID in some cases.

  /**
   * associationId, if present, should match the id of another MillerItem in an
   * adjacent column (e.g. on a Site, to show which Collection it belongs to).
   *
   * If associationId is absent, item will always be shown.
   *
   * Note: Modifying order of columns can potentially require updating associationIds to reflect new order (TODO: Verify/Document).
   */
  associationId?: string[];

  name: string;
  hasChildren: boolean;

  hasWarning: boolean;
  hasAlert: boolean;
  isActive?: boolean;

  // Applies to first 2 columns only. A max of 1 item can be open per column.
  open?: boolean;
  // Applies to final column only. Multiple items can be checked.
  checked?: boolean;
  // Used for search results, hide items that don't match query.
  hidden?: boolean;
}



export interface MillerColumnConfig {
  //Required
  data: {
    collections: Collection[],
    sites: Site[],
    people: Person[],
  },

  //Optional
  options?: {
    /** Type for first column. Can be "people" or "sites". Defaults to sites. */
    primaryColumn?: string
    /** The item in the MillerColumn to have already open on init, used when
     * editting a pre-existing record. */
    preselectObjectId?: string;
  }
}

export interface MillerColumn {
  title: string;
  // TODO: Add typing. Previously was MillerItem interface, but now is one of Site/Person/Name. Interface should be updated.
  // items: MillerItem[];
  items: any[];
  index: number;
}
