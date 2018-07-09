import { Component, OnInit } from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent implements OnInit {

  /* Flag to indicate whether or not the applicant can continue to next page
   * Required fields must be completed, PHN and SIN must pass MOD validations
   */
  private _canContinue = true;

  /* Flag to disable the Add child button so that no more children can be
   * added to list.  Currently a maximum of 18 children can be added to
   * an account
   */
  private _disableAddChild = false;

  constructor( private fpcService: FPCareDataService ) { }

  ngOnInit() {
  }

  get children(): Person[] {
    return this.fpcService.dependants ? this.fpcService.dependants : [];
  }

  hasChildren(): boolean {
    return this.fpcService.dependants ? true : false;
  }

  isAddDisabled(): boolean {
    return this._disableAddChild;
  }
  // Methods triggered by the form action bar

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  buttonLabel(): string {

    if ( this.fpcService.hasChildren() ) {
      return 'Submit';
    }

    return 'Skip this step';
  }

  /**
   * Adds person object to dependants list
   */
  addChild() {

    const child: Person = new Person;

    if ( this.hasChildren() ) {
      // List of children exist
      this.fpcService.dependants.push( child );
    } else {
      // Create new list for children
      const result: Person[] = [];
      result.push( child );
      this.fpcService.dependants = result;
    }
    // User cannot continue until information for child has be completed
    this._canContinue = false;

    if ( this.fpcService.dependants.length === 18 ) {
      this._disableAddChild = true; // Maximum number of children added to account
    }
  }
  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this._canContinue;
  }

  // TODO: Code functionality
  continue () {
  }
}
