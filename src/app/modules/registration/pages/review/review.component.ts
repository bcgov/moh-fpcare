import {Component, OnInit} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DateTimeService} from '../../../../services/date-time.service';
import {Router} from '@angular/router';
import {Person} from '../../../../models/person.model';
import {Base} from '../../../core/components/base/base.class';
import {
  REGISTRATION_ADDRESS, REGISTRATION_AUTHORIZE,
  REGISTRATION_CHILD,
  REGISTRATION_ELIGIBILITY, REGISTRATION_FINANCIAL, REGISTRATION_PATH
} from '../../../../models/route-paths.constants';

@Component({
  selector: 'fpcare-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewPageComponent extends Base implements OnInit {

  constructor( private fpcService: FPCareDataService
             , private dateTimeService: DateTimeService
             , private router: Router ) {
    super( );
  }

  ngOnInit() {
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
   * Retrieves the list of children
   * @returns {Person[]}
   */
  get children(): Person[] {
    return this.fpcService.dependants;
  }

  /**
   * Flag indicating presence of spouse
   * Displays spouse information section if true, otherwise it's hidden
   * @returns {boolean}
   */
  hasSpouse(): boolean {
    return this.fpcService.hasSpouse();
  }

  /**
   * Indicates whether or not applicant has children
   * @returns {boolean}
   */
  hasChildren(): boolean {
    return this.fpcService.hasChildren();
  }

  /**
   * Retrieves the applicant's date of birth as a string
   * @returns {string}
   */
  getApplicantDob(): string {
    return this.dateTimeService.convertSimpleDateToStr( this.applicant.dateOfBirth );
  }

  /**
   * Retrieves the spouse's date of birth as a string
   * @returns {string}
   */
  getSpouseDob(): string {
    return this.dateTimeService.convertSimpleDateToStr( this.spouse.dateOfBirth );
  }

  /**
   * Retrieves the child's date of birth as a string
   * @param {Person} child
   * @returns {string}
   */
  getChildDob( child: Person ): string {
    return this.dateTimeService.convertSimpleDateToStr( child.dateOfBirth );
  }

  /**
   * Link to Eligibility page so applicant can edit data
   */
  editPersonalInfo() {
    this.navigate( REGISTRATION_ELIGIBILITY );
  }

  /**
   * Link to Child Information page so applicant can edit data
   */
  editChildInfo() {
    this.navigate( REGISTRATION_CHILD );
  }

  /**
   * Link to Address page so applicant can edit data
   */
  editContactInfo() {
    this.navigate( REGISTRATION_ADDRESS );
  }

  /**
   * Link to Financial page so applicant can edit data
   */
  editFinancialInfo() {
    this.navigate( REGISTRATION_FINANCIAL );
  }

  /**
   * Retrieve the updated street address
   * @returns {string}
   */
  getStreet(): string {
    return  this.isAddressUpdated() ? this.applicant.updAddress.street : this.applicant.address.street ;
  }

  /**
   * Retrieve the updated city for address
   * @returns {string}
   */
  getCity(): string {
    return  this.isAddressUpdated() ? this.applicant.updAddress.city : this.applicant.address.city;
  }

  /**
   *
   * @returns {string}
   */
  getProvince(): string {
    return  this.isAddressUpdated() ? this.applicant.updAddress.province : this.applicant.address.province;
  }

  /**
   *
   * @returns {string}
   */
  getCountry(): string {
    return  this.isAddressUpdated() ? this.applicant.updAddress.country : this.applicant.address.country;
  }

  /**
   *
   * @returns {string}
   */
  getPostalCode(): string {
    return  this.isAddressUpdated() ? this.applicant.updAddress.postal : this.applicant.address.postal ;
  }

  // Methods triggered by the form action bar

  /** Determines if the Continue button is disabled */
  canContinue(): boolean {
    return true;
  }

  /**
   * Navigates to the next page
   */
  continue() {
    this.navigate( REGISTRATION_AUTHORIZE );
  }

  /**
   *
   * @returns {boolean}
   */
  isAddressUpdated(): boolean {
    return this.applicant.isAdressUpdated();
  }

  /** Navigates to a route then automatically scrolls to the top of the page. */
  private navigate(page: string){
    this.router.navigate([ REGISTRATION_PATH + '/' + page])
      .then((data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
