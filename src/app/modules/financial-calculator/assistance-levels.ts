

// To update the data in this file:
//       1. Copy values from table (e.g. pdf)
//       2. Remove '$' and ','
//       3. Replace tabs (\t) with ','
//       4. use multi-cursor on each line, converting each line into the js object.
//
//  Steps 2-3 and can be handled via JS:
//      .replace(/,/g, '').replace(/\$/g, '').replace(/%/g, '').replace(/\t/g, ',');
//
// Note: The new values MUST be sorted! The smallest startRange/endRange at the
// beginning, the largest at the end.  The find function assumes this.

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
}

/**
 * Fair PharmaCare Assistance levels, effective of January 2019. These values
 * MUST be sorted (smallest startRange/endRange at the front of array).
 *
 * These levels only apply to people born after 1939.
 */
export const PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[] = [
    {
        startRange: 0.00,
        endRange: 13750.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 0
    },
    {
        startRange: 13750.01,
        endRange: 15000.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 100
    },
    {
        startRange: 15000.01,
        endRange: 16250.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 200
    },
    {
        startRange: 16250.01,
        endRange: 18750.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 300
    },
    {
        startRange: 18750.01,
        endRange: 21250.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 400
    },
    {
        startRange: 21250.01,
        endRange: 23750.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 500
    },
    {
        startRange: 23750.01,
        endRange: 26250.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 600
    },
    {
        startRange: 26250.01,
        endRange: 28750.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 700
    },
    {
        startRange: 28750.01,
        endRange: 30000.00,
        deductible: 0,
        pharmaCarePortion: 70,
        maximum: 800
    },
    {
        startRange: 30000.01,
        endRange: 31667.00,
        deductible: 650,
        pharmaCarePortion: 70,
        maximum: 900
    },
    {
        startRange: 31667.01,
        endRange: 35000.00,
        deductible: 800,
        pharmaCarePortion: 70,
        maximum: 1150
    },
    {
        startRange: 35000.01,
        endRange: 38333.00,
        deductible: 950,
        pharmaCarePortion: 70,
        maximum: 1350
    },
    {
        startRange: 38333.01,
        endRange: 41667.00,
        deductible: 1100,
        pharmaCarePortion: 70,
        maximum: 1500
    },
    {
        startRange: 41667.01,
        endRange: 45000.00,
        deductible: 1300,
        pharmaCarePortion: 70,
        maximum: 1700
    },
    {
        startRange: 45000.01,
        endRange: 48333.00,
        deductible: 1400,
        pharmaCarePortion: 70,
        maximum: 1875
    },
    {
        startRange: 48333.01,
        endRange: 51667.00,
        deductible: 1500,
        pharmaCarePortion: 70,
        maximum: 2000
    },
    {
        startRange: 51667.01,
        endRange: 55000.00,
        deductible: 1600,
        pharmaCarePortion: 70,
        maximum: 2150
    },
    {
        startRange: 55000.01,
        endRange: 58333.00,
        deductible: 1700,
        pharmaCarePortion: 70,
        maximum: 2275
    },
    {
        startRange: 58333.01,
        endRange: 61667.00,
        deductible: 1800,
        pharmaCarePortion: 70,
        maximum: 2400
    },
    {
        startRange: 61667.01,
        endRange: 65000.00,
        deductible: 1900,
        pharmaCarePortion: 70,
        maximum: 2550
    },
    {
        startRange: 65000.01,
        endRange: 70833.00,
        deductible: 2000,
        pharmaCarePortion: 70,
        maximum: 2675
    },
    {
        startRange: 70833.01,
        endRange: 79167.00,
        deductible: 2250,
        pharmaCarePortion: 70,
        maximum: 3000
    },
    {
        startRange: 79167.01,
        endRange: 87500.00,
        deductible: 2500,
        pharmaCarePortion: 70,
        maximum: 3350
    },
    {
        startRange: 87500.01,
        endRange: 95833.00,
        deductible: 2750,
        pharmaCarePortion: 70,
        maximum: 3675
    },
    {
        startRange: 95833.01,
        endRange: 108333.00,
        deductible: 3000,
        pharmaCarePortion: 70,
        maximum: 4000
    },
    {
        startRange: 108333.01,
        endRange: 125000.00,
        deductible: 3500,
        pharmaCarePortion: 70,
        maximum: 4675
    },
    {
        startRange: 125000.01,
        endRange: 141667.00,
        deductible: 4000,
        pharmaCarePortion: 70,
        maximum: 5350
    },
    {
        startRange: 141667.01,
        endRange: 158333.00,
        deductible: 4500,
        pharmaCarePortion: 70,
        maximum: 6000
    },
    {
        startRange: 158333.01,
        endRange: 183333.00,
        deductible: 5000,
        pharmaCarePortion: 70,
        maximum: 6675
    },
    {
        startRange: 183333.01,
        endRange: 216667.00,
        deductible: 6000,
        pharmaCarePortion: 70,
        maximum: 8000
    },
    {
        startRange: 216667.01,
        endRange: 250000.00,
        deductible: 7000,
        pharmaCarePortion: 70,
        maximum: 9350
    },
    {
        startRange: 250000.01,
        endRange: 283333.00,
        deductible: 8000,
        pharmaCarePortion: 70,
        maximum: 10000
    },
    {
        startRange: 283333.01,
        endRange: 316667.00,
        deductible: 9000,
        pharmaCarePortion: 70,
        maximum: 10000
    },
    {
        startRange: 316667.01,
        endRange: 999999999.00,
        deductible: 10000,
        pharmaCarePortion: 100,
        maximum: 10000
    }
];


