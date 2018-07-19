import {Component, OnInit} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit {

  /** Applicant requesting registration status */
  private _applicant: Person = new Person();

  constructor( protected router: Router
             , private fpcareDataService: FPCareDataService
             , private dummyDataService: DummyDataService ) {
    super( router );
  }

  ngOnInit() {
  }

  /**
   * Structure to record data for request
   * @returns {Person}
   */
  get applicant(): Person {
    return this._applicant;
  }


  // Methods triggered by the form action bar

  /**
   * Indicated whether or not applicant can continue process
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this.form.valid;
  }

  // TODO: Code functionality
  continue() {

    const request = this.fpcareDataService.getStatusRequest( this._applicant );

    console.log( 'JSON object: ', request );
    // TODO: remove dummyservice when back-end is built
    this.dummyDataService.submitRequestStatus( request );

    const link = '/registration-status/status-results';
    this.router.navigate([link]);
  }
}
