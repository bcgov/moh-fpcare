import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'fpcare-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHNs has been used for another family member */
  private _uniquePhnError = false;

  constructor( private fpcService: FPCareDataService
             , private validationService: ValidationService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {

    let valid = ( !this.hasChildren() ) ? true : ( !!this.form && this.form.valid );

    valid = valid && !!this.dobForm;
    if ( !!this.dobForm ) {
      const dobList = this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true);

      valid = valid && (dobList.length === 0);
    }

    if ( this.hasChildren() ) {

      // Check that PHNs are unique
      this._uniquePhnError = !this.validationService.isUnique( this.familyPhnList );

      valid = valid && !this._uniquePhnError;
    }

    this._canContinue = valid;
  }

  /**
   * Retrieves the list of children
   * @returns {Person[]}
   */
  get children(): Person[] {
    return this.fpcService.dependants;
  }

  /**
   * Indicates whether or not applicant has children
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return this.fpcService.hasChildren();
  }

  /**
   *
   * @param {Person} child
   * @returns {boolean}
   */
  hasUniquePhnError( child: Person ): boolean {

    if ( this._uniquePhnError ) {
      // Is this the PHN that is duplicated
      const list = this.familyPhnList.filter( x => { return x === child.phn; } );

      if ( list.length > 1 ) {
        // This PHN is duplicated
        return true;
      }
    }
    return false;
  }

  /**
   * Determine whether or not to disable the add child button
   * @returns {boolean}
   */
  isAddDisabled(): boolean {
    return !this.fpcService.canAddChild();
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {

    return ( this.hasChildren() ) ? 'Continue' : 'Skip this step';
  }

  /**
   * Adds person object to dependants list
   */
  addChild() {
    this.fpcService.addChild();
  }

  /**
   * Remove a child from the list
   * @param {idx} number
   */
  removeChild( idx: number ) {
    this.children.splice( idx, 1 );
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {
    if ( this.canContinue() ) {
      this.navigate( '/registration/address' );
    }
  }

  /**
   *
   * @returns {string[]}
   */
  private get familyPhnList(): string [] {
    const phnList = this.children.map( x => x.phn );
    phnList.push( this.fpcService.applicant.phn );

    if ( this.fpcService.hasSpouse() ) {
      phnList.push(this.fpcService.spouse.phn);
    }

    return phnList;
  }
}
