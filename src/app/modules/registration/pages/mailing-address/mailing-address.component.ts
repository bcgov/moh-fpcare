import { ChangeDetectorRef, Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Person } from '../../../../models/person.model';
import { REGISTRATION_PATH, REGISTRATION_REVIEW } from '../../../../models/route-paths.constants';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { RegistrationService } from '../../registration.service';
import { FPCareRequiredDirective } from '../../../../validation/fpcare-required.directive';
import {
  CountryNames,
  defaultCountry,
  defaultProv,
  provinceList,
  ProvinceNames
} from '../../../../models/province-names.enum';
import {ValidationService} from '../../../../services/validation.service';
import {PersonType} from '../../../../models/api.model';
import {ResponseStoreService} from '../../../../services/response-store.service';

@Component({
  selector: 'fpcare-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressPageComponent extends AbstractFormComponent implements OnInit {

  @ViewChildren(FPCareRequiredDirective) fpcareRequired;

  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_REVIEW;
  private _postalCode: string[];

  public isPostalMatch: boolean = true;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private registrationService: RegistrationService
             , private responseStore: ResponseStoreService
             , private cd: ChangeDetectorRef) {
    super( router );
  }

  ngOnInit() {

    // Update address not complete, set defaults
    if (!this.applicant.updAddress.isComplete()) {

      // Set country -- Canada only country in Countries
      this.applicant.updAddress.country = defaultCountry;
      this.applicant.updAddress.province = defaultProv;
    }

    this.registrationService.setItemIncomplete();

    if (this.responseStore.eligibility) {

      // Store the list of family members - used to validate postal code
      this._postalCode = this.responseStore.eligibility.persons.map(person => {
        if (person.perType !== PersonType.dependent) {
          return person.postalCode;
        }
      }).filter(x => x);
    }

    // Handles case when returning to page with data (e.g. back/forward nav)
    this.checkPostal();
  }

  get countryName(): string {
    return CountryNames[this.applicant.updAddress.country];
  }

  getProvinceID( index ) {
    return provinceList[index];
  }

  /**
   * Get name of the province to display on the page
   * @returns {any[]}
   */
  get provinceName() {
    return provinceList.map( key => ProvinceNames[key] );
  }
  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {
    return super.canContinue() && ( this.isPostalMatch || (!this.isPostalMatch && this.applicant.isAddressUpdated) );
  }

  checkPostal(): void {
    if (this.applicant.address.hasPostal()) {
      this.isPostalMatch = this.isPostalCodeMatch( this.applicant.getNonFormattedPostalCode() );
      //console.log('checkPostal', this.isPostalMatch, this._postalCode );

      if ( this.isPostalMatch && this.applicant.isAddressUpdated  ) {
        // Remove postal code causes updated address structure to be incomplete
        this.applicant.updAddress.postal = '';
      }
    }
  }

  /**
   *
   * @returns {string}
   */
  get updatePostalCode(): string {

    // Set postal code
    if (!this.isPostalMatch && (this.applicant.address.postal !== this.applicant.updAddress.postal)) {
      // Update postal for updated address
      this.applicant.updAddress.postal = this.applicant.address.postal;
    }

    return this.applicant.updAddress.postal;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  onGeoLookup(){

    // Re-run all fpcareRequire directives, hiding validation errors if the
    // geolookup has fixed them.
    setTimeout(() => {
      this.fpcareRequired.map(x => x.runAll());
      this.cd.detectChanges();
    }, 0);
  }

  /**
   * Retrieve maximum length for city name
   * @returns {number}
   */
  get cityMaxLength(): number {
    return ValidationService.MAX_CITY_LENGTH;
  }

  /**
   * Retrieve maximum length for street data
   * @returns {number}
   */
  get streetMaxLength(): number {
    return ValidationService.MAX_STREET_LENGTH;
  }

  /**
   * Indicates whether postal code matches
   * @param {string} pc
   * @returns {boolean}
   */
  isPostalCodeMatch( pc: string ): boolean {

    //console.log( 'isPostalCodeMatch: ', pc );
    // No postal code force update
    return (this._postalCode ? this._postalCode.map(
        postalCode => this.registrationService.compare( pc, postalCode ) )
        .filter( x => x === true ).length !== 0 : false );
  }
  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {

    if ( this.canContinue() ) {

      this.registrationService.setItemComplete();
      this.navigate( this._url );
    }
  }
}
