import {Router} from '@angular/router';
import {Base} from '../modules/core/components/base/base.class';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';

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
  /** Determines if the Continue button is disabled */
  abstract canContinue(): boolean;

  /** Access to the form elements for validation */
  @ViewChild('formRef') form: NgForm;

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
   * Determine whether form has at least one field populated
   * @returns {boolean}
   */
  protected isFormEmpty(): boolean {
    console.log( 'controls: ', this.form.controls );
    return Object.keys(this.form.controls)
    .map(key => this.form.controls[key].value)
    .filter(x => x) // Filter out null/undefined
    .length === 0;
  }
}

