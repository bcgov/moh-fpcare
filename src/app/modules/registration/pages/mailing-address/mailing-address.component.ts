import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Person } from '../../../../models/person.model';
import { REGISTRATION_PATH, REGISTRATION_REVIEW } from '../../../../models/route-paths.constants';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { RegistrationService } from '../../registration.service';
import { FPCareRequiredDirective } from '../../../../validation/fpcare-required.directive';
import { CountryNames, ProvinceNames } from '../../../../models/province-names.enum';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'fpcare-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressPageComponent extends AbstractFormComponent implements OnInit {

  @ViewChildren(FPCareRequiredDirective) fpcareRequired;


  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_REVIEW;

  public isPostalMatch: boolean = true;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private registrationService: RegistrationService
             , private cd: ChangeDetectorRef) {
    super( router );
  }

  ngOnInit() {

    // Update address not complete, set defaults
    if ( !this.applicant.updAddress.isComplete() ) {

      // Set country -- Pnet pataddr table only allows 3 characters for country field
      this.applicant.updAddress.country = CountryNames.CAN;
      this.applicant.updAddress.province = ProvinceNames.BC;
    }

    this.registrationService.setItemIncomplete();

    // Handles case when returning to page with data (e.g. back/forward nav)
    this.checkPostal();
  }

  /**
   * Get name of the province to display on the page
   * @returns {any[]}
   */
  get provinceName() {
    return Object.keys(ProvinceNames).map( key => ProvinceNames[key] );
  }
  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {
    return super.canContinue() && ( this.isPostalMatch || (!this.isPostalMatch && this.applicant.isAddressUpdated) );
  }

  checkPostal(): void {
    if (this.applicant.address.hasPostal()){
      const pc = this.applicant.getNonFormattedPostalCode();
      this.isPostalMatch = this.registrationService.isPostalCodeMatch( pc );

      // Set postal code
      if (!this.isPostalMatch && (this.applicant.address.postal !== this.applicant.updAddress.postal)) {
        // Update postal for updated address
        this.applicant.updAddress.postal = this.applicant.address.postal;
      } else if ( this.isPostalMatch && this.applicant.isAddressUpdated ) {
        // Remove postal code causes updated address structure to be incomplete
        this.applicant.updAddress.postal = '';
      }

      console.log('checkPostal', this.isPostalMatch, this.registrationService.familyStructure);
    }
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  onGeoLookup(){

    // Re-run all fpcareRequire ddirectives, hiding validation errors if the
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

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {

    if ( this.canContinue() ) {

      this.registrationService.setItemComplete();
      this.navigate(  this._url );
    }
  }
}
