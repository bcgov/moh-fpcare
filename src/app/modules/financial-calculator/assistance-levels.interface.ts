//Assistance levels retrieved from the database. The data is returned in an array of this format
export interface PharmaCareAssistanceLevel {
    /** The minimum dollar amount covered by this assistance level. */
    startRange: number;
    /** The maximum dollar amount covered by this assistance level */
    endRange: number;
    /** The deductible that must be met before PharmaCare pays their portion */
    deductible: number;
    /** The PERCENTAGE portion that PharmaCare pays once deductible has been met. */
    pharmaCarePortion: number;
    /** The maximum amount the person must spend in a year before PharmaCare covers 100% of remaining costs */
    maximum: number;
};

/**
 * The API response from the server returns strings instead of numbers.
 */
export interface PharmaCareAssistanceLevelServerResponse {
    startRange: string;
    endRange: string;
    deductible: string;
    pharmaCarePortion: string;
    maximum: string;
};

