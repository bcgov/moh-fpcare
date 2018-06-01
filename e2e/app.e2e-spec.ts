import { ProfessionalInfoPage } from './app.po';
import { ContactInfoPage } from './app.po';
import { BaseFPCarePage } from './app.po';
import { SelfDeclarationPage } from './app.po';
import { AllFPCarePages } from './app.po';

 /**
  * Tests the modal behaviour on the the initial screen.
  */
describe('FPCARE Consent Modal Tests', () => {
  let page: ProfessionalInfoPage;

  beforeEach(() => {
    page = new ProfessionalInfoPage();
    page.navigateTo();
  });

  it('should display message saying app works', () => {
    expect(page.getParagraphText()).toEqual('Professional Information');
  });

  it('should have to check Info Consent checkbox to unlock modal', () => {
    expect(page.checkModalDisplayed()).toBeTruthy();
    expect(page.checkModalUnlocked()).toBeFalsy();
    page.clickInfoConsentCheckbox();
    expect(page.checkModalUnlocked()).toBeTruthy();
  });

  it('should not be able to close Info Consent modal before clicking checkbox', () => {
    page.clickModalSubmit();
    expect(page.checkModalDisplayed()).toBeTruthy();
  });

  it('should be able to close Info Consent modal', () => {
    page.clickInfoConsentCheckbox();
    page.clickModalSubmit();
    expect(page.checkModalDisplayed()).toBeFalsy();
  });

  it('should not be able to close modal by clicking modal backgruound', () => {
    // page.clickInfoConsentCheckbox();
    page.clickModalSubmit();
    expect(page.checkModalDisplayed()).toBeTruthy();
    //How simulate a click on background?
  });

});

/**
 * Commented out until we write specific tests for this page.
 * Currently it's functionality is duplicated in AllFPCarePages
 *
 * TODO - Write tests to check validation! Invalid date, address, etc.
 */

// describe('FPCARE Contact Info', () => {
//   let page: ContactInfoPage;

//   beforeEach(() => {
//     page = new ContactInfoPage();
//     page.navigateTo();
//   });


//   it('should fill out contact info page', () => {
//     page.fillContactInfo();
//     page.fillAddressInfo();
//     page.fillSecurityQuestions();
//   });

// });

/**
 * Commented out until we write specific tests for this page.
 * Currently it's functionality is duplicated in AllFPCarePages
 */

// describe('FPCARE Self Declaration', () => {
//   let page: SelfDeclarationPage;

//   beforeEach(() => {
//     page = new SelfDeclarationPage();
//     page.navigateTo();
//   });


//   it('should fill out self declaration page', () => {
//     page.fillDeclarations();
//   });

// });

describe('FPCARE All Pages', () => {
  let page: AllFPCarePages;

  beforeEach(() => {
    page = new AllFPCarePages();
    page.ready();
  });


  it('should have urls update as it fills out all pages and navigates to the end', () => {
    expect(page.url).toContain('/professional-info');
    page.continue();
    expect(page.url).toContain('/site-access');
    page.continue();
    expect(page.url).toContain('/contact-info');
    page.continue();
    expect(page.url).toContain('/self-declaration');
    page.continue();
    expect(page.url).toContain('/user-acceptance');
    page.continue();
    expect(page.url).toContain('/review-submit');
  });

  it('should verify that data entered on earlier pages is correct on review-submit page', () => {
    page.navigateToAndFill();

    expect(page.find('#name')).toEqual(`${page.firstName} ${page.middleName} ${page.lastName}`);
    expect(page.find('#phone')).toEqual(page.phoneNumber);
    expect(page.find('#email')).toEqual(page.email);
    expect(page.find('#altPhone')).toEqual(page.altPhoneNumber);
    expect(page.find('#altEmail')).toEqual(page.altEmail);
    expect(page.find('#streetNum')).toEqual(page.streetNum);
    expect(page.find('#suite')).toEqual(page.suite);
    expect(page.find('#city')).toEqual(page.city);
    expect(page.find('#province')).toEqual(page.province);
    expect(page.find('#country')).toEqual(page.country);

    expect(page.find('#question1')).toEqual(page.securityAnswer1);
    expect(page.find('#question2')).toEqual(page.securityAnswer2);
    expect(page.find('#question3')).toEqual(page.securityAnswer3);

    expect(page.find('#haveBeenSubjectOfOrderOrConviction')).toEqual('Yes');
    expect(page.find('#hasBeenSuspendedOrCancelled')).toEqual('Yes');
    expect(page.find('#hasHadLimits')).toEqual('Yes');
    expect(page.find('#havePharmaNetRevoked')).toEqual('Yes');
    expect(page.find('#hasRevocationBeenResolved')).toEqual('Yes');

    /**
     * Currently unable to test CAPTCHA because it isn't compatible with AoT
     * but the below code should work once we reinstitute it.
     */
    // page.failCaptcha();
    // expect(page.find('captcha .text-danger')).toContain("Incorrect answer")

    page.sleep(5000);
  });

});
