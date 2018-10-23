import {Component, OnInit} from '@angular/core';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Router} from '@angular/router';
import {Person} from '../../../../models/person.model';
import {Base} from '../../../core/components/base/base.class';
import {
  REGISTRATION_ADDRESS, REGISTRATION_AUTHORIZE,
  REGISTRATION_CHILD,
  REGISTRATION_ELIGIBILITY, REGISTRATION_FINANCIAL, REGISTRATION_PATH
} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {FinanceService} from '../../../financial-calculator/finance.service';
import {CountryNames, ProvinceNames} from '../../../../models/province-names.enum';

@Component({
  selector: 'fpcare-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewPageComponent extends Base implements OnInit {


  constructor( private fpcService: FPCareDataService
             , private router: Router
             , private registrationService: RegistrationService
             , private financeService: FinanceService ) {
    super( );
  }

  ngOnInit() {

    this.registrationService.setItemIncomplete();
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
   * Retrieves that applicant's income
   * @returns {string}
   */
  get applicantIncome(): string {
    return this.financeService.currencyFormat( this.fpcService.applicantIncome, true );
  }

  /**
   * Retrieves the applicant's spouse's income
   * @returns {string}
   */
  get spouseIncome(): string {
    return this.financeService.currencyFormat( this.fpcService.spouseIncome, true );
  }

  /**
   * Retrieves the Registered Disability Savings for applicant/spouse
   * @returns {string}
   */
  get disabilityAmount(): string {
    return this.financeService.currencyFormat( this.fpcService.disabilityAmount, true );
  }

  /**
   * Retrieves the adjusted income for applicant
   * @returns {string}
   */
  get adjustedIncome(): string {
    return this.financeService.currencyFormat( this.fpcService.adjustedIncome, true );
  }

  /**
   * Flag indicating applicant or spouse born before 1939
   * @returns {boolean}
   */
  get bornBefore1939(): boolean {
    return this.fpcService.bornBefore1939;
  }

  /**
   *
   * @returns {number}
   */
  get adjustedIncomeAmount(): number {
    return this.fpcService.adjustedIncome;
  }

  /**
   * Flag indicating presence of spouse
   * @returns {boolean}
   */
  get hasSpouse(): boolean {
    return this.fpcService.hasSpouse;
  }

  /**
   * Indicates whether or not applicant has children
   * @returns {boolean}
   */
  get hasChildren(): boolean {
    return this.fpcService.hasChildren;
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
   * Retrieves the child's date of birth as a string
   * @param {Person} child
   * @returns {string}
   */
  getChildDob( child: Person ): string {
    return child.formatDateOfBirth;
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

  editSpouse() {
    if ( this.hasSpouse ) {
      this.editPersonalInfo();
    }
    else {
      this.editFinancialInfo();
    }
  }
  /**
   * Retrieve the updated street address
   * @returns {string}
   */
  getStreet(): string {
    return  this.isAddressUpdated ? this.applicant.updAddress.street : this.applicant.address.street ;
  }

  /**
   * Retrieve the updated city for address
   * @returns {string}
   */
  getCity(): string {
    return  this.isAddressUpdated ? this.applicant.updAddress.city : this.applicant.address.city;
  }

  /**
   *
   * @returns {string}
   */
  getProvince(): string {
    return  ProvinceNames[(this.isAddressUpdated ? this.applicant.updAddress.province : this.applicant.address.province)];
  }

  /**
   *
   * @returns {string}
   */
  getCountry(): string {
    return  CountryNames[(this.isAddressUpdated ? this.applicant.updAddress.country : this.applicant.address.country)];
  }

  /**
   *
   * @returns {string}
   */
  getPostalCode(): string {
    return  this.isAddressUpdated ? this.applicant.updAddress.postal : this.applicant.address.postal ;
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue() {
    this.registrationService.setItemComplete();
    this.navigate(REGISTRATION_AUTHORIZE);
  }

  /**
   *
   * @returns {boolean}
   */
  get isAddressUpdated(): boolean {
    return this.applicant.isAddressUpdated;
  }

  /** Navigates to a route then automatically scrolls to the top of the page. */
  private navigate(page: string){
    this.router.navigate([ REGISTRATION_PATH + '/' + page])
      .then((data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
