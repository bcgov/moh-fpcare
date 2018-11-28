//import { element, by } from 'protractor';
import {REPRINT_CONSENT, REPRINT_LETTERS_PATH} from '../../src/app/models/route-paths.constants';
import {ConsentModalPo} from '../consent-modal.po';
import {BasePagePo} from '../base-page.po';

/**
 * Functionality for all FPC pages
 */
export class ConsentReprintPagePo extends BasePagePo {

  public consentModal;

  // Constructor
  constructor() {
    super();

    this.consentModal = new ConsentModalPo();
  }

  /**
   *
   */
  navigateToRequestConsent() {
    super.navigateTo( REPRINT_LETTERS_PATH + '/' + REPRINT_CONSENT );
  }
}
