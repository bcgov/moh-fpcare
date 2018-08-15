enum RegStatusCode {
    SUCCESS = '0',
    ERROR = '1'
}

export class ServerPayload {
    regStatusCode: RegStatusCode;
    regStatusMsg: string;
    uuid: string;

    // TODO: Refactor this so it iterates and we don't have to explicitly list each.
    constructor(payload) {
        this.regStatusCode = payload.regStatusCode;
        this.regStatusMsg = payload.regStatusMsg;
        this.uuid = payload.uuid;
    }

    get success(): boolean {
        return this.regStatusCode === RegStatusCode.SUCCESS;
    }
}

export class BenefitYearPayload extends ServerPayload {
    benefitYear: string;
    taxYear: string;
    constructor(payload) {
        super(payload);
        this.benefitYear = payload.benefitYear;
        this.taxYear = payload.taxYear;
    }
}

export class StatusCheckRegNumberPayload extends ServerPayload {
    //Corresponds to famNumber from API
    regNumber: string;

    constructor(payload) {
        super(payload);
        this.regNumber = payload.famNumber;
    }
}

export class StatusCheckPHNPayload extends ServerPayload {

}