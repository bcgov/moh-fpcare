import { Collection } from '../../../../models/collections.model';
import { EnrollmentStatus } from '../../../../models/fpcare.models';
import { Site, SiteAccess } from '../../../../models/sites.model';
export interface EnrollmentRowItem {
  title: string,
  // TODO: Replace any with new interfaces
  sites: Site[],
  users?: any[],

  /** associatedObjectId and title both refer to the same underlying object. By
   * having an id, we can lookup from the EnrollmentRow -> item, e.g. when
   * navigating between pages */
  associatedObjectId: string;

  /** Optional and only used in one config. */
  collections?: Collection[],
  expandableRows?: SiteAccess[]
}

// Expanded child for a row. For Site Enrollment, this is people. However, from User Enrollment, this would be a person.
export interface EnrollmentRowChild {
  title: string,
  alerts: EnrollmentAlerts[],

  // Hide from filter results
  hidden?: boolean,

  //Is the progress bar expanded
  open?: boolean
}

export interface EnrollmentAlerts {
  // title: string,
  level: BadgeLevel,
  status: EnrollmentStatus,
}


// Corresponds to the Bootstrap classes we're using for notifications.
// Lower case for CSS classes
export enum BadgeLevel {
  Warning = "warning",
  Danger = "danger",
  Info = "info",
  Success = "success",
}

// /** The reason we're showing the notification in the first place. */
// export enum EnrollmentStatus {
//   Declined = "Declined",
//   Incomplete = "Incomplete",
//   Pending = "Pending",
//   Approved = "Approved"
// }
