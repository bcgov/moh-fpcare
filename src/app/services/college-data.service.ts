import { Injectable } from '@angular/core';
import { Colleges, CollegeList } from '../models/colleges.enum';

@Injectable()
export class CollegeDataService {

  constructor() { }


  defaultCollegeList(): CollegeList[] {
    return [
      {
        id: Colleges.None,
        text: 'None',
      },
      {
        id: Colleges.CPSBC,
        text: 'College of Physicians and Surgeons of BC (CPSBC) - 91',
      },
      {
        id: Colleges.CPBC,
        text: 'College of Pharmacists of BC (CPBC) - P1',
      },
      {
        id: Colleges.CRNBC,
        text: 'College of Registered Nurses of BC (CRNBC) - 96',
      }
    ];
  }

  getTextFromSelection(selection: Colleges[]): string {
    if (typeof selection === 'undefined') { return null; }
    //Selection can briefly be an empty string when re-setting input to "None"
    if (typeof selection.forEach === 'undefined') { return 'None'; }

    let output = '';
    const list = this.defaultCollegeList().slice();


    selection.forEach(element => {
      const el = list.filter(x => { return x['id'] === element; })[0];
      output += (output.length ? ', ' : '') + el.text;
    });
    return output;
  }

}
