import {Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {FPCPerson} from '../../../../models/person.model';
import {ApiService} from '../../../../services/api-service.service';
import {RegistrationService} from '../../registration.service';
import { Logger } from '../../../../services/logger.service';
import {
  PersonInterface,
  PersonType,
  RegistrationPayload
} from '../../../../models/api.model';
import {FinanceService} from '../../../financial-calculator/finance.service';
import {
  ERROR_PAGE,
  REGISTRATION_PATH,
  REGISTRATION_RESULTS
} from '../../../../models/route-paths.constants';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {environment} from '../../../../../environments/environment';
import {ErrorPageService} from '../../../../pages/error-page/error-page.service';

@Component({
  selector: 'fpcare-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompletePageComponent extends AbstractFormComponent implements OnInit  {

  /** Page to navigate to when continue process */
  private _baseUrl = REGISTRATION_PATH + '/';

  public applicantAgreement: boolean = false;
  public spouseAgreement: boolean = false;
  public links = environment.links;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private apiService: ApiService
             , private registrationService: RegistrationService
             , private financialService: FinanceService
             , private responseStore: ResponseStoreService
             , private logger: Logger
             , private errorPageService: ErrorPageService ) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): FPCPerson {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {Person}
   */
  get spouse(): FPCPerson {
    return this.fpcService.spouse;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  get hasSpouse(): boolean {
    return this.fpcService.hasSpouse;
  }

  // Methods triggered by the form action bar
  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Submit Application';
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    let valid = this.applicantAgreement;

    if ( this.hasSpouse ) {
      valid = (valid && this.spouseAgreement);
    }

    return valid;
  }

  /**
   * Navigates to the next page
   */
  continue() {

    if (!this.canContinue()) {
      return;
    }

    this.registrationService.setItemComplete();
    this.loading = true;

    // Setup the request
    const subscription = this.apiService.requestRegistration({
      persons: this.getFamilyList(),
      address: this.applicant.isAddressUpdated ?
          { // Address object
            street: this.applicant.updAddress.street,
            city: this.applicant.updAddress.city,
            province: this.applicant.updAddress.province,
            postalCode: this.applicant.getNonFormattedPostalCode(),
            country: this.applicant.updAddress.country
          } : null
    });

    // Trigger the HTTP request
    subscription.subscribe(response => {

          this.responseStore.registration = new RegistrationPayload(response);
          this.loading = false;
          // this.responseStore.registration.success

          this.navigate( this._baseUrl + REGISTRATION_RESULTS );

          this.logger.log({
            event: 'submission',
            success: this.responseStore.registration.success
          });
        },
        (responseError) => {
          this.loading = false;
          this.errorPageService.errorResponse = responseError;
          this.navigate( ERROR_PAGE );
        });
   }

  /**
   * build family member list for registration
   * @returns {PersonInterface[]}
   */
   private getFamilyList(): PersonInterface[] {

     const list: PersonInterface[] = [];

     list.push(
         this.registrationService.setPersonInterfaceForReg(
             this.applicant,
             PersonType.applicantType,
             this.fpcService.applicantIncome,
             this.fpcService.disabilityAmount
         )
     );

     if ( this.hasSpouse ) {
       list.push(
           this.registrationService.setPersonInterfaceForReg(
               this.spouse,
               PersonType.spouseType,
               this.fpcService.spouseIncome,
               this.fpcService.spouseDisabilityAmount
           )
       );
     }

     if ( this.fpcService.hasChildren ) {

       const dependants = this.fpcService.dependants.map(
         x => this.registrationService.setPersonInterfaceForReg( x, PersonType.dependent ) );
       list.push(...dependants);
     }
     return list;
   }
}
