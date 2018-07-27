import {Component, DoCheck, OnInit} from '@angular/core';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {Person} from '../../../../models/person.model';
import {Address} from '../../../../models/address.model';

@Component({
  selector: 'fpcare-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressPageComponent extends AbstractFormComponent implements OnInit, DoCheck {

  // Variable to indicate whether the postal code matches the one on file
  private _postalCodeMatch = true;

  constructor( private fpcService: FPCareDataService
             , protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Detect changes, check if form is valid
   */
  ngDoCheck() {
    this._canContinue = this.form.valid;
  }

  /**
   * Gets the applicant object
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcService.applicant;
  }

  /**
   * Determines whether postal code is valid, matches FPC record
   * @returns {boolean}
   */
  isPostalCodeMatch(): boolean {
    // business logic required to determine whether PC is valid - for dev purposes show update address

    if ( !this._postalCodeMatch ) {
      this.applicant.updAddress = new Address();
    }

    this.applicant.updatedAddress = !this._postalCodeMatch; // Flag to indicate address is updated

    return this._postalCodeMatch;
  }


  // Methods triggered by the form action bar

  /**
   * Navigates to the next page
   */
  continue () {
    if ( this.canContinue() ) {
      this.navigate( '/registration/review' );
    }
  }
}
