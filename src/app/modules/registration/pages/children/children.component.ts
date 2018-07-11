import { Component, OnInit } from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends Base implements OnInit {

  /* Flag to indicate whether or not the applicant can continue to next page
   * Required fields must be completed, PHN and SIN must pass MOD validations
   */
  private _canContinue = true;

  /* Flag to disable the Add child button so that no more children can be
   * added to list.  Currently a maximum of 18 children can be added to
   * an account
   */
  private _disableAddChild = false;

  constructor( private fpcService: FPCareDataService ) {
    super();
  }

  ngOnInit() {
  }

  get children(): Person[] {
    return this.fpcService.dependants ? this.fpcService.dependants : [];
  }

  hasChildren(): boolean {
    return this.fpcService.hasChildren();
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
    this.fpcService.addChild();
    this._canContinue = false;
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
