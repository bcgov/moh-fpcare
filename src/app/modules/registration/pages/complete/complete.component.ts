import {Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {environment} from '../../../../../environments/environment';
import {ApiService} from '../../../../services/api-service.service';

@Component({
  selector: 'fpcare-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompletePageComponent extends AbstractFormComponent implements OnInit  {

  public captchaApiBaseUrl;

  private _hasToken = false;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private apiService: ApiService ) {
    super( router );
  }

  ngOnInit() {
    this.captchaApiBaseUrl = environment.captchaApiBaseUrl;

    // Bypass the CAPTCHA if not production.
    if (!environment.production){
      this._hasToken = true;
    }
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

  setToken(token): void {
    this._hasToken = true;
    this.apiService.setCaptchaToken(token);
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
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {
    // Do check to verify that check boxes and captcha complete
    return false;
  }

  /**
   * Navigates to the next page
   */
  continue() {

    // this.canContinue();
    console.log( 'submit request' );
  }
}
