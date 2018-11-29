import {PharmaCareAssistanceLevelServerResponse} from '../modules/financial-calculator/assistance-levels.interface';

/**
 * Status code for the request
 */
export enum RegStatusCode {
  SUCCESS = '0',
  ERROR = '1',
  WARNING = '2'
}

/**
 * Common payload data for all requests/responses
 */
export interface PayloadInterface {
  regStatusCode: RegStatusCode;
  regStatusMsg: string;
  uuid: string;

  /** Part of input params. Never consumed by Angular app */
  processDate?: string;

  /** Never used by Angular app, but will be in responses */
  clientName?: string;
}

/**
 * Check Status using the Fair PharmaCare Registration number
 */
export interface StatusCheckRegNum extends PayloadInterface {
  famNumber: string;
}

/**
 * Check Status using the applicant's PHN, date of birth and postal code
 */
export interface StatusCheckPHN extends PayloadInterface {
  phn: string;
  dateOfBirth: string;
  postalCode: string;
}

/**
 * Request for reprint of Consent forms and Confirmation of Assistance
 */
export interface ReprintLetter extends PayloadInterface {
  phn: string;
  dateOfBirth: string;
  postalCode: string;
  letterType: string;
}

/**
 * Retrieve the Fair PharmaCare deductible levels to calculate the applicant's level of assistance
 */
export interface DeductibleInterface extends PayloadInterface {
  assistanceLevels: PharmaCareAssistanceLevelServerResponse[];
  pre1939AssistanceLevels: PharmaCareAssistanceLevelServerResponse[];
  benefitYear?: string;
  taxYear?: string;
}

/**
 * Structures & values for eligibility component & service
 */
export enum PersonType {
  applicantType = '0',
  spouseType = '1',
  dependent = '2'
}

/**
 * Values for dependant mandatory field in eligibility check response message
 */
export enum DependentMandatory {
  NO = '0',
  YES = '1'
}

/**
 * Format of the Persons field for eligibility checks
 */
export interface PersonInterface {
  perType: string; // 0 = applicant, 1 = spouse, 2 = dependant
  phn: string;
  dateOfBirth: string; // YYYYMMDD

  // eligibility field
  postalCode?: string; // blank by default (value returned)


  // regisration fields
  givenName?: string;
  surname?: string;
  sin?: string;  // required by type 0 & 1
  netIncome?: string; // required by type 0 & 1
  rdsp?: string; // required by type 0 & 1
}

export interface AddressInterface {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

/**
 * Check Fair PharmaCare eligibility (i.e. Active MSP coverage and not registered in FPC)
 */
export interface EligibilityInterface extends PayloadInterface {
  persons: PersonInterface[];
  dependentMandatory?: string;
}

/**
 * Register family in Fair PharmaCare
 */
export interface RegistrationInterface extends PayloadInterface {
  persons?: PersonInterface[]; // not return in response

  // address required if it was updated
  address?: AddressInterface;

  // response information
  familyNumber?: string;
  deductibleAmounText?: string;
  annualMaximumAmountText?: string;
  copayPercentageText?: string;
}

/**
 * Request messages for front-end validation
 */
export interface MessageInterface {
  msgCode: string;  // SRQ #
  msgText: string;  // Text for message
  msgType: string;  // Type of message: Success (0), Error (1), Warning(2)
  appLayer?: string; // Code identifying layer message relates to
}

/**
 * Hard coded so that is can be displayed whenever system has encounters an issue or user tries to access page after
 * data has been cleared
 * @type {{msgCode: string; msgText: string; msgType: RegStatusCode}}
 */
export const SRQ_Msgs = [
  {
    msgCode: 'SRQ_058',
    msgText: 'Your session has timed out due to inactivity.  Any data you may have entered has been cleared.  ' +
             'Please close this browser window and try again.',
    msgType: RegStatusCode.ERROR
  },
  {
    msgCode: 'SRQ_099',
    msgText: 'This error occurred because the system encountered an unanticipated situation which forced it to stop',
    msgType: RegStatusCode.ERROR
  }
];

export interface MessagePayloadInterface extends PayloadInterface {
  appLayer?: string; // Code identifying layer message relates to
  messages?: MessageInterface[];
}

export class ServerPayload implements PayloadInterface {
  regStatusCode: RegStatusCode;
  regStatusMsg: string;
  uuid: string;
  private _message: string;

