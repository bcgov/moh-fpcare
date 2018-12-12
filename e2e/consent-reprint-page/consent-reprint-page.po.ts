//import { element, by } from 'protractor';
import {REPRINT_CONSENT, REPRINT_LETTERS_PATH} from '../../src/app/models/route-paths.constants';
import {ConsentModalPo} from '../consent-modal.po';
import {BasePagePo} from '../base-page.po';
import * as XLSX from 'xlsx';

/**
 * Functionality for all FPC pages
 */
export class ConsentReprintPagePo extends BasePagePo {

  public consentModal;

  public worksheet;

  // Constructor
  constructor() {
    super();

    this.consentModal = new ConsentModalPo();

    const workbook = XLSX.readFile('/home2/kristin.reed/Downloads/Book1.xlsx');

    		//get the sheet default name
    this.worksheet = workbook.Sheets['Sheet1'];
    console.log( 'worksheet: ', this.worksheet );
  }

  /**
   *
   */
  navigateToRequestConsent() {
    super.navigateTo( REPRINT_LETTERS_PATH + '/' + REPRINT_CONSENT );
  }
}
