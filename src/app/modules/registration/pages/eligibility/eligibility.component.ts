import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {FPCPerson} from '../../../../models/person.model';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {
  ERROR_PAGE,
  REGISTRATION_PATH,
  REGISTRATION_PERSONAL,
  REGISTRATION_RESULTS
} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {ApiService} from '../../../../services/api-service.service';
import {
  EligibilityPayload, PersonType,
} from '../../../../models/api.model';
import {ResponseStoreService} from '../../../../services/response-store.service';
import { Logger } from '../../../../services/logger.service';
import {ErrorPageService} from '../../../../pages/error-page/error-page.service';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHN has been used for spouse */
  public uniquePhnError = false;

  /** Page to naviage to when continue process */
  private _baseUrl = REGISTRATION_PATH + '/';
  private _SENIOR_ASSISTENCE_YEAR = 1939;

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService
             , private validationService: ValidationService
             , private registrationService: RegistrationService
             , private apiService: ApiService
             , private responseStore: ResponseStoreService
             , private logger: Logger
             , private errorPageService: ErrorPageService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    // Main and sub forms are not empty and are valid
    if ( super.canContinue() ) {

      //If spouse exists, ensure unique PHNs, otherwise return true
      return this.hasSpouse ? !this.uniquePhnError : true;
    }
    return false;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): FPCPerson {
    return this.fpcareDataService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): FPCPerson {
    return this.fpcareDataService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  get hasSpouse(): boolean {
    return this.fpcareDataService.hasSpouse;
  }

  /**
   *
   * @returns {string[]}
   */
  get familyPhnList(): string [] {

    if ( this.hasSpouse ) {
      return [this.applicant.phn, this.spouse.phn];
    }
    return [];
  }

  /**
   * Navigates to next page
   */
  continue(): void {

    if (!this.canContinue()) {
      return;
    }

    // Set registration item to complete
    this.registrationService.setItemComplete();

    this.loading = true;

    // Setup the request
    let subscription;
    if (this.hasSpouse) {
      subscription = this.apiService.checkEligibility({
        persons: [
          { perType: PersonType.applicantType,
            phn: this.applicant.getNonFormattedPhn(),
            dateOfBirth: this.applicant.dateOfBirthShort,
            postalCode: ''
          },
          { perType: PersonType.spouseType,
            phn: this.spouse.getNonFormattedPhn(),
            dateOfBirth: this.spouse.dateOfBirthShort,
            postalCode: ''
          }
        ]
      });
    } else {
      subscription = this.apiService.checkEligibility({
        persons: [
          {perType: PersonType.applicantType,
            phn: this.applicant.getNonFormattedPhn(),
            dateOfBirth: this.applicant.dateOfBirthShort,
            postalCode: ''
          }
        ]
      });
    }

   // Trigger the HTTP request
    subscription.subscribe(response => {

      this.responseStore.eligibility = new EligibilityPayload(response);
      this.loading = false;

      if ( this.responseStore.eligibility.success ) {
        /**
         * Set born before 1939 flag based on birthdates entered
         * ST17390
         */
        this.fpcareDataService.bornBefore1939 =
            ((this.applicant.dateOfBirth.year <= this._SENIOR_ASSISTENCE_YEAR ) ||
             (this.hasSpouse && this.spouse.dateOfBirth.year <= this._SENIOR_ASSISTENCE_YEAR )) ? true : false;

        this.logger.log({
          event: 'eligibilityCheck',
          success: this.responseStore.eligibility.success
        });
        this.navigate( this._baseUrl + REGISTRATION_PERSONAL );
      } else {

        // Something went wrong with our response
        if ( !this.responseStore.eligibility.message ) {
          this.responseStore.eligibility = null;
        }
        this.logger.log({
          event: 'eligibilityCheck',
          success: this.responseStore.eligibility.error
        });
        this.navigate(this._baseUrl +  REGISTRATION_RESULTS );
      }
    },
        (responseError) => {
          this.loading = false;
          this.errorPageService.errorResponse = responseError;
          this.navigate( ERROR_PAGE );
    });
  }
}
