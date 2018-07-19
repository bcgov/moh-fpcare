import { Router } from '@angular/router';
import {Base} from '../modules/core/components/base/base.class';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';

export abstract class AbstractFormComponent extends Base {

  /** Disables all inputs (todo: not implemented) */
  disabled: boolean;
  /** Determines if the Continue button is disabled */
  abstract canContinue(): boolean;
  /** What happens when the user clicks the continue button. Generally navigating to another page. */
  abstract continue(): void;
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
    navigate(url: string){
        this.router.navigate([url])
        .then((data) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
