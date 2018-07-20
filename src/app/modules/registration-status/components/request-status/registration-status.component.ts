import {Component, DoCheck, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {AbstractFormComponent} from '../../../../models/abstract-form-component';
import {FPCareDateComponent} from '../../../core/components/date/date.component';

@Component({
  selector: 'fpcare-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent extends AbstractFormComponent implements OnInit, DoCheck {

  /** Access to date component */
  @ViewChildren(FPCareDateComponent) dobForm: QueryList<FPCareDateComponent>;

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
    let valid = this.form.valid;

    console.log( 'form: (valid)', this.form.valid )

    valid = valid && !!this.dobForm;
    if ( !!this.dobForm ) {
      valid = valid && (this.dobForm.map(x => {
        if (x.required && x.isValid()) {
          return x.form.valid;
        }
      })
        .filter(x => x !== true).length === 0);
    }

    this._canContinue = valid;
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
