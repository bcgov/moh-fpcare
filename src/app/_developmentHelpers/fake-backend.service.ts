import {Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR} from '@angular/core';
import {PersonInterface, PersonType} from '../models/api.model';
import {FinanceService} from '../modules/financial-calculator/finance.service';
import * as Md5 from 'js-md5';


export interface FpcareAssistLevel {
  deductible: string;
  maximum: string;
  pharmaCarePortion: string;
}

export interface FBEServicePerson extends PersonInterface {
  familyId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  public baselineAssistLevels;
  public pre1939AssistLevels;

  /* PHNs not eligible - not in lists below: '9999999142, 9999999135, 9999999103 */

  // Already registered in FPCare
  private _fpcRegList: string [] = ['9999999181', '9999999199', '9999999167'];
  private _fpcRegList_RN: string [] = ['A99999990', 'A99999991', 'A99999992'];



  // Eligible to register in FPCare
  private _eligibleList: FBEServicePerson[] = [
    {perType: PersonType.applicantType, phn: '9999999973', dateOfBirth: '19650430', postalCode: 'V3V2V1', familyId: 1},
    {perType: PersonType.applicantType, phn: '9999999998', dateOfBirth: '19890520', postalCode: 'V1V2V3', familyId: 2},
    {perType: PersonType.spouseType, phn: '9999999927', dateOfBirth: '19900101', postalCode: '', familyId: 2},
    {perType: PersonType.applicantType, phn: '9999999934', dateOfBirth: '19800229', postalCode: '', familyId: 3},
    {perType: PersonType.spouseType, phn: '9999999941', dateOfBirth: '19830131', postalCode: 'V2V2V4', familyId: 3},
    {perType: PersonType.dependent, phn: '9999999959', dateOfBirth: '20050317', postalCode: 'V2V2V4', familyId: 3},
    {perType: PersonType.dependent, phn: '9999999966', dateOfBirth: '20091231', postalCode: 'V2V2V4', familyId: 3},
    {perType: PersonType.applicantType, phn: '9999999207', dateOfBirth: '19410520', postalCode: 'V1V2V5', familyId: 4},
    {perType: PersonType.spouseType, phn: '9999999214', dateOfBirth: '19381101', postalCode: 'V1V2V5', familyId: 4},
  ];

  constructor( private financeService: FinanceService ) {
    this.baselineAssistLevels = this.financeService.PharmaCareAssistanceLevels;
    this.pre1939AssistLevels = this.financeService.Pre1939PharmaCareAssistanceLevels;
  }

  public isRegistered(phnList: string): boolean {
    return this._fpcRegList.map(phn => phnList.includes(phn))
        .filter(x => x === true)
        .length !== 0;
  }

  public hasFamNumber( famNumList: string ): boolean {
    return this._fpcRegList_RN.map( famNum => famNumList.includes( famNum ) )
        .filter( x => x === true )
        .length !== 0;
  }

  public hasDependants( familyMem: PersonInterface[] ): boolean {
    return familyMem.filter( x => x.perType === PersonType.dependent ).length !== 0;
  }


  // Returns values for development
  public getFamily(phnList: string[]): PersonInterface[] | any {

    const list: FBEServicePerson[] = this._eligibleList.map(person => {
      if (phnList.includes(person.phn)) {
        return {
          perType: person.perType,
          phn: Md5.base64( person.phn ),
          dateOfBirth: Md5.base64( person.dateOfBirth ),
          postalCode: Md5.base64( person.postalCode ),
          familyId: person.familyId
        };
      }
    }).filter(x => x);

    const foundApplicants = (list.length === phnList.length);

    if (list.length) {

      // search dependants
      const dependents: FBEServicePerson[] = this._eligibleList.map(person => {
        if (list[0].familyId === person.familyId &&
            !phnList.includes( person.phn )) {

          return {
            perType: person.perType,
            phn: Md5.base64( person.phn ),
            dateOfBirth: Md5.base64( person.dateOfBirth ),
            postalCode: Md5.base64( person.postalCode ),
            familyId: person.familyId
          };
        }
      }).filter(x => x);

      list.push(...dependents);
    }

    console.log('getFamily list: ', list );

    return (foundApplicants && list.length) ? list.map(
        person => { return {
          perType: person.perType,
          phn:  person.phn ,
          dateOfBirth: person.dateOfBirth,
          postalCode: person.postalCode
        };
        }) : null;
  }

  /**
   * Match applicant/spouse date of births -
   * @param {PersonInterface[]} input
   * @param {PersonInterface[]} family
   * @returns {boolean}
   */
  public parentDobMatch(input: PersonInterface[], family: PersonInterface[]): boolean {

    const list = family.map(person => {
      if (person.perType === PersonType.applicantType || person.perType === PersonType.spouseType) {
        return person.dateOfBirth;
      }
    }).filter(x => x);
    // console.log( 'get DOB list: ', list );

    return input.map(x => list.includes(Md5.base64( x.dateOfBirth ) ))
        .filter(found => found === true).length === input.length;
  }

  /**
   * Randomly generate FPCare Family Number
   * @returns {string}
   */
  public generateFpcNumber(): string {
    return 'A' + Math.ceil((Math.random() * 99999999));
  }

  /**
   *
   * @param {PersonInterface[]} familyMembers
   * @returns {FpcareAssistLevel}
   */
  getFamilyAssistenceLevel( familyMembers: PersonInterface[] ): FpcareAssistLevel {

    const familyNetIncomeArray = familyMembers.map( person => {
      if ( person.perType !== PersonType.dependent ) {
        return person.netIncome;
      }
    }).filter( x => x );

    const familyNetRdspArray = familyMembers.map( person => {
      if ( person.perType !== PersonType.dependent ) {
        return person.rdsp;
      }
    }).filter( x => x );

    let netIncome = 0;
    familyNetIncomeArray.forEach(
        x => netIncome = netIncome + this.financeService.currencyStrToNumber( x )
      );
    familyNetRdspArray.forEach(
        x => netIncome = netIncome -  this.financeService.currencyStrToNumber( x )
      );

    const level = this.financeService.findAssistanceLevel( netIncome );

    return {
      deductible: this.financeService.currencyFormat( level.deductible, true ),
      maximum: this.financeService.currencyFormat( level.maximum, true ),
      pharmaCarePortion: level.pharmaCarePortion.toString() + '%'
    };
  }
}
