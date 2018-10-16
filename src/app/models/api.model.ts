import {PharmaCareAssistanceLevelServerResponse} from '../modules/financial-calculator/assistance-levels.interface';

/**
 * Status code for the request
 */
export enum RegStatusCode {
    SUCCESS = '0',
    ERROR = '1',
    CONTINUE_REG = '2', // Continue registration
    CONTINUE_MAND_CHILD = '3' // Continue registration - children mandatory (parents federally insured)
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
 * Benefit Year
 */
export interface BenefitYearInterface extends PayloadInterface {
    benefitYear: string;
    taxYear: string;
}

/**
 * Check Status using the Fair PharmaCare Registration number
 */
export interface StatusCheckRegNum extends PayloadInterface {
    famNumber: string;
    benefitYear: string;
}

/**
 * Check Status using the applicant's PHN, date of birth and postal code
 */
export interface StatusCheckPHN extends PayloadInterface {
    benefitYear: string;
    phn: string;
    dateOfBirth: string;
    postalCode: string;
}

/**
 * Request for reprint of Consent forms and Confirmation of Assistance
 */
export interface ReprintLetter extends PayloadInterface {
    benefitYear: string;
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

    benefitYear: string;
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
  street; string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

/**
 * Check Fair PharmaCare eligibility (i.e. Active MSP coverage and not registered in FPC)
 */
export interface EligibilityInterface extends PayloadInterface {

  benefitYear: string;
  persons: PersonInterface[];
}

/**
 * Register family in Fair PharmaCare
 */
export interface RegistrationInterface extends EligibilityInterface {
  taxYear: string;

  // address required for request
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;

  // response information
  familyNumber?: string;
  deductibleAmounText?: string;
  annualMaximumAmountText?: string;
  copayPercentageText?: string;
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

    get canContinueRegistration(): boolean {
        return this.regStatusCode === RegStatusCode.CONTINUE_REG;
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
        return msg.replace('<link to Registration Page>',
            '<a href="registration/requirements">Registration Page');
    }
}

export class BenefitYearPayload extends ServerPayload implements BenefitYearInterface {
    benefitYear: string;
    taxYear: string;
    constructor(payload: BenefitYearInterface) {
        super(payload);
        this.benefitYear = payload.benefitYear;
        this.taxYear = payload.taxYear;
    }
}

// Because we rename famNum to regNum, this does NOT implement the interface but
// the constructor param still does.
export class StatusCheckRegNumberPayload extends ServerPayload {
    //Corresponds to famNumber from API
    regNumber: string;

    constructor(payload: StatusCheckRegNum) {
        super(payload);
        this.regNumber = payload.famNumber;
    }
}

export class StatusCheckPHNPayload extends ServerPayload {
    phn: string;

    constructor(payload: StatusCheckPHN) {
        super(payload);
        this.phn = payload.phn;
    }
}

export class ReprintLetterPayload extends ServerPayload {
    phn: string;
    letterType: string;

    constructor(payload: ReprintLetter) {
        super(payload);
        this.phn = payload.phn;
        this.letterType = payload.letterType;
    }
}

export class DeductiblePayload extends ServerPayload implements DeductibleInterface {
    benefitYear: string;
    assistanceLevels: PharmaCareAssistanceLevelServerResponse[];
    pre1939AssistanceLevels: PharmaCareAssistanceLevelServerResponse[];

    constructor(payload: DeductibleInterface) {
        super(payload);
        this.benefitYear = payload.benefitYear;
        this.assistanceLevels = payload.assistanceLevels;
        this.pre1939AssistanceLevels = payload.pre1939AssistanceLevels;
    }
}

/**
 * Response Payload
 */
export class EligibilityPayload extends ServerPayload implements EligibilityInterface {
    benefitYear: string;
    persons: PersonInterface[];

    constructor( payload: EligibilityInterface ) {
        super(payload);
        this.benefitYear = payload.benefitYear;
        this.persons = payload.persons;
    }
}

/**
 * Response Payload
 */
export class RegistrationPayload extends ServerPayload implements RegistrationInterface {
  benefitYear: string;
  taxYear: string;
  persons: PersonInterface[];
  familyNumber: string;
  deductibleAmounText: string;
  annualMaximumAmountText: string;
  copayPercentageText: string;

  constructor( payload: RegistrationInterface ) {
    super(payload);
    this.benefitYear = payload.benefitYear;
    this.taxYear = payload.taxYear;
    this.persons = payload.persons;

    this.familyNumber = payload.familyNumber;
    this.deductibleAmounText = payload.deductibleAmounText;
    this.annualMaximumAmountText = payload.annualMaximumAmountText;
    this.copayPercentageText = payload.copayPercentageText;
  }
}
