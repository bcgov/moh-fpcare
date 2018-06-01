import { SimpleDate } from '../core/date/simple-date.interface';
import { Colleges } from './colleges.enum';
import { SecurityQuestions } from './security-questions';
import { NamedCollection } from './named-collections.interface';
import { AdvancedPracticeCerts } from './advanced-practice-certs.enum';
import { Address } from './address.interface.OLD'

/** The main data model for the application. The official source of truth for the frontend. */
export class Applicant {
  college: Colleges[];
  namedCollections: NamedCollection[];

  hasBCServicesCard: boolean;
  hasInformationContraventionOrder: boolean;
  informationContraventionOrderDetails: string;
  hasBeenSuspended: boolean;
  beenSuspendedDetails: string;
  hasPharmaNetEverRevoked: boolean;
  PharmaNetEverRevokedDetails: string;
  hasRevocationBeenResolved: boolean;
  revocationBeenResolvedDetails: string;
  hasHadLimitsOrConditions: boolean;
  hadLimitsOrConditionsDetails: string;
  isDeviceProvider: boolean;
  willPersonallyAccessFromSites: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  altPhoneNumber: string;
  altEmailAddress: string;
  MSPBillingNumber: number;
  licenseClass: string;
  licenseNumber: string;
  licenseExpiry: SimpleDate = {} as SimpleDate;
  dateOfBirth: SimpleDate = {} as SimpleDate;
  requestStartDate: SimpleDate = {} as SimpleDate;
  requestEndDate: SimpleDate = {} as SimpleDate;
  advancedPracticeCerts: AdvancedPracticeCerts[];
  securityQuestions: SecurityQuestions[] = [];
  address: Address = {} as Address;

  /** Has the user consented to the initial info collection notice modal */
  consentInfoCollection = false;


  constructor() {
  }

  /**
   * Determines if applicant goes to college. Can be left blank to see if they
   * go to any college. To check if option is "none", must explicitly pass
   * Colleges.None
   * @param college optional, should be Colleges or undefined.
   */
  goesToCollege(college?: Colleges): boolean {
    if (!this.college || this.college.length === 0) { return false; }
    if (this.college.length === 1 && this.college[0] === Colleges.None) {
      return this.college[0] === college;
    }
    //No input means check if applicant goes to ANY college (besides "none", which is dealt with above)
    if (!college && this.college.length) { return true; }
    return (<Colleges[]>this.college).indexOf(college) >= 0;
  }

  /**
   * Applicant full name. Combines first name, middle name (if provided), and last name.
   */
  get fullName(): string {
    if (!this.firstName || !this.lastName) {
      return null;
    }
    return `${this.firstName}${this.middleName ? ' ' + this.middleName : ''} ${this.lastName}`;
  }

  /**
   * Checks there are 3 security questions, and none of the values are null/falsy.
   */
  get hasSecurityQuestions(): boolean {
    if (this.securityQuestions.length < 3) { return false; }

    return this.securityQuestions
    .filter(x => x.answer !== null && x.question !== null)
    .length === 3;
  }
}
