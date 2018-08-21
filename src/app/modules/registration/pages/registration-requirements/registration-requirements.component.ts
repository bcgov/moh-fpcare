import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Base} from '../../../core/components/base/base.class';
import {FPCareDataService} from '../../../../services/fpcare-data.service';
import {ConsentModalComponent} from '../../../core/components/consent-modal/consent-modal.component';

@Component({
  selector: 'fpcare-registration-requirements',
  templateUrl: './registration-requirements.component.html',
  styleUrls: ['./registration-requirements.component.scss']
})
export class RegistrationRequirementsComponent extends Base implements OnInit, AfterViewInit {

  @ViewChild('consentModal') consentModal: ConsentModalComponent;

  constructor( private router: Router,
               private fpcareDataService: FPCareDataService) {
    super();
  }

  ngOnInit() {
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
    this.router.navigate(['registration/financial']);
  }
}
