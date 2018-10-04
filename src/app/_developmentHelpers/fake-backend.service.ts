import { Injectable } from '@angular/core';
import {PersonInterface, PersonType} from '../models/api.model';



@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  private _eligibleList: PersonInterface[] = [
    {perType: PersonType.applicantType, phn: '9999999973', dateOfBirth: '19650430', postalCode: 'V3V2V1'},
    {perType: PersonType.applicantType, phn: '9999999998', dateOfBirth: '19890520', postalCode: 'V1V2V3'},
    {perType: PersonType.spouseType, phn: '9999999927', dateOfBirth: '19900101', postalCode: 'V1V2V3'},
    {perType: PersonType.applicantType, phn: '9999999934', dateOfBirth: '19800229', postalCode: 'V2V2V4'},
    {perType: PersonType.spouseType, phn: '9999999941', dateOfBirth: '19830131', postalCode: 'V2V2V4'},
    {perType: PersonType.dependent, phn: '9999999959', dateOfBirth: '20050317', postalCode: 'V2V2V4'},
    {perType: PersonType.dependent, phn: '9999999966', dateOfBirth: '20091231', postalCode: 'V2V2V4'}
  ];



  constructor() { }

  // Returns values for development
  getFamily( phnList: string[] ): PersonInterface[] | any {

    //console.log( 'getFamily phnList: ', phnList );

    const list = this._eligibleList.map( person => {
      if ( phnList.includes( person.phn ) ) {
        return person;
      }
    } ).filter( x => x );

    if ( list.length ) {

      // search dependants
      const dependents = this._eligibleList.map( person => {
        if ( list[0].postalCode === person.postalCode &&
            !phnList.includes( person.phn ) ) {
          return person;
        }
      } ).filter( x => x );

      list.push(...dependents);
    }

    console.log( 'getFamily list: ', list );

    return list.length ? list : null;
  }

  parentDobMatch( input: PersonInterface[], family: PersonInterface[] ): boolean {

    /*
    const list = family.map( person => {
      if ( person.perType === PersonType.applicantType || person.perType === PersonType.spouseType ) {
        return person.dateOfBirth;
      }
    }).filter( x => x );*/
    // console.log( 'get DOB list: ', list );

   /* return input.map( x => list.includes( x.dateOfBirth ) )
        .filter( found => found === true ).length === input.length;*/
   return true;
  }
}

