/**
 * Base functionality for all pages
 */
import {element, by, browser} from 'protractor';

export class BasePagePo {

  /** Continue/submit button on the form action bar */
  private _continueButton;

  constructor() {
    this._continueButton = element(by.css('common-form-action-bar .submit'));
  }

  /**
   *
   * @param {string} url
   * @returns {promise.Promise<any>}
   */
  navigateTo( url: string ) {
    return browser.get( url );
  }

  /**
   * Checks if button is enabled
   * @returns {boolean}
   */
  canContinue(): boolean {
    return this._continueButton.isEnabled();
  }

  /**
   * Clicks the button to continue
   */
  continue() {
    this._continueButton.click();

    // Doesn't seem necessary but other people required a sleep after navigating to new routes.
    browser.waitForAngular(); //OR browser.sleep( 10 );
  }

  /**
   * Pauses browser execution
   * @param ms Time to sleep in milliseconds
   */
  sleep( ms: number ) {
    browser.sleep( ms );
  }
}