  constructor(payload: PayloadInterface) {
    this.regStatusCode = payload.regStatusCode;
    this.regStatusMsg = payload.regStatusMsg;
    this.uuid = payload.uuid;
    this._message = this.processMessage(payload.regStatusMsg);
  }

  get success(): boolean {
    return this.regStatusCode === RegStatusCode.SUCCESS;
  }

  get error(): boolean {
    return this.regStatusCode === RegStatusCode.ERROR;
  }

  get warning(): boolean {
    return this.regStatusCode === RegStatusCode.WARNING;
  }

  /**
   * The human readable message to display to the user. It can be either an
   * message or success message.
   */
  get message(): string {
    return this._message;
  }

  private processMessage(msg: string): string {

    // Note: using `href` here isn't ideal as it triggers a complete reload
    // of the Angular app. I tried using routerLink``, but angular stripped
    // it out.
    return (msg ? msg.replace('<link to Registration Page>',
        '<a href="registration/requirements">Registration Page') : msg );
  }
}

/**
 * Response payload for check status when using Registration Number
 * Registration Number can be retrived from  person model
 */
export class StatusCheckRegNumberPayload extends ServerPayload {
  constructor(payload: StatusCheckRegNum) {
    super(payload);
  }
}

/**
 * Response payload for check status when using PHN
 * PHN, DOB and Postal Code fields are returned blank
 */
export class StatusCheckPHNPayload extends ServerPayload {
  constructor(payload: StatusCheckPHN) {
    super(payload);
  }
}

/**
 * Response payload for letter reprints
 * PHN, DOB and Postal Code fields are returned blank
 */
export class ReprintLetterPayload extends ServerPayload {
  letterType: string;

  constructor(payload: ReprintLetter) {
    super(payload);
    this.letterType = payload.letterType;
  }
}

/**
 * Response Payload for eligibility check
 */
export class EligibilityPayload extends ServerPayload {
  persons: PersonInterface[];
  dependantMandatory: string;

  constructor( payload: EligibilityInterface ) {
    super(payload);
    this.persons = payload.persons;
    this.dependantMandatory = payload.dependentMandatory;
  }
}

/**
 * Response Payload for registration
 */
export class RegistrationPayload extends ServerPayload {
  familyNumber: string;
  deductibleAmounText: string;
  annualMaximumAmountText: string;
  copayPercentageText: string;

  constructor( payload: RegistrationInterface ) {
    super(payload);

    this.familyNumber = payload.familyNumber;
    this.deductibleAmounText = payload.deductibleAmounText;
    this.annualMaximumAmountText = payload.annualMaximumAmountText;
    this.copayPercentageText = payload.copayPercentageText;
  }
}

/**
 * Message cache payload
 */
export class MessagePayload extends ServerPayload {
  messages: MessageInterface[];

  constructor( payload: MessagePayloadInterface ) {
    super(payload);
    this.messages = payload.messages;
  }
}

/**
 * Deductible band payload
 */
export class DeductiblePayload extends ServerPayload {
  assistanceLevels: PharmaCareAssistanceLevelServerResponse[];
  pre1939AssistanceLevels: PharmaCareAssistanceLevelServerResponse[];
  benefitYear: string;
  taxYear: string;

  constructor( payload: DeductibleInterface ) {
    super(payload);
    this.assistanceLevels = payload.assistanceLevels;
    this.pre1939AssistanceLevels = payload.pre1939AssistanceLevels;
    this.benefitYear = payload.benefitYear;
    this.taxYear = payload.taxYear;
  }
}
