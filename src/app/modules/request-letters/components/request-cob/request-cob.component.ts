import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Person} from '../../../../models/person.model';
import {Router} from '@angular/router';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-request-cob',
  templateUrl: './request-cob.component.html',
  styleUrls: ['./request-cob.component.scss']
})
export class RequestCobComponent extends Base implements OnInit {

  /** Applicant requesting registration status */
  private _applicant: Person = new Person();

  constructor( private router: Router
    , private fpcareDataService: FPCareDataService
    , private dummyDataService: DummyDataService ) {
    super();
  }

  ngOnInit() {
  }

  get applicant(): Person {
    return this._applicant;
  }

  /**
   * Label for button depending on the whether the applicant has children
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Request Confirmation';
  }

  /**
   *
   * @param {boolean} canContinue
   */
  continue( canContinue: boolean ) {

    console.log('cob: continue ', canContinue );

    if (canContinue) {
      const link = '/cob-letter-results';
      this.router.navigate([link]);
    }
  }
}
