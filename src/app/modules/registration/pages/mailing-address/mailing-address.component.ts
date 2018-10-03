import {Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Address} from '../../../../models/address.model';
import {REGISTRATION_PATH, REGISTRATION_REVIEW} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';

@Component({
  selector: 'fpcare-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressPageComponent extends AbstractFormComponent implements OnInit {

  /** Page to naviage to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_REVIEW;

  private _isPostalMatch: boolean = true;
  public updateAddress: Address = new Address;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private registrationService: RegistrationService) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();

    // Set country
    this.updateAddress.country = 'Canada';
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    if ( super.canContinue() ) {

      const pc = this.fpcService.removeStrFormat( this.applicant.address.postal );
      if ( pc ) {
        this._isPostalMatch = this.registrationService.isPostalCodeMatch( pc );
      }

      return ( this._isPostalMatch || ( !this._isPostalMatch && this.updateAddress.isComplete() ) );
    }

    // Main and sub forms are not empty and are valid
    return false;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  get isPostalMatch(): boolean {

    return this._isPostalMatch;
  }

  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {

    if ( this.canContinue() ) {

      // Update the address
      if ( this.updateAddress.isComplete() ) {
        this.fpcService.applicant.isAddressUpdated = true;
        this.fpcService.applicant.updAddress = new Address();
        this.fpcService.applicant.updAddress.copy( this.updateAddress );
      } else {
        this.fpcService.applicant.isAddressUpdated = false;
      }

      this.registrationService.setItemComplete();
      this.navigate(  this._url );
    }
  }
}
