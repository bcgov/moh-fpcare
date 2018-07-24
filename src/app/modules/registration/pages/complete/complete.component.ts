import {Component, DoCheck, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';

@Component({
  selector: 'fpcare-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompletePageComponent extends AbstractFormComponent implements OnInit, DoCheck  {

  constructor( private fpcService: FPCareDataService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  ngDoCheck() {
    // Do check to verify that check boxes and captcha complete
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcService.hasSpouse();
  }

  // Methods triggered by the form action bar
  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Submit Applicaion';
  }
  /**
   * Navigates to the next page
   */
  continue() {

    console.log( 'submit request' );
  }
}
