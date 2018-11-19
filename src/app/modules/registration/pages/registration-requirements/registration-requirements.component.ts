import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Base} from '../../../core/components/base/base.class';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';
import {
  REGISTRATION_ADDRESS,
  REGISTRATION_FINANCIAL,
  REGISTRATION_PATH,
  REGISTRATION_RESULTS
} from '../../../../models/route-paths.constants';
import {RegistrationService} from '../../registration.service';
import {pageRoutes} from '../../registration-page-routing';
import {environment} from '../../../../../environments/environment';
import {ResponseStoreService} from '../../../../services/response-store.service';
import {ApiService} from '../../../../services/api-service.service';
import * as moment from 'moment';
import {MessagePayload, MessagePayloadInterface} from '../../../../models/api.model';

@Component({
  selector: 'fpcare-registration-requirements',
  templateUrl: './registration-requirements.component.html',
  styleUrls: ['./registration-requirements.component.scss']
})
export class RegistrationRequirementsComponent extends Base implements OnInit, AfterViewInit {

  @ViewChild('consentModal') consentModal: ConsentModalComponent;
  /** Page to navigate to when continue process */
  private _url = REGISTRATION_PATH + '/' + REGISTRATION_FINANCIAL;

  public links = environment.links;
  public benefitYearEx: number;
  public taxYearEx: number;

  constructor( private router: Router,
               private fpcareDataService: FPCareDataService,
               private registrationService: RegistrationService,
               private apiService: ApiService,
               private responseStore: ResponseStoreService
  ) {
    super();

    // Registration items to be completed
    this.registrationService.registrationItems = pageRoutes.map( page => {
      if ( page.path !== '' ) {
        return {
          route: page.path,
          isComplete: false
        };
      }
    }).filter( x => x );

  }

  ngOnInit() {
    const year = moment().year();
    this.benefitYearEx = year;
    this.taxYearEx = year - 2;

    // Load messages from cache
    this.apiService.getMessages().subscribe(
        (response) => {

          const payload = new MessagePayload( response );

          if ( payload.success ) {
            this.responseStore.cacheMsgs = payload.messages;
          } else {
            this.router.navigate([REGISTRATION_PATH + '/' + REGISTRATION_RESULTS] );
          }
        }
    );
  }

  ngAfterViewInit() {

    // Individual has not consented to collection notice
    if (!this.fpcareDataService.acceptedCollectionNotice) {
      this.consentModal.openModal();
    }
  }

  /**
   * Method to set the consented value for the collection notice
   * @param {boolean} value
   */
  onAccept( value: boolean ){
    this.fpcareDataService.acceptedCollectionNotice = value;
  }


  // Methods triggered by the form action bar
  /**
   * Navigates to the next page
   */
  continue() {
    this.router.navigate([this._url]);
  }
}
