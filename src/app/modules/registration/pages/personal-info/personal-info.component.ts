import {Component, OnInit, ViewChild} from '@angular/core';
import {FPCPerson} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {ValidationService} from '../../../../services/validation.service';
import {REGISTRATION_CHILD, REGISTRATION_PATH} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {SampleModalComponent} from '../../../core/components/sample-modal/sample-modal.component';
import {ImageInterface} from '../../../../models/image-interface';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'fpcare-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoPageComponent extends AbstractFormComponent implements OnInit {

  @ViewChild('sinSample', { static: false }) sinSample: SampleModalComponent;

  /** Indicates whether or not the same SIN has been used for spouse */
  public uniqueSinError = false;
  public links = environment.links;
  public imageList: ImageInterface[]  = [{
    path: 'assets/sin_card_sample.png', desc: 'Social Insurance Number Card Sample image'
  }];

  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_CHILD;

  constructor( private fpcService: FPCareDataService
             , private validationService: ValidationService
             , protected router: Router
             , private registrationService: RegistrationService ) {
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

      // If spouse exists, ensure unique SINs
      return this.hasSpouse ? !this.uniqueSinError : true;
    }

    return false;
  }

  /**
   * Gets the applicant object
   * @returns {FPCPerson}
   */
  get applicant(): FPCPerson {
    return this.fpcService.applicant;
  }

  /**
   * Gets the spouse object
   * @returns {FPCPerson}
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
    return !!this.fpcService.hasSpouse;
  }

  /**
   * Retrieves the applicant's date of birth as a string
   * @returns {string}
   */
  getApplicantDob(): string {
    return this.applicant.formatDateOfBirth;
  }

  /**
   * Retrieves the spouse's date of birth as a string
   * @returns {string}
   */
  getSpouseDob(): string {
    return this.spouse.formatDateOfBirth;
  }

  /**
   *
   * @returns {string[]}
   */
  get familySinList(): string [] {

    if ( this.hasSpouse ) {
      return [this.applicant.sin, this.spouse.sin];
    }
    return [];
  }

  /**
   * Maximum length a first name can be
   * @returns {number}
   */
  get maxLenGivenName(): number {
    return ValidationService.MAX_GIVEN_NAME_LENGTH;
  }

  /**
   * Maximum length a last name can be
   * @returns {number}
   */
  get maxLenSurname(): number {
    return ValidationService.MAX_SURNAME_LENGTH;
  }

  /**
   *
   * @returns {string}
   */
  get labelGivenName(): string {
    return 'First Name';
  }

  /**
   *
   * @returns {string}
   */
  get labelSurname(): string {
    return 'Last Name';
  }

  /**
   *
   */
  openSample() {
    this.sinSample.openModal();
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {
    if ( this.canContinue() ) {
      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }
}
