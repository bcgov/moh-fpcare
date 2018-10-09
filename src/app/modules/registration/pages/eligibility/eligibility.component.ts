import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {FPCareDateComponent} from '../../../core/components/date/date.component';
import {ValidationService} from '../../../../services/validation.service';
import {
  ERROR_404,
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
import {phn_def, phn_hdr} from '../../../../models/fpcare-aside-definitions';

@Component({
  selector: 'fpcare-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityPageComponent extends AbstractFormComponent implements OnInit {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

  /** Indicates whether or not the same PHN has been used for spouse */
  private _uniquePhn = true;

  // headers and definitions for aside (repeated in multiple places)
  public phnHdr: string = phn_hdr;
  public phnDef: string =  phn_def;

  /** Page to naviage to when continue process */
  private _baseUrl = REGISTRATION_PATH + '/';

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService
             , private validationService: ValidationService
             , private registrationService: RegistrationService
             , private apiService: ApiService
             , private responseStore: ResponseStoreService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete() ;
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    // Main and sub forms are not empty and are valid
    if ( super.canContinue() ) {

      if ( !this.hasSpouse ) {
        return true;
      }

      // Check PHNs are unique
      this._uniquePhn = this.validationService.isUnique( [this.applicant.phn, this.spouse.phn] );
      return this._uniquePhn;
    }
    return false;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): Person {
    return this.fpcareDataService.spouse;
  }

  /**
   * Indicates whether the PHNs are the same
   * @returns {boolean}
   */
  get hasUniquePhnError(): boolean {
    return !this._uniquePhn;
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
            phn: this.fpcareDataService.removeStrFormat( this.applicant.phn ),
            dateOfBirth: this.applicant.dateOfBirthShort,
            postalCode: ''
          },
          { perType: PersonType.spouseType,
            phn: this.fpcareDataService.removeStrFormat( this.spouse.phn ),
            dateOfBirth: this.spouse.dateOfBirthShort,
            postalCode: ''
          }
        ],
        benefitYear: this.fpcareDataService.benefitYear
      });
    } else {
      subscription = this.apiService.checkEligibility({
        persons: [
          {perType: PersonType.applicantType,
            phn: this.fpcareDataService.removeStrFormat( this.applicant.phn) ,
            dateOfBirth: this.applicant.dateOfBirthShort,
            postalCode: ''
          }
        ],
        benefitYear: this.fpcareDataService.benefitYear
      });
    }

// TODO: response will eventually be encrypted, comparing data entered by applicant will need to be encrypted to be validated
    // Trigger the HTTP request
    subscription.subscribe(response => {

      console.log( 'response: ', response );

      this.responseStore.eligibility = new EligibilityPayload(response);
      this.loading = false;

      if ( response.canContinueRegistration ) {
        this.registrationService.familyStructure = this.responseStore.eligibility.persons;
        this.navigate( this._baseUrl + REGISTRATION_PERSONAL );
      } else {
        this.navigate(this._baseUrl +  REGISTRATION_RESULTS );
      }
    },
        (responseError) => {
          this.loading = false;
          console.log( 'response error: ', responseError );
          this.navigate( ERROR_404 );
    });
  }
}
