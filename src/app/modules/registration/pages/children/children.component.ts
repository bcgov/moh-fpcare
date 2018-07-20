import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /* Flag to disable the Add child button so that no more children can be
   * added to list.  Currently a maximum of 18 children can be added to
   * an account
   */
  private _disableAddChild = false;

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  constructor( private fpcService: FPCareDataService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    let valid = (!!this.form) ? this.form.valid : !!!this.form;

    valid = valid && !!this.dobForm;
    if ( !!this.dobForm ) {
      valid = valid && (this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true).length === 0);
    }

    this._canContinue = valid;
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
   * Navigates to the next page
   */
  continue () {
    if ( this.canContinue() ) {
      const link = '/registration/address';
      this.router.navigate([link]);
    }
  }
}
