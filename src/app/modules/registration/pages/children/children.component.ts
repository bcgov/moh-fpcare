import {Component, OnInit, ViewChild} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Base} from '../../../core/components/base/base.class';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit {

  /* Flag to disable the Add child button so that no more children can be
   * added to list.  Currently a maximum of 18 children can be added to
   * an account
   */
  private _disableAddChild = false;

  constructor( private fpcService: FPCareDataService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   *
   * @returns {Person[]}
   */
  get children(): Person[] {
    return this.fpcService.dependants ? this.fpcService.dependants : [];
  }

  /**
   *
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return this.fpcService.hasChildren();
  }

  /**
   *
   * @returns {boolean}
   */
  isAddDisabled(): boolean {
    return this._disableAddChild;
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  buttonLabel(): string {

    if ( this.hasChildren() ) {
      return 'Continue';
    }

    return 'Skip this step';
  }

  /**
   * Adds person object to dependants list
   */
  addChild() {
    const child: Person = new Person;
    this.fpcService.addChild();
  }

  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    // Form only appears if there are children
    return (!!this.form) ? this.form.valid : !!!this.form;
  }

  /**
   * Navigates to the next page
   */
  continue () {
    if ( this.canContinue() ) {
      const link = '/registration/address';
      this.router.navigate([link]);
    }
  }
}
