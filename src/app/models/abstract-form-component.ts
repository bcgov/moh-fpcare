import {Router} from '@angular/router';
import {Base} from '../modules/core/components/base/base.class';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';

/**
 * All classes derived from this class must implement DoCheck so that when changes occur the form can be validated to determine
 * whether or not _canContinue is set to true.
 */
export abstract class AbstractFormComponent extends Base {

  /** Disables all inputs (todo: not implemented) */
  disabled: boolean;
  /** What happens when the user clicks the continue button. Generally navigating to another page. */
  abstract continue(): void;
  /** Implement Lifecyle hook to do form validations to determine whether or not the process can continue */
  abstract ngDoCheck();

  /** Access to the form elements for validation */
  @ViewChild('formRef') form: NgForm;

  /** Flag to indicate whether applicant can continue in process */
  protected _canContinue = false;

  /**
   * Constructor
   * @param {Router} router
   */
  constructor( protected router: Router ) {
        super(); // objectId within Base class
        this.router = router;
    }

  /** Determines if the Continue button is disabled */
  canContinue(): boolean {
    return this._canContinue;
  }

  /** Navigates to a route then automatically scrolls to the top of the page. */
  navigate(url: string){
      this.router.navigate([url])
      .then((data) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
