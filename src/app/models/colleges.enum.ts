
/**
 * Professional Information college choices
 * @deprecated - Used in OLD prototype only
 */
export enum Colleges {
  None = 'none',
  /**College of Physicians and Surgeons of BC (CPSBC)*/
  CPSBC = '91',
  /**College of Pharmacists Of BC (CPBC)*/
  CPBC = 'P1',
  /**College of Registered Nurses of BC (CRNBC)*/
  CRNBC = '96',
}
/** @deprecated */
export interface CollegeList {
  id: Colleges;
  text: string;
}


export class College {

}

// export enum Colleges {
//   None = "None",
//   CPSBC = "College of Physicians and Surgeons of BC (CPSBC",
//   CPBC = "College of Pharmacists Of BC (CPBC)",
//   CRNBC = "College of Registered Nurses of BC (CRNBC)"
// }
