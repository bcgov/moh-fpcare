/**
 * Test Request Consent
 */
import {ConsentReprintPagePo} from './consent-reprint-page.po';

/**
 * Tests the modal behaviour on the the initial screen.
 */
describe('FPCARE Request Consent Tests', () => {
  let page: ConsentReprintPagePo;

  beforeEach(() => {
    page = new ConsentReprintPagePo();
    page.navigateToRequestConsent();
  });

  it('should display consent modal', () => {
    expect( page.consentModal.isDisplayed() ).toBeTruthy();
    expect( page.consentModal.canSubmit() ).toBeFalsy();
  });

  it( 'should close consent modal upon agreement', () => {
    page.consentModal.clickCheckbox();
    page.consentModal.setCaptcha();
    page.consentModal.clickSubmit();

    expect( page.consentModal.isDisplayed() ).toBeFalsy();
  });

});
