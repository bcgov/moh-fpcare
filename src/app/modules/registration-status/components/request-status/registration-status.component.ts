import {Component, DoCheck, OnInit} from '@angular/core';
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
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit, DoCheck {

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
   * Detect changes, check if form is valid
   */
  ngDoCheck() {
    this._canContinue = this.form.valid;
  }

  /**
   * Structure to record data for request
   * @returns {Person}
   */
  get applicant(): Person {
    return this._applicant;
  }


  // Methods triggered by the form action bar
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