/**
 * Fair PharmaCare Assistance levels, for when one spouse is born 1939 or
 * earlier.These values MUST be sorted (smallest startRange/endRange at front of
 * array)
 *
 * Note: Technically these values include 1939 or before. However I decided
 * against "pre1940" so that 1939 would be easily searchable throughout the
 * project.
 */

export const Pre1939PharmaCareAssistanceLevels: PharmaCareAssistanceLevel[] = [
    {
        startRange: 0.00,
        endRange: 14000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 0
    },
    {
        startRange: 14000.01,
        endRange: 18000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 200
    },
    {
        startRange: 18000.01,
        endRange: 22000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 250
    },
    {
        startRange: 22000.01,
        endRange: 26000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 300
    },
    {
        startRange: 26000.01,
        endRange: 30000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 350
    },
    {
        startRange: 30000.01,
        endRange: 33000.00,
        deductible: 0,
        pharmaCarePortion: 75,
        maximum: 400
    },
    {
        startRange: 33000.01,
        endRange: 37500.00,
        deductible: 350,
        pharmaCarePortion: 75,
        maximum: 700
    },
    {
        startRange: 37500.01,
        endRange: 42500.00,
        deductible: 400,
        pharmaCarePortion: 75,
        maximum: 800
    },
    {
        startRange: 42500.01,
        endRange: 47500.00,
        deductible: 450,
        pharmaCarePortion: 75,
        maximum: 900
    },
    {
        startRange: 47500.01,
        endRange: 50000.00,
        deductible: 500,
        pharmaCarePortion: 75,
        maximum: 1000
    },
    {
        startRange: 50000.01,
        endRange: 52500.00,
        deductible: 1000,
        pharmaCarePortion: 75,
        maximum: 1500
    },
    {
        startRange: 52500.01,
        endRange: 57500.00,
        deductible: 1100,
        pharmaCarePortion: 75,
        maximum: 1650
    },
    {
        startRange: 57500.01,
        endRange: 62500.00,
        deductible: 1200,
        pharmaCarePortion: 75,
        maximum: 1800
    },
    {
        startRange: 62500.01,
        endRange: 67500.00,
        deductible: 1300,
        pharmaCarePortion: 75,
        maximum: 1950
    },
    {
        startRange: 67500.01,
        endRange: 72500.00,
        deductible: 1400,
        pharmaCarePortion: 75,
        maximum: 2100
    },
    {
        startRange: 72500.01,
        endRange: 77500.00,
        deductible: 1500,
        pharmaCarePortion: 75,
        maximum: 2250
    },
    {
        startRange: 77500.01,
        endRange: 82500.00,
        deductible: 1600,
        pharmaCarePortion: 75,
        maximum: 2400
    },
    {
        startRange: 82500.01,
        endRange: 87500.00,
        deductible: 1700,
        pharmaCarePortion: 75,
        maximum: 2550
    },
    {
        startRange: 87500.01,
        endRange: 92500.00,
        deductible: 1800,
        pharmaCarePortion: 75,
        maximum: 2700
    },
    {
        startRange: 92500.01,
        endRange: 97500.00,
        deductible: 1900,
        pharmaCarePortion: 75,
        maximum: 2850
    },
    {
        startRange: 97500.01,
        endRange: 106250.00,
        deductible: 2000,
        pharmaCarePortion: 75,
        maximum: 3000
    },
    {
        startRange: 106250.01,
        endRange: 118750.00,
        deductible: 2250,
        pharmaCarePortion: 75,
        maximum: 3375
    },
    {
        startRange: 118750.01,
        endRange: 131250.00,
        deductible: 2500,
        pharmaCarePortion: 75,
        maximum: 3750
    },
    {
        startRange: 131250.01,
        endRange: 143750.00,
        deductible: 2750,
        pharmaCarePortion: 75,
        maximum: 4125
    },
    {
        startRange: 143750.01,
        endRange: 162500.00,
        deductible: 3000,
        pharmaCarePortion: 75,
        maximum: 4500
    },
    {
        startRange: 162500.01,
        endRange: 187500.00,
        deductible: 3500,
        pharmaCarePortion: 75,
        maximum: 5250
    },
    {
        startRange: 187500.01,
        endRange: 212500.00,
        deductible: 4000,
        pharmaCarePortion: 75,
        maximum: 6000
    },
    {
        startRange: 212500.01,
        endRange: 237500.00,
        deductible: 4500,
        pharmaCarePortion: 75,
        maximum: 6750
    },
    {
        startRange: 237500.01,
        endRange: 275000.00,
        deductible: 5000,
        pharmaCarePortion: 75,
        maximum: 7500
    },
    {
        startRange: 275000.01,
        endRange: 325000.00,
        deductible: 6000,
        pharmaCarePortion: 75,
        maximum: 9000
    },
    {
        startRange: 325000.01,
        endRange: 375000.00,
        deductible: 7000,
        pharmaCarePortion: 75,
        maximum: 10000
    },
    {
        startRange: 375000.01,
        endRange: 425000.00,
        deductible: 8000,
        pharmaCarePortion: 75,
        maximum: 10000
    },
    {
        startRange: 425000.01,
        endRange: 475000.00,
        deductible: 9000,
        pharmaCarePortion: 75,
        maximum: 10000
    },
    {
        startRange: 475000.01,
        endRange: 999999999.00,
        deductible: 10000,
        pharmaCarePortion: 100,
        maximum: 10000
    }
]