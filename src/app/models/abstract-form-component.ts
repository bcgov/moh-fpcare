import {Router} from '@angular/router';
import {Base} from '../modules/core/components/base/base.class';
import {NgForm} from '@angular/forms';
import {QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FPCareDateComponent} from '../modules/core/components/date/date.component';

/**
 * All classes derived from this class must implement DoCheck so that when changes occur the form can be validated to determine
 * whether or not _canContinue is set to true.
 */
export abstract class AbstractFormComponent extends Base {

  /** Disables all inputs (todo: not implemented) */
  disabled: boolean;
  /** Show or hide the loading spinner as required, should be passed to form action bar. */
  loading: boolean = false;
  /** What happens when the user clicks the continue button. Generally navigating to another page. */
  abstract continue(): void;

  /** Access to the form elements for validation */
  @ViewChild('formRef') form: NgForm;
  @ViewChildren(FPCareDateComponent) dateForm: QueryList<FPCareDateComponent>;

  /**
   * Constructor
   * @param {Router} router
   */
  constructor( protected router: Router ) {
        super(); // objectId within Base class
        this.router = router;
    }

  /** Navigates to a route then automatically scrolls to the top of the page. */
  protected navigate(url: string){
      this.router.navigate([url])
      .then((data) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  /**
   * Determines if the Continue button is disabled
   * @returns {boolean}
   */
  canContinue(): boolean {
    return !this.isFormEmpty() && this.isFormValid();
  }

  /**
   * Determine whether form has at least one field populated
   * @returns {boolean}
   */
  protected isFormEmpty(): boolean {

    const mainFormEmpty = Object.keys(this.form.controls)
        .map(key => this.form.controls[key].value)
        .filter(x => x) // Filter out null/undefined
        .length === 0;

    // Check for date forms
    if (this.dateForm) {

      const subFormsEmpty = this.dateForm.map(
          x =>  Object.keys( x.form.controls ).map( key => x.form.controls[key].value)
          .filter( item => item ).length === 0
      ).filter( empty => empty !== true ).length === 0;

      return (mainFormEmpty && subFormsEmpty);
    }

    return mainFormEmpty;
  }

  /**
   * Check whether form is valid
   * @returns {boolean}
   */
  protected isFormValid(): boolean {
    const mainFormValid = this.form.valid;
    console.log( 'mainFormValid: ', mainFormValid );

    if (this.dateForm) {
      const subFormsValid = this.dateForm.map( x => x.form.valid )
          .filter( valid => valid !== false ).length === 0;

      console.log( 'subFormsValid: ', subFormsValid );

      return (mainFormValid && subFormsValid);
    }
    return mainFormValid;
  }
}

