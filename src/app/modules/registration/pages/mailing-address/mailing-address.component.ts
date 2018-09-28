import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractFormComponent } from '../../../../models/abstract-form-component';
import { Person } from '../../../../models/person.model';
import { REGISTRATION_PATH, REGISTRATION_REVIEW } from '../../../../models/route-paths.constants';
import { FPCareDataService } from '../../../../services/fpcare-data.service';
import { PostalCodeComponent } from '../../../core/components/postal-code/postal-code.component';
import { RegistrationService } from '../../registration.service';
import { FPCareRequiredDirective } from '../../../../validation/fpcare-required.directive';

@Component({
  selector: 'fpcare-mailing-address',
  templateUrl: './mailing-address.component.html',
  styleUrls: ['./mailing-address.component.scss']
})
export class MailingAddressPageComponent extends AbstractFormComponent implements OnInit {

  // Variable to indicate whether the postal code matches the one on file
  private _postalCodeMatch = false; // TODO - REVERT TO TRUE FOR NOW
  // private _postalCodeMatch = true; // TODO - REVERT TO TRUE FOR NOW

  @ViewChild('postalCodeContainer') postalCodeContainer: ElementRef; //TODO - Remove?
  @ViewChildren(FPCareRequiredDirective) fpcareRequired;


  /** Page to naviage to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_REVIEW;

  constructor( private fpcService: FPCareDataService
             , protected router: Router
             , private registrationService: RegistrationService
             , private cd: ChangeDetectorRef) {
    super( router );
  }

  ngOnInit() {
    this.registrationService.setItemIncomplete();

    this.applicant.updAddress.country = 'Canada';
  }

  /**
   * Check to verify whether user can continue or not
   * @returns {boolean}
   */
  canContinue(): boolean {

    // Main and sub forms are not empty and are valid
    return super.canContinue();
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
    return this._postalCodeMatch;
  }

  highlightPostal(){
    const BASE_CLASS = 'form-group';
    const ERROR_CLASS = `${BASE_CLASS} has-error`;

    const el = this.postalCodeContainer.nativeElement;

    if (this.applicant.updAddress.postal){
      el.className =  BASE_CLASS;
    }
    else {
      el.className = ERROR_CLASS;
    }
  }

  onGeoLookup(){
    this.highlightPostal();

    // Re-run all fpcareRequire ddirectives, hiding validation errors if the
    // geolookup has fixed them.
    setTimeout(() => {
      this.fpcareRequired.map(x => x.runAll());
      this.cd.detectChanges();
    }, 0);
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
