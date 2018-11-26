import {element, by} from 'protractor';

export class ConsentModalPo {

  /** Button to close modal upon consent agreement & captacha completion */
  private _button;

  constructor() {
    this._button = element( by.css( 'fpcare-consent-modal .modal-footer .btn' ) );
  }

  clickCheckbox() {
    element( by.css( 'fpcare-consent-modal .d-flex .checkbox .d-inline .btn' ) ).click();
  }

  canSubmit() {
    return this._button.isEnabled();
  }

  clickSubmit() {
    this._button.click();
  }

  setCaptcha() {
    element( by.deepCss( 'fpcare-consent-modal captcha .bcgov-captcha label input' ) ).sendKeys( 'irobot' );
  }

  isDisplayed() {
    return element( by.css( 'fpcare-consent-modal > .modal' ) ).isDisplayed();
  }
}
