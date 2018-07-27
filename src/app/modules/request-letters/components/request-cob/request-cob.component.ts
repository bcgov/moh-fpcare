import {Component, OnInit} from '@angular/core';
import {Person} from '../../../../models/person.model';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {DummyDataService} from '../../../../services/dummy-data.service';
import {Base} from '../../../core/components/base/base.class';

@Component({
  selector: 'fpcare-request-cob',
  templateUrl: './request-cob.component.html',
  styleUrls: ['./request-cob.component.scss']
})
export class RequestCobComponent extends Base implements OnInit {

  constructor( private fpcareDataService: FPCareDataService ) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Object for recording registrant's information
   * @returns {Person}
   */
  get applicant(): Person {
    return this.fpcareDataService.applicant;
  }

  /**
   * Label for button
   * @returns {string}
   */
  get buttonLabel(): string {
    return 'Request Confirmation';
  }

  /**
   * Page to navaigate to on continue
   * @returns {string}
   */
  get nextPg(): string {
    return '/request-letter/cob-results';
  }
}
